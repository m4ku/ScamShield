import Foundation

/// Where checks run. Today: the ScamShield server (the same API the website uses, so the
/// Gemini key never ships in the app). Later: Apple's on-device model when offline (iOS 26+).
enum Server {
    #if DEBUG
    /// Set SCAMSHIELD_API in the Xcode scheme to test against a local `npm run dev`.
    static let base = URL(string: ProcessInfo.processInfo.environment["SCAMSHIELD_API"] ?? "https://checkscamshield.vercel.app")!
    #else
    static let base = URL(string: "https://checkscamshield.vercel.app")!
    #endif
}

struct CheckService {
    var session: URLSession = .shared

    /// Runs one check. Nothing is stored or logged on the phone.
    func check(_ input: CheckInput, language: String) async throws(CheckErrorCode) -> CheckResult {
        var body: [String: Any] = ["mode": input.mode.rawValue, "language": language]
        switch input {
        case .text(let text), .call(let text): body["text"] = text
        case .image(let base64, _): body["image"] = ["mimeType": "image/jpeg", "base64": base64]
        }
        return try await post("api/check", body: body)
    }

    /// Answers one follow-up question about a checked message. The verdict can't change.
    func followup(
        question: String,
        history: [FollowupItem],
        result: CheckResult,
        language: String
    ) async throws(CheckErrorCode) -> FollowupAnswer {
        let body: [String: Any] = [
            "language": language,
            "question": String(question.prefix(AppContent.shared.limits.maxQuestionChars)),
            "history": history.map { ["q": $0.question, "a": ([$0.answer.answer] + $0.answer.steps).joined(separator: " ")] },
            "check": [
                "verdict": result.verdict.rawValue,
                "message": result.message,
                "summary": result.summary,
                "signs": result.signs.map { ["type": $0.type, "quote": $0.quote] },
            ],
        ]
        return try await post("api/followup", body: body)
    }

    private func post<T: Decodable>(_ path: String, body: [String: Any]) async throws(CheckErrorCode) -> T {
        var request = URLRequest(url: Server.base.appending(path: path))
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.timeoutInterval = 45
        request.cachePolicy = .reloadIgnoringLocalCacheData

        let data: Data
        let response: URLResponse
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: body)
            (data, response) = try await session.data(for: request)
        } catch is CancellationError {
            throw .offline
        } catch {
            throw .offline
        }

        let status = (response as? HTTPURLResponse)?.statusCode ?? 0
        guard (200..<300).contains(status) else {
            let code = (try? JSONDecoder().decode([String: String].self, from: data))?["error"]
            throw CheckErrorCode(rawValue: code ?? "") ?? .failed
        }
        do {
            return try JSONDecoder().decode(T.self, from: data)
        } catch {
            throw .failed
        }
    }
}
