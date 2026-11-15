import PhotosUI
import SwiftUI

/// The check form: paste text, add a screenshot, or describe a call. One big button.
struct CheckFormView: View {
    @Bindable var model: CheckFormModel
    @Binding var error: String?
    let onSubmit: (CheckInput) -> Void

    @Environment(AppSettings.self) private var settings
    @FocusState private var focused: Bool
    @State private var photo: PhotosPickerItem?

    var body: some View {
        let t = settings.t
        let home = settings.site.home

        VStack(alignment: .leading, spacing: 22) {
            Text(home.eyebrow)
                .font(.ui(.subheadline, weight: .semibold))
                .foregroundStyle(Color.brandStrong)
                .padding(.horizontal, 12).padding(.vertical, 6)
                .background(Color.brandTint, in: Capsule())

            (Text(home.heroBefore) + Text(home.heroEmph).foregroundStyle(Color.brandStrong) + Text(home.heroAfter))
                .font(.display)
                .accessibilityAddTraits(.isHeader)

            VStack(spacing: 18) {
                ModePicker(mode: $model.mode, tabs: t.tabs)
                    .onChange(of: model.mode) { error = nil; focused = model.mode != .image }

                switch model.mode {
                case .text: textArea
                case .call: callArea
                case .image: imageArea
                }

                if let error {
                    Text(error)
                        .font(.bodyStrong)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(16)
                        .background(Color.panel, in: RoundedRectangle(cornerRadius: 16))
                        .overlay(alignment: .leading) { Rectangle().fill(Color.ink).frame(width: 6) }
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                        .accessibilityAddTraits(.isStaticText)
                }

                Button(action: submit) {
                    HStack { Text(t.checkButton); Image(systemName: "arrow.right") }
                }
                .buttonStyle(BigButtonStyle())

                Label(t.privacy, systemImage: "lock")
                    .font(.ui(.body))
                    .foregroundStyle(Color.inkSoft)
                    .frame(maxWidth: .infinity)
            }
            .padding(16)
            .background(Color.surface, in: RoundedRectangle(cornerRadius: 28, style: .continuous))
            .shadow(color: Color.ink.opacity(0.12), radius: 18, y: 10)

            HelpCard()
                .padding(.top, 20)
            TrustedCard()
            FooterLinks()
        }
        // No keyboard on launch: on a phone it would hide the Paste button and the Check button.
    }

    // MARK: Text

    private var textArea: some View {
        VStack(alignment: .leading, spacing: 12) {
            MessageEditor(text: $model.text, placeholder: settings.t.textPlaceholder, focused: $focused, submitLabel: settings.t.checkButton, onSubmit: submit)
                .accessibilityLabel(settings.t.textLabel)
            if model.text.isEmpty {
                PasteButton(payloadType: String.self) { strings in
                    let pasted = strings.joined(separator: "\n").trimmingCharacters(in: .whitespacesAndNewlines)
                    guard !pasted.isEmpty else { return }
                    Task { @MainActor in
                        model.text = pasted
                        submit()
                    }
                }
                .buttonBorderShape(.roundedRectangle(radius: 16))
                .controlSize(.large)
                .tint(.brand)
            } else {
                Button {
                    model.text = ""
                    error = nil
                    focused = true
                } label: {
                    Label(settings.f.form.clear, systemImage: "xmark")
                        .font(.ui(.body, weight: .semibold))
                        .padding(.horizontal, 16)
                        .frame(minHeight: 48)
                        .overlay(RoundedRectangle(cornerRadius: 14).strokeBorder(Color.line, lineWidth: 2))
                }
                .foregroundStyle(Color.ink)
            }
        }
    }

    // MARK: Call

    private var callArea: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(settings.t.callLabel).font(.bodyStrong)
            MessageEditor(text: $model.callText, placeholder: settings.t.callPlaceholder, focused: $focused, submitLabel: settings.t.checkButton, onSubmit: submit)
                .accessibilityLabel(settings.t.callLabel)
            MicButton { spoken in model.callText = model.callText.isEmpty ? spoken : "\(model.callText) \(spoken)" }
        }
    }

    // MARK: Image

    private var imageArea: some View {
        let t = settings.t
        return VStack(spacing: 12) {
            if let image = model.image, let ui = UIImage(data: image.preview) {
                Image(uiImage: ui)
                    .resizable().scaledToFit()
                    .frame(maxHeight: 320)
                    .clipShape(RoundedRectangle(cornerRadius: 16))
                    .overlay(RoundedRectangle(cornerRadius: 16).strokeBorder(Color.line, lineWidth: 2))
                    .accessibilityLabel(t.imageAlt)
                PhotosPicker(selection: $photo, matching: .images) {
                    Label(t.imageChange, systemImage: "camera")
                }
                .buttonStyle(BigButtonStyle(kind: .secondary))
            } else {
                PhotosPicker(selection: $photo, matching: .images) {
                    VStack(spacing: 12) {
                        Image(systemName: "camera")
                            .font(.system(size: 32))
                            .foregroundStyle(Color.brandStrong)
                            .frame(width: 64, height: 64)
                            .background(Color.brandSoft, in: RoundedRectangle(cornerRadius: 18))
                        Text(t.imageChoose).font(.bodyStrong).foregroundStyle(Color.ink)
                        Text(t.imageHint).font(.ui(.body)).foregroundStyle(Color.inkSoft).multilineTextAlignment(.center)
                    }
                    .frame(maxWidth: .infinity, minHeight: 210)
                    .padding(16)
                    .background(Color.bg.opacity(0.6), in: RoundedRectangle(cornerRadius: 18))
                    .overlay(RoundedRectangle(cornerRadius: 18).strokeBorder(Color.lineStrong, style: StrokeStyle(lineWidth: 2, dash: [8, 6])))
                }
            }
        }
        .onChange(of: photo) {
            guard let photo else { return }
            Task {
                let data = try? await photo.loadTransferable(type: Data.self)
                if let data, let prepared = ImagePrep.prepare(data) {
                    model.image = prepared
                    error = nil
                } else {
                    model.image = nil
                    error = t.errors.imageBad
                }
                self.photo = nil
            }
        }
    }

    // MARK: Submit

    private func submit() {
        let t = settings.t
        let maxChars = AppContent.shared.limits.maxTextChars
        switch model.mode {
        case .text, .call:
            let value = (model.mode == .text ? model.text : model.callText).trimmingCharacters(in: .whitespacesAndNewlines)
            if value.isEmpty { error = t.errors.empty; return }
            if value.count > maxChars { error = t.errors.tooLong; return }
            error = nil
            focused = false
            onSubmit(model.mode == .text ? .text(value) : .call(value))
        case .image:
            guard let image = model.image else { error = t.errors.imageMissing; return }
            error = nil
            onSubmit(.image(jpegBase64: image.base64, preview: image.preview))
        }
    }
}

/// Three big tabs with icons: Paste text · Add a screenshot · Describe a call.
private struct ModePicker: View {
    @Binding var mode: InputMode
    let tabs: UIStrings.Tabs
    @Namespace private var ns

    var body: some View {
        HStack(spacing: 4) {
            ForEach(InputMode.allCases) { m in
                Button {
                    withAnimation(.spring(duration: 0.3)) { mode = m }
                } label: {
                    VStack(spacing: 4) {
                        Image(systemName: icon(m)).font(.system(size: 22))
                        Text(label(m)).font(.ui(.subheadline, weight: .semibold)).multilineTextAlignment(.center)
                    }
                    .frame(maxWidth: .infinity, minHeight: 72)
                    .foregroundStyle(mode == m ? Color.brandStrong : Color.inkSoft)
                    .background {
                        if mode == m {
                            RoundedRectangle(cornerRadius: 14).fill(Color.surface)
                                .shadow(color: Color.ink.opacity(0.08), radius: 6, y: 2)
                                .matchedGeometryEffect(id: "tab", in: ns)
                        }
                    }
                }
                .buttonStyle(.plain)
                .accessibilityAddTraits(mode == m ? .isSelected : [])
            }
        }
        .padding(6)
        .background(Color.panel, in: RoundedRectangle(cornerRadius: 18))
    }

    private func icon(_ m: InputMode) -> String {
        switch m {
        case .text: "text.alignleft"
        case .image: "camera"
        case .call: "phone"
        }
    }

    private func label(_ m: InputMode) -> String {
        switch m {
        case .text: tabs.text
        case .image: tabs.image
        case .call: tabs.call
        }
    }
}

/// A large text box with a placeholder.
struct MessageEditor: View {
    @Binding var text: String
    let placeholder: String
    var focused: FocusState<Bool>.Binding
    /// The form's main button, repeated above the keyboard so it's reachable while typing.
    var submitLabel: String?
    var onSubmit: () -> Void = {}

    var body: some View {
        ZStack(alignment: .topLeading) {
            if text.isEmpty {
                Text(placeholder)
                    .font(.bodyLarge)
                    .foregroundStyle(Color.muted)
                    .padding(.horizontal, 17).padding(.vertical, 18)
                    .allowsHitTesting(false)
            }
            TextEditor(text: $text)
                .font(.bodyLarge)
                .scrollContentBackground(.hidden)
                .focused(focused)
                .padding(10)
                .toolbar {
                    if let submitLabel {
                        ToolbarItemGroup(placement: .keyboard) {
                            Spacer()
                            Button(action: onSubmit) { Label(submitLabel, systemImage: "arrow.right").labelStyle(.titleAndIcon) }
                                .font(.ui(.body, weight: .bold))
                        }
                    }
                }
        }
        .frame(minHeight: 200)
        .background(Color.bg.opacity(0.6), in: RoundedRectangle(cornerRadius: 18))
        .overlay(RoundedRectangle(cornerRadius: 18).strokeBorder(focused.wrappedValue ? Color.brand : Color.line, lineWidth: 2))
    }
}

/// "Already clicked, replied or paid?" shortcut under the form.
private struct HelpCard: View {
    @Environment(AppSettings.self) private var settings
    @State private var showHelp = false

    var body: some View {
        let home = settings.site.home
        VStack(alignment: .leading, spacing: 14) {
            HStack(spacing: 14) {
                Image(systemName: "lifepreserver")
                    .font(.system(size: 24))
                    .frame(width: 48, height: 48)
                    .background(Color.clay, in: RoundedRectangle(cornerRadius: 14))
                Text(home.helpTitle).font(.subheading).accessibilityAddTraits(.isHeader)
            }
            Text(home.helpBody).font(.bodyLarge).foregroundStyle(Color.inkSoft)
            NavigationLink {
                ScrollView { HelpView().padding(.horizontal, 20).padding(.vertical, 16) }.background(Color.bg)
            } label: {
                HStack { Text(home.helpCta); Image(systemName: "arrow.right") }
            }
            .buttonStyle(BigButtonStyle(kind: .secondary))
        }
        .padding(22)
        .background(Color.claySoft, in: RoundedRectangle(cornerRadius: 28, style: .continuous))
    }
}

/// Shrinks a photo or screenshot before upload (max 1600px, JPEG), like the website does.
enum ImagePrep {
    static func prepare(_ data: Data) -> (base64: String, preview: Data)? {
        guard let image = UIImage(data: data), image.size.width > 0, image.size.height > 0 else { return nil }
        let maxSide: CGFloat = 1600
        let pixelW = image.size.width * image.scale
        let pixelH = image.size.height * image.scale
        let scale = min(1, maxSide / max(pixelW, pixelH))
        let size = CGSize(width: (pixelW * scale).rounded(), height: (pixelH * scale).rounded())

        let format = UIGraphicsImageRendererFormat()
        format.scale = 1
        format.opaque = true
        let resized = UIGraphicsImageRenderer(size: size, format: format).image { ctx in
            UIColor.white.setFill()
            ctx.fill(CGRect(origin: .zero, size: size))
            image.draw(in: CGRect(origin: .zero, size: size))
        }
        guard let jpeg = resized.jpegData(compressionQuality: 0.85) else { return nil }
        return (jpeg.base64EncodedString(), jpeg)
    }
}

/// "Keep your trusted numbers close" shortcut under the form.
private struct TrustedCard: View {
    @Environment(AppSettings.self) private var settings

    var body: some View {
        let f = settings.f.trusted
        VStack(alignment: .leading, spacing: 14) {
            HStack(spacing: 14) {
                Image(systemName: "building.columns")
                    .font(.system(size: 22))
                    .foregroundStyle(Color.brandStrong)
                    .frame(width: 48, height: 48)
                    .background(Color.brandSoft, in: RoundedRectangle(cornerRadius: 14))
                Text(f.homeTitle).font(.subheading).accessibilityAddTraits(.isHeader)
            }
            Text(f.homeBody).font(.bodyLarge).foregroundStyle(Color.inkSoft)
            NavigationLink { TrustedView() } label: {
                HStack { Text(TrustedStore.shared.numbers.isEmpty ? f.add : f.edit); Image(systemName: "arrow.right") }
            }
            .buttonStyle(BigButtonStyle(kind: .soft))
        }
        .padding(22)
        .background(Color.surface, in: RoundedRectangle(cornerRadius: 28, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 28).strokeBorder(Color.line))
    }
}

/// The website's footer: About, My trusted numbers, Workshop kit, and the privacy line.
private struct FooterLinks: View {
    @Environment(AppSettings.self) private var settings

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Label(settings.t.footer, systemImage: "shield")
                .font(.ui(.body))
                .foregroundStyle(Color.inkSoft)
                .padding(.bottom, 6)
            link(settings.site.nav.about) { AboutView() }
            link(settings.f.trusted.title) { TrustedView() }
            link(settings.f.workshop.navLabel) { WorkshopView() }
        }
        .padding(.top, 12)
        .padding(.bottom, 24)
    }

    private func link(_ title: String, @ViewBuilder destination: @escaping () -> some View) -> some View {
        NavigationLink(destination: destination) {
            HStack {
                Text(title).font(.ui(.title3, weight: .semibold)).foregroundStyle(Color.brandStrong)
                Spacer()
                Image(systemName: "chevron.right").foregroundStyle(Color.brand)
            }
            .frame(minHeight: 52)
        }
    }
}
