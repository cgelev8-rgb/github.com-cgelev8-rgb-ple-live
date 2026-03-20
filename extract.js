const fs = require('fs');

const extract = (file) => {
    const html = fs.readFileSync(file, 'utf8');
    const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/gis;
    let match;
    const links = [];
    while ((match = regex.exec(html)) !== null) {
        const url = match[2];
        const rawText = match[3];
        const text = rawText.replace(/<[^>]*>/g, '').trim();
        if (url && text && !url.includes('elementor')) {
            links.push({ text, url });
        }
    }
    return links;
};

console.log("--- HEADER LINKS ---");
console.log(extract('live-header.html'));
console.log("\n--- FOOTER LINKS ---");
console.log(extract('live-footer.html'));
