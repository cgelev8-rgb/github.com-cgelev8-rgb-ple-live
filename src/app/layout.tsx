import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Private Label Express",
  description: "Premium Supplement Manufacturing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Private Label Express",
              "url": "https://privatelabelexpress.com",
              "logo": "https://privatelabelexpress.com/logo.png",
              "description": "Leading partner for premium supplement manufacturing and end-to-end fulfillment services.",
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Private Label Manufacturing"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Fulfillment & Drop Shipping"
                  }
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/private-label-express",
                "https://www.facebook.com/privatelabelexpress",
                "https://www.instagram.com/privatelabelexpress"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-555-0199",
                "contactType": "sales",
                "areaServed": "US",
                "availableLanguage": "en"
              }
            })
          }}
        />
        <Script
          id="zsiqchat"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "siqcaf843e2f70c3c1d42d055d1de021bc0c17ff62389cfd1713c9edaa50429848b4008de3d3f23fc9d204b9d299fbaaac6", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zohopublic.com/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);`
          }}
        />
        <GoogleAnalytics gaId="G-8TVENGNEWG" />
      </body>
    </html>
  );
}
