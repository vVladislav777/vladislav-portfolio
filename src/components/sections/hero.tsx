import { telegramLink, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { ChaosName } from "@/components/sections/chaos-name";
import { HeroBackground } from "@/components/sections/hero-background";

/**
 * Первый экран в стиле постера «CHAOS»: светлый лист на живом шейдере,
 * жидкое размытое название по центру и короткая подпись под ним.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="theme-light relative isolate flex h-svh min-h-[620px] flex-col overflow-hidden"
    >
      <HeroBackground />

      <div className="container-x flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-6xl">
          <ChaosName text={site.brand} />
        </div>
        <p
          className="fade-up mt-2 text-center text-base leading-snug font-medium text-[#111] md:text-lg"
          style={{ "--d": "1s" } as React.CSSProperties}
        >
          /{site.brand.toLowerCase()}/
          <br />
          сайты, которые цепляют и приносят заявки.
        </p>
      </div>

      <div
        className="fade-up container-x flex flex-wrap items-center justify-center gap-3 pb-24 md:pb-28"
        style={{ "--d": "1.3s" } as React.CSSProperties}
      >
        <ButtonLink href="/#works" cursor="Работы">
          Мои работы
        </ButtonLink>
        <ButtonLink href={telegramLink()} external cursor="Telegram">
          Написать в Telegram
        </ButtonLink>
      </div>
    </section>
  );
}
