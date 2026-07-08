import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section className="flex min-h-[60vh] items-center bg-section-beige py-24">
      <Container className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-sky">404</p>
        <h1 className="mt-4 text-4xl font-bold text-charcoal">Page not found</h1>
        <p className="mt-4 text-charcoal/70">This page could not be found.</p>
        <Link href="/" className="mt-8 inline-block">
          <Button variant="primary">Return home</Button>
        </Link>
      </Container>
    </Section>
  );
}
