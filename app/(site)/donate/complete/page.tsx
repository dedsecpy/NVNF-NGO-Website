import { Suspense } from "react";
import { DonationCompleteClient } from "@/components/donate/DonationCompleteClient";

export const metadata = {
  title: "Donation complete | NVNF",
};

interface PageProps {
  searchParams: Promise<{ donation_id?: string; pidx?: string }>;
}

function CompleteFallback() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center text-charcoal/70">
      Confirming your payment…
    </div>
  );
}

export default async function DonationCompletePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <Suspense fallback={<CompleteFallback />}>
      <DonationCompleteClient donationId={params.donation_id} pidx={params.pidx} />
    </Suspense>
  );
}
