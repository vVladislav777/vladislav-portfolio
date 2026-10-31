import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { telegramLink } from "@/config/site";

export function Pricing() {
  return (
    <section id="price" aria-labelledby="price-title" className="pb-[var(--section)]">
      <div className="container-x">
        <Reveal className="brutal-box glass relative overflow-hidden p-8 md:p-16">
                    <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase">
            <span className="bg-fg px-2 py-1 font-mono text-bg">05</span> Стоимость
          </p>
          <h2
            id="price-title"
            className="brutal mt-8 text-[clamp(2.6rem,9vw,8.5rem)]"
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
              <ButtonLink href="/#brief">
                Заполнить бриф
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
