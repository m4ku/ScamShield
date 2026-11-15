import AVFoundation
import Speech
import SwiftUI

/// Speech locales per app language (Tagalog voices are usually listed as Filipino), as on the website.
nonisolated enum SpeechLocales {
    static func codes(_ language: String) -> [String] {
        switch language {
        case "en": ["en-US", "en"]
        case "es": ["es-US", "es-MX", "es"]
        case "zh": ["zh-CN", "zh"]
        case "vi": ["vi-VN", "vi"]
        case "tl": ["fil-PH", "fil", "tl"]
        case "hi": ["hi-IN", "hi"]
        case "fr": ["fr-FR", "fr-CA", "fr"]
        default: [language]
        }
    }

    static func voice(for language: String) -> AVSpeechSynthesisVoice? {
        let voices = AVSpeechSynthesisVoice.speechVoices()
        for code in codes(language) {
            if let v = voices.first(where: { $0.language.lowercased().hasPrefix(code.lowercased()) }) { return v }
        }
        return nil
    }
}

// MARK: Read aloud

@Observable
final class Speaker {
    static let shared = Speaker()
    @ObservationIgnored private let synth = AVSpeechSynthesizer()
    @ObservationIgnored private let delegate = SpeechDone()
    private(set) var speakingID: String?

    init() {
        synth.delegate = delegate
    }

    func toggle(_ text: String, id: String, language: String) {
        if speakingID == id {
            stop()
            return
        }
        synth.stopSpeaking(at: .immediate)
        let u = AVSpeechUtterance(string: text)
        u.voice = SpeechLocales.voice(for: language)
        u.rate = AVSpeechUtteranceDefaultSpeechRate * 0.92
        speakingID = id
        synth.speak(u)
    }

    func stop() {
        synth.stopSpeaking(at: .immediate)
        speakingID = nil
    }

    fileprivate func finished() { speakingID = nil }
}

/// Tells the speaker when an utterance ends (called off the main thread).
private final class SpeechDone: NSObject, AVSpeechSynthesizerDelegate {
    nonisolated func speechSynthesizer(_ s: AVSpeechSynthesizer, didFinish u: AVSpeechUtterance) {
        Task { @MainActor in Speaker.shared.finished() }
    }

    nonisolated func speechSynthesizer(_ s: AVSpeechSynthesizer, didCancel u: AVSpeechUtterance) {
        Task { @MainActor in Speaker.shared.finished() }
    }
}

/// Reads the given text aloud in the chosen language. Hidden when the phone has no voice for it.
struct ReadAloudButton: View {
    let text: String
    var onDark = false

    @Environment(AppSettings.self) private var settings
    @State private var id = UUID().uuidString

    var body: some View {
        let speaking = Speaker.shared.speakingID == id
        if SpeechLocales.voice(for: settings.language) != nil {
            Button {
                Speaker.shared.toggle(text, id: id, language: settings.language)
            } label: {
                Label(speaking ? settings.f.speech.stop : settings.f.speech.readAloud,
                      systemImage: speaking ? "stop.fill" : "speaker.wave.2")
                    .font(.ui(.body, weight: .semibold))
                    .padding(.horizontal, 16)
                    .frame(minHeight: 48)
                    .foregroundStyle(speaking ? Color.white : Color.ink)
                    .background(speaking ? Color.ink : Color.surface, in: RoundedRectangle(cornerRadius: 14))
                    .overlay(RoundedRectangle(cornerRadius: 14).strokeBorder(onDark ? .clear : Color.line, lineWidth: 2))
            }
            .buttonStyle(.plain)
            .accessibilityAddTraits(speaking ? .isSelected : [])
            .onDisappear { if speaking { Speaker.shared.stop() } }
        }
    }
}

// MARK: Voice input

@Observable
final class Listener {
    private(set) var listening = false
    private var engine: AVAudioEngine?
    private var request: SFSpeechAudioBufferRecognitionRequest?
    private var task: SFSpeechRecognitionTask?

    static func recognizer(for language: String) -> SFSpeechRecognizer? {
        for code in SpeechLocales.codes(language) {
            if let r = SFSpeechRecognizer(locale: Locale(identifier: code)), r.isAvailable { return r }
        }
        return nil
    }

    func start(language: String, onText: @escaping @MainActor (String) -> Void) async {
        guard let recognizer = Self.recognizer(for: language) else { return }
        let speechOK = await withCheckedContinuation { c in
            SFSpeechRecognizer.requestAuthorization { c.resume(returning: $0 == .authorized) }
        }
        let micOK = await AVAudioApplication.requestRecordPermission()
        guard speechOK, micOK else { return }

        do {
            let session = AVAudioSession.sharedInstance()
            try session.setCategory(.record, mode: .measurement, options: .duckOthers)
            try session.setActive(true, options: .notifyOthersOnDeactivation)

            let request = SFSpeechAudioBufferRecognitionRequest()
            request.shouldReportPartialResults = false
            // Keep speech on the phone where the language allows it.
            if recognizer.supportsOnDeviceRecognition { request.requiresOnDeviceRecognition = true }

            let engine = AVAudioEngine()
            Self.installTap(on: engine.inputNode, request: request)
            engine.prepare()
            try engine.start()

            self.engine = engine
            self.request = request
            self.task = Self.recognize(with: recognizer, request: request) { [weak self] text, finished in
                Task { @MainActor in
                    if let text, !text.isEmpty { onText(text) }
                    if finished { self?.stop() }
                }
            }
            listening = true
        } catch {
            stop()
        }
    }

    func stop() {
        engine?.stop()
        engine?.inputNode.removeTap(onBus: 0)
        request?.endAudio()
        task?.finish()
        engine = nil
        request = nil
        task = nil
        listening = false
        try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
    }

    /// The tap runs on the audio thread, so it must not be tied to the main actor.
    nonisolated private static func installTap(on node: AVAudioInputNode, request: SFSpeechAudioBufferRecognitionRequest) {
        let format = node.outputFormat(forBus: 0)
        node.installTap(onBus: 0, bufferSize: 1024, format: format) { buffer, _ in request.append(buffer) }
    }

    nonisolated private static func recognize(
        with recognizer: SFSpeechRecognizer,
        request: SFSpeechAudioBufferRecognitionRequest,
        handler: @escaping @Sendable (String?, Bool) -> Void
    ) -> SFSpeechRecognitionTask {
        recognizer.recognitionTask(with: request) { result, error in
            let text = result?.isFinal == true ? result?.bestTranscription.formattedString : nil
            handler(text, result?.isFinal == true || error != nil)
        }
    }
}

/// Lets people speak instead of typing. Hidden where speech recognition isn't available for the language.
struct MicButton: View {
    let onText: @MainActor (String) -> Void

    @Environment(AppSettings.self) private var settings
    @State private var listener = Listener()

    var body: some View {
        if Listener.recognizer(for: settings.language) != nil {
            VStack(alignment: .leading, spacing: 6) {
                Button {
                    if listener.listening {
                        listener.stop()
                    } else {
                        let language = settings.language
                        Task { await listener.start(language: language, onText: onText) }
                    }
                } label: {
                    Label(listener.listening ? settings.f.speech.listening : settings.f.speech.speak,
                          systemImage: listener.listening ? "mic.fill" : "mic")
                        .font(.ui(.body, weight: .semibold))
                        .padding(.horizontal, 16)
                        .frame(minHeight: 48)
                        .foregroundStyle(listener.listening ? Color.white : Color.ink)
                        .background(listener.listening ? Color.brand : Color.surface, in: RoundedRectangle(cornerRadius: 14))
                        .overlay(RoundedRectangle(cornerRadius: 14).strokeBorder(listener.listening ? Color.brand : Color.line, lineWidth: 2))
                }
                .buttonStyle(.plain)
                if listener.listening {
                    Text(settings.f.speech.privacy).font(.ui(.subheadline)).foregroundStyle(Color.inkSoft)
                }
            }
            .onDisappear { listener.stop() }
        }
    }
}
