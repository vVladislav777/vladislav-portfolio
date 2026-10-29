import { VelocityMarquee } from "@/components/ui/velocity-marquee";

const top = ["Лендинги", "Многостраничные сайты", "Интерактив", "Анимации", "Адаптив", "Next.js"];
const bottom = ["Дизайн под идею", "Быстрая загрузка", "Сроки известны сразу", "Правки на каждом этапе", "Запуск под ключ"];

export function MarqueeBand() {
  return (
    <section aria-label="Услуги и ключевые слова" className="relative z-10 -mt-6 overflow-hidden py-10">
      <div className="-mx-10 -rotate-2 bg-accent py-4 text-accent-fg [&_.bg-accent]:bg-accent-fg">
        <VelocityMarquee
          items={top}
          baseVelocity={2.2}
          className="font-display text-[clamp(1.6rem,4.5vw,3.5rem)] font-bold uppercase"
        />
      </div>
      <div className="-mx-10 mt-2 rotate-1 border-y border-line bg-bg py-3">
        <VelocityMarquee
          items={bottom}
          baseVelocity={-1.4}
          className="text-[clamp(1rem,2vw,1.4rem)] font-medium tracking-wide text-muted uppercase"
        />
      </div>
    </section>
  );
}
