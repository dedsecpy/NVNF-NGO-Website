import { getImageUrl } from "@/lib/sanity/image";
import type { TeamMember } from "@/lib/sanity/types";
import { ngoMedia } from "@/lib/content/ngo-media";

const TEAM_PHOTOS: Record<string, string> = {
  t1: ngoMedia.team.susmita,
  t2: ngoMedia.team.nagina,
  t3: ngoMedia.team.placeholderMale,
  t4: ngoMedia.team.tezKumari,
  t5: ngoMedia.team.bindeshwor,
  t6: ngoMedia.team.placeholderMale,
  t7: ngoMedia.team.placeholderMale,
  t8: ngoMedia.team.purna,
  t9: ngoMedia.team.placeholderFemale,
};

const DEFAULT_TEAM_PHOTO = ngoMedia.team.susmita;

export function getTeamPhotoUrl(member: TeamMember): string {
  const fromSanity = getImageUrl(member.photo, 400, 400);
  if (fromSanity) return fromSanity;
  return TEAM_PHOTOS[member._id] ?? DEFAULT_TEAM_PHOTO;
}
