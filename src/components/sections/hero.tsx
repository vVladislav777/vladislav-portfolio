import { site, telegramLink } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { HeroName } from "@/components/sections/hero-name";
import { HeroBackground } from "@/components/sections/hero-background";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <HeroBackground />

      <div className="container-x flex flex-1 flex-col justify-center pt-28 pb-10">
        <p className="eyebrow fade-up text-center" style={{ "--d": "0.2s" } as React.CSSProperties}>
          Портфолио · 2026
        </p>

        <HeroName text="ВЛАДИСЛАВ" />

        <p
          className="fade-up mx-auto mt-6 max-w-xl text-center text-lg text-balance text-fg/85 md:text-xl"
          style={{ "--d": "0.75s" } as React.CSSProperties}
        >
          {site.role[0].toUpperCase() + site.role.slice(1)}. Делаю сайты, которые
          запоминаются и продают.
        </p>

        <div
          className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ "--d": "0.9s" } as React.CSSProperties}
        >
          <ButtonLink href="/#works" variant="accent">
            Мои работы
          </ButtonLink>
          <ButtonLink href={telegramLink()} external variant="ghost" className="bg-bg/40 backdrop-blur">
            Написать в Telegram
          </ButtonLink>
        </div>
      </div>

      <div className="container-x flex items-end justify-between pb-6 text-xs text-muted">
        <span className="eyebrow">Лендинги · Сайты · Анимации</span>
        <span className="eyebrow hidden sm:inline">Листайте вниз ↓</span>
      </div>
    </section>
  );
}
