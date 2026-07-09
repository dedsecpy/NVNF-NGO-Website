import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { GetInvolvedWays } from "@/components/sections/GetInvolvedWays";
import { RegularDonorCta } from "@/components/sections/home/RegularDonorCta";
import { Container, Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Donate, volunteer, or partner with New Vision Nepal Foundation.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Hope is not built alone"
        description="Whether you give, volunteer, or partner with us, your support turns into meals, health sessions, and safer futures for families across Sarlahi."
        centered
      />
      <GetInvolvedWays />
      <Section className="bg-section-beige py-10 md:py-16">
        <Container>
          <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
            <h2 className="text-2xl font-bold text-charcoal md:text-3xl">Choose how you want to help</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-charcoal/75 md:text-base">
              Every contribution matters. Some supporters choose one-time giving, others fund ongoing
              programs, and many support us through volunteering, introductions, or local partnerships.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-charcoal/10 bg-section-beige/40 p-4">
                <p className="text-sm font-bold text-charcoal">Donate once</p>
                <p className="mt-1 text-xs text-charcoal/70">
                  Support urgent needs like food kits and emergency medicine.
                </p>
              </div>
              <div className="rounded-xl border border-charcoal/10 bg-section-beige/40 p-4">
                <p className="text-sm font-bold text-charcoal">Give monthly</p>
                <p className="mt-1 text-xs text-charcoal/70">
                  Help us plan stable services in health and women&apos;s empowerment.
                </p>
              </div>
              <div className="rounded-xl border border-charcoal/10 bg-section-beige/40 p-4">
                <p className="text-sm font-bold text-charcoal">Volunteer skills</p>
                <p className="mt-1 text-xs text-charcoal/70">
                  Offer time in outreach, awareness campaigns, or admin support.
                </p>
              </div>
              <div className="rounded-xl border border-charcoal/10 bg-section-beige/40 p-4">
                <p className="text-sm font-bold text-charcoal">Partner with NVNF</p>
                <p className="mt-1 text-xs text-charcoal/70">
                  Build CSR and institution programs with measurable local impact.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#ways-to-give"
                className="rounded-full bg-sky px-5 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-sky/90"
              >
                Start now
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-charcoal/20 px-5 py-2 text-xs font-bold uppercase tracking-wide text-charcoal transition-colors hover:border-sky hover:text-sky"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </Container>
      </Section>
      <RegularDonorCta />
    </>
  );
}
