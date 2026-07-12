import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { DonationStatusSelect } from "@/components/admin/DonationStatusSelect";
import { fetchDonations } from "@/lib/admin/fetch";
import { formatDate, formatNpr } from "@/lib/admin/format";

export const metadata = {
  title: "Donations | NVNF Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminDonationsPage() {
  const { data, error } = await fetchDonations();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">Donations</h1>
          <p className="mt-2 text-charcoal/70">
            Donation intents submitted through the website donation modal.
          </p>
        </div>
        <Link href="/admin" className="text-sm text-sky hover:underline">
          ← Back to dashboard
        </Link>
      </div>

      <Card className="overflow-hidden">
        {error ? (
          <div className="px-6 py-12 text-center text-sm text-urgency" role="alert">
            Failed to load donations: {error}
          </div>
        ) : data.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-charcoal/60">
            No donations recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-charcoal/10 bg-section-beige/50 text-charcoal/70">
                <tr>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Donor</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Method</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-section-beige/30">
                    <td className="whitespace-nowrap px-5 py-4 text-charcoal/80">
                      {formatDate(row.created_at)}
                    </td>
                    <td className="px-5 py-4 text-charcoal/80">
                      <p className="font-medium text-charcoal">
                        {row.donor_name ?? "Anonymous"}
                      </p>
                      {row.donor_email ? (
                        <p className="text-xs text-charcoal/50">{row.donor_email}</p>
                      ) : null}
                      {row.donor_message ? (
                        <p className="mt-1 text-xs italic text-charcoal/60">
                          &ldquo;{row.donor_message}&rdquo;
                        </p>
                      ) : null}
                    </td>
                    <td className="px-5 py-4 font-medium text-charcoal">
                      {formatNpr(Number(row.amount_npr))}
                      {row.amount_usd != null ? (
                        <span className="ml-1 text-xs text-charcoal/50">
                          (${Number(row.amount_usd).toFixed(0)} USD)
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-4 capitalize text-charcoal/80">
                      {row.payment_method ?? "—"}
                    </td>
                    <td className="px-5 py-4">
                      <DonationStatusSelect id={row.id} status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
