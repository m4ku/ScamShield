import SwiftUI

/// The 8 most common scams.
struct LearnListView: View {
    @Environment(AppSettings.self) private var settings

    var body: some View {
        let learn = settings.site.learn
        let guides = AppContent.shared.guides[settings.language] ?? [:]
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                PageHeader(eyebrow: learn.eyebrow, title: learn.title, intro: learn.intro)
                ForEach(Array(AppContent.shared.scamSlugs.enumerated()), id: \.element) { i, slug in
                    if let guide = guides[slug] {
                        NavigationLink(value: slug) {
                            HStack(alignment: .top, spacing: 16) {
                                Image(systemName: ScamSymbol.name(slug))
                                    .font(.system(size: 26))
                                    .frame(width: 60, height: 60)
                                    .background(ScamSymbol.tint(i), in: RoundedRectangle(cornerRadius: 18))
                                    .foregroundStyle(Color.ink)
                                VStack(alignment: .leading, spacing: 6) {
                                    Text(guide.title).font(.ui(.title3, weight: .bold)).foregroundStyle(Color.ink)
                                    Text(guide.short).font(.ui(.body)).foregroundStyle(Color.inkSoft)
                                }
                                .multilineTextAlignment(.leading)
                                Spacer(minLength: 0)
                                Image(systemName: "chevron.right").foregroundStyle(Color.brand).padding(.top, 6)
                            }
                            .padding(18)
                            .background(Color.surface, in: RoundedRectangle(cornerRadius: 22, style: .continuous))
                            .shadow(color: Color.ink.opacity(0.07), radius: 10, y: 4)
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 16)
        }
        .background(Color.bg)
        .navigationDestination(for: String.self) { slug in LearnDetailView(slug: slug) }
        .toolbar { BrandTitle(); LanguageMenu() }
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct LearnDetailView: View {
    let slug: String
    @Environment(AppSettings.self) private var settings

    var body: some View {
        let learn = settings.site.learn
        if let guide = AppContent.shared.guides[settings.language]?[slug] {
            ScrollView {
                VStack(alignment: .leading, spacing: 26) {
                    HStack(alignment: .top, spacing: 16) {
                        let i = AppContent.shared.scamSlugs.firstIndex(of: slug) ?? 0
                        Image(systemName: ScamSymbol.name(slug))
                            .font(.system(size: 32))
                            .frame(width: 72, height: 72)
                            .background(ScamSymbol.tint(i), in: RoundedRectangle(cornerRadius: 20))
                            .accessibilityHidden(true)
                        VStack(alignment: .leading, spacing: 10) {
                            Text(guide.title).font(.display).accessibilityAddTraits(.isHeader)
                            Text(guide.short).font(.bodyLarge).foregroundStyle(Color.inkSoft)
                            ReadAloudButton(text: ([guide.title, guide.short, learn.howLabel, guide.how, learn.signsLabel] + guide.signs + [learn.todoLabel] + guide.todo).joined(separator: ". "))
                        }
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        Text(learn.exampleLabel.uppercased()).font(.ui(.subheadline, weight: .bold)).foregroundStyle(Color.muted)
                        Card {
                            Text(guide.example.from).font(.ui(.body, weight: .semibold)).foregroundStyle(Color.muted)
                            Text(guide.example.text).font(.bodyLarge)
                        }
                        .rotationEffect(.degrees(-0.6))
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        Text(learn.howLabel).font(.heading).accessibilityAddTraits(.isHeader)
                        Text(guide.how).font(.bodyLarge)
                    }

                    bulletBox(learn.signsLabel, guide.signs, symbol: "exclamationmark.triangle", tint: .cautionStrong, bg: .claySoft)
                    bulletBox(learn.todoLabel, guide.todo, symbol: "checkmark", tint: .brand, bg: .brandTint)
                }
                .padding(.horizontal, 20)
                .padding(.vertical, 16)
            }
            .background(Color.bg)
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private func bulletBox(_ title: String, _ items: [String], symbol: String, tint: Color, bg: Color) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title).font(.subheading).accessibilityAddTraits(.isHeader)
            ForEach(items, id: \.self) { item in
                HStack(alignment: .top, spacing: 12) {
                    Image(systemName: symbol).font(.system(size: 18, weight: .bold)).foregroundStyle(tint).padding(.top, 3)
                        .accessibilityHidden(true)
                    Text(item).font(.bodyLarge)
                }
            }
        }
        .padding(22)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(bg, in: RoundedRectangle(cornerRadius: 24, style: .continuous))
    }
}

struct PageHeader: View {
    let eyebrow: String
    let title: String
    let intro: String

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(eyebrow.uppercased())
                .font(.ui(.subheadline, weight: .bold))
                .tracking(1)
                .foregroundStyle(Color.brandStrong)
            Text(title).font(.display).accessibilityAddTraits(.isHeader)
            Text(intro).font(.bodyLarge).foregroundStyle(Color.inkSoft)
        }
        .padding(.bottom, 8)
    }
}

/// Everyday-object symbols for each scam type (no sparkles or robots).
enum ScamSymbol {
    static func name(_ slug: String) -> String {
        switch slug {
        case "delivery": "shippingbox"
        case "bank": "building.columns"
        case "government": "person.text.rectangle"
        case "family": "person.2"
        case "tech-support": "desktopcomputer"
        case "prize": "gift"
        case "romance": "heart"
        case "job": "briefcase"
        default: "questionmark.circle"
        }
    }

    static func tint(_ i: Int) -> Color {
        [Color.brandSoft, Color.clay, Color.cautionSoft, Color.panel][i % 4]
    }
}
