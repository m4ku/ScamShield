import Network
import UIKit
import Vision

/// Reads the words in a screenshot or photo on the phone (Apple's Vision text recognition), for offline checks.
/// An empty result means the picture is blank or has no readable message.
nonisolated enum TextReader {
    static func read(_ imageData: Data, language: String) async -> String {
        await withCheckedContinuation { continuation in
            DispatchQueue.global(qos: .userInitiated).async {
                guard let cg = UIImage(data: imageData)?.cgImage else {
                    continuation.resume(returning: "")
                    return
                }
                let request = VNRecognizeTextRequest()
                request.recognitionLevel = .accurate
                request.usesLanguageCorrection = true
                request.automaticallyDetectsLanguage = true
                if let supported = try? request.supportedRecognitionLanguages() {
                    let wanted = SpeechLocales.codes(language) + ["zh-Hans", "en-US"]
                    request.recognitionLanguages = wanted.filter { code in supported.contains { $0.hasPrefix(code) } }
                }
                try? VNImageRequestHandler(cgImage: cg).perform([request])
                let lines = (request.results ?? []).compactMap { $0.topCandidates(1).first?.string }
                continuation.resume(returning: lines.joined(separator: "\n").trimmingCharacters(in: .whitespacesAndNewlines))
            }
        }
    }
}

/// Whether the phone currently has an internet connection.
@Observable
final class Connectivity {
    static let shared = Connectivity()
    private(set) var isOnline = true
    @ObservationIgnored private let monitor = NWPathMonitor()

    init() {
        monitor.pathUpdateHandler = { path in
            let online = path.status == .satisfied
            Task { @MainActor in Connectivity.shared.isOnline = online }
        }
        monitor.start(queue: DispatchQueue(label: "scamshield.connectivity"))
    }
}
