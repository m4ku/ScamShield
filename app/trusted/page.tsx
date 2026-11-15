import type { Metadata } from "next";

import { TrustedPage } from "@/components/TrustedPage";

export const metadata: Metadata = {
  title: "My trusted numbers",
  description: "Save your bank's real number and someone you trust, on your own phone.",
};

export default function Page() {
  return <TrustedPage />;
}
