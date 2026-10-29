"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
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

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onAnchor = useAnchorClick();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > 400 && v > prev);
  });

  return (
    <>
      <m.header
        style={{ viewTransitionName: "site-header" }}
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-colors duration-500",
          scrolled && "bg-bg/75 backdrop-blur-md",
        )}
      >
        <div className="container-x flex h-18 items-center justify-between gap-6 md:h-20">
          <TLink
            href="/"
            className="font-display text-lg font-bold tracking-tight"
            aria-label="Влад. На главную"
          >
            Влад<span className="text-accent">.</span>
          </TLink>

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <TLink
                    href={item.href}
                    onClick={(e) => onAnchor(e, item.href)}
                    className="group flex items-baseline gap-1.5 text-sm"
                  >
                    <span className="text-[0.65rem] text-muted transition-colors group-hover:text-accent">
                      {item.n}
                    </span>
                    <span className="link-underline">{item.label}</span>
                  </TLink>
                </li>
              ))}
              <li>
                <TLink href="/works" className="link-underline text-sm">
                  Все работы
                </TLink>
              </li>
            </ul>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <span className="flex items-center gap-2 text-xs text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 [animation-duration:2s]" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Беру проекты
            </span>
            <Magnetic>
              <a
                href={telegramLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent"
              >
                Telegram
              </a>
            </Magnetic>
          </div>

          <MenuButton open={open} onToggle={() => setOpen((v) => !v)} className="lg:hidden" />
        </div>
      </m.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MenuButton({
  open,
  onToggle,
  className,
}: {
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Закрыть меню" : "Открыть меню"}
      className={cn(
        "relative z-[76] flex h-11 items-center gap-3 rounded-full border border-line bg-bg/60 px-4 text-sm backdrop-blur",
        className,
      )}
    >
      <span className="relative block h-2.5 w-4" aria-hidden>
        <span
          className={cn(
            "absolute left-0 h-px w-full bg-current transition-transform duration-300",
            open ? "top-1/2 rotate-45" : "top-0",
          )}
        />
        <span
          className={cn(
            "absolute left-0 h-px w-full bg-current transition-transform duration-300",
            open ? "top-1/2 -rotate-45" : "bottom-0",
          )}
        />
      </span>
      {open ? "Закрыть" : "Меню"}
    </button>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
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
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className="fixed inset-0 z-[75] flex flex-col bg-surface pt-24 lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-11 items-center rounded-full border border-line px-4 text-sm"
          >
            Закрыть
          </button>
          <nav aria-label="Мобильная навигация" className="container-x flex-1 overflow-y-auto">
            <ul className="flex flex-col">
              {[...navItems, { href: "/works", label: "Все работы", n: "07" }].map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-line">
                  <m.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TLink
                      href={item.href}
                      onClick={(e) => onAnchor(e, item.href)}
                      className="flex items-baseline gap-3 py-3.5 font-display text-[clamp(1.6rem,8vw,2.6rem)] font-semibold"
                    >
                      <span className="text-xs font-normal text-accent">{item.n}</span>
                      {item.label}
                    </TLink>
                  </m.div>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container-x flex flex-wrap gap-3 py-6">
            <a
              href={telegramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 flex-1 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-fg"
            >
              Telegram
            </a>
            <a
              href={site.channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 flex-1 items-center justify-center rounded-full border border-line px-5 text-sm"
            >
              Канал
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
