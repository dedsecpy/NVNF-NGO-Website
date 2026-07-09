import { getImageUrl } from "@/lib/sanity/image";
import type { TeamMember } from "@/lib/sanity/types";
import { ngoMedia } from "@/lib/content/ngo-media";

// Only members with an authentic photo from the NGO archive are listed here.
// Members without a real photo intentionally fall back to an initials avatar.
const TEAM_PHOTOS: Record<string, string> = {
  t1: ngoMedia.team.susmita,
  t2: ngoMedia.team.nagina,
  t4: ngoMedia.team.tezKumari,
  t5: ngoMedia.team.bindeshwor,
  t8: ngoMedia.team.purna,
};

export function getTeamPhotoUrl(member: TeamMember): string | null {
  const fromSanity = getImageUrl(member.photo, 400, 400);
  if (fromSanity) return fromSanity;
  return TEAM_PHOTOS[member._id] ?? null;
}

const AVATAR_BG_CLASSES = ["bg-sky", "bg-navy-deep", "bg-forest", "bg-saffron", "bg-sky-light"];

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getAvatarColorClass(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_BG_CLASSES[hash % AVATAR_BG_CLASSES.length];
}
