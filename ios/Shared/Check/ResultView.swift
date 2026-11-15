import SwiftUI

/// The result: verdict banner first, then what to do, the message with highlights, and the signs.
struct ResultView: View {
    let result: CheckResult
    let onAgain: () -> Void
    let onClicked: () -> Void

    @Environment(AppSettings.self) private var settings

    var body: some View {
        let t = settings.t
        let verdict = t.verdict(result.verdict)

        VStack(alignment: .leading, spacing: 28) {
            // Verdict first
            HStack(alignment: .top, spacing: 16) {
                Image(systemName: result.verdict.symbol)
                    .font(.system(size: 34, weight: .semibold))
                    .frame(width: 64, height: 64)
                    .background(result.verdict.foreground.opacity(0.15), in: RoundedRectangle(cornerRadius: 18))
                    .accessibilityHidden(true)
                VStack(alignment: .leading, spacing: 8) {
                    Text(verdict.title).font(.display).accessibilityAddTraits(.isHeader)
                    Text(verdict.sub).font(.bodyStrong)
                    ReadAloudButton(text: spoken, onDark: result.verdict == .likelyScam)
                        .padding(.top, 6)
                }
            }
            .foregroundStyle(result.verdict.foreground)
            .padding(22)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(result.verdict.background, in: RoundedRectangle(cornerRadius: 28, style: .continuous))
            .accessibilityElement(children: .contain)

            if result.onDevice {
                Label(settings.f.offline.note, systemImage: "iphone")
                    .font(.ui(.body))
                    .foregroundStyle(Color.inkSoft)
                    .padding(14)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.panel, in: RoundedRectangle(cornerRadius: 16))
            }

            if !result.summary.isEmpty {
                Card {
                    (Text(t.summaryLabel).bold() + Text(" ") + Text(result.summary)).font(.bodyLarge)
                }
            }

            // What to do now, with the trusted-contact step always included.
            section(t.stepsHeading) {
                VStack(spacing: 12) {
                    ForEach(Array(steps.enumerated()), id: \.offset) { i, step in
                        let trusted = step == t.trustedStep
                        HStack(alignment: .top, spacing: 14) {
                            NumberBadge(n: i + 1, fill: trusted ? .brand : .panel, text: trusted ? .white : .ink)
                            VStack(alignment: .leading, spacing: 12) {
                                Text(step)
                                    .font(trusted ? .bodyStrong : .bodyLarge)
                                    .foregroundStyle(trusted ? Color.brandStrong : Color.ink)
                                if trusted { trustedAction }
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        .padding(16)
                        .background(trusted ? Color.brandTint : Color.surface, in: RoundedRectangle(cornerRadius: 18))
                    }
                }
                Button(action: onClicked) {
                    Label(t.clickedButton, systemImage: "lifepreserver")
                }
                .buttonStyle(BigButtonStyle(kind: .secondary))
                .padding(.top, 4)
            }

            section(t.messageHeading) {
                Card {
                    Text(highlightedMessage)
                        .font(.bodyLarge)
                        .lineSpacing(8)
                        .textSelection(.enabled)
                }
            }

            section(t.signsHeading) {
                if result.signs.isEmpty {
                    Card { Text(t.noSignsNote).font(.bodyLarge).foregroundStyle(Color.inkSoft) }
                } else {
                    VStack(spacing: 12) {
                        ForEach(Array(result.signs.enumerated()), id: \.offset) { i, sign in
                            SignCard(n: i + 1, sign: sign, info: t.sign(sign.type), stripe: result.verdict.underline)
                        }
                    }
                }
            }

            FollowUpView(result: result)

            VStack(spacing: 12) {
                Button(action: onAgain) {
                    Label(t.againButton, systemImage: "arrow.counterclockwise")
                }
                .buttonStyle(BigButtonStyle())
                if let familyURL {
                    Link(destination: familyURL) {
                        Label(fill(settings.f.trusted.textFamily, ["name": nonEmpty(mine.familyName, settings.f.trusted.familyName)]), systemImage: "person.2")
                    }
                    .buttonStyle(BigButtonStyle(kind: .soft))
                }
                ShareLink(item: shareText) {
                    Label(t.shareButton, systemImage: "square.and.arrow.up")
                }
                .buttonStyle(BigButtonStyle(kind: .secondary))
            }
        }
    }

    private var mine: TrustedStore.Numbers { TrustedStore.shared.numbers }

    /// Under the "contact them using a number you trust" step: call the saved bank, or add one.
    @ViewBuilder private var trustedAction: some View {
        let f = settings.f.trusted
        let bank = TrustedStore.dialable(mine.bankPhone)
        if !bank.isEmpty, let url = URL(string: "tel:\(bank)") {
            Link(destination: url) {
                Label(fill(f.callBank, ["name": nonEmpty(mine.bankName, f.bankName)]), systemImage: "phone.fill")
                    .font(.ui(.title3, weight: .bold))
                    .foregroundStyle(.white)
                    .padding(.horizontal, 18)
                    .frame(minHeight: 52)
                    .background(Color.brand, in: RoundedRectangle(cornerRadius: 14))
            }
        } else {
            NavigationLink { TrustedView() } label: {
                Label(f.add, systemImage: "building.columns")
                    .font(.ui(.body, weight: .semibold))
                    .underline()
                    .foregroundStyle(Color.brandStrong)
                    .frame(minHeight: 48)
            }
        }
    }

    /// A text to the trusted family member with the verdict and the start of the message.
    private var familyURL: URL? {
        let phone = TrustedStore.dialable(mine.familyPhone)
        guard !phone.isEmpty else { return nil }
        let body = fill(settings.f.trusted.textBody, ["verdict": settings.t.verdict(result.verdict).title]) + "\n\n" + String(result.message.prefix(400))
        let encoded = body.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
        return URL(string: "sms:\(phone)&body=\(encoded)")
    }

    private func nonEmpty(_ s: String, _ fallback: String) -> String {
        let t = s.trimmingCharacters(in: .whitespaces)
        return t.isEmpty ? fallback : t
    }

    private var steps: [String] {
        var s = settings.t.steps(for: result.verdict)
        s.insert(settings.t.trustedStep, at: result.verdict == .noSigns ? 0 : min(1, s.count))
        return s
    }

    /// What "Read aloud" says: the verdict, the summary and the steps.
    private var spoken: String {
        let t = settings.t
        let v = t.verdict(result.verdict)
        return (["\(v.title).", v.sub, result.summary, "\(t.stepsHeading):"] + steps).joined(separator: " ")
    }

    private var shareText: String {
        let t = settings.t
        let v = t.verdict(result.verdict)
        return [
            t.shareIntro,
            "\(v.title). \(v.sub)",
            result.summary,
            result.signs.isEmpty ? "" : "\(t.shareSigns) \(result.signs.map { t.sign($0.type).label }.joined(separator: ", "))",
            "\(t.shareCheckedWith) \(Server.base.absoluteString)",
        ].filter { !$0.isEmpty }.joined(separator: "\n")
    }

    /// The message with each warning sign's words highlighted and numbered like the cards.
    private var highlightedMessage: AttributedString {
        let message = result.message
        let ranges = result.signs.enumerated()
            .compactMap { i, s -> (start: Int, end: Int, n: Int)? in
                guard let a = s.start, let b = s.end, a >= 0, b <= message.utf16.count, a < b else { return nil }
                return (a, b, i + 1)
            }
            .sorted { $0.start < $1.start }

        var out = AttributedString()
        var pos = 0
        for r in ranges where r.start >= pos {
            out += AttributedString(slice(message, pos, r.start))
            var number = AttributedString("\(r.n)")
            number.font = .ui(.footnote, weight: .bold)
            number.baselineOffset = 8
            out += number
            var mark = AttributedString(slice(message, r.start, r.end))
            mark.backgroundColor = result.verdict.highlight
            mark.underlineStyle = .single
            mark.underlineColor = UIColor(result.verdict.underline)
            out += mark
            pos = r.end
        }
        out += AttributedString(slice(message, pos, message.utf16.count))
        return out
    }

    /// Slices by UTF-16 offsets, which is how the server counts positions.
    private func slice(_ s: String, _ from: Int, _ to: Int) -> String {
        let a = String.Index(utf16Offset: from, in: s)
        let b = String.Index(utf16Offset: to, in: s)
        return String(s[a..<b])
    }

    private func section(_ title: String, @ViewBuilder content: () -> some View) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            Text(title).font(.heading).accessibilityAddTraits(.isHeader)
            content()
        }
    }
}

private struct SignCard: View {
    let n: Int
    let sign: Sign
    let info: LabelTip
    let stripe: Color

    var body: some View {
        HStack(alignment: .top, spacing: 14) {
            NumberBadge(n: n, fill: .ink)
            VStack(alignment: .leading, spacing: 8) {
                Text(info.label).font(.ui(.title3, weight: .bold))
                Text("“\(sign.quote)”").font(.bodyLarge).italic().foregroundStyle(Color.inkSoft)
                if !sign.explanation.isEmpty {
                    Text(sign.explanation).font(.bodyLarge)
                }
                Text(info.tip)
                    .font(.bodyStrong)
                    .padding(12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.panel, in: RoundedRectangle(cornerRadius: 14))
            }
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.surface)
        .overlay(alignment: .leading) { Rectangle().fill(stripe).frame(width: 6) }
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .shadow(color: Color.ink.opacity(0.08), radius: 10, y: 4)
        .accessibilityElement(children: .combine)
    }
}
