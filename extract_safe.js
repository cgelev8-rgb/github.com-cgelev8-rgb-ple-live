const fs = require('fs');
const extractLinksAndText = (filename) => {
    try {
        const html = fs.readFileSync(filename, 'utf8');
        // Simple regex to grab anything that looks like <a href="URL">TEXT</a>
        // It's not perfect but good enough for a quick dump.
        const matches = [...html.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
        matches.forEach(m => {
            const url = m[1];
            const textHTML = m[2];
            let text = textHTML.replace(/<[^>]*>/g, '').trim();
            // clean up weird whitespaces
            text = text.replace(/\s+/g, ' ');
            if (url && url !== '#' && !url.includes('elementor')) {
                console.log(`${text} -> ${url}`);
            }
        });
    } catch (e) {
        console.error(e);
    }
}
console.log("=== HEADER LINKS ===");
extractLinksAndText('live-header.html');
console.log("\n=== FOOTER LINKS ===");
extractLinksAndText('live-footer.html');
