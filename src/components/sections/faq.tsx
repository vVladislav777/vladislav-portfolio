"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { SectionHead } from "@/components/sections/section-head";
import { cn } from "@/lib/utils";

const items = [
  {
    q: "Сколько стоит сайт?",
    a: "Цена договорная. Она зависит от объёма, сроков и сложности. Напишите мне в Telegram, коротко обсудим задачу, и я назову сумму.",
  },
  {
    q: "Сколько времени занимает работа?",
    a: "Лендинг обычно занимает от двух до трёх недель, многостраничный сайт дольше. Точный план с этапами и датами вы получите до старта.",
  },
  {
    q: "Нужно ли готовить тексты и фото?",
    a: "Хорошо, если они есть. Если нет, помогу со структурой и заголовками, подскажу, какие фото нужны, и поставлю аккуратные заглушки на время.",
  },
  {
    q: "Сколько будет правок?",
    a: "Правки вносим на каждом этапе: в структуре, дизайне и после разработки. Так мы не переделываем всё в последний день.",
  },
  {
    q: "Анимации не замедлят сайт?",
    a: "Нет. Тяжёлые библиотеки подгружаются только там, где нужны, картинки сжимаются, а при включённой настройке «уменьшить движение» эффекты упрощаются.",
  },
  {
    q: "Что будет после запуска?",
    a: "Вы получаете исходники и доступы. 14 дней после запуска я бесплатно исправляю мелочи и помогаю освоиться.",
  },
];

/**
 * Аккордеон FAQ. Идея подачи — «Animated Line Accordion» (shadcnspace) из
 * каталога 21st.dev: подсветка активного пункта и плюс, превращающийся в минус.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" aria-label="Частые вопросы" className="section-y">
      <div className="container-x">
        <SectionHead n="07" label="FAQ" title="Частые вопросы" />
        <ul className="mt-16 md:mt-24 md:ml-[25%]">
          {items.map((item, i) => {
            const isOpen = open === i;
            const btn = `${base}-b${i}`;
            const panel = `${base}-p${i}`;
            return (
              <li
                key={item.q}
                className={cn(
                  "border-b border-line transition-colors duration-500",
                  isOpen && "border-fg",
                )}
              >
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-display text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-lg font-bold tracking-tight uppercase md:text-2xl">{item.q}</span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "relative grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                        isOpen ? "border-fg bg-fg text-bg" : "glass border-transparent group-hover:scale-105",
                      )}
                    >
                      <span className="absolute h-px w-3.5 bg-current" />
                      <span
                        className={cn(
                          "absolute h-3.5 w-px bg-current transition-transform duration-300",
                          isOpen && "scale-y-0",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panel}
                      role="region"
                      aria-labelledby={btn}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 pl-8 text-lg text-muted md:pl-9">{item.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
