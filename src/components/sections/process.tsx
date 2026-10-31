"use client";

import { useEffect, useRef } from "react";
import { SectionHead } from "@/components/sections/section-head";
import { loadGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-media-query";
import { useNearViewport } from "@/hooks/use-near-viewport";

const steps = [
  {
    title: "Заявка и знакомство",
    text: "Вы пишете в Telegram или заполняете бриф ниже. Обсуждаем задачу, сроки и что важно именно вам.",
    meta: "1 день",
  },
  {
    title: "Структура и дизайн",
    text: "Собираю структуру и тексты-заголовки, затем рисую дизайн главных экранов. Вносим правки до согласования.",
    meta: "этап с правками",
  },
  {
    title: "Разработка и анимации",
    text: "Верстаю сайт, добавляю интерактив и анимации. Показываю промежуточную версию по ссылке.",
    meta: "демо по ссылке",
  },
  {
    title: "Запуск и поддержка",
    text: "Проверяю адаптив и скорость, подключаю домен и аналитику, передаю исходники. 14 дней помогаю после запуска.",
    meta: "14 дней поддержки",
  },
];

/** Скролл-сцена GSAP: линия прогресса заполняется, шаги подсвечиваются по очереди. */
export function Process() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const near = useNearViewport(root);

  useEffect(() => {
    if (reduced || !near || !root.current) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !root.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 60%", end: "bottom 60%", scrub: 0.6 },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 40 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 65%", end: "top 45%", scrub: true },
            },
          );
          gsap.fromTo(
            el.querySelector("[data-dot]"),
            { scale: 0.4, backgroundColor: "#3a3a3a" },
            {
              scale: 1,
              backgroundColor: "#f5f5f3",
              scrollTrigger: { trigger: el, start: "top 62%", end: "top 55%", scrub: true },
            },
          );
        });
      }, root);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced, near]);

  return (
    <section id="process" aria-label="Как это работает" className="section-y">
      <div className="container-x" ref={root}>
        <SectionHead n="04" label="Как это работает" title="От заявки до запуска за четыре шага" />
        <ol data-steps className="relative mt-16 md:mt-24 md:ml-[25%]">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
          <span
            aria-hidden
            data-line
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent"
          />
          {steps.map((s, i) => (
            <li key={s.title} data-step className="relative pb-16 pl-12 last:pb-0 md:pb-24 md:pl-20">
              <span
                aria-hidden
                data-dot
                className="absolute top-1.5 left-0 size-[15px] rounded-full bg-accent"
              />
              <p className="eyebrow">
                Шаг {String(i + 1).padStart(2, "0")} · {s.meta}
              </p>
              <h3 className="brutal mt-4 text-[clamp(1.8rem,4vw,3.4rem)]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-xl text-lg text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
