import { TelegramCoin } from "@/components/ui/telegram-coin";
import { site, telegramLink } from "@/config/site";

/**
 * Финальный экран в чёрном: огромное брутальное «LET'S TALK», буквы которого
 * по очереди «перекатываются» при наведении, и крутящаяся монета Telegram.
 */
export function LetsTalk() {
  const word = "Let's Talk";
  return (
    <section aria-label="Связаться" className="theme-dark relative overflow-hidden pt-[var(--section)] pb-16">
      <div className="container-x flex flex-col items-center">
        <p className="glass rounded-full px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase">
          Есть идея? Обсудим
        </p>
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

        <div className="mt-16 flex flex-col items-center gap-10 md:mt-20">
          <TelegramCoin href={telegramLink()} />
          <p className="text-center text-sm text-muted">
            Крутаните монету или нажмите, чтобы написать в Telegram{" "}
            <span className="font-semibold text-fg">@{site.telegram.username}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
