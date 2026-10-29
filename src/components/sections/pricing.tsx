import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { telegramLink } from "@/config/site";

export function Pricing() {
  return (
    <section id="price" aria-labelledby="price-title" className="pb-[var(--section)]">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-card border border-line bg-surface p-8 md:p-16">
          <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-accent/15 blur-3xl" />
          <p className="eyebrow">
            <span className="text-accent">(05)</span> Стоимость
          </p>
          <h2
            id="price-title"
            className="mt-6 font-display text-[clamp(2.2rem,7vw,6rem)] leading-none font-semibold tracking-[-0.03em]"
          >
            Цена договорная
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-end">
            <p className="max-w-xl text-lg text-muted md:text-xl">
              Зависит от объёма, сроков и сложности. Напишите, и я назову сумму после короткого
              обсуждения.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <ButtonLink href={telegramLink("Здравствуйте! Хочу обсудить стоимость сайта.")} external>
                Обсудить проект
              </ButtonLink>
              <ButtonLink href="/#brief" variant="ghost">
                Заполнить бриф
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
