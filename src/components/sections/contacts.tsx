import { Megaphone, Send } from "lucide-react";
import { SectionHead } from "@/components/sections/section-head";
import { Reveal } from "@/components/ui/reveal";
import { site, telegramLink } from "@/config/site";

const cards = [
  {
    label: "Личный Telegram",
    Icon: Send,
    value: `@${site.telegram.username}`,
    text: "Пишите напрямую: обсудим задачу и сроки.",
    href: telegramLink(),
    cta: "Написать",
  },
  {
    label: "Канал с работами",
    Icon: Megaphone,
    value: site.channel.label,
    text: "Новые проекты, процесс и разборы.",
    href: site.channel.url,
    cta: "Подписаться",
  },
];

export function Contacts() {
  return (
    <section id="contact" aria-label="Контакты" className="section-y">
      <div className="container-x">
        <SectionHead n="08" label="Контакты" title="Самый быстрый способ — Telegram" />
        <ul className="mt-16 grid gap-4 md:mt-24 md:grid-cols-2">
          {cards.map((c, i) => (
            <li key={c.label}>
              <Reveal delay={i * 0.1}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={c.cta}
                  className="glass group relative flex min-h-72 flex-col justify-between overflow-hidden rounded-card p-8 hover:[--ink:#000] transition-colors duration-500 hover:border-accent md:p-10"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
                  />
                  <span className="relative flex items-center justify-between">
                    <span className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors group-hover:text-accent-fg">
                      <c.Icon aria-hidden className="size-4" strokeWidth={1.7} />
                      {c.label}
                    </span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                      className="transition-all duration-500 group-hover:rotate-45 group-hover:text-accent-fg"
                    >
                      <path d="M3 13 13 3M5 3h8v8" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                  <span className="relative">
                    <span className="brutal block text-[clamp(2rem,5vw,4rem)] break-all transition-colors group-hover:text-accent-fg">
                      {c.value}
                    </span>
                    <span className="mt-3 block text-muted transition-colors group-hover:text-accent-fg/80">
                      {c.text}
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
