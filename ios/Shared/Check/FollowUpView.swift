import SwiftUI

/// Follow-up questions about a checked message: plain question-and-answer cards
/// (no chat bubbles, no typing animation). The verdict can't be changed here, and
/// answers are checked on the server. Nothing is saved: it all disappears with the result.
struct FollowUpView: View {
    let result: CheckResult

    @Environment(AppSettings.self) private var settings
    @State private var items: [FollowupItem] = []
    @State private var question = ""
    @State private var pending: String?
    @State private var error: String?
    @FocusState private var focused: Bool

    var body: some View {
        let fu = settings.f.followup
        let done = items.count >= AppContent.shared.limits.maxFollowups

        VStack(alignment: .leading, spacing: 18) {
            HStack(alignment: .top, spacing: 14) {
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 22, weight: .semibold))
                    .foregroundStyle(Color.brandStrong)
                    .frame(width: 48, height: 48)
                    .background(Color.brandSoft, in: RoundedRectangle(cornerRadius: 14))
                    .accessibilityHidden(true)
                VStack(alignment: .leading, spacing: 6) {
                    Text(fu.title).font(.subheading).accessibilityAddTraits(.isHeader)
                    Text(fu.intro).font(.ui(.body)).foregroundStyle(Color.inkSoft)
                }
            }

            ForEach(items) { item in answerCard(item, fu: fu) }

            if let pending {
                VStack(alignment: .leading, spacing: 8) {
                    Text(pending).font(.bodyStrong)
                    Text(fu.thinking).font(.ui(.body)).foregroundStyle(Color.inkSoft)
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .overlay(RoundedRectangle(cornerRadius: 16).strokeBorder(Color.lineStrong, style: StrokeStyle(lineWidth: 1.5, dash: [6, 5])))
                .accessibilityElement(children: .combine)
            }

            if let error {
                Text(error)
                    .font(.bodyStrong)
                    .padding(14)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.panel, in: RoundedRectangle(cornerRadius: 14))
            }

            if done {
                Text(fu.limit).font(.bodyLarge).padding(16)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.panel, in: RoundedRectangle(cornerRadius: 16))
            } else {
                VStack(alignment: .leading, spacing: 12) {
                    ZStack(alignment: .topLeading) {
                        if question.isEmpty {
                            Text(fu.placeholder).font(.bodyLarge).foregroundStyle(Color.muted)
                                .padding(.horizontal, 17).padding(.vertical, 18).allowsHitTesting(false)
                        }
                        TextEditor(text: $question)
                            .font(.bodyLarge)
                            .scrollContentBackground(.hidden)
                            .focused($focused)
                            .padding(10)
                            .accessibilityLabel(fu.placeholder)
                            .toolbar {
                                ToolbarItemGroup(placement: .keyboard) {
                                    Spacer()
                                    Button(action: ask) { Label(fu.ask, systemImage: "arrow.right").labelStyle(.titleAndIcon) }
                                        .font(.ui(.body, weight: .bold))
                                        .disabled(question.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || pending != nil)
                                }
                            }
                    }
                    .frame(minHeight: 96)
                    .background(Color.bg.opacity(0.6), in: RoundedRectangle(cornerRadius: 16))
                    .overlay(RoundedRectangle(cornerRadius: 16).strokeBorder(focused ? Color.brand : Color.line, lineWidth: 2))
                    .onChange(of: question) {
                        let max = AppContent.shared.limits.maxQuestionChars
                        if question.count > max { question = String(question.prefix(max)) }
                    }

                    HStack(alignment: .top) {
                        MicButton { spoken in question = question.isEmpty ? spoken : "\(question) \(spoken)" }
                        Spacer()
                        Button(action: ask) {
                            HStack { Text(fu.ask); Image(systemName: "arrow.right") }
                                .font(.ui(.title3, weight: .bold))
                                .padding(.horizontal, 22)
                                .frame(minHeight: 52)
                                .foregroundStyle(.white)
                                .background(Color.brand, in: RoundedRectangle(cornerRadius: 16))
                        }
                        .disabled(question.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || pending != nil)
                        .opacity(question.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || pending != nil ? 0.5 : 1)
                    }
                }
            }
        }
        .padding(20)
        .background(Color.surface, in: RoundedRectangle(cornerRadius: 28, style: .continuous))
        .shadow(color: Color.ink.opacity(0.08), radius: 12, y: 6)
    }

    private func answerCard(_ item: FollowupItem, fu: FeatureStrings.Followup) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(fu.you).font(.ui(.body, weight: .semibold)).foregroundStyle(Color.muted)
            Text(item.question).font(.bodyStrong)
            Text(item.answer.answer).font(.bodyLarge)
            if !item.answer.steps.isEmpty {
                Text(fu.stepsLabel.uppercased())
                    .font(.ui(.subheadline, weight: .bold))
                    .tracking(0.6)
                    .foregroundStyle(Color.brandStrong)
                    .padding(.top, 4)
                ForEach(Array(item.answer.steps.enumerated()), id: \.offset) { i, step in
                    HStack(alignment: .top, spacing: 12) {
                        NumberBadge(n: i + 1)
                        Text(linkified(step)).font(.bodyLarge)
                    }
                }
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.bg.opacity(0.5), in: RoundedRectangle(cornerRadius: 18))
        .overlay(RoundedRectangle(cornerRadius: 18).strokeBorder(Color.line, lineWidth: 1))
    }

    private func ask() {
        let q = question.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !q.isEmpty, pending == nil, items.count < AppContent.shared.limits.maxFollowups else { return }
        pending = q
        error = nil
        focused = false
        let history = items
        let language = settings.language
        Task {
            defer { pending = nil }
            do {
                let answer = try await Checker.shared.followup(question: q, history: history, result: result, language: language)
                items.append(FollowupItem(question: q, answer: answer))
                question = ""
            } catch {
                self.error = (error as? CheckErrorCode) == .busy ? settings.t.errors.busy : settings.f.followup.error
            }
        }
    }
}
