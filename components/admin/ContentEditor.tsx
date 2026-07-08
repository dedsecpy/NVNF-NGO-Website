"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { CmsData } from "@/lib/data/cms-store";
import type { SiteSettings } from "@/lib/sanity/types";

interface ContentEditorProps {
  initialCms: CmsData;
  defaults: SiteSettings;
}

export function ContentEditor({ initialCms, defaults }: ContentEditorProps) {
  const [form, setForm] = useState({
    title: initialCms.siteSettings.title ?? defaults.title,
    description: initialCms.siteSettings.description ?? defaults.description,
    heroHeadline: initialCms.siteSettings.heroHeadline ?? defaults.heroHeadline,
    heroSubheadline:
      initialCms.siteSettings.heroSubheadline ?? defaults.heroSubheadline,
    livesImpacted: String(
      initialCms.siteSettings.livesImpacted ?? defaults.livesImpacted
    ),
    email: initialCms.siteSettings.email ?? defaults.email ?? "",
    phone: initialCms.siteSettings.phone ?? defaults.phone ?? "",
    address: initialCms.siteSettings.address ?? defaults.address ?? "",
    tickerMessage: initialCms.ticker.message,
    tickerHref: initialCms.ticker.href,
    tickerEnabled: initialCms.ticker.enabled,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/admin/cms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteSettings: {
          title: form.title,
          description: form.description,
          heroHeadline: form.heroHeadline,
          heroSubheadline: form.heroSubheadline,
          livesImpacted: Number(form.livesImpacted),
          email: form.email,
          phone: form.phone,
          address: form.address,
        },
        ticker: {
          message: form.tickerMessage,
          href: form.tickerHref,
          enabled: form.tickerEnabled,
        },
      }),
    });

    setSaving(false);
    if (!res.ok) {
      const err = (await res.json()) as { error?: string };
      setMessage(err.error ?? "Failed to save");
      return;
    }
    setMessage("Saved — changes are live on the website.");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8">
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-charcoal">Homepage hero</h2>
        <Input
          id="heroHeadline"
          label="Hero headline"
          value={form.heroHeadline}
          onChange={(e) => setForm((f) => ({ ...f, heroHeadline: e.target.value }))}
          required
        />
        <Textarea
          id="heroSubheadline"
          label="Hero subheadline"
          value={form.heroSubheadline}
          onChange={(e) => setForm((f) => ({ ...f, heroSubheadline: e.target.value }))}
          rows={3}
        />
        <Input
          id="livesImpacted"
          label="Lives impacted"
          type="number"
          min={0}
          value={form.livesImpacted}
          onChange={(e) => setForm((f) => ({ ...f, livesImpacted: e.target.value }))}
          required
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-charcoal">Announcement ticker</h2>
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={form.tickerEnabled}
            onChange={(e) => setForm((f) => ({ ...f, tickerEnabled: e.target.checked }))}
            className="h-4 w-4 rounded border-charcoal/30"
          />
          Show ticker on the public site
        </label>
        <Textarea
          id="tickerMessage"
          label="Ticker message"
          value={form.tickerMessage}
          onChange={(e) => setForm((f) => ({ ...f, tickerMessage: e.target.value }))}
          rows={2}
          required
        />
        <Input
          id="tickerHref"
          label="Ticker link"
          value={form.tickerHref}
          onChange={(e) => setForm((f) => ({ ...f, tickerHref: e.target.value }))}
          required
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-charcoal">Organisation details</h2>
        <Input
          id="title"
          label="Site title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />
        <Textarea
          id="description"
          label="Site description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={3}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="email"
            label="Contact email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <Input
            id="phone"
            label="Contact phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>
        <Textarea
          id="address"
          label="Address"
          value={form.address}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          rows={2}
        />
      </section>

      {message ? (
        <p
          className={`text-sm ${message.includes("Failed") ? "text-urgency" : "text-forest"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}

      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
