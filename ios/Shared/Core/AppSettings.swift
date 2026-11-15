import Foundation
import Observation

/// The chosen language, kept only on this phone (same key as the website's localStorage).
@Observable
final class AppSettings {
    private static let key = "scamshield-language"

    var language: String {
        didSet {
            UserDefaults.standard.set(language, forKey: Self.key)
            BrandFonts.use(for: language)
        }
    }

    init() {
        let content = AppContent.shared
        if let saved = UserDefaults.standard.string(forKey: Self.key), content.languages.contains(saved) {
            language = saved
        } else {
            // First launch: use the phone's language if we support it.
            let preferred = Locale.preferredLanguages.lazy.map { String($0.prefix(2)) }
            language = preferred.first(where: content.languages.contains) ?? "en"
        }
        BrandFonts.use(for: language)
    }

    /// Text shared into the app (scamshield://check?text=…), checked right away like the website's share target.
    var incomingText: String?

    func open(_ url: URL) {
        guard url.scheme == "scamshield",
              let items = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems
        else { return }
        let text = ["title", "text", "url"]
            .compactMap { key in items.first(where: { $0.name == key })?.value }
            .joined(separator: "\n")
            .trimmingCharacters(in: .whitespacesAndNewlines)
        if !text.isEmpty { incomingText = String(text.prefix(AppContent.shared.limits.maxTextChars)) }
    }

    var t: UIStrings { AppContent.shared.strings[language]! }
    var site: SiteStrings { AppContent.shared.site[language]! }
    var f: FeatureStrings { AppContent.shared.features[language]! }
    var languageTag: String { AppContent.shared.languageTags[language] ?? language }
}
