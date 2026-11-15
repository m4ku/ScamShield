import CoreText
import SwiftUI

/// ScamShield's colors, matching the web app's tokens in app/globals.css.
/// Red and amber are only for verdicts; nothing green means "safe".
nonisolated extension Color {
    static let bg = Color(hex: 0xFBF7F0)
    static let surface = Color.white
    static let panel = Color(hex: 0xF4EEE4)
    static let line = Color(hex: 0xE3DACB)
    static let lineStrong = Color(hex: 0xC9BDA9)
    static let ink = Color(hex: 0x1D2321)
    static let inkSoft = Color(hex: 0x4A514D)
    static let muted = Color(hex: 0x6C726E)

    static let brand = Color(hex: 0x0F5D57)
    static let brandStrong = Color(hex: 0x0A4440)
    static let brandSoft = Color(hex: 0xD5EAE4)
    static let brandTint = Color(hex: 0xECF5F2)
    static let clay = Color(hex: 0xEAD9C3)
    static let claySoft = Color(hex: 0xF6ECE0)

    static let danger = Color(hex: 0xB3261E)
    static let dangerSoft = Color(hex: 0xFBE3E1)
    static let caution = Color(hex: 0xF3BD47)
    static let cautionStrong = Color(hex: 0x8A5A00)
    static let cautionSoft = Color(hex: 0xFDF0CC)
    static let neutralVerdict = Color(hex: 0xE9E6E0)

    init(hex: UInt32) {
        self.init(
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255
        )
    }
}

/// The website's brand fonts: Fraunces for headings, Lexend for text (both SIL Open Font License,
/// the Latin files from the website build). Used for languages they cover; others use the iPhone's fonts,
/// so a word is never drawn in two fonts.
nonisolated enum BrandFonts {
    nonisolated(unsafe) static var active = false

    private static let registered: Void = {
        for name in ["Fraunces", "Lexend"] {
            if let url = Bundle.main.url(forResource: name, withExtension: "woff2") {
                CTFontManagerRegisterFontsForURL(url as CFURL, .process, nil)
            }
        }
    }()

    static func use(for language: String) {
        _ = registered
        active = ["en", "es", "fr", "tl"].contains(language)
    }
}

/// Large, Dynamic Type–friendly type. Body text starts at 20pt, verdicts at 34pt.
nonisolated extension Font {
    static func ui(_ style: Font.TextStyle, weight: Font.Weight = .regular) -> Font {
        BrandFonts.active ? .custom("Lexend", size: style.pointSize, relativeTo: style).weight(weight) : .system(style, weight: weight)
    }

    static func serif(_ style: Font.TextStyle, weight: Font.Weight = .semibold) -> Font {
        BrandFonts.active ? .custom("Fraunces", size: style.pointSize, relativeTo: style).weight(weight) : .system(style, design: .serif, weight: weight)
    }

    static var display: Font { serif(.largeTitle) }
    static var heading: Font { serif(.title) }
    static var subheading: Font { serif(.title2) }
    static var bodyLarge: Font { ui(.title3) }
    static var bodyStrong: Font { ui(.title3, weight: .semibold) }
}

nonisolated extension Font.TextStyle {
    /// Default (Large) Dynamic Type sizes, so custom fonts start at the same size as system ones.
    var pointSize: CGFloat {
        switch self {
        case .largeTitle: 34
        case .title: 28
        case .title2: 22
        case .title3: 20
        case .headline, .body: 17
        case .callout: 16
        case .subheadline: 15
        case .footnote: 13
        case .caption: 12
        case .caption2: 11
        default: 17
        }
    }
}

nonisolated extension Verdict {
    var background: Color {
        switch self {
        case .likelyScam: .danger
        case .careful: .caution
        case .noSigns: .neutralVerdict
        }
    }

    var foreground: Color { self == .likelyScam ? .white : .ink }
    var highlight: Color {
        switch self {
        case .likelyScam: .dangerSoft
        case .careful: .cautionSoft
        case .noSigns: .panel
        }
    }

    var underline: Color {
        switch self {
        case .likelyScam: .danger
        case .careful: .cautionStrong
        case .noSigns: .lineStrong
        }
    }

    var symbol: String {
        switch self {
        case .likelyScam: "exclamationmark.octagon"
        case .careful: "exclamationmark.triangle"
        case .noSigns: "info.circle"
        }
    }
}

/// A big full-width button, at least 56pt tall.
struct BigButtonStyle: ButtonStyle {
    enum Kind { case primary, secondary, soft }
    var kind: Kind = .primary

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(kind == .primary ? .system(.title3, weight: .bold) : .system(.title3, weight: .semibold))
            .frame(maxWidth: .infinity, minHeight: 56)
            .padding(.horizontal, 20)
            .foregroundStyle(kind == .primary ? Color.white : kind == .soft ? Color.brandStrong : Color.ink)
            .background(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .fill(kind == .primary ? Color.brand : kind == .soft ? Color.brandTint : Color.surface)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .strokeBorder(kind == .primary ? .clear : kind == .soft ? Color.brand : Color.ink.opacity(0.8), lineWidth: 2)
            )
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
            .animation(.easeOut(duration: 0.15), value: configuration.isPressed)
    }
}

/// A white rounded card.
struct Card<Content: View>: View {
    var padding: CGFloat = 18
    @ViewBuilder var content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 10) { content }
            .padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color.surface, in: RoundedRectangle(cornerRadius: 22, style: .continuous))
            .shadow(color: Color.ink.opacity(0.08), radius: 12, y: 6)
    }
}

/// A round numbered badge used in step lists.
struct NumberBadge: View {
    let n: Int
    var fill: Color = .brand
    var text: Color = .white

    var body: some View {
        Text("\(n)")
            .font(.system(.body, weight: .bold))
            .foregroundStyle(text)
            .frame(width: 34, height: 34)
            .background(fill, in: Circle())
            .accessibilityHidden(true)
    }
}
