import { getImageUrl } from "./image";
import type { Program } from "./types";
import { ngoMedia } from "@/lib/content/ngo-media";

export const PROGRAM_FALLBACK_IMAGES: Record<string, string> = {
  "women-empowerment": ngoMedia.programs.womenEmpowerment,
  "drug-rehabilitation": ngoMedia.programs.drugRehabilitation,
  "health-awareness": ngoMedia.programs.healthAwareness,
  "community-outreach": ngoMedia.hero.laxmipur,
  // Legacy slug aliases
  "scholarship-fund": ngoMedia.programs.womenEmpowerment,
  "disaster-relief-kit": ngoMedia.programs.healthAwareness,
  "mobile-health-clinic": ngoMedia.programs.healthAwareness,
  "womens-livelihood": ngoMedia.programs.womenEmpowerment,
  "clean-water": ngoMedia.hero.sasapur,
  "school-rebuild": ngoMedia.hero.salempur,
};

const DEFAULT_PROGRAM_IMAGE = ngoMedia.hero.sasapur;

function resolveFallbackSlug(program: Program): string | undefined {
  const slug = program.slug.current;
  if (PROGRAM_FALLBACK_IMAGES[slug]) return slug;

  const name = program.name.toLowerCase();
  if (name.includes("women")) return "women-empowerment";
  if (name.includes("drug")) return "drug-rehabilitation";
  if (name.includes("health")) return "health-awareness";
  if (name.includes("community") || name.includes("field")) return "community-outreach";

  return undefined;
}

export function getProgramImageUrl(program: Program, width = 800, height = 600): string {
  const fromSanity = getImageUrl(program.image, width, height);
  if (fromSanity) return fromSanity;

  const key = resolveFallbackSlug(program);
  if (key) return PROGRAM_FALLBACK_IMAGES[key];

  return DEFAULT_PROGRAM_IMAGE;
}

export function getProgramImageAlt(program: Program): string {
  const alts: Record<string, string> = {
    "women-empowerment": "Women's empowerment program in Sarlahi",
    "drug-rehabilitation": "Drug rehabilitation and awareness program",
    "health-awareness": "Community health awareness session",
    "community-outreach": "NVNF field visit in a Sarlahi village",
  };

  return alts[program.slug.current] ?? program.name;
}
