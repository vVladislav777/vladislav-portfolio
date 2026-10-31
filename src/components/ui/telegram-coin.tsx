"use client";

import { useRef } from "react";
import { m, useAnimationFrame, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const PLANE =
  "M21.9 4.3 18.6 19.8c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L5.9 13.4 1 11.9c-1.1-.3-1.1-1.1.2-1.6L20.6 2.9c.9-.3 1.7.2 1.3 1.4z";

const EDGE_LAYERS = 12;
const DEPTH = 14; // толщина монеты, px

/**
 * Объёмная ч/б «монета» с логотипом Telegram. Постоянно вращается, при
 * наведении ускоряется и наклоняется к курсору, её можно раскрутить
 * перетаскиванием; клик открывает Telegram. При reduced-motion стоит на месте.
 */
export function TelegramCoin({ href, size = 176, className }: { href: string; size?: number; className?: string }) {
  const reduced = useReducedMotion();
  const rotY = useMotionValue(-20);
  const tiltX = useMotionValue(0);
  const tilt = useSpring(tiltX, { stiffness: 150, damping: 15 });
  const speed = useRef(70); // град/с
  const target = useRef(70);
  const drag = useRef<{ x: number; t: number; moved: number } | null>(null);

  useAnimationFrame((_, delta) => {
    if (reduced || drag.current) return;
    const dt = delta / 1000;
    speed.current += (target.current - speed.current) * Math.min(1, dt * 3);
    rotY.set(rotY.get() + speed.current * dt);
  });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (drag.current) {
      const dx = e.clientX - drag.current.x;
      const dt = Math.max(1, e.timeStamp - drag.current.t);
      rotY.set(rotY.get() + dx * 1.2);
      speed.current = (dx / dt) * 1000 * 1.2;
      drag.current = { x: e.clientX, t: e.timeStamp, moved: drag.current.moved + Math.abs(dx) };
      return;
    }
    tiltX.set(((e.clientY - (r.top + r.height / 2)) / r.height) * -30);
  };

  const onDown = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, t: e.timeStamp, moved: 0 };
  };
  const onUp = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const moved = drag.current?.moved ?? 0;
    drag.current = null;
    // Перетаскивание не должно открывать ссылку
    if (moved > 6) e.currentTarget.dataset.dragged = "1";
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Telegram"
      data-cursor="Крутани"
      draggable={false}
      onPointerEnter={() => (target.current = 260)}
      onPointerLeave={() => {
        target.current = 70;
        tiltX.set(0);
      }}
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onClick={(e) => {
        if (e.currentTarget.dataset.dragged) {
          e.preventDefault();
          delete e.currentTarget.dataset.dragged;
        }
      }}
      className={cn("group relative inline-block touch-pan-y select-none [perspective:900px]", className)}
      style={{ width: size, height: size }}
    >
      <m.span
        className="absolute inset-0 block [transform-style:preserve-3d]"
        style={{ rotateY: rotY, rotateX: tilt }}
      >
        {/* Ребро: стопка колец между лицевыми сторонами */}
        {Array.from({ length: EDGE_LAYERS }, (_, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#3a3a3a,#cfcfcf_45%,#5a5a5a)]"
            style={{ transform: `translateZ(${-DEPTH / 2 + (DEPTH / (EDGE_LAYERS - 1)) * i}px)` }}
          />
        ))}
        <Face side="front" />
        <Face side="back" />
      </m.span>
      <span
        aria-hidden
        className="absolute -bottom-8 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/30 blur-md transition-all duration-500 group-hover:w-2/3 group-hover:bg-black/40"
      />
    </a>
  );
}

function Face({ side }: { side: "front" | "back" }) {
  const front = side === "front";
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 grid place-items-center rounded-full [backface-visibility:hidden]",
        front
          ? "bg-[radial-gradient(circle_at_30%_25%,#4a4a4a,#0a0a0a_55%,#000)] text-white shadow-[inset_0_2px_6px_rgba(255,255,255,0.25),inset_0_-6px_14px_rgba(0,0,0,0.6)]"
          : "bg-[radial-gradient(circle_at_30%_25%,#ffffff,#d6d6d3_55%,#9a9a97)] text-black shadow-[inset_0_2px_6px_rgba(255,255,255,0.9),inset_0_-6px_14px_rgba(0,0,0,0.25)]",
      )}
      style={{ transform: front ? `translateZ(${DEPTH / 2 + 0.5}px)` : `rotateY(180deg) translateZ(${DEPTH / 2 + 0.5}px)` }}
    >
      <span className="absolute inset-[7%] rounded-full border border-current opacity-25" />
      <svg viewBox="0 0 24 24" className="relative w-[44%] translate-x-[-4%]" fill="currentColor">
        <path d={PLANE} />
      </svg>
      {/* Блик, который «бежит» по металлу */}
      <span className="absolute inset-0 rounded-full bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] mix-blend-overlay" />
    </span>
  );
}
