import { HeroDonateButton } from "@/components/sections/home/HeroDonateButton";

export function HeroEmergency() {
  return (
    <section className="hero-viewport hero-launch" aria-label="Community appeal">
      <div className="hero-launch__bg" aria-hidden="true" />
      <div className="hero-launch__overlay" aria-hidden="true" />

      <div className="hero-launch__inner">
        <div className="max-w-xl">
          <span className="hero-launch__eyebrow inline-block rounded bg-emergency px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Sarlahi, Nepal
          </span>

          <div className="hero-launch__headline mt-4 inline-block bg-white px-4 py-3">
            <h1 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
              Stand with Sarlahi&apos;s communities
            </h1>
          </div>

          <div className="hero-launch__copy mt-0 inline-block bg-charcoal px-4 py-4">
            <p className="max-w-md text-base font-medium leading-relaxed text-white md:text-lg">
              From Ishwarpur to 25 documented villages — your support empowers women,
              raises health awareness, and helps families recover from drug abuse.
            </p>
          </div>

          <HeroDonateButton />
        </div>
      </div>

      <p className="hero-launch__credit absolute bottom-4 right-4 z-10 text-[10px] text-white/70">
        Photo courtesy: A family in Sarlahi, Nepal
      </p>
    </section>
  );
}
