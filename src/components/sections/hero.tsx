import { telegramLink, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { HeroBackground } from "@/components/sections/hero-background";
import { PosterName } from "@/components/sections/poster-name";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="theme-dark relative isolate flex h-svh min-h-[640px] flex-col overflow-hidden bg-black"
    >
      <div className="absolute inset-0 -z-10 opacity-30">
        <HeroBackground />
      </div>

      <div className="absolute inset-x-[var(--gutter)] top-16 bottom-28 md:top-20 md:bottom-32">
        <PosterName text={site.brand} />
      </div>

      <div className="container-x relative mt-auto flex flex-col items-start gap-5 pb-24 md:flex-row md:items-end md:justify-between md:pb-28">
        <p
          className="glass fade-up max-w-sm rounded-[1.25rem] px-5 py-4 text-sm leading-snug text-fg/90 md:text-base"
          style={{ "--d": "1.2s" } as React.CSSProperties}
        >
          Влад, 16 лет. Делаю сайты под задачу, а не из шаблона, чтобы они приносили заявки.
        </p>
        <div className="fade-up flex flex-wrap items-center gap-3" style={{ "--d": "1.35s" } as React.CSSProperties}>
          <ButtonLink href="/#works" cursor="Работы">
            Мои работы
          </ButtonLink>
          <ButtonLink href={telegramLink()} external cursor="Telegram">
            Написать в Telegram
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
