const fs = require('fs');
fetch('https://privatelabelexpress.com/custom-supplement-manufacturer/')
    .then(r => r.text())
    .then(html => {
        const start = html.indexOf('<header');
        let end = html.indexOf('</header>');
        if (start !== -1) {
            fs.writeFileSync('inner-header.html', html.substring(start, end + 9));
            console.log('Saved inner header');
        } else {
            console.log('No header found');
        }
    })
    .catch(console.error);
