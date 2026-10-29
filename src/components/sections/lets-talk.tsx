import { Magnetic } from "@/components/ui/magnetic";
import { telegramLink } from "@/config/site";

/**
 * Финальный экран: огромное «Let's Talk». При наведении буквы по очереди
 * «перекатываются» и заливаются акцентом, по центру — магнитная круглая кнопка.
 */
export function LetsTalk() {
  const word = "Let's Talk";
  return (
    <section aria-label="Связаться" className="relative overflow-hidden pt-[var(--section)] pb-16">
      <div className="container-x flex flex-col items-center">
        <p className="eyebrow">Есть идея? Обсудим</p>
        <a
          href={telegramLink("Здравствуйте! Хочу обсудить сайт.")}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Написать"
          aria-label="Let's Talk — написать в Telegram"
          className="group mt-8 block font-display text-[clamp(3.2rem,15vw,15rem)] leading-[0.95] font-bold tracking-[-0.04em] whitespace-nowrap"
        >
          {Array.from(word).map((ch, i) => (
            <span key={i} aria-hidden className="relative inline-block overflow-hidden align-top">
              <span
                className="block transition-transform duration-700 ease-out-expo group-hover:-translate-y-full"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {ch === " " ? " " : ch}
              </span>
              <span
                className="absolute inset-0 block translate-y-full text-accent transition-transform duration-700 ease-out-expo group-hover:translate-y-0"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {ch === " " ? " " : ch}
              </span>
            </span>
          ))}
        </a>

        <Magnetic strength={0.5} className="mt-10">
          <a
            href={telegramLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-36 place-items-center rounded-full bg-accent text-center text-sm font-semibold text-accent-fg transition-transform duration-500 hover:scale-110 md:size-44"
          >
            Написать
            <br />в Telegram
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
