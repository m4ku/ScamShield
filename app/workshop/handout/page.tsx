import type { Metadata } from "next";

import { Handout } from "@/components/Workshop";

export const metadata: Metadata = { title: "Handout" };

export default function Page() {
  return <Handout />;
}
