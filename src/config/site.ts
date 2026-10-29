// Все контакты и ссылки в одном месте. Замените заглушки на реальные данные.
export const site = {
  name: "Владислав",
  role: "веб-дизайнер и разработчик лендингов",
  url: "https://vladislav.example.com",
  telegram: {
    username: "username",
    get url() {
      return `https://t.me/${this.username}`;
    },
  },
  channel: {
    url: "https://t.me/channel",
    label: "t.me/channel",
  },
  description:
    "Владислав — веб-дизайнер и разработчик. Делаю лендинги и многостраничные сайты с анимациями под вашу идею, а не по шаблону. Цена договорная.",
} as const;

export function telegramLink(text?: string) {
  const base = site.telegram.url;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
