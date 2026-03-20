const fs = require('fs');

async function auditLinks() {
    try {
        const response = await fetch('https://privatelabelexpress.com/');
        const html = await response.text();

        // Match all links
        const regex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        let match;
        const results = [];

        while ((match = regex.exec(html)) !== null) {
            const url = match[1];
            const textHTML = match[2];
            const text = textHTML.replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' ');

            results.push({ text, url, innerHTML: textHTML.trim() });
        }

        // Filter for fulfillment links
        const fulfillmentResults = results.filter(r => {
            const cleanUrl = r.url.replace('https://privatelabelexpress.com', '');
            return cleanUrl === '/fulfillment' || cleanUrl === '/fulfillment/' || cleanUrl.includes('/fulfillment');
        });

        console.log(`\nFound ${fulfillmentResults.length} links to fulfillment-related pages:\n`);
        fulfillmentResults.forEach((r, i) => {
            console.log(`${i + 1}. [${r.text || 'NO TEXT'}] -> ${r.url}`);
            if (!r.text) console.log(`   Inner HTML: ${r.innerHTML}`);
        });

    } catch (error) {
        console.error('Error fetching homepage:', error);
    }
}

auditLinks();
