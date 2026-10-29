"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { pad } from "@/lib/utils";

/**
 * Липкий счётчик «01 / 05»: показывает кейс, который сейчас в центре экрана
 * (или под курсором). Цифры сменяются вертикальной «прокруткой».
 */
export function WorksCounter({
  total,
  titles,
  children,
}: {
  total: number;
  titles: string[];
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-work-index]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.workIndex));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-work-index]");
      if (el) setActive(Number(el.dataset.workIndex));
    };
    root.addEventListener("pointerover", onOver);
    return () => {
      io.disconnect();
      root.removeEventListener("pointerover", onOver);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="sticky top-18 z-20 -mx-[var(--gutter)] mt-12 flex items-center justify-between gap-6 border-b border-line bg-bg/80 px-[var(--gutter)] py-4 backdrop-blur-md md:top-20">
        <div className="flex items-baseline gap-2 font-display text-3xl font-semibold tabular-nums md:text-5xl">
          <span className="relative inline-flex h-[1.1em] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                key={active}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-accent"
              >
                {pad(active + 1)}
              </m.span>
            </AnimatePresence>
          </span>
          <span className="text-muted">/ {pad(total)}</span>
        </div>
        <p className="truncate text-right text-sm text-muted md:text-base">{titles[active]}</p>
      </div>
      {children}
    </div>
  );
}
