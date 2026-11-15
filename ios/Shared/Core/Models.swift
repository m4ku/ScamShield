import Foundation

nonisolated enum Verdict: String, Decodable {
    case likelyScam = "likely_scam"
    case careful
    case noSigns = "no_signs"
}

nonisolated enum InputMode: String, CaseIterable, Identifiable {
    case text, image, call
    var id: String { rawValue }
}

/// One warning sign. `start`/`end` are UTF-16 offsets into the message (the web app's string indices).
nonisolated struct Sign: Decodable, Identifiable {
    let type: String
    let quote: String
    let explanation: String
    let start: Int?
    let end: Int?
    var id: String { "\(type)-\(start ?? -1)" }
}

/// The server's reply from POST /api/check (see lib/schema.ts).
nonisolated struct CheckResult: Decodable {
    let verdict: Verdict
    let message: String
    let signs: [Sign]
    let asksForMoneyOrInfo: Bool
    let summary: String
    /// True when the check ran on this phone without the internet.
    var onDevice = false

    enum CodingKeys: String, CodingKey { case verdict, message, signs, asksForMoneyOrInfo, summary }
}

/// What the person asked us to check.
nonisolated enum CheckInput {
    case text(String)
    case call(String)
    case image(jpegBase64: String, preview: Data)

    var mode: InputMode {
        switch self {
        case .text: .text
        case .call: .call
        case .image: .image
        }
    }
}

/// Error codes shared with the web app, plus "offline" for network failures.
nonisolated enum CheckErrorCode: String, Error {
    case badInput = "bad_input"
    case unreadable
    case busy
    case failed
    case offline
}

/// One follow-up answer: 1–3 sentences plus up to 6 steps.
nonisolated struct FollowupAnswer: Decodable {
    let answer: String
    let steps: [String]
}

nonisolated struct FollowupItem: Identifiable {
    let id = UUID()
    let question: String
    let answer: FollowupAnswer
}
