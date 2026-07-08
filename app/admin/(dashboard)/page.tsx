import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getAdminStats } from "@/lib/admin/fetch";
import { formatDate, formatNpr } from "@/lib/admin/format";
import { isSanityConfigured } from "@/sanity/env";

export const metadata = {
  title: "Admin Dashboard | NVNF",
};

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="p-6">
      <p className="text-sm font-medium text-charcoal/60">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-charcoal">{value}</p>
      {hint ? <p className="mt-1 text-xs text-charcoal/50">{hint}</p> : null}
    </Card>
  );
}

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">Dashboard</h1>
          <p className="mt-2 text-charcoal/70">
            Manage website content, review donations, and read contact messages.
          </p>
        </div>
        <Badge variant="sky">
          {stats.dataSource === "local" ? "Local storage" : "Supabase"}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total donations" value={String(stats.donationCount)} />
        <StatCard label="Donation volume" value={formatNpr(stats.totalNpr)} />
        <StatCard
          label="Pending payments"
          value={String(stats.pendingCount)}
          hint="Awaiting payment confirmation"
        />
        <StatCard label="Contact messages" value={String(stats.contactCount)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
            <h2 className="font-semibold text-charcoal">Recent donations</h2>
            <Link href="/admin/donations" className="text-sm text-sky hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-charcoal/10">
            {stats.recentDonations.length === 0 ? (
              <p className="px-5 py-8 text-sm text-charcoal/60">No donations recorded yet.</p>
            ) : (
              stats.recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div>
                    <p className="font-medium text-charcoal">
                      {formatNpr(Number(donation.amount_npr))}
                    </p>
                    <p className="text-xs text-charcoal/60">
                      {donation.donor_email ?? "Anonymous"} · {formatDate(donation.created_at)}
                    </p>
                  </div>
                  <Badge variant={donation.status === "pending" ? "warning" : "success"}>
                    {donation.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
            <h2 className="font-semibold text-charcoal">Recent messages</h2>
            <Link href="/admin/contacts" className="text-sm text-sky hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-charcoal/10">
            {stats.recentContacts.length === 0 ? (
              <p className="px-5 py-8 text-sm text-charcoal/60">No messages yet.</p>
            ) : (
              stats.recentContacts.map((contact) => (
                <div key={contact.id} className="px-5 py-4">
                  <p className="font-medium text-charcoal">{contact.name}</p>
                  <p className="text-xs text-charcoal/60">
                    {contact.email} · {formatDate(contact.created_at)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-charcoal/75">{contact.message}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/content" className="group">
          <Card hover className="h-full p-6">
            <h3 className="font-display text-xl font-bold text-charcoal group-hover:text-sky">
              Site content
            </h3>
            <p className="mt-2 text-sm text-charcoal/70">
              Edit hero text, announcement ticker, and organisation contact details.
            </p>
          </Card>
        </Link>
        <Link href="/" className="group" target="_blank" rel="noopener noreferrer">
          <Card hover className="h-full p-6">
            <h3 className="font-display text-xl font-bold text-charcoal group-hover:text-sky">
              Preview website
            </h3>
            <p className="mt-2 text-sm text-charcoal/70">
              Open the public site in a new tab to review published changes.
            </p>
          </Card>
        </Link>
        {isSanityConfigured ? (
          <Link href="/admin/studio" className="group sm:col-span-2">
            <Card hover className="h-full p-6">
              <h3 className="font-display text-xl font-bold text-charcoal group-hover:text-sky">
                Sanity Studio
              </h3>
              <p className="mt-2 text-sm text-charcoal/70">
                Advanced CMS for programmes, news, team, gallery, and more.
              </p>
            </Card>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
