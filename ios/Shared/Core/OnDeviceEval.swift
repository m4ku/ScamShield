#if DEBUG
import Foundation

/// Debug-only: runs the website's AI test cases through the on-device model and writes the results,
/// so offline accuracy can be measured the same way as the server's. Never part of release builds.
///
///   SIMCTL_CHILD_SCAMSHIELD_EVAL_IN=cases.json SIMCTL_CHILD_SCAMSHIELD_EVAL_OUT=results.json xcrun simctl launch …
enum OnDeviceEval {
    struct Case: Decodable {
        let id: String
        let mode: String
        let language: String
        let text: String
    }

    static func runIfRequested() async {
        let env = ProcessInfo.processInfo.environment
        guard let inPath = env["SCAMSHIELD_EVAL_IN"], let outPath = env["SCAMSHIELD_EVAL_OUT"] else { return }
        guard let data = FileManager.default.contents(atPath: inPath),
              let cases = try? JSONDecoder().decode([Case].self, from: data)
        else {
            print("[eval] could not read \(inPath)")
            return
        }
        print("[eval] model: \(OnDevice.status), \(cases.count) cases")

        var results: [[String: Any]] = []
        for c in cases {
            let start = Date()
            var row: [String: Any] = ["id": c.id, "ready": OnDevice.isReady(language: c.language)]
            do {
                let input: CheckInput = c.mode == "call" ? .call(c.text) : .text(c.text)
                let result = try await OnDevice.check(input, language: c.language)
                row["verdict"] = result.verdict.rawValue
                row["signs"] = result.signs.map(\.type)
                row["summary"] = result.summary
            } catch {
                row["error"] = error.rawValue
                row["detail"] = String(OnDevice.lastError.prefix(300))
            }
            row["seconds"] = (Date().timeIntervalSince(start) * 10).rounded() / 10
            results.append(row)
            print("[eval] \(c.id) \(row["verdict"] ?? row["error"] ?? "?")")
            if let out = try? JSONSerialization.data(withJSONObject: results, options: [.prettyPrinted]) {
                FileManager.default.createFile(atPath: outPath, contents: out)
            }
        }
        print("[eval] done")
    }
}
#endif
