import { getImageUrl } from "./image";
import type { Problem } from "./types";
import { ngoMedia } from "@/lib/content/ngo-media";

const PROBLEM_FALLBACK_BY_ID: Record<string, string> = {
  p1: ngoMedia.news.drugDrama,
  p2: ngoMedia.programs.healthAwareness,
  p3: ngoMedia.programs.womenEmpowerment,
  p4: ngoMedia.hero.laxmipur,
};

const DEFAULT_PROBLEM_IMAGE = ngoMedia.hero.sasapur;

function resolveProblemFallback(problem: Problem): string {
  if (problem._id && PROBLEM_FALLBACK_BY_ID[problem._id]) {
    return PROBLEM_FALLBACK_BY_ID[problem._id];
  }

  const title = problem.title.toLowerCase();
  if (title.includes("drug")) return PROBLEM_FALLBACK_BY_ID.p1;
  if (title.includes("health")) return PROBLEM_FALLBACK_BY_ID.p2;
  if (title.includes("women")) return PROBLEM_FALLBACK_BY_ID.p3;
  if (title.includes("poverty") || title.includes("rural")) return PROBLEM_FALLBACK_BY_ID.p4;

  return DEFAULT_PROBLEM_IMAGE;
}

export function getProblemImageUrl(problem: Problem, width = 800, height = 1000): string {
  const fromSanity = getImageUrl(problem.image, width, height);
  if (fromSanity) return fromSanity;

  return resolveProblemFallback(problem);
}

export function getProblemImageAlt(problem: Problem): string {
  const alts: Record<string, string> = {
    p1: "Drug abuse awareness street drama in Sarlahi",
    p2: "Limited access to healthcare in rural Sarlahi",
    p3: "Women facing inequality in Madhesh communities",
    p4: "Rural poverty in Sarlahi district villages",
  };

  if (problem._id && alts[problem._id]) return alts[problem._id];

  return problem.title;
}
