import SwiftUI

/// "Spot the scam": 8 real-looking messages, guess scam or real, then see the clues.
struct PracticeView: View {
    @Environment(AppSettings.self) private var settings
    @State private var started = false
    @State private var index = 0
    @State private var answer: Bool?
    @State private var score = 0

    var body: some View {
        let p = settings.site.practice
        let items = AppContent.shared.practice[settings.language] ?? []

        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                if !started {
                    PageHeader(eyebrow: p.eyebrow, title: p.title, intro: p.intro)
                    Button(p.start) { started = true }.buttonStyle(BigButtonStyle())
                } else if index >= items.count {
                    finished(p, total: items.count)
                } else {
                    question(p, item: items[index], total: items.count)
                }
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 16)
            .animation(.easeOut(duration: 0.25), value: answer)
        }
        .background(Color.bg)
        .toolbar { BrandTitle(); LanguageMenu() }
        .navigationBarTitleDisplayMode(.inline)
        .onChange(of: settings.language) { restart() }
    }

    @ViewBuilder
    private func question(_ p: SiteStrings.Practice, item: PracticeItem, total: Int) -> some View {
        Text(fill(p.progress, ["n": index + 1, "total": total]))
            .font(.ui(.title3, weight: .semibold))
            .foregroundStyle(Color.muted)

        Card(padding: 22) {
            Text("\(p.fromLabel): \(item.from)").font(.ui(.body, weight: .semibold)).foregroundStyle(Color.muted)
            Text(item.text).font(.ui(.title2))
        }
        .overlay(
            RoundedRectangle(cornerRadius: 22)
                .strokeBorder(answer == nil ? .clear : item.scam ? Color.danger : Color.lineStrong, lineWidth: 3)
        )

        if let answer {
            let right = answer == item.scam
            VStack(alignment: .leading, spacing: 14) {
                Text(right ? p.correct : p.wrong).font(.heading)
                Label(item.scam ? p.answerScam : p.answerReal, systemImage: item.scam ? "exclamationmark.triangle.fill" : "info.circle")
                    .font(.ui(.title3, weight: .bold))
                    .foregroundStyle(item.scam ? Color.white : Color.ink)
                    .padding(16)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(item.scam ? Color.danger : Color.neutralVerdict, in: RoundedRectangle(cornerRadius: 18))
                Text(p.cluesLabel).font(.subheading)
                ForEach(item.clues, id: \.self) { clue in
                    HStack(alignment: .top, spacing: 12) {
                        Circle().fill(item.scam ? Color.danger : Color.brand).frame(width: 12, height: 12).padding(.top, 8)
                        Text(clue).font(.bodyLarge)
                    }
                }
                Button(index + 1 < total ? p.next : p.finish) {
                    self.answer = nil
                    index += 1
                }
                .buttonStyle(BigButtonStyle())
            }
        } else {
            HStack(spacing: 12) {
                Button(p.scamButton) { choose(true, item) }.buttonStyle(BigButtonStyle(kind: .secondary))
                Button(p.realButton) { choose(false, item) }.buttonStyle(BigButtonStyle(kind: .secondary))
            }
        }
    }

    @ViewBuilder
    private func finished(_ p: SiteStrings.Practice, total: Int) -> some View {
        Text(fill(p.scoreTitle, ["n": score, "total": total])).font(.display)
        Text(score >= total - 2 ? p.scoreHigh : p.scoreLow).font(.bodyLarge).foregroundStyle(Color.inkSoft)
        Button(p.again, action: restart).buttonStyle(BigButtonStyle())
    }

    private func choose(_ scam: Bool, _ item: PracticeItem) {
        answer = scam
        if scam == item.scam { score += 1 }
    }

    private func restart() {
        index = 0
        score = 0
        answer = nil
    }
}
