import { SplitText, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Брутальная шапка секции: толстая линейка во всю ширину, номер в чёрной
 * плашке, подпись капсом и огромный заголовок тяжёлым гротеском.
 */
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
    <div className={cn("border-t-[3px] border-fg pt-4", className)}>
      <Reveal y={12}>
        <p className="flex items-center justify-between gap-4 text-xs font-bold tracking-[0.2em] uppercase">
          <span className="flex items-center gap-3">
            <span className="bg-fg px-2 py-1 font-mono text-bg">{n}</span>
            {label}
          </span>
          <span aria-hidden className="hidden font-mono text-muted sm:inline">
            {"///" + label.toUpperCase().replace(/\s+/g, "_")}
          </span>
        </p>
      </Reveal>
      <SplitText
        text={title}
        className="brutal mt-8 text-[clamp(2.6rem,9.5vw,10rem)] break-words hyphens-auto md:mt-12"
      />
      {lead && (
        <Reveal delay={0.15}>
          <p id={id} className="mt-8 max-w-2xl text-lg text-muted md:ml-auto md:text-xl">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
