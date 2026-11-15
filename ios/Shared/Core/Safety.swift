import Foundation

/// Swift copies of the website's safety rules (lib/verdict.ts, lib/links.ts, lib/followup.ts).
/// They run on every on-device result, so the same rules decide what people see whichever AI is used.
/// Positions are UTF-16 offsets, like JavaScript string indices, so results match the server's.
nonisolated enum Safety {
    // MARK: Verdict (lib/verdict.ts)

    static let criticalSigns: Set<String> = ["unusual_payment", "threat", "secrets", "remote_access"]
    static let signTypes: [String] = [
        "urgency", "threat", "unusual_payment", "secrets", "suspicious_link", "impersonation",
        "too_good", "secrecy", "remote_access", "mismatch", "unexpected_contact",
    ]

    /// Likely scam: 2+ sign types or any critical sign. Be careful: 1 sign, or it asks for money or details.
    static func verdict(signTypes types: [String], asksForMoneyOrInfo: Bool) -> Verdict {
        let set = Set(types)
        if set.count >= 2 || !set.isDisjoint(with: criticalSigns) { return .likelyScam }
        if set.count == 1 || asksForMoneyOrInfo { return .careful }
        return .noSigns
    }

    private static let charMap: [UInt16: UInt16] = [
        0x2018: 0x27, 0x2019: 0x27, // ‘ ’ → '
        0x201C: 0x22, 0x201D: 0x22, // “ ” → "
        0x2013: 0x2D, 0x2014: 0x2D, // – — → -
        0x00A0: 0x20, // no-break space
    ]

    /// Lowercases, unifies look-alike characters and collapses whitespace, keeping a map back to the original.
    static func normalizeWithMap(_ text: String) -> (norm: [UInt16], map: [Int]) {
        var norm: [UInt16] = []
        var map: [Int] = []
        var lastWasSpace = true
        for (i, raw) in text.utf16.enumerated() {
            var ch = charMap[raw] ?? raw
            if isSpace(ch) {
                if lastWasSpace { continue }
                ch = 0x20
                lastWasSpace = true
            } else {
                lastWasSpace = false
            }
            norm.append(lower(ch))
            map.append(i)
        }
        if norm.last == 0x20 {
            norm.removeLast()
            map.removeLast()
        }
        return (norm, map)
    }

    private static func isSpace(_ u: UInt16) -> Bool {
        guard let s = Unicode.Scalar(u) else { return false }
        return s.properties.isWhitespace
    }

    private static func lower(_ u: UInt16) -> UInt16 {
        guard let s = Unicode.Scalar(u) else { return u }
        let l = String(s).lowercased().utf16
        return l.count == 1 ? l.first! : u
    }

    private static let edgePunct = try! NSRegularExpression(pattern: #"^[\s"'“”‘’.,…:;!?()\[\]-]+|[\s"'“”‘’.,…:;!?()\[\]-]+$"#)

    static func stripEdgePunctuation(_ s: String) -> String {
        edgePunct.stringByReplacingMatches(in: s, range: NSRange(location: 0, length: (s as NSString).length), withTemplate: "")
    }

    struct RawSign {
        let type: String
        let quote: String
        let explanation: String
    }

    /// Drops any sign whose quote isn't really in the message, and records where kept quotes sit.
    static func verifySigns(message: String, signs: [RawSign]) -> [Sign] {
        let (hay, map) = normalizeWithMap(message)
        var kept: [Sign] = []
        var seen = Set<String>()
        for sign in signs where signTypes.contains(sign.type) {
            let needle = normalizeWithMap(stripEdgePunctuation(sign.quote)).norm
            guard needle.count >= 2, let at = firstIndex(of: needle, in: hay) else { continue }
            let key = "\(sign.type):\(at)"
            guard !seen.contains(key) else { continue }
            seen.insert(key)
            kept.append(Sign(
                type: sign.type,
                quote: sign.quote.trimmingCharacters(in: .whitespacesAndNewlines),
                explanation: sign.explanation.trimmingCharacters(in: .whitespacesAndNewlines),
                start: map[at],
                end: map[at + needle.count - 1] + 1
            ))
        }
        return kept
    }

    private static func firstIndex(of needle: [UInt16], in hay: [UInt16]) -> Int? {
        guard needle.count <= hay.count else { return nil }
        outer: for i in 0...(hay.count - needle.count) {
            for j in 0..<needle.count where hay[i + j] != needle[j] { continue outer }
            return i
        }
        return nil
    }

    // MARK: Links (lib/links.ts)

    struct Brand { let name: String; let tokens: [String]; let official: [String] }

    static let brands: [Brand] = [
        .init(name: "USPS", tokens: ["usps"], official: ["usps.com", "usps.gov"]),
        .init(name: "UPS", tokens: ["ups"], official: ["ups.com"]),
        .init(name: "FedEx", tokens: ["fedex"], official: ["fedex.com"]),
        .init(name: "DHL", tokens: ["dhl"], official: ["dhl.com"]),
        .init(name: "Amazon", tokens: ["amazon"], official: ["amazon.com", "amazon.co.uk", "amazon.ca", "amazon.in", "amazon.fr", "amazon.es"]),
        .init(name: "PayPal", tokens: ["paypal"], official: ["paypal.com", "paypal.me"]),
        .init(name: "Chase", tokens: ["chase"], official: ["chase.com", "jpmorganchase.com"]),
        .init(name: "Wells Fargo", tokens: ["wellsfargo"], official: ["wellsfargo.com"]),
        .init(name: "Bank of America", tokens: ["bankofamerica", "bofa"], official: ["bankofamerica.com"]),
        .init(name: "Citi", tokens: ["citibank"], official: ["citi.com", "citibank.com"]),
        .init(name: "IRS", tokens: ["irs"], official: ["irs.gov"]),
        .init(name: "Social Security", tokens: ["socialsecurity", "ssa"], official: ["ssa.gov"]),
        .init(name: "Medicare", tokens: ["medicare"], official: ["medicare.gov"]),
        .init(name: "USCIS", tokens: ["uscis"], official: ["uscis.gov"]),
        .init(name: "Apple", tokens: ["apple", "icloud"], official: ["apple.com", "icloud.com"]),
        .init(name: "Microsoft", tokens: ["microsoft", "outlook"], official: ["microsoft.com", "live.com", "outlook.com", "office.com"]),
        .init(name: "Netflix", tokens: ["netflix"], official: ["netflix.com"]),
        .init(name: "Walmart", tokens: ["walmart"], official: ["walmart.com"]),
        .init(name: "Costco", tokens: ["costco"], official: ["costco.com"]),
        .init(name: "E-ZPass", tokens: ["ezpass", "e-zpass"], official: ["e-zpassny.com", "ezpassnj.com", "ezpassva.com", "ezpassmd.com", "e-zpassiag.com", "ezpass.csc.paturnpike.com"]),
        .init(name: "Venmo", tokens: ["venmo"], official: ["venmo.com"]),
        .init(name: "Zelle", tokens: ["zelle"], official: ["zellepay.com"]),
        .init(name: "Coinbase", tokens: ["coinbase"], official: ["coinbase.com"]),
        .init(name: "Google", tokens: ["google", "gmail"], official: ["google.com", "gmail.com", "youtube.com"]),
        .init(name: "Facebook", tokens: ["facebook"], official: ["facebook.com", "fb.com"]),
        .init(name: "BBVA", tokens: ["bbva"], official: ["bbva.com", "bbva.es", "bbva.mx", "bbvausa.com"]),
        .init(name: "Vietcombank", tokens: ["vietcombank", "vcb"], official: ["vietcombank.com.vn"]),
        .init(name: "BDO", tokens: ["bdo"], official: ["bdo.com.ph"]),
        .init(name: "GCash", tokens: ["gcash"], official: ["gcash.com"]),
        .init(name: "SF Express", tokens: ["sf-express", "sfexpress"], official: ["sf-express.com"]),
    ]

    static let shorteners: Set<String> = [
        "bit.ly", "tinyurl.com", "goo.gl", "ow.ly", "is.gd", "rebrand.ly", "cutt.ly", "shorturl.at",
        "rb.gy", "t.ly", "tiny.cc", "s.id", "buff.ly", "v.gd", "bl.ink", "short.io", "lnkd.in",
    ]

    private static let urlRe = try! NSRegularExpression(
        pattern: #"(?<![@\w.-])((?:https?://)?(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,24}(?::\d+)?(?:/[^\s<>"')\]]*)?)"#,
        options: [.caseInsensitive]
    )
    private static let secondLevel = try! NSRegularExpression(pattern: #"\.(com|co|net|org|gov|edu)\.[a-z]{2}$"#)

    struct LinkFinding: Equatable { let text: String; let kind: String; let brand: String? }

    /// Link-like text (with or without https://). Email addresses are skipped.
    static func findLinks(_ message: String) -> [(text: String, host: String)] {
        let ns = message as NSString
        var out: [(String, String)] = []
        for m in urlRe.matches(in: message, range: NSRange(location: 0, length: ns.length)) {
            var text = ns.substring(with: m.range(at: 1))
            while let last = text.last, ".,;:!?".contains(last) { text.removeLast() }
            var host = text.replacingOccurrences(of: #"^https?://"#, with: "", options: [.regularExpression, .caseInsensitive])
            host = String(host.split(whereSeparator: { "/:?#".contains($0) }).first ?? "").lowercased()
            guard host.contains("."),
                  host.range(of: #"^\d+(\.\d+)+$"#, options: .regularExpression) == nil,
                  let tld = host.split(separator: ".").last, tld.contains(where: \.isLetter)
            else { continue }
            out.append((text, host))
        }
        return out
    }

    private static func registrable(_ host: String) -> String {
        let labels = host.split(separator: ".").map(String.init)
        let ns = host as NSString
        let isSecond = secondLevel.firstMatch(in: host, range: NSRange(location: 0, length: ns.length)) != nil
        return labels.suffix(isSecond ? 3 : 2).joined(separator: ".")
    }

    /// Undo common letter swaps so "paypa1" reads as "paypal" and "amaz0n" as "amazon".
    private static func unswap(_ s: String) -> String {
        var out = ""
        for c in s {
            switch c {
            case "0": out.append("o")
            case "1": out.append("l")
            case "3": out.append("e")
            case "4": out.append("a")
            case "5", "$": out.append("s")
            default: out.append(c)
            }
        }
        return out
    }

    static func checkLinks(_ message: String) -> [LinkFinding] {
        var findings: [LinkFinding] = []
        for (text, host) in findLinks(message) {
            let reg = registrable(host)
            if shorteners.contains(reg) || shorteners.contains(host) {
                findings.append(.init(text: text, kind: "shortener", brand: nil))
                continue
            }
            let flat = unswap(host.replacingOccurrences(of: "-", with: "").replacingOccurrences(of: ".", with: ""))
            let labels = host.split(separator: ".").map { unswap(String($0)) }
            for brand in brands {
                if brand.official.contains(where: { host == $0 || host.hasSuffix(".\($0)") }) { break }
                // Short tokens (ups, irs, ssa, bdo, vcb) only count as a whole label part.
                let hit = brand.tokens.contains { tok in
                    tok.count <= 4
                        ? labels.contains { $0.split(separator: "-").map(String.init).contains(tok) }
                        : flat.contains(unswap(tok.replacingOccurrences(of: "-", with: "")))
                }
                if hit {
                    findings.append(.init(text: text, kind: "lookalike", brand: brand.name))
                    break
                }
            }
        }
        return findings
    }

    /// Links and phone numbers in a message, so answers can avoid repeating them.
    static func contactsIn(_ message: String) -> [String] {
        let ns = message as NSString
        let phoneRe = try! NSRegularExpression(pattern: #"\+?\d[\d\s().-]{6,}\d"#)
        let phones = phoneRe.matches(in: message, range: NSRange(location: 0, length: ns.length))
            .map { ns.substring(with: $0.range).trimmingCharacters(in: .whitespaces) }
        return (findLinks(message).map(\.text) + phones).filter { $0.count >= 6 }
    }

    // MARK: Follow-up guards (lib/followup.ts)

    private static let saysSafe: [NSRegularExpression] = [
        #"\b(this|the|it)\s(message|text|email|call|letter)?\s?(is|looks|seems)\s(safe|legitimate|genuine|real|fine)\b"#,
        #"\b(es|parece)\s(seguro|legítimo|real)\b"#,
        #"(这条|该)(短信|信息|消息|邮件)(是|确实是)(安全|真|合法)的"#,
        #"(là an toàn|là thật|là hợp pháp)"#,
        #"(ligtas ito|totoo ito)"#,
        #"(यह|ये|वह)\s(संदेश|मैसेज)\s(पूरी तरह\s)?(सुरक्षित|असली)\sहै(?!\sया\sनहीं)"#,
        #"\b(est|semble)\s(sûr|fiable|légitime|authentique)\b"#,
    ].map { try! NSRegularExpression(pattern: $0, options: [.caseInsensitive]) }

    /// Words just before a match that make it a denial or a report, not a claim.
    private static let hedge = try! NSRegularExpression(
        pattern: #"\b(not|n't|never|no|cannot|mean|means|prove|proves|whether|if|confirm|sure|know|say|says|said|claim|claims|believe|think|pretend|pretends|seem to)\b|不能|无法|不|không|hindi|नहीं|ne\s|pas\b|no\s|sin\b"#,
        options: [.caseInsensitive]
    )

    static func callsItSafe(_ text: String) -> Bool {
        let ns = text as NSString
        for re in saysSafe {
            for m in re.matches(in: text, range: NSRange(location: 0, length: ns.length)) {
                let start = max(0, m.range.location - 40)
                let before = ns.substring(with: NSRange(location: start, length: m.range.location - start))
                if hedge.firstMatch(in: before, range: NSRange(location: 0, length: (before as NSString).length)) == nil {
                    return true
                }
            }
        }
        return false
    }

    /// Replaces any link or phone number from the scam message with •••.
    static func scrub(_ text: String, contacts: [String]) -> String {
        contacts.reduce(text) { $0.replacingOccurrences(of: $1, with: "•••") }
    }
}
