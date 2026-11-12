import { TelegramCoin } from "@/components/ui/telegram-coin";
import { site, telegramLink } from "@/config/site";

/**
 * Финальный экран в чёрном: огромное брутальное «LET'S TALK», буквы которого
 * по очереди «перекатываются» при наведении, и крутящаяся монета Telegram.
 */
export function LetsTalk() {
  const word = "Let's Talk";
  return (
    <section id="contact" aria-label="Связаться" className="theme-dark relative overflow-hidden pt-[var(--section)] pb-16">
      <div className="container-x flex flex-col items-center">
        <h2 className="glass rounded-full px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase">
          Есть идея? Обсудим
        </h2>
        <a
          href={telegramLink("Здравствуйте! Хочу обсудить сайт.")}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Написать"
          aria-label="Let's Talk — написать в Telegram"
          className="group brutal mt-10 block text-[clamp(3.4rem,15.5vw,16rem)] whitespace-nowrap"
        >
          {Array.from(word).map((ch, i) => (
            <span key={i} aria-hidden className="relative inline-block overflow-hidden align-top leading-[1]">
              <span
                className="block transition-transform duration-700 ease-out-expo group-hover:-translate-y-full"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {ch === " " ? " " : ch}
              </span>
              <span
                className="absolute inset-0 block translate-y-[120%] font-marker font-normal normal-case tracking-normal transition-transform duration-700 ease-out-expo group-hover:translate-y-0"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {ch === " " ? " " : ch}
              </span>
            </span>
          ))}
        </a>

        <p className="mt-6 max-w-lg text-center text-lg text-muted">Расскажите, чем занимаетесь, какой сайт нужен и есть ли сроки. Обсудим задачу и определим следующий шаг.</p>
        <a href={telegramLink("Здравствуйте! Хочу обсудить проект. Мой бизнес: ... Нужен сайт для: ... Желаемый срок: ...")} target="_blank" rel="noopener noreferrer" className="mt-6 rounded-full bg-fg px-6 py-3 font-semibold text-bg">Обсудить проект в Telegram ↗</a>

        <div className="mt-16 flex flex-col items-center gap-10 md:mt-20">
          <TelegramCoin href={telegramLink()} />
          <p className="text-center text-sm text-muted">
            Крутаните монету или нажмите, чтобы написать в Telegram{" "}
            <span className="font-semibold text-fg">@{site.telegram.username}</span>
          </p>
          <a
            href={site.channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
          >
            Канал с работами: {site.channel.label}
          </a>
        </div>
      </div>
    </section>
  );
}
