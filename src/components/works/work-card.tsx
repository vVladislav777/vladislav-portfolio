import Image from "next/image";
import { ViewTransition } from "react";
import { TLink } from "@/components/ui/t-link";
import { type Work, workImage } from "@/data/works";
import { cn, pad } from "@/lib/utils";

/**
 * Карточка кейса: при наведении превью сменяется второй картинкой,
 * курсор превращается в «Смотреть», обложка «перелетает» на страницу кейса.
 */
export function WorkCard({
  work,
  index,
  total,
  priority,
  className,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  work: Work;
  index: number;
  total: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <article className={cn("group", className)}>
      <TLink
        href={`/works/${work.slug}`}
        data-cursor="Смотреть"
        className="block rounded-card focus-visible:outline-offset-4"
        aria-label={`${work.title} — ${work.kind}. Открыть кейс`}
      >
        <div className="relative aspect-[16/11] overflow-hidden rounded-card bg-surface">
          <ViewTransition name={`cover-${work.slug}`} share="morph" default="none">
            <Image
              src={workImage(work.slug, "cover")}
              alt={`${work.title}: главный экран сайта`}
              fill
              sizes={sizes}
              fetchPriority={priority ? "high" : "auto"}
              loading={priority ? "eager" : "lazy"}
              className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
            />
          </ViewTransition>
          <Image
            src={workImage(work.slug, "alt")}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-[opacity,scale] duration-700 ease-out-expo [scale:1.08] group-hover:opacity-100 group-hover:[scale:1] group-focus-visible:opacity-100"
          />
          <span className="absolute top-4 left-4 rounded-full bg-bg/70 px-3 py-1.5 text-xs backdrop-blur">
            {pad(index + 1)} / {pad(total)}
          </span>
          <span className="absolute top-4 right-4 rounded-full bg-bg/70 px-3 py-1.5 text-xs backdrop-blur">
            {work.type}
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              <span className="link-underline">{work.title}</span>
            </h3>
            <p className="mt-1.5 text-sm text-muted">{work.kind}</p>
          </div>
          <span className="shrink-0 pt-1 text-sm text-muted">{work.year}</span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Технологии">
          {work.stack.map((s) => (
            <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>
      </TLink>
    </article>
  );
}
