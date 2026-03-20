const fs = require('fs');

async function downloadHomepage() {
    try {
        const response = await fetch('https://wp.privatelabelexpress.com/');
        const html = await response.text();
        fs.writeFileSync('live-homepage.html', html);
        console.log('Saved live-homepage.html');
    } catch (error) {
        console.error('Error:', error);
    }
}

downloadHomepage();
