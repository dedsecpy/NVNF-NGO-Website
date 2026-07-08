import { notFound } from "next/navigation";
import { getDonationById } from "@/lib/donations/service";
import { SandboxPaymentClient } from "@/components/donate/SandboxPaymentClient";

export const metadata = {
  title: "Test payment | NVNF",
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ donation_id?: string }>;
}

export default async function DonationSandboxPage({ searchParams }: PageProps) {
  const params = await searchParams;
  if (!params.donation_id) notFound();

  const donation = await getDonationById(params.donation_id);
  if (!donation || donation.payment_provider !== "sandbox") notFound();

  return (
    <SandboxPaymentClient
      donationId={donation.id}
      pidx={donation.pidx ?? `sandbox-${donation.id}`}
      amountNpr={Number(donation.amount_npr)}
    />
  );
}
