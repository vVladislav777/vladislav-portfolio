import { SplitText, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Нумерованная шапка секции: «(03) — Подпись» + крупный заголовок. */
export function SectionHead({
  n,
  label,
  title,
  lead,
  className,
  id,
}: {
  n: string;
  label: string;
  title: string;
  lead?: string;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:gap-8", className)}>
      <Reveal className="md:col-span-3">
        <p className="eyebrow flex items-center gap-3 pt-3">
          <span className="text-accent">({n})</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          {label}
        </p>
      </Reveal>
      <div className="md:col-span-9">
        <SplitText
          text={title}
          className="font-display text-[clamp(2rem,6vw,5.5rem)] leading-[1.02] font-semibold tracking-[-0.03em]"
        />
        {lead && (
          <Reveal delay={0.15}>
            <p id={id} className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
              {lead}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
