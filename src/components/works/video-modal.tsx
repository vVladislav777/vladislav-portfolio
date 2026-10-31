"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { type Work, workPoster, workVideo } from "@/data/works";
import { ButtonLink } from "@/components/ui/button";
import { telegramLink } from "@/config/site";
import { getLenis } from "@/lib/lenis";
import { pad } from "@/lib/utils";

/**
 * Окно работы: цветное видео со звуком выключенным, описание, теги,
 * кнопка «Хочу такой же» и листание «1 / 4». Esc закрывает, стрелки листают.
 */
export function VideoModal({
  works,
  index,
  onClose,
  onIndex,
}: {
  works: Work[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const work = open ? works[index] : null;

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      opener?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % works.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + works.length) % works.length);
      if (e.key !== "Tab" || !ref.current) return;
      // Ловушка фокуса внутри окна
      const list = Array.from(ref.current.querySelectorAll<HTMLElement>("button, a, video[controls]"));
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, works.length, onClose, onIndex]);

  return (
    <AnimatePresence>
      {work && index !== null && (
        <m.div
          key="video-modal"
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/80 p-3 backdrop-blur-sm md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <m.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
            className="glass relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] bg-black/70! [backdrop-filter:blur(30px)_saturate(160%)]!"
            initial={{ y: 60, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 40, scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="glass absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full"
            >
              <X aria-hidden className="size-5" />
            </button>

            <video
              key={work.slug}
              src={workVideo(work.slug)}
              poster={workPoster(work.slug)}
              autoPlay
              muted
              loop
              playsInline
              controls
              aria-label={`${work.title}: видео-обзор сайта`}
              className="aspect-[16/9] w-full rounded-t-[1.75rem] bg-black object-cover object-top"
            />

            <div className="p-5 md:p-8">
              <p className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
                {pad(index + 1)} · {work.type} · {work.duration}
              </p>
              <h2 id="work-modal-title" className="brutal mt-3 text-[clamp(2rem,5vw,3.5rem)]">
                {work.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{work.kind}</p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed md:text-lg">{work.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Теги">
                {work.tags.map((t) => (
                  <li key={t} className="glass rounded-full px-3 py-1 text-xs font-medium">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
                <ButtonLink
                  href={telegramLink(`Здравствуйте! Посмотрел работу «${work.title}». Хочу такой же сайт.`)}
                  external
                  magnetic={false}
                >
                  Хочу такой же
                </ButtonLink>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Предыдущая работа"
                    onClick={() => onIndex((index - 1 + works.length) % works.length)}
                    className="glass grid size-11 place-items-center rounded-full"
                  >
                    <ArrowLeft aria-hidden className="size-5" />
                  </button>
                  <span className="font-mono text-sm tabular-nums" aria-live="polite">
                    {index + 1} / {works.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Следующая работа"
                    onClick={() => onIndex((index + 1) % works.length)}
                    className="glass grid size-11 place-items-center rounded-full"
                  >
                    <ArrowRight aria-hidden className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
