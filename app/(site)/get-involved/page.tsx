import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { GetInvolvedWays } from "@/components/sections/GetInvolvedWays";
import { RegularDonorCta } from "@/components/sections/home/RegularDonorCta";
import { SpendingChart } from "@/components/sections/home/SpendingChart";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Donate, volunteer, or partner with New Vision Nepal Foundation.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Hope is not built alone"
        description="Whether you give, volunteer, or partner with us — you become part of something larger than charity. You become part of a family's survival story."
        centered
      />
      <GetInvolvedWays />
      <SpendingChart />
      <RegularDonorCta />
    </>
  );
}
