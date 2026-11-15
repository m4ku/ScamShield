import SwiftUI

/// The Check tab: form → reading → result → (optional) help, one job per screen.
/// Results live only in memory; nothing is saved.
struct CheckFlowView: View {
    enum Screen { case form, checking, result, help }

    @Environment(AppSettings.self) private var settings
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    @State private var screen: Screen = .form
    @State private var form = CheckFormModel()
    @State private var input: CheckInput?
    @State private var result: CheckResult?
    @State private var errorText: String?
    @State private var running: Task<Void, Never>?

    var body: some View {
        ScrollViewReader { proxy in
            ScrollView {
                Group {
                    switch screen {
                    case .form:
                        CheckFormView(model: form, error: $errorText, onSubmit: run)
                    case .checking:
                        if let input { CheckingView(input: input, onCancel: cancel) }
                    case .result:
                        if let result {
                            ResultView(result: result, onAgain: reset, onClicked: { show(.help) })
                        }
                    case .help:
                        HelpView(onBack: { show(result == nil ? .form : .result) })
                    }
                }
                .id(screen)
                .padding(.horizontal, 20)
                .padding(.vertical, 16)
                .transition(reduceMotion ? .opacity : .opacity.combined(with: .move(edge: .bottom)))
            }
            .scrollDismissesKeyboard(.interactively)
            .background(Color.bg)
            .onChange(of: screen) { proxy.scrollTo(screen, anchor: .top) }
        }
        .toolbar {
            BrandTitle()
            LanguageMenu()
        }
        .onChange(of: settings.incomingText, initial: true) {
            guard let text = settings.incomingText else { return }
            settings.incomingText = nil
            reset()
            form.text = text
            run(.text(text))
        }
        .navigationBarTitleDisplayMode(.inline)
    }

    private func show(_ next: Screen) {
        withAnimation(reduceMotion ? nil : .easeOut(duration: 0.3)) { screen = next }
    }

    private func run(_ next: CheckInput) {
        errorText = nil
        input = next
        show(.checking)
        let language = settings.language
        running = Task {
            do {
                let r = try await Checker.shared.check(next, language: language)
                guard !Task.isCancelled else { return }
                result = r
                show(.result)
            } catch {
                guard !Task.isCancelled else { return }
                errorText = message(for: (error as? CheckErrorCode) ?? .failed)
                show(.form)
            }
        }
    }

    /// Stops a slow check and goes back to the form with the message still there.
    private func cancel() {
        running?.cancel()
        running = nil
        show(.form)
    }

    private func reset() {
        running?.cancel()
        running = nil
        result = nil
        input = nil
        errorText = nil
        form = CheckFormModel()
        show(.form)
    }

    private func message(for code: CheckErrorCode) -> String {
        let e = settings.t.errors
        switch code {
        case .badInput, .failed: return e.failed
        case .unreadable: return e.unreadable
        case .busy: return e.busy
        case .offline: return e.offline
        }
    }
}

/// What's typed or chosen in the form. Kept while a check runs, so errors return people to their message.
@Observable
final class CheckFormModel {
    var mode: InputMode = .text
    var text = ""
    var callText = ""
    var image: (base64: String, preview: Data)?
}

/// Shown while a check runs: the person's own message and a calm status line.
struct CheckingView: View {
    let input: CheckInput
    let onCancel: () -> Void

    @Environment(AppSettings.self) private var settings
    @State private var step = 0

    var body: some View {
        let steps = settings.site.checkingSteps
        VStack(spacing: 28) {
            Card {
                switch input {
                case .text(let text), .call(let text):
                    Text(text.count > 320 ? String(text.prefix(320)) + "…" : text)
                        .font(.bodyLarge)
                        .foregroundStyle(Color.inkSoft)
                case .image(_, let preview):
                    if let image = UIImage(data: preview) {
                        Image(uiImage: image).resizable().scaledToFit().frame(maxHeight: 280)
                            .clipShape(RoundedRectangle(cornerRadius: 14))
                            .accessibilityHidden(true)
                    }
                }
            }

            VStack(spacing: 14) {
                Text(steps[min(step, steps.count - 1)])
                    .font(.ui(.title2, weight: .semibold))
                    .multilineTextAlignment(.center)
                    .contentTransition(.opacity)
                HStack(spacing: 8) {
                    ForEach(steps.indices, id: \.self) { i in
                        Capsule()
                            .fill(i <= step ? Color.brand : Color.line)
                            .frame(width: i <= step ? 40 : 16, height: 8)
                    }
                }
                .accessibilityHidden(true)
            }
            .accessibilityElement(children: .combine)

            Button(settings.f.form.cancel, action: onCancel)
                .buttonStyle(BigButtonStyle(kind: .secondary))
                .frame(maxWidth: 220)
        }
        .padding(.top, 20)
        .task {
            // Advance the status line every couple of seconds; stops on the last step.
            while step < steps.count - 1 {
                try? await Task.sleep(for: .seconds(2.2))
                withAnimation(.easeOut(duration: 0.3)) { step += 1 }
            }
        }
    }
}
