import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, '../.gemini/antigravity/brain/4a53b07e-014e-4c79-90b5-427959b0a545');
const destDir = path.resolve(__dirname, 'public');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(
  path.join(sourceDir, 'hero_promo_1773941855436.png'),
  path.join(destDir, 'hero_promo.png')
);

fs.copyFileSync(
  path.join(sourceDir, 'philosophy_promo_1773941909227.png'),
  path.join(destDir, 'philosophy_promo.png')
);

console.log('✅ Generated images successfully copied to the public/ directory! You can now safely push to Github.');
