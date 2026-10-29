"use client";

import { useState } from "react";
import { m } from "motion/react";
import { works, workTypes, type WorkType } from "@/data/works";
import { WorkCard } from "@/components/works/work-card";
import { WorksCounter } from "@/components/works/works-counter";
import { cn } from "@/lib/utils";

type Filter = "Все" | WorkType;

export function WorksExplorer() {
  const [filter, setFilter] = useState<Filter>("Все");
  // Первую отрисовку не анимируем: обложки сразу видны (быстрый LCP).
  const [touched, setTouched] = useState(false);
  const list = filter === "Все" ? works : works.filter((w) => w.type === filter);
  const filters: Filter[] = ["Все", ...workTypes];

  return (
    <section aria-label="Список работ" className="pb-[var(--section)]">
      <div className="container-x">
        <h2 className="sr-only">Список работ</h2>
        <div role="group" aria-label="Фильтр по типу" className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const count = f === "Все" ? works.length : works.filter((w) => w.type === f).length;
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(f);
                    setTouched(true);
                  }}
                  className={cn(
                    "h-11 rounded-full border px-5 text-sm transition-colors duration-300",
                    active ? "border-accent bg-accent text-accent-fg" : "border-line hover:border-fg/60",
                  )}
                >
                  <span>
                    {f} <sup className="text-[0.65em] opacity-70">{count}</sup>
                  </span>
                </button>
              );
            })}
        </div>

        <WorksCounter key={filter} total={list.length} titles={list.map((w) => w.title)}>
          <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {list.map((work, i) => (
                <m.li
                  key={work.slug}
                  data-work-index={i}
                  initial={touched ? { opacity: 0, y: 40 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                >
                  <WorkCard work={work} index={i} total={list.length} priority={i < 2} />
                </m.li>
              ))}
          </ul>
        </WorksCounter>
      </div>
    </section>
  );
}
