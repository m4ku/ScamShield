import type { Metadata } from "next";

import { AboutPage } from "@/components/SimplePages";

export const metadata: Metadata = {
  title: "How it works",
  description: "How ScamShield checks a message, decides its answer, and protects your privacy.",
};

export default function Page() {
  return <AboutPage />;
}
