import { LayoutTemplate, MonitorSmartphone, Rocket, Sparkles } from "lucide-react";
import { SectionHead } from "@/components/sections/section-head";
import { Reveal } from "@/components/ui/reveal";

const skills = [
  { Icon: LayoutTemplate, title: "Лендинги и многостраничные сайты" },
  { Icon: Sparkles, title: "Современный дизайн и анимации" },
  { Icon: MonitorSmartphone, title: "Адаптив под телефон и компьютер" },
  { Icon: Rocket, title: "Запуск сайта, помощь с хостингом и доменом" },
];

export function About() {
  return (
    <section id="about" aria-label="Обо мне" className="section-y">
      <div className="container-x">
        <SectionHead n="01" label="Обо мне" title="Меня зовут Влад" />

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <p className="brutal text-[clamp(5rem,16vw,12rem)] leading-[0.8]">16</p>
            <p className="mt-3 text-sm font-bold tracking-[0.2em] text-muted uppercase">лет</p>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal>
              <p className="text-xl leading-snug md:text-3xl">
                Я делаю сайты под заказ и каждый проект собираю под конкретную задачу, а не из шаблона.
              </p>
              <p className="mt-6 text-lg text-muted md:text-xl">
                Моя цель, чтобы сайт не просто красиво выглядел, а помогал бизнесу получать заявки.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-12 text-xs font-bold tracking-[0.2em] uppercase">Что я делаю</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {skills.map(({ Icon, title }) => (
                  <li key={title} className="glass flex items-center gap-4 rounded-card p-4">
                    <span className="glass flex size-11 shrink-0 items-center justify-center rounded-2xl">
                      <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-sm font-semibold md:text-base">{title}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
