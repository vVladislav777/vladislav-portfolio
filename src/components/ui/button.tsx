import { TLink } from "@/components/ui/t-link";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";

type Variant = "accent" | "ghost" | "light";

const base =
  "group/btn relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-7 text-sm font-semibold tracking-wide transition-colors duration-300";

const variants: Record<Variant, string> = {
  accent: "bg-accent text-accent-fg",
  light: "bg-fg text-bg",
  ghost: "border border-line text-fg hover:border-fg",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  magnetic?: boolean;
  cursor?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/** Кнопка-ссылка: текст «перекатывается» при наведении, корпус магнитный. */
export function ButtonLink({
  href,
  children,
  variant = "accent",
  className,
  external,
  magnetic = true,
  cursor,
  ...rest
}: Props) {
  const inner = (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out-expo group-hover/btn:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover/btn:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
  const cls = cn(base, variants[variant], className);
  const el = external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      data-cursor={cursor}
      {...rest}
    >
      {inner}
    </a>
  ) : (
    <TLink href={href} className={cls} data-cursor={cursor} {...rest}>
      {inner}
    </TLink>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
