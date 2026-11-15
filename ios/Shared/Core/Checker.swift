import Foundation

/// Picks where a check runs.
/// - Online (or on phones without Apple's on-device model): the ScamShield server, same as the website.
/// - Offline, on iOS 26+ phones with Apple Intelligence that support the language: the on-device model.
/// If the server can't be reached mid-check, it falls back to the phone when it can.
@MainActor
final class Checker {
    static let shared = Checker()

    private let server = CheckService()

    private func useOnDevice(_ language: String) -> Bool {
        guard OnDevice.isReady(language: language) else { return false }
        #if DEBUG
        if ProcessInfo.processInfo.environment["SCAMSHIELD_FORCE_ON_DEVICE"] == "1" { return true }
        #endif
        return !Connectivity.shared.isOnline
    }

    func check(_ input: CheckInput, language: String) async throws(CheckErrorCode) -> CheckResult {
        if useOnDevice(language) { return try await OnDevice.check(input, language: language) }
        do {
            return try await server.check(input, language: language)
        } catch .offline where OnDevice.isReady(language: language) {
            return try await OnDevice.check(input, language: language)
        }
    }

    func followup(question: String, history: [FollowupItem], result: CheckResult, language: String) async throws(CheckErrorCode) -> FollowupAnswer {
        if useOnDevice(language) { return try await OnDevice.followup(question: question, history: history, result: result, language: language) }
        do {
            return try await server.followup(question: question, history: history, result: result, language: language)
        } catch .offline where OnDevice.isReady(language: language) {
            return try await OnDevice.followup(question: question, history: history, result: result, language: language)
        }
    }
}
