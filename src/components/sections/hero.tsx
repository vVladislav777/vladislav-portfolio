import { LayoutTemplate, Layers, Sparkles, Smartphone } from "lucide-react";
import { telegramLink } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { HeroBackground } from "@/components/sections/hero-background";
import { cn } from "@/lib/utils";

// Стеклянные «пилюли» вокруг имени, как в референсе
const pills = [
  { label: "Лендинги", Icon: LayoutTemplate, pos: "left-[4%] top-[18%] md:left-[14%] md:top-[22%]", dur: "6s" },
  { label: "Сайты", Icon: Layers, pos: "right-[4%] top-[12%] md:right-[16%] md:top-[18%]", dur: "7s" },
  { label: "Анимации", Icon: Sparkles, pos: "left-[22%] bottom-[8%] md:left-[34%] md:bottom-[6%]", dur: "5.5s" },
  { label: "Адаптив", Icon: Smartphone, pos: "right-[8%] bottom-[14%] md:right-[22%] md:bottom-[12%]", dur: "6.5s" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="theme-dark relative isolate flex min-h-svh flex-col overflow-hidden">
      <HeroBackground />

      <div className="flex justify-center pt-20 md:pt-24">
        <p className="glass fade-up rounded-full px-4 py-2 text-[0.7rem] font-semibold tracking-[0.22em] uppercase" style={{ "--d": "0.1s" } as React.CSSProperties}>
          Web designer &amp; developer
        </p>
      </div>

      <div className="container-x flex flex-1 flex-col items-center justify-center pb-28 md:pb-32">
        <div className="relative w-full py-6 md:py-10">
          <h1
            id="hero-title"
            className="marker-write relative z-10 text-center font-marker text-[clamp(4.6rem,21vw,20rem)] leading-[0.85] text-white mix-blend-difference select-none"
            style={{ transform: "rotate(-4deg)" }}
          >
            Vladislav
          </h1>
          {pills.map(({ label, Icon, pos, dur }, i) => (
            <span
              key={label}
              className={cn("absolute z-20 hidden sm:block", pos)}
            >
              <span
                className="glass float-y fade-up flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium"
                style={{ "--dur": dur, "--d": `${1.2 + i * 0.12}s` } as React.CSSProperties}
              >
                <Icon aria-hidden className="size-4" strokeWidth={1.6} />
                {label}
              </span>
            </span>
          ))}
        </div>

        <p
          className="glass fade-up mt-2 max-w-xl rounded-[1.5rem] px-6 py-4 text-center text-base text-balance md:text-lg"
          style={{ "--d": "1.4s" } as React.CSSProperties}
        >
          Веб-дизайнер и разработчик лендингов. Делаю сайты, которые запоминаются и продают.
        </p>

        <div className="fade-up mt-8 flex flex-wrap items-center justify-center gap-4" style={{ "--d": "1.6s" } as React.CSSProperties}>
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
