"use client";

import { useCallback, useState } from "react";
import { m } from "motion/react";
import { works, type WorkType } from "@/data/works";
import { SectionHead } from "@/components/sections/section-head";
import { VideoCard } from "@/components/works/video-card";
import { VideoModal } from "@/components/works/video-modal";
import { cn } from "@/lib/utils";

type Filter = "Все" | WorkType;
const FILTERS: Filter[] = ["Все", "Лендинг", "Многостраничный"];

/** Портфолио как на patison10: счётчик, фильтры, видео-карточки и окно с подробностями. */
export function WorksSection() {
  const [filter, setFilter] = useState<Filter>("Все");
  const [open, setOpen] = useState<number | null>(null);
  const list = filter === "Все" ? works : works.filter((w) => w.type === filter);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="works" aria-label="Работы" className="section-y">
      <div className="container-x">
        <SectionHead n="02" label="Портфолио" title="Посмотри мои работы" />

        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 md:mt-16">
          <p className="flex items-end gap-3">
            <span className="brutal text-[clamp(4rem,10vw,7rem)] leading-[0.8]">{works.length}</span>
            <span className="pb-1 font-mono text-xs leading-tight tracking-[0.18em] text-muted uppercase">
              работы
              <br />в портфолио
            </span>
          </p>
          <div role="group" aria-label="Фильтр по типу" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const count = f === "Все" ? works.length : works.filter((w) => w.type === f).length;
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "h-11 rounded-full px-5 text-sm font-semibold transition-colors duration-300",
                    active ? "bg-fg text-bg" : "glass hover:bg-white/10",
                  )}
                >
                  {f} <sup className="text-[0.65em] opacity-70">{count}</sup>
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {list.map((work, i) => (
            <m.li
              key={`${filter}-${work.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <VideoCard work={work} index={works.indexOf(work)} onOpen={() => setOpen(works.indexOf(work))} />
            </m.li>
          ))}
        </ul>
      </div>

      <VideoModal works={works} index={open} onClose={close} onIndex={setOpen} />
    </section>
  );
}
