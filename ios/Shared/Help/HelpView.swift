import SwiftUI

/// "Already clicked, replied or paid?": 12 situations with ordered steps, plus where to report.
struct HelpView: View {
    var onBack: (() -> Void)?

    @Environment(AppSettings.self) private var settings
    @State private var open: Set<String> = []

    var body: some View {
        let t = settings.t
        VStack(alignment: .leading, spacing: 26) {
            HStack(alignment: .top, spacing: 16) {
                Image(systemName: "lifepreserver")
                    .font(.system(size: 30))
                    .foregroundStyle(.white)
                    .frame(width: 64, height: 64)
                    .background(Color.brand, in: RoundedRectangle(cornerRadius: 18))
                    .accessibilityHidden(true)
                VStack(alignment: .leading, spacing: 10) {
                    Text(t.helpTitle).font(.display).accessibilityAddTraits(.isHeader)
                    Text(t.helpIntro).font(.bodyLarge).foregroundStyle(Color.inkSoft)
                }
            }

            VStack(alignment: .leading, spacing: 12) {
                Text(t.helpQuestion).font(.heading).accessibilityAddTraits(.isHeader)
                ForEach(AppContent.shared.helpTopics, id: \.self) { key in
                    if let topic = t.helpTopics[key] { topicRow(key, topic) }
                }
            }

            VStack(alignment: .leading, spacing: 14) {
                Text(t.reportHeading).font(.heading).accessibilityAddTraits(.isHeader)
                ForEach(t.reportSteps, id: \.self) { step in
                    HStack(alignment: .firstTextBaseline, spacing: 12) {
                        Circle().fill(Color.brand).frame(width: 10, height: 10).accessibilityHidden(true)
                        Text(linkified(step)).font(.bodyLarge)
                    }
                }
            }
            .padding(22)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color.claySoft, in: RoundedRectangle(cornerRadius: 28, style: .continuous))

            if let onBack {
                Button(action: onBack) { Label(t.backButton, systemImage: "arrow.left") }
                    .buttonStyle(BigButtonStyle())
            }
        }
    }

    private func topicRow(_ key: String, _ topic: HelpTopicText) -> some View {
        let isOpen = open.contains(key)
        return VStack(alignment: .leading, spacing: 0) {
            Button {
                withAnimation(.easeOut(duration: 0.25)) {
                    if isOpen { open.remove(key) } else { open.insert(key) }
                }
            } label: {
                HStack(spacing: 12) {
                    Text(topic.label).font(.bodyStrong).multilineTextAlignment(.leading)
                    Spacer()
                    Image(systemName: "chevron.down")
                        .font(.system(size: 16, weight: .bold))
                        .rotationEffect(.degrees(isOpen ? 180 : 0))
                        .frame(width: 36, height: 36)
                        .foregroundStyle(isOpen ? Color.white : Color.ink)
                        .background(isOpen ? Color.brand : Color.panel, in: Circle())
                }
                .padding(.horizontal, 18)
                .frame(minHeight: 64)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityAddTraits(.isButton)
            .accessibilityValue(isOpen ? "expanded" : "collapsed")

            if isOpen {
                VStack(alignment: .leading, spacing: 12) {
                    ForEach(Array(topic.steps.enumerated()), id: \.offset) { i, step in
                        HStack(alignment: .top, spacing: 12) {
                            NumberBadge(n: i + 1)
                            Text(linkified(step)).font(.bodyLarge)
                        }
                    }
                }
                .padding(18)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.brandTint.opacity(0.5))
            }
        }
        .background(Color.surface)
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous).strokeBorder(isOpen ? Color.brand : Color.line, lineWidth: 2))
    }
}

/// Makes the well-known official sites and the AARP helpline tappable (never anything from a message).
func linkified(_ text: String) -> AttributedString {
    var out = AttributedString(text)
    let targets: [(String, String)] = [
        ("ReportFraud.ftc.gov", "https://reportfraud.ftc.gov"),
        ("ReportaFraude.ftc.gov", "https://reportafraude.ftc.gov"),
        ("IdentityTheft.gov", "https://identitytheft.gov"),
        ("ic3.gov", "https://ic3.gov"),
        ("877-908-3360", "tel:+18779083360"),
    ]
    for (label, url) in targets {
        var search = out.startIndex..<out.endIndex
        while let range = out[search].range(of: label) {
            out[range].link = URL(string: url)
            out[range].foregroundColor = .brandStrong
            out[range].underlineStyle = .single
            out[range].font = .ui(.title3, weight: .semibold)
            search = range.upperBound..<out.endIndex
        }
    }
    return out
}
