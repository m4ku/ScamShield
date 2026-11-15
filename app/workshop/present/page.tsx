import type { Metadata } from "next";

import { Presenter } from "@/components/Workshop";

export const metadata: Metadata = { title: "Presenter mode" };

export default function Page() {
  return <Presenter />;
}
