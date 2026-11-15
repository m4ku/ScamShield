import SwiftUI

@main
struct ScamShieldApp: App {
    @State private var settings = AppSettings()

    init() {
        _ = Connectivity.shared // start watching the connection
        #if DEBUG
        print("[ScamShield] on-device model:", OnDevice.status)
        #endif
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(settings)
                .environment(\.locale, Locale(identifier: settings.languageTag))
                .preferredColorScheme(.light)
                .tint(.brand)
                .onOpenURL { settings.open($0) }
                #if DEBUG
                .task { await OnDeviceEval.runIfRequested() }
                #endif
        }
    }
}
