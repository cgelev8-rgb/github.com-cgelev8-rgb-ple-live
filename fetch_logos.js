const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'images', 'integrations');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

https.get('https://www.veeqo.com/integrations', r => {
    let h = '';
    r.on('data', c => h += c);
    r.on('end', async () => {
        const urls = new Set();

        // Find all images.ctfassets.net URLs
        const regex1 = /https:\/\/images\.ctfassets\.net\/[A-Za-z0-9]+\/[A-Za-z0-9]+\/[A-Za-z0-9]+\/[\w\-\.]+/g;
        let m;
        while ((m = regex1.exec(h)) !== null) {
            urls.add(m[0]);
        }

        // Decode _next/image URLs
        const regex2 = /url=(https%3A%2F%2Fimages\.ctfassets\.net[^&]+)/g;
        while ((m = regex2.exec(h)) !== null) {
            urls.add(decodeURIComponent(m[1]));
        }

        const list = Array.from(urls).filter(u => /logo|icon|amazon|ups|usps|dhl|fedex/i.test(u));
        console.log(`Found ${list.length} logos.`);

        for (const u of list) {
            let ext = path.extname(u) || '.png';
            let name = path.basename(u, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
            let filepath = path.join(dir, name + ext);

            await new Promise(res => {
                https.get(u, res2 => {
                    if (res2.statusCode === 200) {
                        const f = fs.createWriteStream(filepath);
                        res2.pipe(f);
                        f.on('finish', () => {
                            console.log('Downloaded', name + ext);
                            res();
                        });
                    } else {
                        res();
                    }
                }).on('error', res);
            });
        }
        console.log('Done');
    });
});
