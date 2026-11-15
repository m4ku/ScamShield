import type { Metadata } from "next";

import { WorkshopIntro } from "@/components/Workshop";

export const metadata: Metadata = {
  title: "Workshop kit",
  description: "Run a 20-minute scam-awareness session with presenter slides and a printable handout.",
};

export default function Page() {
  return <WorkshopIntro />;
}
