import SwiftUI

/// The person's own trusted numbers, kept only on this phone (UserDefaults). Never sent anywhere.
@Observable
final class TrustedStore {
    static let shared = TrustedStore()
    private static let key = "scamshield-trusted"

    struct Numbers: Codable, Equatable {
        var bankName = ""
        var bankPhone = ""
        var familyName = ""
        var familyPhone = ""
        var isEmpty: Bool { [bankName, bankPhone, familyName, familyPhone].allSatisfy { $0.trimmingCharacters(in: .whitespaces).isEmpty } }
    }

    private(set) var numbers = Numbers()

    init() {
        if let data = UserDefaults.standard.data(forKey: Self.key),
           let saved = try? JSONDecoder().decode(Numbers.self, from: data) {
            numbers = saved
        }
    }

    func save(_ n: Numbers?) {
        numbers = n ?? Numbers()
        if let n, let data = try? JSONEncoder().encode(n) {
            UserDefaults.standard.set(data, forKey: Self.key)
        } else {
            UserDefaults.standard.removeObject(forKey: Self.key)
        }
    }

    /// Digits only (keeping a leading +), for tel: and sms: links. Empty if too short to dial.
    static func dialable(_ phone: String) -> String {
        let trimmed = phone.trimmingCharacters(in: .whitespaces)
        let digits = (trimmed.hasPrefix("+") ? "+" : "") + trimmed.filter(\.isNumber)
        return digits.count > 2 ? digits : ""
    }
}

/// "My trusted numbers": the bank's real number and someone to call or text before acting.
struct TrustedView: View {
    @Environment(AppSettings.self) private var settings
    @State private var draft = TrustedStore.shared.numbers
    @State private var savedNote = false
    @FocusState private var typing: Bool

    var body: some View {
        let f = settings.f.trusted
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                PageHeader(eyebrow: f.title, title: f.title, intro: f.intro)

                VStack(alignment: .leading, spacing: 18) {
                    group(f.bankName, symbol: "building.columns", tint: .brandSoft) {
                        field(f.bankName, text: $draft.bankName, placeholder: f.bankNamePh)
                        Text(f.bankPhone).font(.bodyStrong)
                        field(f.bankPhone, text: $draft.bankPhone, placeholder: "", phone: true)
                        Text(f.bankHint).font(.ui(.body)).foregroundStyle(Color.inkSoft)
                    }
                    Divider().overlay(Color.line)
                    group(f.familyName, symbol: "person.2", tint: .clay) {
                        field(f.familyName, text: $draft.familyName, placeholder: f.familyNamePh)
                        Text(f.familyPhone).font(.bodyStrong)
                        field(f.familyPhone, text: $draft.familyPhone, placeholder: "", phone: true)
                    }

                    Button(f.save) {
                        TrustedStore.shared.save(draft)
                        savedNote = true
                        typing = false
                    }
                    .buttonStyle(BigButtonStyle())

                    if savedNote {
                        Label(f.saved, systemImage: "lock")
                            .font(.bodyStrong)
                            .foregroundStyle(Color.brandStrong)
                            .frame(maxWidth: .infinity)
                    }
                    if !TrustedStore.shared.numbers.isEmpty {
                        Button(f.clear) {
                            TrustedStore.shared.save(nil)
                            draft = .init()
                            savedNote = false
                        }
                        .font(.ui(.body, weight: .semibold))
                        .underline()
                        .foregroundStyle(Color.inkSoft)
                        .frame(maxWidth: .infinity, minHeight: 48)
                    }
                }
                .padding(20)
                .background(Color.surface, in: RoundedRectangle(cornerRadius: 28, style: .continuous))
                .shadow(color: Color.ink.opacity(0.1), radius: 16, y: 8)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 16)
        }
        .scrollDismissesKeyboard(.interactively)
        .background(Color.bg)
        .navigationBarTitleDisplayMode(.inline)
        .onChange(of: draft) { savedNote = false }
    }

    private func group(_ title: String, symbol: String, tint: Color, @ViewBuilder content: () -> some View) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Label {
                Text(title).font(.ui(.title3, weight: .bold))
            } icon: {
                Image(systemName: symbol)
                    .frame(width: 44, height: 44)
                    .background(tint, in: RoundedRectangle(cornerRadius: 12))
            }
            content()
        }
    }

    private func field(_ label: String, text: Binding<String>, placeholder: String, phone: Bool = false) -> some View {
        TextField(placeholder, text: text)
            .font(.bodyLarge)
            .keyboardType(phone ? .phonePad : .default)
            .textContentType(phone ? .telephoneNumber : nil)
            .autocorrectionDisabled()
            .focused($typing)
            .padding(.horizontal, 16)
            .frame(minHeight: 56)
            .background(Color.bg.opacity(0.6), in: RoundedRectangle(cornerRadius: 16))
            .overlay(RoundedRectangle(cornerRadius: 16).strokeBorder(Color.line, lineWidth: 2))
            .accessibilityLabel(label)
    }
}

/// "How ScamShield works": what it does, its limits and the privacy promise.
struct AboutView: View {
    @Environment(AppSettings.self) private var settings
    private let icons = ["magnifyingglass", "book", "lock", "person.2"]

    var body: some View {
        let a = settings.site.about
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                PageHeader(eyebrow: a.eyebrow, title: a.title, intro: a.intro)
                ForEach(Array(a.sections.enumerated()), id: \.offset) { i, s in
                    VStack(alignment: .leading, spacing: 12) {
                        HStack(spacing: 14) {
                            Image(systemName: icons[i % icons.count])
                                .font(.system(size: 22))
                                .foregroundStyle(Color.brandStrong)
                                .frame(width: 48, height: 48)
                                .background(Color.brandSoft, in: RoundedRectangle(cornerRadius: 14))
                                .accessibilityHidden(true)
                            Text(s.title).font(.subheading).accessibilityAddTraits(.isHeader)
                        }
                        ForEach(s.body, id: \.self) { p in
                            Text(p).font(.bodyLarge).foregroundStyle(Color.inkSoft)
                        }
                    }
                    .padding(20)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.surface, in: RoundedRectangle(cornerRadius: 24, style: .continuous))
                    .shadow(color: Color.ink.opacity(0.07), radius: 10, y: 4)
                }
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 16)
        }
        .background(Color.bg)
        .navigationBarTitleDisplayMode(.inline)
    }
}
