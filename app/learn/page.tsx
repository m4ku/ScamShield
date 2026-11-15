import type { Metadata } from "next";

import { LearnIndex } from "@/components/LearnViews";

export const metadata: Metadata = {
  title: "Common scams",
  description: "The scams we see most, what they look like, and what to do.",
};

export default function Page() {
  return <LearnIndex />;
}
