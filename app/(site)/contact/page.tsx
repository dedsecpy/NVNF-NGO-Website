import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with New Vision Nepal Foundation.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Have questions about our programs, want to volunteer, or interested in partnering? We'd love to hear from you."
        variant="beige"
      />
      <Section className="bg-white py-10 md:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-charcoal">Contact details</h2>
              <address className="mt-6 space-y-4 not-italic text-charcoal/80">
                {settings.email && (
                  <p>
                    <span className="font-semibold text-charcoal">Email: </span>
                    <a href={`mailto:${settings.email}`} className="prose-link">
                      {settings.email}
                    </a>
                  </p>
                )}
                {settings.phone && (
                  <p>
                    <span className="font-semibold text-charcoal">Phone: </span>
                    <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a>
                  </p>
                )}
                {settings.address && (
                  <p>
                    <span className="font-semibold text-charcoal">Address: </span>
                    {settings.address}
                  </p>
                )}
              </address>
            </div>
            <div className="rounded-xl border border-charcoal/10 bg-section-beige p-8 shadow-card">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
