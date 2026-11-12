import { SectionHead } from "@/components/sections/section-head";
import { telegramLink } from "@/config/site";
const services = [
  {
    title: "Лендинг",
    text: "Для одной услуги, продукта или запуска. Собираю предложение, ответы на вопросы и путь к заявке на одной странице.",
  },
  {
    title: "Многостраничный сайт",
    text: "Когда нужно рассказать о компании и нескольких направлениях. Продумываю структуру страниц, каталог и навигацию.",
  },
  {
    title: "Редизайн",
    text: "Если сайт уже есть, но его сложно читать или использовать. Пересматриваю структуру, визуальную подачу и мобильную версию.",
  },
];
const steps = [
  [
    "Обсуждаем задачу",
    "Знакомлюсь с бизнесом, аудиторией и целью сайта. Собираем пожелания и доступные материалы.",
  ],
  [
    "Фиксируем план",
    "Согласуем страницы, функции, стоимость и сроки. Определяем, что нужно подготовить до старта.",
  ],
  [
    "Создаём дизайн",
    "Продумываю структуру и визуальное направление. Обсуждаем макеты до перехода к разработке.",
  ],
  [
    "Разрабатываю и проверяю",
    "Собираю сайт, адаптирую под разные экраны. Проверяю кнопки, формы, навигацию и загрузку.",
  ],
  [
    "Запускаем сайт",
    "Помогаю с размещением, доменом и запуском. Передаю исходники и доступы, обсуждаем дальнейшую поддержку.",
  ],
];
export function Services() {
  return (
    <section id="services" aria-label="Услуги" className="pb-[var(--section)]">
      <div className="container-x">
        <SectionHead n="02" label="Услуги" title="Под вашу задачу" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {services.map((service, i) => (
            <article
              key={service.title}
              className="glass flex flex-col rounded-card p-6 md:p-8"
            >
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <h3 className="mt-6 text-2xl leading-tight font-bold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-4 flex-1 leading-relaxed text-muted">
                {service.text}
              </p>
              <a
                href={telegramLink(
                  "Здравствуйте! Интересует " +
                    service.title.toLowerCase() +
                    ". Хочу обсудить задачу.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center self-start font-semibold underline underline-offset-4"
                aria-label={"Обсудить задачу: " + service.title}
              >
                Обсудить задачу ↗
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section
      id="process"
      aria-label="Как я работаю"
      className="pb-[var(--section)]"
    >
      <div className="container-x">
        <SectionHead n="03" label="Процесс" title="Как я работаю" />
        <ol className="mt-10">
          {steps.map(([title, text], i) => (
            <li
              key={title}
              className="grid gap-3 border-b border-line py-6 md:grid-cols-[3rem_1fr_1.3fr] md:gap-8"
            >
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
              <p className="max-w-xl leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
