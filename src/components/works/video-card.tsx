"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { type Work, workPoster, workVideo } from "@/data/works";
import { useReducedMotion } from "@/hooks/use-media-query";
import { pad } from "@/lib/utils";

/**
 * Карточка работы как на patison10: превью-видео без звука крутится в ч/б,
 * пока карточка на экране, и становится цветным при наведении или фокусе.
 * Клик открывает окно с подробностями.
 */
export function VideoCard({ work, index, onOpen }: { work: Work; index: number; onOpen: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (reduced) { v.pause(); return; }
    let inView = false;
    const sync = () => {
      if (inView && document.visibilityState === "visible") v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    return () => { io.disconnect(); v.pause(); document.removeEventListener("visibilitychange", sync); };
  }, [reduced]);

  return (
    <article className="group">
      <button
        type="button"
        onClick={onOpen}
        data-cursor="Смотреть"
        aria-label={`${work.title}: смотреть видео и описание`}
        className="block w-full overflow-hidden rounded-card text-left focus-visible:outline-offset-4"
      >
        <span className="relative block aspect-[16/9] overflow-hidden rounded-card bg-surface">
          <video
            ref={video}
            src={workVideo(work.slug)}
            poster={workPoster(work.slug)}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="absolute inset-0 size-full object-cover object-top grayscale transition-[filter,scale] duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-within:grayscale-0"
          />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="glass absolute bottom-4 left-4 rounded-full px-3 py-1.5 text-xs font-semibold">Смотреть</span>
        </span>
      </button>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
            {pad(index + 1)} · {work.type} · {work.duration}
          </p>
          <h3 className="brutal mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)]">{work.title}</h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Теги">
            {work.tags.map((t) => (
              <li key={t} className="glass rounded-full px-3 py-1 text-xs font-medium">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Открыть ${work.title}`}
          className="glass grid size-12 shrink-0 place-items-center rounded-full transition-transform duration-500 hover:rotate-45"
        >
          <ArrowUpRight aria-hidden className="size-5" />
        </button>
      </div>
      <p className="mt-5 max-w-xl leading-relaxed text-muted"><span className="font-semibold text-fg">Задача: </span>{work.task}</p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted"><span className="font-semibold text-fg">Реализовано: </span>{work.features.join(" · ")}.</p>
      <button type="button" onClick={onOpen} className="mt-4 min-h-11 text-sm font-semibold underline underline-offset-4" aria-label={`Смотреть видео проекта ${work.title}`}>Смотреть видео проекта ↗</button>
      {work.url !== "#" && <a href={work.url} target="_blank" rel="noopener noreferrer" className="ml-5 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Открыть сайт ↗</a>}
    </article>
  );
}
