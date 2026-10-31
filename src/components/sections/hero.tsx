import { LayoutTemplate, Layers, Sparkles, Smartphone } from "lucide-react";
import { telegramLink } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { HeroBackground } from "@/components/sections/hero-background";
import { BrutalName } from "@/components/sections/brutal-name";

// Ряд стеклянных «пилюль» во всю ширину под именем, как кнопки в референсе
const pills = [
  { label: "Лендинги", Icon: LayoutTemplate },
  { label: "Сайты", Icon: Layers },
  { label: "Анимации", Icon: Sparkles },
  { label: "Адаптив", Icon: Smartphone },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="theme-dark relative isolate flex min-h-svh flex-col overflow-hidden">
      <HeroBackground />

      <div className="container-x pt-20 md:pt-24">
        <p
          className="fade-up flex items-center justify-between gap-4 text-xs font-bold text-[#efece4] md:text-base"
          style={{ "--d": "0.1s" } as React.CSSProperties}
        >
          <span>Веб-дизайн и разработка</span>
          <span className="hidden sm:inline">Лендинги · Сайты · 2026</span>
          <span>Портфолио ©</span>
        </p>

        <div className="mt-3 md:mt-4">
          <BrutalName text="Vladislav" />
        </div>

        <ul className="mt-3 grid grid-cols-2 gap-2 md:mt-4 md:grid-cols-4 md:gap-3">
          {pills.map(({ label, Icon }, i) => (
            <li
              key={label}
              className="glass fade-up flex h-10 items-center justify-center gap-2 rounded-full text-xs font-semibold md:h-11 md:text-sm"
              style={{ "--d": `${0.9 + i * 0.08}s` } as React.CSSProperties}
            >
              <Icon aria-hidden className="size-4" strokeWidth={1.7} />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x flex flex-1 flex-col items-start justify-end gap-8 pt-10 pb-28 md:flex-row md:items-end md:justify-between md:pb-32">
        <p
          className="fade-up max-w-md text-xl leading-tight font-bold text-balance text-[#efece4] md:text-3xl"
          style={{ "--d": "1.2s" } as React.CSSProperties}
        >
          Веб-дизайнер и разработчик лендингов. Делаю сайты, которые запоминаются и продают.
        </p>
        <div className="fade-up flex flex-wrap items-center gap-4" style={{ "--d": "1.35s" } as React.CSSProperties}>
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
