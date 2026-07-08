import Link from "next/link";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getCmsData } from "@/lib/data/cms-store";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { isSanityConfigured } from "@/sanity/env";

export const metadata = {
  title: "Site Content | NVNF Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const [cms, defaults] = await Promise.all([getCmsData(), getSiteSettings()]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">Site content</h1>
          <p className="mt-2 text-charcoal/70">
            Edit homepage hero, announcement ticker, and organisation details. Changes appear on
            the live site immediately.
          </p>
        </div>
        <Link href="/admin" className="text-sm text-sky hover:underline">
          ← Back to dashboard
        </Link>
      </div>

      {isSanityConfigured ? (
        <p className="rounded-lg border border-sky/30 bg-sky/5 px-4 py-3 text-sm text-charcoal/80">
          Sanity CMS is also connected. Use{" "}
          <Link href="/admin/studio" className="font-medium text-sky hover:underline">
            Sanity Studio
          </Link>{" "}
          for programmes, news, gallery, and team. This page edits quick site-wide settings stored
          locally.
        </p>
      ) : null}

      <ContentEditor initialCms={cms} defaults={defaults} />
    </div>
  );
}
