import Foundation

/// All interface text, exported from the web app by `npm run ios:content` into Resources/content.json.
/// Only the parts the iOS app uses are declared; extra keys in the JSON are ignored.
nonisolated struct AppContent: Decodable {
    let languages: [String]
    let languageLabels: [String: String]
    let languageTags: [String: String]
    let helpTopics: [String]
    let scamSlugs: [String]
    let limits: Limits
    let strings: [String: UIStrings]
    let site: [String: SiteStrings]
    let features: [String: FeatureStrings]
    let guides: [String: [String: Guide]]
    let practice: [String: [PracticeItem]]

    nonisolated struct Limits: Decodable {
        let maxTextChars: Int
        let maxFollowups: Int
        let maxQuestionChars: Int
    }

    static let shared: AppContent = {
        guard let url = Bundle.main.url(forResource: "content", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let content = try? JSONDecoder().decode(AppContent.self, from: data)
        else { fatalError("content.json is missing or invalid. Run `npm run ios:content`.") }
        return content
    }()
}

nonisolated struct TitleSub: Decodable { let title: String; let sub: String }
nonisolated struct LabelTip: Decodable { let label: String; let tip: String }
nonisolated struct HelpTopicText: Decodable { let label: String; let steps: [String] }

nonisolated struct UIStrings: Decodable {
    nonisolated struct Tabs: Decodable { let text: String; let image: String; let call: String }
    nonisolated struct Errors: Decodable {
        let empty, tooLong, imageMissing, imageBad, unreadable, busy, failed, offline: String
    }

    let languageLabel: String
    let tabs: Tabs
    let textLabel: String
    let textPlaceholder: String
    let callLabel: String
    let callPlaceholder: String
    let imageChoose: String
    let imageChange: String
    let imageHint: String
    let imageAlt: String
    let checkButton: String
    let privacy: String
    let errors: Errors
    let verdicts: [String: TitleSub]
    let summaryLabel: String
    let messageHeading: String
    let signsHeading: String
    let noSignsNote: String
    let signs: [String: LabelTip]
    let stepsHeading: String
    let steps: [String: [String]]
    let trustedStep: String
    let shareButton: String
    let shareIntro: String
    let shareSigns: String
    let shareCheckedWith: String
    let clickedButton: String
    let againButton: String
    let backButton: String
    let helpTitle: String
    let helpIntro: String
    let helpQuestion: String
    let helpTopics: [String: HelpTopicText]
    let reportHeading: String
    let reportSteps: [String]
    let footer: String

    func verdict(_ v: Verdict) -> TitleSub { verdicts[v.rawValue] ?? TitleSub(title: v.rawValue, sub: "") }
    func sign(_ s: String) -> LabelTip { signs[s] ?? LabelTip(label: s, tip: "") }
    func steps(for v: Verdict) -> [String] { steps[v.rawValue] ?? [] }
}

nonisolated struct SiteStrings: Decodable {
    nonisolated struct Nav: Decodable { let check, learn, practice, help, about: String }
    nonisolated struct Home: Decodable { let eyebrow, heroBefore, heroEmph, heroAfter, helpTitle, helpBody, helpCta: String }
    nonisolated struct Learn: Decodable {
        let eyebrow, title, intro, exampleLabel, howLabel, signsLabel, todoLabel, checkCta, practiceCta, allTypes, next: String
    }
    nonisolated struct Practice: Decodable {
        let eyebrow, title, intro, start, progress, fromLabel, scamButton, realButton, correct, wrong: String
        let answerScam, answerReal, cluesLabel, next, finish, scoreTitle, scoreHigh, scoreLow, again, checkReal: String
    }
    nonisolated struct About: Decodable {
        nonisolated struct Section: Decodable { let title: String; let body: [String] }
        let eyebrow, title, intro: String
        let sections: [Section]
    }

    let nav: Nav
    let home: Home
    let checkingSteps: [String]
    let learn: Learn
    let practice: Practice
    let about: About
}

nonisolated struct FeatureStrings: Decodable {
    nonisolated struct Form: Decodable { let paste, clear, pasteFailed, imageDrop, cancel: String }
    nonisolated struct Speech: Decodable { let readAloud, stop, speak, listening, privacy: String }
    nonisolated struct Followup: Decodable { let title, intro, placeholder, ask, thinking, stepsLabel, limit, error, you: String }
    nonisolated struct Trusted: Decodable {
        let title, intro, bankName, bankNamePh, bankPhone, bankHint, familyName, familyNamePh, familyPhone: String
        let save, saved, clear, add, edit, callBank, textFamily, textBody, homeTitle, homeBody: String
    }

    nonisolated struct Workshop: Decodable {
        let navLabel, eyebrow, title, intro, presentTitle, presentBody, presentCta: String
        let handoutTitle, handoutBody, handoutCta, tipsTitle: String
        let tips: [String]
        let reveal, next, prev, exit, keys, print, handoutHeading, handoutCardTitle: String
        let handoutCardLines: [String]
        let handoutRule, handoutCheck: String
    }

    nonisolated struct Link: Decodable { let lookalike, shortener: String }
    nonisolated struct Offline: Decodable { let note: String }

    let form: Form
    let speech: Speech
    let workshop: Workshop
    let link: Link
    let offline: Offline
    let followup: Followup
    let trusted: Trusted
}

nonisolated struct Guide: Decodable {
    nonisolated struct Example: Decodable { let from: String; let text: String }
    let title: String
    let short: String
    let example: Example
    let how: String
    let signs: [String]
    let todo: [String]
}

nonisolated struct PracticeItem: Decodable {
    let from: String
    let text: String
    let scam: Bool
    let clues: [String]
}

/// Replaces `{name}` placeholders, like the web app's `fill()`.
nonisolated func fill(_ template: String, _ values: [String: CustomStringConvertible]) -> String {
    values.reduce(template) { $0.replacingOccurrences(of: "{\($1.key)}", with: $1.value.description) }
}
