"use client";

import { useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { SectionHead } from "@/components/sections/section-head";
import { Magnetic } from "@/components/ui/magnetic";
import { MetallicButton } from "@/components/ui/metallic-button";
import { metallicWidth } from "@/components/ui/button";
import { telegramLink } from "@/config/site";
import { cn } from "@/lib/utils";

const TYPES = ["Лендинг", "Многостраничный сайт", "Интернет-магазин"];
const BLOCKS = ["Главный экран", "Услуги", "Портфолио", "Отзывы", "Блок с ценами", "FAQ", "Форма заявки", "Каталог", "Блог"];
const EFFECTS = ["Анимации при скролле", "Кастомный курсор", "Переходы страниц", "Бегущие строки", "Интерактивное меню", "Без лишних эффектов"];
const DEADLINES = ["Как можно скорее", "2–3 недели", "Месяц", "Не горит"];

type ChipProps = {
  name: string;
  value: string;
  type: "radio" | "checkbox";
  checked: boolean;
  onChange: () => void;
};

/** Чип на основе нативного input: работает с клавиатуры и скринридером. */
function Chip({ name, value, type, checked, onChange }: ChipProps) {
  return (
    <label className="relative">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm transition-all duration-300 select-none",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent",
          checked
            ? "border-fg bg-fg text-bg"
            : "glass text-fg hover:scale-[1.03]",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full transition-colors",
            checked ? "bg-accent-fg" : "bg-muted",
          )}
        />
        {value}
      </span>
    </label>
  );
}

function Group({ legend, hint, children }: { legend: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-6">
      <legend className="float-left mb-4 w-full font-display text-lg font-semibold">
        {legend}
        {hint && <span className="ml-2 text-sm font-normal text-muted">{hint}</span>}
      </legend>
      <div className="clear-both flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

export function BriefForm() {
  const [type, setType] = useState(TYPES[0]);
  const [blocks, setBlocks] = useState<string[]>(["Главный экран", "Форма заявки"]);
  const [effects, setEffects] = useState<string[]>(["Анимации при скролле"]);
  const [deadline, setDeadline] = useState(DEADLINES[1]);
  const [about, setAbout] = useState("");
  const [sent, setSent] = useState(false);
  const aboutId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const message = useMemo(() => {
    const lines = [
      "Здравствуйте, Владислав! Хочу обсудить проект.",
      "",
      `Тип сайта: ${type}`,
      `Блоки: ${blocks.length ? blocks.join(", ") : "пока не знаю"}`,
      `Эффекты: ${effects.length ? effects.join(", ") : "на ваш вкус"}`,
      `Срок: ${deadline}`,
    ];
    if (about.trim()) lines.push("", `О проекте: ${about.trim()}`);
    return lines.join("\n");
  }, [type, blocks, effects, deadline, about]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard?.writeText(message);
    } catch {
      // Буфер обмена может быть недоступен — ссылка всё равно содержит текст.
    }
    window.open(telegramLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="brief" aria-label="Расскажите о проекте" className="section-y bg-surface">
      <div className="container-x">
        <SectionHead
          n="06"
          label="Бриф"
          title="Расскажите о проекте"
          lead="Отметьте, что нужно, и нажмите кнопку. Откроется Telegram с готовым сообщением. Никаких обязательств."
        />

        <form ref={formRef} onSubmit={onSubmit} className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <Group legend="Тип сайта">
              {TYPES.map((v) => (
                <Chip key={v} name="type" type="radio" value={v} checked={type === v} onChange={() => setType(v)} />
              ))}
            </Group>
            <Group legend="Нужные блоки" hint="можно несколько">
              {BLOCKS.map((v) => (
                <Chip key={v} name="blocks" type="checkbox" value={v} checked={blocks.includes(v)} onChange={() => toggle(blocks, setBlocks, v)} />
              ))}
            </Group>
            <Group legend="Эффекты" hint="можно несколько">
              {EFFECTS.map((v) => (
                <Chip key={v} name="effects" type="checkbox" value={v} checked={effects.includes(v)} onChange={() => toggle(effects, setEffects, v)} />
              ))}
            </Group>
            <Group legend="Срок">
              {DEADLINES.map((v) => (
                <Chip key={v} name="deadline" type="radio" value={v} checked={deadline === v} onChange={() => setDeadline(v)} />
              ))}
            </Group>
            <div className="border-t border-line pt-6">
              <label htmlFor={aboutId} className="font-display text-lg font-semibold">
                Коротко о проекте
              </label>
              <textarea
                id={aboutId}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
                maxLength={600}
                placeholder="Чем занимаетесь, для кого сайт, есть ли примеры, которые нравятся"
                className="mt-4 w-full resize-y rounded-card border border-line bg-bg p-5 text-base text-fg placeholder:text-muted/80 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
              />
              <p className="mt-2 text-right text-xs text-muted">{about.length} / 600</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Сообщение</p>
              <pre
                aria-label="Предпросмотр сообщения"
                className="mt-4 min-h-64 rounded-card border border-line bg-bg p-6 font-sans text-sm leading-relaxed whitespace-pre-wrap text-fg/90"
              >
                {message}
              </pre>
              <div className="mt-6 flex flex-col items-start gap-4">
                <Magnetic>
                  <div className="rounded-full has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-4 has-[button:focus-visible]:outline-fg">
                    <MetallicButton
                      label="Отправить в Telegram"
                      width={metallicWidth("Отправить в Telegram")}
                      onClick={() => formRef.current?.requestSubmit()}
                    />
                  </div>
                </Magnetic>
                <p className="text-sm text-muted">Цену не считаем здесь: она договорная и обсуждается лично.</p>
                <AnimatePresence>
                  {sent && (
                    <m.p
                      role="status"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-accent"
                    >
                      Текст скопирован. Если Telegram не подставил его, просто вставьте сообщение.
                    </m.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
