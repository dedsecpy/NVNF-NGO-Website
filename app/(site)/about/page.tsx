import type { Metadata } from "next";
import { ChairpersonSpotlight } from "@/components/sections/ChairpersonSpotlight";
import { Team } from "@/components/sections/Team";
import { Timeline } from "@/components/sections/Timeline";
import { getSiteSettings, getTeamMembers, getTimelineEvents } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about New Vision Nepal Foundation — our story, team, and journey since 2015.",
};

export default async function AboutPage() {
  const [settings, team, timeline] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
    getTimelineEvents(),
  ]);

  return (
    <>
      <ChairpersonSpotlight
        foundedYear={settings.foundedYear}
        livesImpacted={settings.livesImpacted}
        districtsServed={settings.districtsServed}
      />
      <Team members={team} />
      <Timeline events={timeline} />
    </>
  );
}
