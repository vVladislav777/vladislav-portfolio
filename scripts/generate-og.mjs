// Генерирует src/app/opengraph-image.png (1200×630). Запуск: node scripts/generate-og.mjs
import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <pattern id="d" width="18" height="18" patternUnits="userSpaceOnUse">
      <circle cx="9" cy="9" r="1.6" fill="rgba(255,255,255,0.12)"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect width="1200" height="630" fill="url(#d)"/>
  <text x="72" y="120" font-family="Arial, sans-serif" font-size="22" letter-spacing="6" fill="#a6a39e">ПОРТФОЛИО · ВЕБ-ДИЗАЙН И РАЗРАБОТКА</text>
  <text x="64" y="370" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="150" letter-spacing="-6" fill="#f2f0ec">VIBERG</text>
  <rect x="72" y="450" width="420" height="72" rx="36" fill="#f3f3f1"/>
  <text x="112" y="497" font-family="Arial, sans-serif" font-weight="700" font-size="28" fill="#111111">Лендинги и сайты</text>
  <text x="530" y="497" font-family="Arial, sans-serif" font-size="28" fill="#a6a39e">Цена договорная</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile("src/app/opengraph-image.png");
console.log("✓ opengraph-image.png");
