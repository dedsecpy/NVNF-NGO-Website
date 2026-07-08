import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Section";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: "sky" | "beige";
  centered?: boolean;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  variant = "sky",
  centered = false,
  className,
}: PageHeroProps) {
  const isSky = variant === "sky";

  return (
    <section
      className={cn(
        "py-10 md:py-14",
        isSky ? "bg-sky text-white" : "bg-section-beige text-charcoal",
        className
      )}
    >
      <Container className={cn(centered && "text-center", !centered && "max-w-4xl")}>
        {eyebrow && (
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-[0.2em]",
              isSky ? "text-white/90" : "text-sky"
            )}
          >
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "mt-5 max-w-3xl text-lg leading-relaxed",
              isSky ? "text-white/90" : "text-charcoal/75",
              centered && "mx-auto"
            )}
          >
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
