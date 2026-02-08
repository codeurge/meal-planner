import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/prep');

const recipes = [
  {
    id: 'classic-eggs-bacon',
    prompt: 'Professional food photography of breakfast prep mise en place: bacon strips, fresh eggs in a bowl, salt and pepper grinders, and biscuits on a clean white marble countertop, warm morning lighting, clean white kitchen, overhead shot, high quality'
  },
  {
    id: 'sausage-gravy-biscuits',
    prompt: 'Professional food photography of biscuits and gravy prep mise en place: measured flour in a small bowl, glass measuring cup of milk, raw breakfast sausage, spice jars, on a clean white marble countertop, warm lighting, clean white kitchen, overhead shot, high quality'
  },
  {
    id: 'scrambled-eggs-cheese',
    prompt: 'Professional food photography of scrambled eggs prep mise en place: cracked eggs in a glass bowl, splash of milk, shredded cheddar cheese in a small bowl, butter pat, whisk, on a clean white marble countertop, warm lighting, clean white kitchen, overhead shot, high quality'
  },
  {
    id: 'freezer-breakfast-burritos',
    prompt: 'Professional food photography of burrito prep mise en place: large flour tortillas stacked, bowl of whisked eggs, frozen hash browns thawing, shredded Mexican cheese, raw sausage, aluminum foil rolls, on a clean white countertop, warm lighting, clean white kitchen, overhead shot, high quality'
  },
  {
    id: 'turkey-burrito-skillet',
    prompt: 'Professional food photography of burrito skillet prep mise en place: ground turkey package, drained black beans in a bowl, uncooked rice measured, can of diced tomatoes, chicken broth carton, small bowls of cumin and chili powder, chopped cilantro and lime wedges, on a clean white marble countertop, warm lighting, clean white kitchen, overhead shot, high quality'
  },
  {
    id: 'cajun-sirloin',
    prompt: 'Professional food photography of steak dinner prep mise en place: raw sirloin steaks on a cutting board, diced russet potatoes, small bowl of Cajun seasoning, butter pats, parmesan cheese, fresh green beans trimmed, on a clean white marble countertop, warm lighting, clean white kitchen, overhead shot, high quality'
  },
  {
    id: 'bbq-chicken-quesadillas',
    prompt: 'Professional food photography of quesadilla prep mise en place: raw chicken breasts, sliced colorful bell peppers and onions on a cutting board, bottle of BBQ sauce, shredded cheese, flour tortillas, halved limes, small bowl of sour cream, on a clean white marble countertop, warm lighting, clean white kitchen, overhead shot, high quality'
  },
  {
    id: 'sheet-pan-pork-chops',
    prompt: 'Professional food photography of sheet pan dinner prep mise en place: raw pork chops on parchment-lined sheet pan, halved baby potatoes, broccoli florets, small bowls of Italian seasoning and paprika, honey jar, olive oil, on a clean white marble countertop, warm lighting, clean white kitchen, overhead shot, high quality'
  },
];

async function generateImage(recipe) {
  const outputPath = path.join(OUTPUT_DIR, `${recipe.id}-prep.png`);
  
  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping ${recipe.id} (already exists)`);
    return;
  }
  
  console.log(`🎨 Generating image for ${recipe.id}...`);
  
  const body = JSON.stringify({
    model: 'dall-e-3',
    prompt: recipe.prompt,
    n: 1,
    size: '1792x1024',
    quality: 'standard',
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.openai.com',
      path: '/v1/images/generations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            console.error(`❌ Error for ${recipe.id}:`, json.error.message);
            reject(json.error);
            return;
          }
          const imageUrl = json.data[0].url;
          console.log(`📥 Downloading ${recipe.id}...`);
          
          // Download the image
          await downloadImage(imageUrl, outputPath);
          console.log(`✅ Saved ${recipe.id}-prep.png`);
          resolve();
        } catch (e) {
          console.error(`❌ Parse error for ${recipe.id}:`, e.message);
          reject(e);
        }
      });
    });
    
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, outputPath).then(resolve).catch(reject);
        return;
      }
      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('🚀 Generating prep images for all recipes...\n');
  
  for (const recipe of recipes) {
    try {
      await generateImage(recipe);
      // Small delay between API calls
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`Failed for ${recipe.id}, continuing...`);
    }
  }
  
  console.log('\n🎉 Done generating prep images!');
}

main();
