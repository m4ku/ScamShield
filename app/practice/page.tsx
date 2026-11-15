import type { Metadata } from "next";

import { PracticeGame } from "@/components/PracticeGame";

export const metadata: Metadata = {
  title: "Spot the scam",
  description: "Practice spotting scam messages with 8 real-looking examples.",
};

export default function Page() {
  return <PracticeGame />;
}
