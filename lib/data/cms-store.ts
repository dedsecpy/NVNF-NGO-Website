import { promises as fs } from "fs";
import type { SiteSettings } from "@/lib/sanity/types";
import { CMS_PATH, DATA_DIR } from "./paths";

import type { TickerSettings } from "./ticker-defaults";
import { defaultTicker } from "./ticker-defaults";

export type { TickerSettings } from "./ticker-defaults";

export interface CmsData {
  siteSettings: Partial<SiteSettings>;
  ticker: TickerSettings;
}

const defaultCms: CmsData = {
  siteSettings: {},
  ticker: defaultTicker,
};

async function ensureCms(): Promise<CmsData> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(CMS_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<CmsData>;
    return {
      siteSettings: parsed.siteSettings ?? {},
      ticker: { ...defaultTicker, ...parsed.ticker },
    };
  } catch {
    await fs.writeFile(CMS_PATH, JSON.stringify(defaultCms, null, 2), "utf8");
    return defaultCms;
  }
}

export async function getCmsData(): Promise<CmsData> {
  return ensureCms();
}

export async function saveCmsData(data: CmsData): Promise<CmsData> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const merged: CmsData = {
    siteSettings: data.siteSettings,
    ticker: { ...defaultTicker, ...data.ticker },
  };
  await fs.writeFile(CMS_PATH, JSON.stringify(merged, null, 2), "utf8");
  return merged;
}

export async function getTickerSettings(): Promise<TickerSettings> {
  const cms = await ensureCms();
  return cms.ticker;
}
