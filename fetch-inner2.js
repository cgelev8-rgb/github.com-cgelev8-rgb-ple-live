const fs = require('fs');
fetch('https://privatelabelexpress.com/custom-supplement-manufacturer/')
    .then(r => r.text())
    .then(html => {
        const match = html.match(/<header.*?<\/header>/is);
        if (match) {
            fs.writeFileSync('inner-header.html', match[0]);
            console.log('Saved inner header');
        } else {
            console.log('No header found');
        }
    })
    .catch(console.error);
