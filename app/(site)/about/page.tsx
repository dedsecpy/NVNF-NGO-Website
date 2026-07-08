import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
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
      <PageHero
        eyebrow="About NVNF"
        title="Our story"
        description={`Founded in ${settings.foundedYear} in the wake of the devastating Gorkha earthquake, New Vision Nepal Foundation began as a grassroots response to human suffering. Today, we serve ${settings.districtsServed} districts and have impacted over ${settings.livesImpacted.toLocaleString()} lives.`}
      />
      <Team members={team} />
      <Timeline events={timeline} />
    </>
  );
}
