import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // Allow native Next.js routes to pass right through unaffected
    if (
        url.pathname === '/' ||
        url.pathname.startsWith('/fulfillment') ||
        url.pathname.startsWith('/book-a-call') ||
        url.pathname.startsWith('/custom-formulas-2') ||
        url.pathname.startsWith('/custom-formulas-3') ||
        url.pathname.startsWith('/custom-supplement-manufacturing-2') ||
        url.pathname.startsWith('/fulfillment-application') ||
        url.pathname.startsWith('/portal') ||
        url.pathname.startsWith('/auth/error') ||
        url.pathname.startsWith('/private-login') ||  // WP login page — needs cookies & POST
        url.pathname.startsWith('/_next') ||
        url.pathname.startsWith('/api') ||
        url.pathname === '/next-sitemap.xml' ||
        (url.pathname.includes('.') && !url.pathname.endsWith('.xml'))
    ) {
        return NextResponse.next();
    }

    // Construct target WP Engine URL mapping natively to their backend
    // We bypass 'wp.privatelabelexpress.com' completely to avoid Cloudflare stripping our headers
    const wpHostname = 'privatelabelex.wpengine.com';
    const targetUrl = new URL(url.pathname + url.search, `https://${wpHostname}`);

    try {
        // 1. Send the fetch request without any Forwarded headers
        // Doing it natively ensures WP Engine's cache and load balancers treat this as an organic request
        const response = await fetch(targetUrl.toString(), {
            method: request.method,
            headers: {
                // spoof the Host header to force WP Engine to serve the primary domain without redirecting
                'Host': 'privatelabelexpress.com',
                'X-Forwarded-Proto': 'https',
                'X-Forwarded-Host': 'privatelabelexpress.com',
                // Essential Accept Headers
                'Accept': request.headers.get('Accept') || 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                // Optional Accept-Language
                'Accept-Language': request.headers.get('Accept-Language') || 'en-US,en;q=0.9',
            },
            redirect: 'manual' // Prevent fetch from blindly following 301s so we can capture and rewrite them
        });

        // 2. Capture Redirects (like WordPress automatically adding trailing slashes)
        if (response.status >= 300 && response.status < 400) {
            let location = response.headers.get('location');
            if (location) {
                // Map the WP Engine URL gracefully back to the original Domain
                location = location.replace(/https?:\/\/privatelabelex\.wpengine\.com/g, 'https://privatelabelexpress.com');
                // Aggressively force HTTPS to prevent strict browser blocks in incognito mode
                location = location.replace(/^http:\/\//i, 'https://');
                
                return NextResponse.redirect(location, response.status);
            }
        }

        // 3. Collect Response & Headers
        const contentType = response.headers.get('content-type') || '';
        const newHeaders = new Headers();
        newHeaders.set('Content-Type', contentType);
        // Explicitly do not cache this aggressive tunnel on Vercel Edge right now while testing
        newHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

        // 4. Rewrite Raw HTML Link Paths Back to Root Domain
        if (contentType.includes('text/html') || contentType.includes('xml')) {
            let body = await response.text();
            body = body.replace(new RegExp(`https://${wpHostname}`, 'g'), 'https://privatelabelexpress.com');
            body = body.replace(new RegExp(`http://${wpHostname}`, 'g'), 'https://privatelabelexpress.com');

            // Inject the dynamic Next.js XML sitemap link right before the closing index tag
            if (url.pathname.includes('sitemap_index.xml') || url.pathname === '/sitemap.xml') {
                const nextSitemapNode = `
    <sitemap>
        <loc>https://privatelabelexpress.com/next-sitemap.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
</sitemapindex>`;
                body = body.replace('</sitemapindex>', nextSitemapNode);
            }

            return new NextResponse(body, {
                status: response.status,
                headers: newHeaders
            });
        }

        // 5. Native Fallback (Returns JSON/XML untouched)
        const arrayBuffer = await response.arrayBuffer();
        return new NextResponse(arrayBuffer, {
            status: response.status,
            headers: newHeaders
        });

    } catch (error) {
        console.error('Fetch Tunnel Proxy Error:', error);
        return new NextResponse('Internal Proxy Tunnel Error.', { status: 500 });
    }
}

export const config = {
    // Capture all routes except explicit next static files and image optimization
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)'
    ]
};
