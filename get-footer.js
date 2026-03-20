const fs = require('fs');
fetch('https://privatelabelexpress.com')
    .then(res => res.text())
    .then(html => {
        let htmlLower = html.toLowerCase();
        let footerStart = htmlLower.lastIndexOf('<footer');
        if (footerStart === -1) footerStart = htmlLower.lastIndexOf('elementor-location-footer');
        if (footerStart === -1) footerStart = htmlLower.lastIndexOf('id="colophon"');
        if (footerStart === -1) {
            console.log("No footer found");
            return;
        }
        let footerEnd = htmlLower.indexOf('</footer>', footerStart);
        if (footerEnd === -1) footerEnd = html.length;
        const footerHtml = html.substring(footerStart, footerEnd + 9);
        fs.writeFileSync('footer-raw.html', footerHtml);
        console.log('Footer extracted, length:', footerHtml.length);

        // extract links
        const matches = [...footerHtml.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
        console.log('=== FOOTER LINKS ===');
        matches.forEach(m => {
            const url = m[1];
            let text = m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
            if (url && url !== '#' && !url.includes('elementor')) {
                console.log(`${text} -> ${url}`);
            }
        });
    });
