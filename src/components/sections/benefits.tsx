import { SectionHead } from "@/components/sections/section-head";
import { Reveal } from "@/components/ui/reveal";

const pains = [
  "Шаблонный сайт выглядит как у всех и ничем не цепляет",
  "Подрядчик пропадает, а сроки сдвигаются без объяснений",
  "На телефоне всё едет, а страница грузится по полминуты",
];

const benefits = [
  {
    title: "Сайт под вашу идею, а не по шаблону",
    text: "Начинаю с вашей задачи и аудитории, а уже потом рисую. Никаких перекрашенных шаблонов.",
  },
  {
    title: "Сроки и этапы известны сразу",
    text: "До старта вы получаете план: что делаем, в каком порядке и когда покажу результат.",
  },
  {
    title: "Адаптив и скорость проверены",
    text: "Тестирую на телефонах, планшетах и больших экранах, слежу за скоростью загрузки.",
  },
  {
    title: "Правки на каждом этапе",
    text: "Показываю промежуточные результаты, поэтому правки вносятся вовремя, а не в последний день.",
  },
  {
    title: "Всегда на связи в Telegram",
    text: "Отвечаю быстро и по делу, без писем на неделю и созвонов ради созвонов.",
  },
];

const deliverables = [
  { title: "Готовый сайт", text: "Свёрстанный, адаптивный, с анимациями и формами" },
  { title: "Исходники", text: "Код и макеты принадлежат вам" },
  { title: "Запуск", text: "Домен, хостинг и подключение аналитики" },
  { title: "Поддержка 14 дней", text: "Исправлю мелочи и помогу освоиться после запуска" },
];

export function Benefits() {
  return (
    <section aria-label="Почему стоит выбрать меня" className="section-y bg-surface">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Знакомо?</p>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {pains.map((p) => (
              <li key={p} className="rounded-card border border-line p-6 text-lg text-fg/80 line-through decoration-accent/70 decoration-2">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <SectionHead
          className="mt-24 md:mt-32"
          n="03"
          label="Почему я"
          title="Почему со мной спокойно"
          lead="Я не только рисую, но и сам верстаю. Поэтому то, что вы видите в макете, работает на сайте."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <li key={b.title} className="group relative bg-surface p-8 transition-colors duration-500 hover:bg-surface-2 md:p-10">
              <span className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 font-display text-xl leading-snug font-semibold md:text-2xl">{b.title}</h3>
              <p className="mt-4 text-muted">{b.text}</p>
            </li>
          ))}
          <li className="flex flex-col justify-between bg-accent p-8 text-accent-fg md:p-10">
            <span className="eyebrow text-accent-fg/80">Итог</span>
            <p className="mt-8 font-display text-2xl leading-snug font-semibold">
              Вы заняты своим делом, а сайт делается.
            </p>
          </li>
        </ol>

        <div className="mt-24 md:mt-32">
          <Reveal>
            <h3 className="font-display text-[clamp(1.6rem,4vw,3rem)] font-semibold tracking-tight">
              Что вы получите
            </h3>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((d, i) => (
              <li key={d.title}>
                <Reveal delay={i * 0.08} className="h-full rounded-card border border-line p-6">
                  <span aria-hidden className="mb-10 block size-3 rotate-45 bg-accent" />
                  <p className="font-display text-lg font-semibold">{d.title}</p>
                  <p className="mt-2 text-sm text-muted">{d.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
