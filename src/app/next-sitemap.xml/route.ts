import { NextResponse } from 'next/server';

export async function GET() {
    const baseUrl = 'https://privatelabelexpress.com';

    // List of Next.js native routes that WordPress doesn't know about
    const staticPages = [
        '', // Homepage
        '/fulfillment/supplement-fulfillment',
        '/book-a-call',
        '/custom-formulas-2',
        '/custom-formulas-3',
        '/custom-supplement-manufacturing-2',
        '/fulfillment-application',
    ];

    const today = new Date().toISOString();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
            .map((page) => `
    <url>
        <loc>${baseUrl}${page}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>`)
            .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            // Cache on the Edge for 1 hour, allowing it to become stale
            'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
