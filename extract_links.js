const fs = require('fs');
const html = fs.readFileSync('live-homepage.html', 'utf8');
const regex = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null && count < 100) {
    const href = match[1];
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    if (text) {
        console.log(`Href: ${href} | Text: ${text}`);
    }
    count++;
}
