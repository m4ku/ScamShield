import SwiftUI

/// Workshop kit for Rotary clubs, libraries and senior centers: big-text practice slides and a printable handout.
struct WorkshopView: View {
    @Environment(AppSettings.self) private var settings
    @State private var presenting = false

    var body: some View {
        let w = settings.f.workshop
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                PageHeader(eyebrow: w.eyebrow, title: w.title, intro: w.intro)

                VStack(alignment: .leading, spacing: 12) {
                    Image(systemName: "rectangle.on.rectangle")
                        .font(.system(size: 26))
                        .frame(width: 56, height: 56)
                        .background(.white.opacity(0.15), in: RoundedRectangle(cornerRadius: 16))
                    Text(w.presentTitle).font(.heading)
                    Text(w.presentBody).font(.bodyLarge).opacity(0.9)
                    Button { presenting = true } label: {
                        HStack { Text(w.presentCta); Image(systemName: "arrow.right") }
                            .font(.ui(.title3, weight: .bold))
                            .foregroundStyle(Color.brandStrong)
                            .padding(.horizontal, 22)
                            .frame(minHeight: 56)
                            .background(.white, in: RoundedRectangle(cornerRadius: 18))
                    }
                    .padding(.top, 6)
                }
                .foregroundStyle(.white)
                .padding(24)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.brand, in: RoundedRectangle(cornerRadius: 28, style: .continuous))

                VStack(alignment: .leading, spacing: 12) {
                    Image(systemName: "doc.text")
                        .font(.system(size: 26))
                        .frame(width: 56, height: 56)
                        .background(Color.clay, in: RoundedRectangle(cornerRadius: 16))
                    Text(w.handoutTitle).font(.heading)
                    Text(w.handoutBody).font(.bodyLarge).foregroundStyle(Color.inkSoft)
                    NavigationLink { HandoutScreen() } label: { Text(w.handoutCta) }
                        .buttonStyle(BigButtonStyle(kind: .secondary))
                        .padding(.top, 6)
                }
                .padding(24)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.claySoft, in: RoundedRectangle(cornerRadius: 28, style: .continuous))

                VStack(alignment: .leading, spacing: 12) {
                    Text(w.tipsTitle).font(.heading)
                    ForEach(Array(w.tips.enumerated()), id: \.offset) { i, tip in
                        HStack(alignment: .top, spacing: 14) {
                            NumberBadge(n: i + 1, fill: .brandSoft, text: .brandStrong)
                            Text(tip).font(.bodyLarge)
                        }
                    }
                }
                .padding(22)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.surface, in: RoundedRectangle(cornerRadius: 28, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 28).strokeBorder(Color.line))
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 16)
        }
        .background(Color.bg)
        .navigationBarTitleDisplayMode(.inline)
        .fullScreenCover(isPresented: $presenting) { PresenterView() }
    }
}

/// Full-screen practice slides for a projector or TV: show a message, tap to reveal the answer and clues.
struct PresenterView: View {
    @Environment(AppSettings.self) private var settings
    @Environment(\.dismiss) private var dismiss
    @State private var index = 0
    @State private var revealed = false

    var body: some View {
        let w = settings.f.workshop
        let p = settings.site.practice
        let items = AppContent.shared.practice[settings.language] ?? []
        let item = items[min(index, items.count - 1)]

        VStack(spacing: 0) {
            HStack {
                HStack(spacing: 4) {
                    ForEach(items.indices, id: \.self) { i in
                        Capsule().fill(i <= index ? Color.brand : Color.line).frame(width: i == index ? 22 : 8, height: 8)
                    }
                }
                .accessibilityHidden(true)
                Spacer()
                Button(w.exit) { dismiss() }
                    .font(.ui(.title3, weight: .semibold))
                    .foregroundStyle(Color.ink)
                    .padding(.horizontal, 16)
                    .frame(minHeight: 48)
                    .overlay(RoundedRectangle(cornerRadius: 14).strokeBorder(Color.line, lineWidth: 2))
            }
            .padding(.horizontal, 20)
            .padding(.top, 8)

            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    Text(fill(p.progress, ["n": index + 1, "total": items.count]))
                        .font(.ui(.title3, weight: .semibold))
                        .foregroundStyle(Color.muted)
                    VStack(alignment: .leading, spacing: 12) {
                        Text("\(p.fromLabel): \(item.from)").font(.ui(.title3, weight: .semibold)).foregroundStyle(Color.muted)
                        Text(item.text).font(.system(size: 30, weight: .regular)).minimumScaleFactor(0.6)
                    }
                    .padding(24)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.surface, in: RoundedRectangle(cornerRadius: 32, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 32).strokeBorder(revealed ? (item.scam ? Color.danger : Color.lineStrong) : Color.line, lineWidth: 4))

                    if revealed {
                        Label(item.scam ? p.answerScam : p.answerReal, systemImage: item.scam ? "exclamationmark.triangle.fill" : "info.circle")
                            .font(.system(size: 28, weight: .bold))
                            .foregroundStyle(item.scam ? Color.white : Color.ink)
                            .padding(18)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(item.scam ? Color.danger : Color.neutralVerdict, in: RoundedRectangle(cornerRadius: 24))
                        ForEach(item.clues, id: \.self) { clue in
                            HStack(alignment: .top, spacing: 14) {
                                Circle().fill(item.scam ? Color.danger : Color.brand).frame(width: 14, height: 14).padding(.top, 10)
                                Text(clue).font(.system(size: 24))
                            }
                        }
                    }
                }
                .padding(20)
                .animation(.easeOut(duration: 0.3), value: revealed)
            }

            HStack(spacing: 12) {
                Button(action: back) { Label(w.prev, systemImage: "arrow.left") }
                    .buttonStyle(BigButtonStyle(kind: .secondary))
                    .disabled(index == 0 && !revealed)
                    .opacity(index == 0 && !revealed ? 0.35 : 1)
                Button(action: forward) {
                    HStack { Text(revealed ? w.next : w.reveal); if revealed { Image(systemName: "arrow.right") } }
                }
                .buttonStyle(BigButtonStyle())
                .disabled(revealed && index + 1 >= items.count)
                .opacity(revealed && index + 1 >= items.count ? 0.35 : 1)
            }
            .padding(20)
        }
        .background(Color.bg)
        .persistentSystemOverlays(.hidden)
    }

    private func forward() {
        let count = AppContent.shared.practice[settings.language]?.count ?? 0
        if !revealed { revealed = true } else if index + 1 < count { index += 1; revealed = false }
    }

    private func back() {
        if revealed { revealed = false } else if index > 0 { index -= 1; revealed = true }
    }
}

/// The printable one-page handout, with a button to print or save it as a PDF.
struct HandoutScreen: View {
    @Environment(AppSettings.self) private var settings
    @State private var pdf: URL?

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                if let pdf {
                    ShareLink(item: pdf) { Label(settings.f.workshop.print, systemImage: "printer") }
                        .buttonStyle(BigButtonStyle())
                }
                HandoutPage(language: settings.language)
                    .padding(20)
                    .background(Color.white, in: RoundedRectangle(cornerRadius: 20))
                    .shadow(color: Color.ink.opacity(0.1), radius: 12, y: 6)
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 16)
        }
        .background(Color.bg)
        .navigationBarTitleDisplayMode(.inline)
        .task(id: settings.language) { pdf = HandoutPage.renderPDF(language: settings.language) }
    }
}

/// The handout itself: common scams, the golden rule, a trusted-numbers card and where to report.
struct HandoutPage: View {
    let language: String

    var body: some View {
        let c = AppContent.shared
        let w = c.features[language]!.workshop
        let t = c.strings[language]!
        let guides = c.guides[language] ?? [:]

        VStack(alignment: .leading, spacing: 14) {
            HStack(spacing: 10) {
                Image(systemName: "shield").font(.system(size: 22, weight: .semibold))
                    .frame(width: 40, height: 40)
                    .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(Color.ink, lineWidth: 1.5))
                VStack(alignment: .leading, spacing: 2) {
                    Text("ScamShield").font(.system(size: 15, weight: .semibold, design: .serif))
                    Text(w.handoutHeading).font(.system(size: 22, weight: .semibold, design: .serif))
                }
            }
            Rectangle().fill(Color.ink).frame(height: 2)

            Text(w.handoutRule)
                .font(.system(size: 14, weight: .bold))
                .padding(10)
                .frame(maxWidth: .infinity, alignment: .leading)
                .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(Color.ink, lineWidth: 1.5))

            LazyVGrid(columns: [GridItem(.flexible(), alignment: .top), GridItem(.flexible(), alignment: .top)], alignment: .leading, spacing: 10) {
                ForEach(c.scamSlugs, id: \.self) { slug in
                    if let g = guides[slug] {
                        HStack(alignment: .top, spacing: 6) {
                            Image(systemName: ScamSymbol.name(slug)).font(.system(size: 12))
                            VStack(alignment: .leading, spacing: 2) {
                                Text(g.title).font(.system(size: 11, weight: .bold))
                                Text(g.signs.prefix(2).joined(separator: " · ")).font(.system(size: 9.5))
                            }
                        }
                    }
                }
            }

            HStack(alignment: .top, spacing: 12) {
                VStack(alignment: .leading, spacing: 10) {
                    Text(w.handoutCardTitle).font(.system(size: 13, weight: .bold))
                    ForEach(w.handoutCardLines, id: \.self) { line in
                        Text(line).font(.system(size: 10, weight: .semibold))
                        Rectangle().fill(Color.ink.opacity(0.6)).frame(height: 1).padding(.top, 10)
                    }
                }
                .padding(10)
                .frame(maxWidth: .infinity, alignment: .leading)
                .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(Color.ink, style: StrokeStyle(lineWidth: 1.5, dash: [5, 4])))

                VStack(alignment: .leading, spacing: 6) {
                    Text(t.reportHeading).font(.system(size: 13, weight: .bold))
                    ForEach(Array(t.reportSteps.dropFirst().prefix(3)), id: \.self) { s in
                        Text("• \(s)").font(.system(size: 10))
                    }
                    Text(w.handoutCheck).font(.system(size: 10, weight: .semibold)).padding(.top, 4)
                    Text(Server.base.host() ?? "").font(.system(size: 12, weight: .bold))
                }
                .padding(10)
                .frame(maxWidth: .infinity, alignment: .leading)
                .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(Color.ink, lineWidth: 1))
            }
        }
        .foregroundStyle(Color.ink)
    }

    /// Renders the handout to a one-page US Letter PDF in a temporary file, for printing or sharing.
    static func renderPDF(language: String) -> URL? {
        let page = CGSize(width: 612, height: 792)
        let renderer = ImageRenderer(content:
            HandoutPage(language: language)
                .environment(\.locale, Locale(identifier: AppContent.shared.languageTags[language] ?? language))
                .frame(width: page.width - 72)
                .padding(36)
                .frame(width: page.width, height: page.height, alignment: .top)
                .background(Color.white)
        )
        let url = FileManager.default.temporaryDirectory.appending(path: "ScamShield-handout-\(language).pdf")
        var ok = false
        renderer.render { size, draw in
            var box = CGRect(origin: .zero, size: page)
            guard let ctx = CGContext(url as CFURL, mediaBox: &box, nil) else { return }
            ctx.beginPDFPage(nil)
            draw(ctx)
            ctx.endPDFPage()
            ctx.closePDF()
            ok = true
        }
        return ok ? url : nil
    }
}
