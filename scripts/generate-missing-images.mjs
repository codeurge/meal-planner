import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '..');

const API_KEY = process.env.OPENAI_API_KEY;

const MISSING_IMAGES = [
  // Step images (all missing as .png)
  {
    path: 'public/images/steps/making-gravy.png',
    prompt: 'Professional food photography of making sausage gravy roux, flour being stirred into browned sausage crumbles in a cast iron skillet, kitchen setting, warm lighting, clean white kitchen, high quality',
  },
  {
    path: 'public/images/steps/scrambling-eggs.png',
    prompt: 'Professional food photography of scrambling eggs in a nonstick pan with a spatula, soft curds forming, kitchen setting, warm lighting, clean white kitchen, high quality',
  },
  {
    path: 'public/images/steps/folding-burrito.png',
    prompt: 'Professional food photography of hands folding a flour tortilla burrito with filling visible, kitchen setting, warm lighting, clean white kitchen, high quality',
  },
  {
    path: 'public/images/steps/rice-simmer.png',
    prompt: 'Professional food photography of rice simmering in a covered skillet with ground turkey black beans and tomatoes, kitchen setting, warm lighting, clean white kitchen, high quality',
  },
  {
    path: 'public/images/steps/smashing-potatoes.png',
    prompt: 'Professional food photography of smashing boiled potatoes with a fork in a pot with butter and parmesan cheese, kitchen setting, warm lighting, clean white kitchen, high quality',
  },
  {
    path: 'public/images/steps/searing-steak.png',
    prompt: 'Professional food photography of searing a cajun seasoned sirloin steak in a hot cast iron skillet with oil sizzling, kitchen setting, warm lighting, clean white kitchen, high quality',
  },
  // Beef & Bean Burritos hero image
  {
    path: 'public/images/recipes/beef-bean-burritos.png',
    prompt: 'Professional food photography of beef and bean burritos, flour tortillas filled with seasoned ground beef black beans rice cheese and salsa, top-down view, warm lighting, rustic wooden table, appetizing presentation, high quality',
  },
  // Beef & Bean Burritos prep image
  {
    path: 'public/images/prep/beef-bean-burritos-prep.png',
    prompt: 'Professional food photography of ingredients laid out for making burritos: ground beef, black beans, rice, shredded cheese, salsa, flour tortillas, and taco seasoning on a clean counter, kitchen setting, warm lighting, clean white kitchen, high quality',
  },
];

async function generateImage(prompt) {
  const body = JSON.stringify({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.openai.com',
        path: '/v1/images/generations',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`API error ${res.statusCode}: ${data}`));
            return;
          }
          const json = JSON.parse(data);
          resolve(json.data[0].url);
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const follow = (u) => {
      https.get(u, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          follow(res.headers.location);
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          fs.writeFileSync(destPath, Buffer.concat(chunks));
          resolve();
        });
        res.on('error', reject);
      });
    };
    follow(url);
  });
}

async function main() {
  // Filter to only truly missing images
  const toGenerate = MISSING_IMAGES.filter((img) => {
    const full = path.join(PROJECT, img.path);
    return !fs.existsSync(full);
  });

  console.log(`Found ${toGenerate.length} missing images to generate`);

  for (const img of toGenerate) {
    const destPath = path.join(PROJECT, img.path);
    console.log(`\nGenerating: ${img.path}`);
    console.log(`  Prompt: ${img.prompt.substring(0, 80)}...`);
    
    try {
      const url = await generateImage(img.prompt);
      console.log(`  Downloading...`);
      await downloadImage(url, destPath);
      const stat = fs.statSync(destPath);
      console.log(`  ✅ Saved (${(stat.size / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
    
    // Small delay between API calls
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log('\nDone!');
}

main();
