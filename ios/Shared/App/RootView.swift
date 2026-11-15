import SwiftUI

enum AppTab: Hashable { case check, learn, practice, help }

/// The same four places as the website's bottom bar: Check, Learn, Practice, Get help.
struct RootView: View {
    @Environment(AppSettings.self) private var settings
    @State private var tab: AppTab = .check

    var body: some View {
        let nav = settings.site.nav
        TabView(selection: $tab) {
            Tab(nav.check, systemImage: "magnifyingglass", value: .check) {
                NavigationStack { CheckFlowView() }
            }
            Tab(nav.learn, systemImage: "book", value: .learn) {
                NavigationStack { LearnListView() }
            }
            Tab(nav.practice, systemImage: "target", value: .practice) {
                NavigationStack { PracticeView() }
            }
            Tab(nav.help, systemImage: "lifepreserver", value: .help) {
                NavigationStack {
                    ScrollView { HelpView().padding(.horizontal, 20).padding(.vertical, 16) }
                        .background(Color.bg)
                        .toolbar { LanguageMenu() }
                }
            }
        }
        .onChange(of: settings.incomingText) { if settings.incomingText != nil { tab = .check } }
    }
}

/// Language picker for the top bar.
struct LanguageMenu: ToolbarContent {
    @Environment(AppSettings.self) private var settings

    var body: some ToolbarContent {
        ToolbarItem(placement: .topBarTrailing) {
            Menu {
                Picker(settings.t.languageLabel, selection: Binding(get: { settings.language }, set: { settings.language = $0 })) {
                    ForEach(AppContent.shared.languages, id: \.self) { lang in
                        Text(AppContent.shared.languageLabels[lang] ?? lang).tag(lang)
                    }
                }
            } label: {
                HStack(spacing: 6) {
                    Image(systemName: "globe").foregroundStyle(Color.brand)
                    Text(AppContent.shared.languageLabels[settings.language] ?? "").foregroundStyle(Color.ink)
                }
                .font(.ui(.body, weight: .medium))
                .padding(.horizontal, 6)
                .fixedSize()
            }
            .accessibilityLabel("\(settings.t.languageLabel): \(AppContent.shared.languageLabels[settings.language] ?? "")")
        }
    }
}

/// The app's name in the top-left corner.
struct BrandTitle: ToolbarContent {
    var body: some ToolbarContent {
        ToolbarItem(placement: .topBarLeading) {
            HStack(spacing: 8) {
                Image(systemName: "shield")
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(.white)
                    .frame(width: 34, height: 34)
                    .background(Color.brand, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                Text("ScamShield").font(.serif(.title3, weight: .semibold)).foregroundStyle(Color.ink)
            }
            .padding(.trailing, 8)
            .fixedSize()
            .accessibilityElement(children: .combine)
        }
    }
}
