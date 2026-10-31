"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, Send } from "lucide-react";
import { TLink } from "@/components/ui/t-link";
import { Magnetic } from "@/components/ui/magnetic";
import { navItems } from "@/components/layout/nav-items";
import { site, telegramLink } from "@/config/site";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { cn } from "@/lib/utils";

/** Клик по якорю на главной — плавный скролл через Lenis без перезагрузки. */
function useAnchorClick(onDone?: () => void) {
  const pathname = usePathname();
  return (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== "/" || !href.startsWith("/#")) {
      onDone?.();
      return;
    }
    e.preventDefault();
    const id = href.slice(1);
    onDone?.();
    window.history.replaceState(null, "", id);
    requestAnimationFrame(() => scrollToTarget(id));
  };
}

/**
 * Навигация как в референсе: сверху только подпись и статус, снизу —
 * плавающая стеклянная «пилюля» с кнопками «Меню» и «Связаться».
 */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-[70]"
      >
        <div className="container-x flex h-18 items-center justify-between gap-6 md:h-20">
          <TLink
            href="/"
            className="glass pointer-events-auto rounded-full bg-black/60! px-3.5 py-1.5 text-lg leading-none font-extrabold tracking-[-0.04em] text-white lowercase"
            aria-label={`${site.brand}. На главную`}
          >
            {site.brand}
          </TLink>
          <span className="glass pointer-events-auto hidden items-center gap-2 rounded-full bg-black/60! px-3.5 py-2 text-xs font-medium text-white sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-fg opacity-50 [animation-duration:2s]" />
              <span className="relative inline-flex size-2 rounded-full bg-fg" />
            </span>
            Беру проекты
          </span>
        </div>
      </header>

      <nav
        aria-label="Основная навигация"
        style={{ viewTransitionName: "site-dock" }}
        className="fixed inset-x-0 bottom-4 z-[72] flex justify-center px-4 md:bottom-6"
      >
        <div className="glass flex w-full max-w-[22rem] items-center justify-between gap-2 rounded-[1.4rem] bg-black/65! p-1.5 text-white">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex h-11 items-center gap-3 rounded-[1rem] px-4 text-sm font-semibold transition-colors hover:bg-white/10"
          >
            <span className="relative block h-2.5 w-4" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300",
                  open ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300",
                  open ? "top-1/2 -rotate-45" : "bottom-0",
                )}
              />
            </span>
            {open ? "Закрыть" : "Меню"}
          </button>
          <Magnetic strength={0.2}>
            <a
              href={telegramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center gap-2 rounded-[1rem] px-4 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-fg" />
              Связаться
            </a>
          </Magnetic>
        </div>
      </nav>

      <SiteMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function SiteMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const onAnchor = useAnchorClick(onClose);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !ref.current) return;
      // Ловушка фокуса внутри меню.
      const nodes = ref.current.querySelectorAll<HTMLElement>("a, button");
      const list = Array.from(nodes);
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      opener?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="site-menu"
          className="fixed inset-0 z-[71] flex items-end justify-center bg-black/60 px-4 pb-24 md:pb-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <m.div
            ref={ref}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
            className="glass w-full max-w-[22rem] overflow-hidden rounded-[1.6rem] bg-black/70! p-2 text-fg [backdrop-filter:blur(30px)_saturate(160%)]!"
            initial={{ y: 40, scale: 0.94, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <TLink
                    href={item.href}
                    onClick={(e) => onAnchor(e, item.href)}
                    className="group flex items-center justify-between rounded-[1rem] px-4 py-2.5 transition-colors hover:bg-white/10"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.65rem] text-muted">{item.n}</span>
                      <span className="brutal text-[1.6rem] leading-none tracking-[-0.04em]">{item.label}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </TLink>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-2">
              <a
                href={telegramLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-2 rounded-[1rem] bg-fg text-sm font-semibold text-bg"
              >
                <Send aria-hidden className="size-4" /> Telegram
              </a>
              <a
                href={site.channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex h-11 items-center justify-center rounded-[1rem] text-sm font-semibold"
              >
                Канал
              </a>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
