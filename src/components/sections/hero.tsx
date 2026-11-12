import { telegramLink, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { ChaosName } from "@/components/sections/chaos-name";
import { HeroBackground } from "@/components/sections/hero-background";

/**
 * Первый экран в стиле постера «CHAOS»: светлый лист на живом шейдере,
 * жидкое размытое название по центру и две одинаковые металлические кнопки.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="theme-light relative isolate flex min-h-svh flex-col overflow-hidden pt-20"
    >
      <HeroBackground />

      <div className="container-x flex flex-1 flex-col items-center justify-center py-8">
        <h1 id="hero-title" className="w-full max-w-6xl">
          <ChaosName text={site.brand} />
        </h1>
      </div>

      <div
        className="fade-up container-x flex flex-wrap items-center justify-center gap-3 pb-24 md:pb-28"
        style={{ "--d": "1.3s" } as React.CSSProperties}
      >
        <ButtonLink href={telegramLink("Здравствуйте! Хочу обсудить проект. Мой бизнес: ... Нужен сайт для: ...")} external cursor="Telegram">
          Обсудить проект
        </ButtonLink>
        <ButtonLink href="/#works" cursor="Работы">
          Смотреть работы
        </ButtonLink>
      </div>
    </section>
  );
}
