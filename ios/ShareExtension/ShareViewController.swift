import SwiftUI
import UIKit
import UniformTypeIdentifiers

/// "Share to ScamShield" from Messages, Mail, Safari or Photos: checks the shared text or picture right away,
/// using the same screens and rules as the app. Nothing is saved.
final class ShareViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        let root = ShareRootView(load: { [weak self] in await self?.loadInput() }, onDone: { [weak self] in
            self?.extensionContext?.completeRequest(returningItems: nil)
        })
        .environment(AppSettings())
        .preferredColorScheme(.light)
        .tint(.brand)

        let host = UIHostingController(rootView: root)
        addChild(host)
        host.view.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(host.view)
        NSLayoutConstraint.activate([
            host.view.topAnchor.constraint(equalTo: view.topAnchor),
            host.view.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            host.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            host.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
        ])
        host.didMove(toParent: self)
    }

    /// The first picture, or else all shared text and links joined together.
    private func loadInput() async -> CheckInput? {
        let providers = (extensionContext?.inputItems as? [NSExtensionItem] ?? []).flatMap { $0.attachments ?? [] }

        for p in providers where p.hasItemConformingToTypeIdentifier(UTType.image.identifier) {
            if let data = try? await p.loadDataRepresentation(for: .image), let prepared = ImagePrep.prepare(data) {
                return .image(jpegBase64: prepared.base64, preview: prepared.preview)
            }
        }

        var parts: [String] = []
        for p in providers {
            if p.hasItemConformingToTypeIdentifier(UTType.url.identifier), let url = try? await p.loadItem(forTypeIdentifier: UTType.url.identifier) as? URL {
                parts.append(url.absoluteString)
            } else if p.hasItemConformingToTypeIdentifier(UTType.plainText.identifier),
                      let text = try? await p.loadItem(forTypeIdentifier: UTType.plainText.identifier) as? String {
                parts.append(text)
            }
        }
        let text = parts.joined(separator: "\n").trimmingCharacters(in: .whitespacesAndNewlines)
        return text.isEmpty ? nil : .text(String(text.prefix(AppContent.shared.limits.maxTextChars)))
    }
}

private extension NSItemProvider {
    func loadDataRepresentation(for type: UTType) async throws -> Data {
        try await withCheckedThrowingContinuation { c in
            _ = loadDataRepresentation(forTypeIdentifier: type.identifier) { data, error in
                if let data { c.resume(returning: data) } else { c.resume(throwing: error ?? CocoaError(.fileReadUnknown)) }
            }
        }
    }
}

/// Reading → result → help, with a Done button to go back to where the person was.
struct ShareRootView: View {
    let load: () async -> CheckInput?
    let onDone: () -> Void

    enum Screen { case loading, checking(CheckInput), result(CheckResult), help(CheckResult), error(String) }

    @Environment(AppSettings.self) private var settings
    @State private var screen: Screen = .loading

    var body: some View {
        NavigationStack {
            ScrollView {
                Group {
                    switch screen {
                    case .loading:
                        ProgressView().padding(.top, 80)
                    case .checking(let input):
                        CheckingView(input: input, onCancel: onDone)
                    case .result(let result):
                        ResultView(result: result, onAgain: onDone, onClicked: { screen = .help(result) })
                    case .help(let result):
                        HelpView(onBack: { screen = .result(result) })
                    case .error(let message):
                        VStack(spacing: 20) {
                            Text(message).font(.bodyStrong).multilineTextAlignment(.center)
                            Button(settings.t.backButton, action: onDone).buttonStyle(BigButtonStyle())
                        }
                        .padding(.top, 60)
                    }
                }
                .padding(.horizontal, 20)
                .padding(.vertical, 16)
            }
            .background(Color.bg)
            .toolbar {
                BrandTitle()
                ToolbarItem(placement: .topBarTrailing) {
                    Button(action: onDone) { Image(systemName: "xmark") }
                        .accessibilityLabel(settings.t.backButton)
                }
            }
            .navigationBarTitleDisplayMode(.inline)
        }
        .task { await run() }
    }

    private func run() async {
        let e = settings.t.errors
        guard let input = await load() else {
            screen = .error(e.empty)
            return
        }
        screen = .checking(input)
        do {
            screen = .result(try await Checker.shared.check(input, language: settings.language))
        } catch {
            let code = error
            screen = .error(code == .busy ? e.busy : code == .offline ? e.offline : code == .unreadable ? e.unreadable : e.failed)
        }
    }
}
