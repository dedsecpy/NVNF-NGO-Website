import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { fetchContacts } from "@/lib/admin/fetch";
import { formatDate } from "@/lib/admin/format";

export const metadata = {
  title: "Messages | NVNF Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const { data, error } = await fetchContacts();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">Contact messages</h1>
          <p className="mt-2 text-charcoal/70">
            Messages submitted through the website contact form.
          </p>
        </div>
        <Link href="/admin" className="text-sm text-sky hover:underline">
          ← Back to dashboard
        </Link>
      </div>

      {error ? (
        <Card className="px-6 py-12 text-center text-sm text-urgency" role="alert">
          Failed to load messages: {error}
        </Card>
      ) : data.length === 0 ? (
        <Card className="px-6 py-12 text-center text-sm text-charcoal/60">
          No contact messages yet.
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((contact) => (
            <Card key={contact.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-charcoal">{contact.name}</h2>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-sky hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
                <time className="text-xs text-charcoal/50" dateTime={contact.created_at}>
                  {formatDate(contact.created_at)}
                </time>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-charcoal/80">
                {contact.message}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
