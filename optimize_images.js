const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, 'public', 'images');
const targetImages = [
    'supplement-warehouse.png',
    'supplement-products.png'
];

async function optimizeImages() {
    console.log('Starting image optimization...');

    for (const image of targetImages) {
        const inputPath = path.join(inputDir, image);
        const webpPath = path.join(inputDir, image.replace('.png', '.webp'));

        if (fs.existsSync(inputPath)) {
            try {
                // Get original size
                const stats = fs.statSync(inputPath);
                const originalSize = (stats.size / 1024 / 1024).toFixed(2);

                // Convert and compress to highly optimized WebP
                await sharp(inputPath)
                    .resize(1920, null, { withoutEnlargement: true }) // Cap max width at 1920px for hero images
                    .webp({ quality: 80, effort: 6 }) // High compression effort
                    .toFile(webpPath);

                // Get new size
                const newStats = fs.statSync(webpPath);
                const newSize = (newStats.size / 1024 / 1024).toFixed(2);

                console.log(`✅ Optimized ${image}:`);
                console.log(`   Size reduction: ${originalSize}MB -> ${newSize}MB`);
                console.log(`   Saved as: ${image.replace('.png', '.webp')}`);

            } catch (err) {
                console.error(`❌ Error processing ${image}:`, err);
            }
        } else {
            console.log(`⚠️ Could not find ${image} at ${inputPath}`);
        }
    }
    console.log('Done!');
}

optimizeImages();
