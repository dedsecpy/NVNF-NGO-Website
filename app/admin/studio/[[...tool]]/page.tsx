import { redirect } from "next/navigation";
import { isSanityConfigured } from "@/sanity/env";
import StudioClient from "./StudioClient";

export default function StudioPage() {
  if (!isSanityConfigured) {
    redirect("/admin/content");
  }

  return <StudioClient />;
}
