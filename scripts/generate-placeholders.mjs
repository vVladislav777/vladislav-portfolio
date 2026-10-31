// Генерирует абстрактные превью кейсов (WebP) в public/works/<slug>/.
// Это заглушки: замените файлы реальными скриншотами с теми же именами.
// Запуск: node scripts/generate-placeholders.mjs
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const works = [
  { slug: "terrascape-gazette", title: "TERRASCAPE", tint: "#f3f3f1", seed: 1 },
  { slug: "sosnovy-dvor", title: "СОСНОВЫЙ ДВОР", tint: "#bdbdba", seed: 2 },
  { slug: "coffee-house", title: "КОФЕЙНЯ", tint: "#dcdcd8", seed: 3 },
  { slug: "volna", title: "ВОЛНА", tint: "#9e9e9b", seed: 4 },
  { slug: "obzhig", title: "ОБЖИГ", tint: "#e8e8e5", seed: 5 },
];

const W = 1600;
const H = 1100;

function rand(seed) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const font = "Arial, Helvetica, sans-serif";

function browser(inner, { tint, bg = "#161616" }) {
  return `
  <rect x="120" y="110" width="1360" height="880" rx="28" fill="${bg}" stroke="rgba(255,255,255,0.08)"/>
  <rect x="120" y="110" width="1360" height="56" rx="28" fill="#1f1f1f"/>
  <rect x="120" y="140" width="1360" height="26" fill="#1f1f1f"/>
  <circle cx="160" cy="138" r="8" fill="${tint}"/><circle cx="188" cy="138" r="8" fill="#444"/><circle cx="216" cy="138" r="8" fill="#444"/>
  <rect x="560" y="126" width="480" height="24" rx="12" fill="#2a2a2a"/>
  <g transform="translate(120 166)">${inner}</g>`;
}

function layoutCover({ title, tint, seed }) {
  const r = rand(seed);
  const cols = Array.from({ length: 3 }, (_, i) => {
    const h = 150 + r() * 120;
    return `<rect x="${80 + i * 410}" y="${470}" width="370" height="${h}" rx="18" fill="${i === 1 ? tint : "#262626"}" opacity="${i === 1 ? 0.9 : 1}"/>`;
  }).join("");
  return browser(
    `
    <text x="80" y="90" font-family="${font}" font-size="18" letter-spacing="5" fill="#8a8a8a">MENU   WORKS   ABOUT</text>
    <text x="80" y="290" font-family="${font}" font-weight="900" font-size="${title.length > 10 ? 120 : 170}" fill="#f2f0ec" letter-spacing="-4">${title}</text>
    <rect x="80" y="340" width="260" height="56" rx="28" fill="${tint}"/>
    <rect x="360" y="340" width="200" height="56" rx="28" fill="none" stroke="#555"/>
    ${cols}`,
    { tint },
  );
}

function layoutAlt({ title, tint, seed }) {
  const r = rand(seed + 10);
  const phones = [0, 1, 2]
    .map((i) => {
      const x = 330 + i * 330;
      const y = i === 1 ? 140 : 210;
      const blocks = Array.from({ length: 5 }, (_, j) => {
        const bh = 60 + r() * 50;
        return `<rect x="${x + 22}" y="${y + 90 + j * 120}" width="${236}" height="${bh}" rx="12" fill="${j === i ? tint : "#2b2b2b"}"/>`;
      }).join("");
      return `<g>
        <rect x="${x}" y="${y}" width="280" height="760" rx="40" fill="#151515" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
        <rect x="${x + 100}" y="${y + 20}" width="80" height="20" rx="10" fill="#2a2a2a"/>
        <text x="${x + 22}" y="${y + 74}" font-family="${font}" font-weight="900" font-size="22" fill="#f2f0ec">${title.slice(0, 12)}</text>
        ${blocks}
      </g>`;
    })
    .join("");
  return phones;
}

function layoutGallery({ title, tint, seed }, n) {
  const r = rand(seed * 7 + n);
  if (n === 1) {
    const cells = Array.from({ length: 6 }, (_, i) => {
      const x = 80 + (i % 3) * 410;
      const y = 120 + Math.floor(i / 3) * 360;
      return `<rect x="${x}" y="${y}" width="370" height="320" rx="20" fill="${i === Math.floor(r() * 6) ? tint : "#242424"}"/>
        <rect x="${x + 24}" y="${y + 236}" width="${160 + r() * 140}" height="18" rx="9" fill="#444"/>
        <rect x="${x + 24}" y="${y + 268}" width="120" height="14" rx="7" fill="#333"/>`;
    }).join("");
    return browser(
      `<text x="80" y="80" font-family="${font}" font-weight="900" font-size="44" fill="#f2f0ec">${title}</text>${cells}`,
      { tint },
    );
  }
  if (n === 2) {
    const lines = Array.from({ length: 9 }, (_, i) =>
      `<rect x="760" y="${160 + i * 46}" width="${420 + r() * 140}" height="16" rx="8" fill="#3a3a3a"/>`,
    ).join("");
    return browser(
      `<rect x="80" y="80" width="600" height="560" rx="24" fill="${tint}" opacity="0.85"/>
       <circle cx="380" cy="360" r="${150 + r() * 60}" fill="#111" opacity="0.35"/>
       <text x="760" y="120" font-family="${font}" font-weight="900" font-size="54" fill="#f2f0ec">${title}</text>
       ${lines}
       <rect x="760" y="600" width="220" height="54" rx="27" fill="${tint}"/>`,
      { tint },
    );
  }
  const bars = Array.from({ length: 12 }, (_, i) => {
    const h = 80 + r() * 380;
    return `<rect x="${110 + i * 100}" y="${640 - h}" width="60" height="${h}" rx="12" fill="${i % 4 === 0 ? tint : "#2c2c2c"}"/>`;
  }).join("");
  return browser(
    `<text x="80" y="90" font-family="${font}" font-weight="900" font-size="40" fill="#f2f0ec">${title} — ADAPTIVE</text>${bars}`,
    { tint },
  );
}

function svg(content, tint) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="g" cx="0.8" cy="0.1" r="0.9">
      <stop offset="0" stop-color="${tint}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#0e0e0e" stop-opacity="0"/>
    </radialGradient>
    <pattern id="d" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="11" cy="11" r="1.4" fill="rgba(255,255,255,0.08)"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#0e0e0e"/>
  <rect width="100%" height="100%" fill="url(#d)"/>
  <rect width="100%" height="100%" fill="url(#g)"/>
  ${content}
</svg>`;
}

for (const work of works) {
  const dir = path.join("public", "works", work.slug);
  await mkdir(dir, { recursive: true });
  const files = {
    cover: layoutCover(work),
    alt: layoutAlt(work),
    1: layoutGallery(work, 1),
    2: layoutGallery(work, 2),
    3: layoutGallery(work, 3),
  };
  for (const [name, content] of Object.entries(files)) {
    await sharp(Buffer.from(svg(content, work.tint)))
      .webp({ quality: 78 })
      .toFile(path.join(dir, `${name}.webp`));
  }
  console.log("✓", work.slug);
}
