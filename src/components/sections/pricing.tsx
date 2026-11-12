import { SectionHead } from "@/components/sections/section-head";
import { telegramLink } from "@/config/site";
const offers = [
  {
    title: "Лендинг",
    price: "от 10 000 ₽",
    detail: "Одна страница для вашего предложения.",
  },
  {
    title: "Лендинг + бот",
    price: "15 000 ₽",
    detail: "Сайт и бот. Сценарии и функции бота согласуем перед началом.",
  },
  {
    title: "Многостраничник",
    price: "20 000 ₽",
    detail: "Несколько страниц с единой структурой и дизайном.",
  },
];
export function Pricing() {
  return (
    <section id="price" aria-label="Стоимость" className="pb-[var(--section)]">
      <div className="container-x">
        <SectionHead n="04" label="Стоимость" title="Понятный старт" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className="glass flex flex-col rounded-card p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold">{offer.title}</h3>
              <p className="mt-6 text-[clamp(2rem,3.4vw,3.4rem)] leading-none font-black tracking-[-0.05em] whitespace-nowrap">
                {offer.price}
              </p>
              <p className="mt-6 flex-1 leading-relaxed text-muted">
                {offer.detail}
              </p>
              <a
                href={telegramLink(
                  "Здравствуйте! Интересует " +
                    offer.title.toLowerCase() +
                    " (" +
                    offer.price +
                    "). Давайте обсудим состав работ.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 rounded-full bg-fg px-5 py-3 text-center text-sm font-semibold text-bg"
                aria-label={"Обсудить проект: " + offer.title.toLowerCase()}
              >
                Обсудить проект ↗
              </a>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl leading-relaxed text-muted">
          Перед стартом согласуем состав работ, сроки и итоговую стоимость.
          Число страниц, интеграции, хостинг и домен обсудим отдельно. Стоимость
          редизайна определю после просмотра вашего сайта.
        </p>
      </div>
    </section>
  );
}
