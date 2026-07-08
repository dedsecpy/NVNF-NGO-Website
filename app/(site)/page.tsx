import { HeroEmergency } from "@/components/sections/home/HeroEmergency";
import { MissionSection } from "@/components/sections/home/MissionSection";
import { PillarCards } from "@/components/sections/home/PillarCards";
import { EmergencyBanner } from "@/components/sections/home/EmergencyBanner";
import { SpendingChart } from "@/components/sections/home/SpendingChart";
import { RegularDonorCta } from "@/components/sections/home/RegularDonorCta";
import { NewsCarousel } from "@/components/sections/home/NewsCarousel";
import { getNewsPosts } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const news = await getNewsPosts();

  return (
    <>
      <HeroEmergency />
      <MissionSection />
      <PillarCards />
      <EmergencyBanner />
      <SpendingChart />
      <RegularDonorCta />
      <NewsCarousel posts={news} />
    </>
  );
}
