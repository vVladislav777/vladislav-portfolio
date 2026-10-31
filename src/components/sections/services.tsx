import { SectionHead } from "@/components/sections/section-head";
import { LayoutTemplate, Layers, MousePointerClick, MonitorSmartphone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const services = [
  {
    title: "Лендинги",
    Icon: LayoutTemplate,
    text: "Одностраничные сайты под продукт, услугу или запуск. Структура, тексты-заголовки, дизайн и вёрстка, которые ведут к заявке.",
    tags: ["Структура", "Дизайн", "Вёрстка", "Формы"],
  },
  {
    title: "Многостраничные сайты",
    Icon: Layers,
    text: "Сайты компаний, каталоги и журналы. Продумываю навигацию так, чтобы человек находил нужное за пару кликов.",
    tags: ["Навигация", "Каталоги", "Шаблоны страниц"],
  },
  {
    title: "Интерактив и анимации",
    Icon: MousePointerClick,
    text: "Анимации при скролле, кастомные курсоры, переходы между страницами, живые меню. Эффекты помогают истории, а не тормозят сайт.",
    tags: ["GSAP", "Framer Motion", "Микроанимации"],
  },
  {
    title: "Адаптив",
    Icon: MonitorSmartphone,
    text: "Сайт одинаково хорошо выглядит на телефоне, планшете и большом мониторе. Проверяю на реальных ширинах экранов.",
    tags: ["Mobile first", "360–1920 px", "Скорость"],
  },
];

export function Services() {
  return (
    <section id="services" aria-label="Что я делаю" className="section-y">
      <div className="container-x">
        <SectionHead n="02" label="Что я делаю" title="Сайты, которые хочется листать" />
        <ol className="mt-16 border-t border-line md:mt-24">
          {services.map((s, i) => (
            <li key={s.title} className="border-b border-line">
              <Reveal>
                <div className="group grid gap-4 py-8 transition-colors md:grid-cols-12 md:gap-8 md:py-12">
                  <span className="glass flex size-12 items-center justify-center rounded-2xl md:col-span-1">
                    <s.Icon aria-hidden className="size-5" strokeWidth={1.6} />
                    <span className="sr-only">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <h3 className="brutal text-[clamp(1.9rem,3.6vw,3.4rem)] break-words hyphens-auto transition-transform duration-500 ease-out-expo md:col-span-5 md:group-hover:translate-x-3">
                    {s.title}
                  </h3>
                  <div className="md:col-span-6 md:pt-2">
                    <p className="text-lg text-muted">{s.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Что входит">
                      {s.tags.map((t) => (
                        <li key={t} className="glass rounded-full px-3 py-1.5 text-xs font-medium">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
