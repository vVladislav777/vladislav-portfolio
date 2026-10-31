"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "@/hooks/use-media-query";

type Particle = { x: number; y: number; r: number; life: number; max: number };

const MAX_PARTICLES = 1400;

/**
 * Курсор-баллончик: точка с mix-blend-difference и «распыление» на canvas,
 * которое тянется за движением и рассеивается. Над ссылками точка растёт,
 * над элементами с data-cursor="Подпись" рядом появляется стеклянная плашка.
 * На сенсорных устройствах и при reduced-motion не рендерится.
 */
export function Cursor() {
  const enabled = useFinePointer();
  if (!enabled) return null;
  return <CursorInner />;
}

function CursorInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const lx = useSpring(x, { stiffness: 400, damping: 32, mass: 0.5 });
  const ly = useSpring(y, { stiffness: 400, damping: 32, mass: 0.5 });
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const particles: Particle[] = [];
    let raf = 0;
    let last: { x: number; y: number; t: number } | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spray = (px: number, py: number, speed: number) => {
      // Чем быстрее движение, тем шире и гуще облако краски
      const count = Math.min(26, 6 + speed * 0.9);
      const spread = 3 + Math.min(18, speed * 0.35);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.abs(gauss()) * spread;
        const max = 0.5 + Math.random() * 0.7;
        particles.push({ x: px + Math.cos(a) * d, y: py + Math.sin(a) * d, r: Math.random() * 1.3 + 0.35, life: max, max });
      }
      if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
    };

    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = "#fff";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.min(1, (p.life / p.max) * 1.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = particles.length ? requestAnimationFrame(tick) : 0;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = performance.now();
      if (last) {
        const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
        const steps = Math.max(1, Math.floor(dist / 6));
        const speed = dist / Math.max(1, t - last.t) * 16;
        for (let s = 1; s <= steps; s++) {
          spray(last.x + ((e.clientX - last.x) * s) / steps, last.y + ((e.clientY - last.y) * s) / steps, speed);
        }
      }
      last = { x: e.clientX, y: e.clientY, t };
      if (!raf) {
        prev = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const over = (e: PointerEvent) => {
      const el = e.target as Element | null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor || null);
      setActive(Boolean(el?.closest("a, button, [role='button'], label, summary")));
    };
    const leave = () => {
      setVisible(false);
      last = null;
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    root.addEventListener("pointerleave", leave);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
    };
  }, [x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <canvas ref={canvasRef} className="absolute inset-0 size-full mix-blend-difference" />
      <m.div
        className="absolute top-0 left-0 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: active ? 34 : 9, height: active ? 34 : 9, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      />
      <AnimatePresence>
        {label && visible && (
          <m.div key="cursor-label" className="absolute top-0 left-0" style={{ x: lx, y: ly }}>
            <m.span
              key={label}
              initial={{ opacity: 0, scale: 0.7, x: 18, y: 14 }}
              animate={{ opacity: 1, scale: 1, x: 24, y: 18 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="glass block rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-fg"
            >
              {label}
            </m.span>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function gauss() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
}
