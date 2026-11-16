import type { Metadata, Viewport } from "next";
import { Fraunces, Lexend, Noto_Sans_Devanagari } from "next/font/google";

import { AppShell } from "@/components/AppShell";

import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext", "vietnamese"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const DESCRIPTION = "Check a suspicious text, email, letter or call before you reply, click or pay. Free, in 7 languages.";

export const metadata: Metadata = {
  metadataBase: new URL("https://checkscamshield.vercel.app"),
  title: { default: "ScamShield", template: "%s · ScamShield" },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "ScamShield",
    title: "ScamShield: check a message before you reply, click or pay",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: "ScamShield", description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lexend.variable} ${fraunces.variable} ${devanagari.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
