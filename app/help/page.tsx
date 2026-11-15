import type { Metadata } from "next";

import { HelpPage } from "@/components/SimplePages";

export const metadata: Metadata = {
  title: "Already clicked or paid?",
  description: "What to do right away if you clicked, replied to, or paid a scam.",
};

export default function Page() {
  return <HelpPage />;
}
