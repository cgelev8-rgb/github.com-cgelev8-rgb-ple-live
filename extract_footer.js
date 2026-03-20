const fs = require('fs');
fetch('https://privatelabelexpress.com')
    .then(res => res.text())
    .then(html => {
        const bottomHTML = html.substring(html.length - 40000);
        const matches = [...bottomHTML.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
        console.log('--- BOTTOM LINKS ---');
        matches.forEach(m => {
            const url = m[1];
            let text = m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
            if (url && url !== '#' && text && !url.includes('elementor')) {
                console.log(text + ' -> ' + url);
            }
        });
    });
