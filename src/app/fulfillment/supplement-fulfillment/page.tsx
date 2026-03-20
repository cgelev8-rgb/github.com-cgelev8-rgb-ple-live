import React from "react";
import Image from "next/image";
import { AuthorBio } from "@/components/features/AuthorBio";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { TrackingLink } from "@/components/ui/TrackingLink";
import { Card, CardContent } from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import Script from "next/script";
import { QuickNav } from "@/components/features/QuickNav";
import { Thermometer, ShieldCheck, ClipboardList, Package, BookOpen, Factory, ThermometerSnowflake, Flag, Hash, PackageCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Supplement Fulfillment Services | 3PL for Vitamin & Nutraceutical Brands | Private Label Express",
    description:
        "Private Label Express offers expert 3PL order fulfillment for supplement, wellness, beauty, and CPG brands. Temperature-controlled storage, lot tracking, FDA-compliant warehousing, and seamless e-commerce integrations — under the same roof as our manufacturing.",
    alternates: {
        canonical: "https://privatelabelexpress.com/fulfillment/supplement-fulfillment",
    },
    openGraph: {
        title: "Supplement Fulfillment Services | Private Label Express",
        description: "Expert 3PL order fulfillment for supplement, wellness, and CPG brands. Temperature-controlled storage and lot tracking.",
        url: "https://privatelabelexpress.com/fulfillment/supplement-fulfillment",
        siteName: "Private Label Express",
        images: [
            {
                url: "https://privatelabelexpress.com/wp-content/uploads/2023/10/Private-Label-Express-Logo.png",
                width: 1200,
                height: 630,
                alt: "Private Label Express Fulfillment",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Supplement Fulfillment Services | Private Label Express",
        description: "Expert 3PL order fulfillment for supplement, wellness, and CPG brands.",
    },
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "3PL Supplement Fulfillment",
    provider: {
        "@type": "Organization",
        name: "Private Label Express",
        logo: "https://privatelabelexpress.com/wp-content/uploads/2023/10/Private-Label-Express-Logo.png"
    },
    areaServed: "US",
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Fulfillment Services",
        itemListElement: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Temperature-Controlled Storage"
                }
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Pick, Pack & Ship"
                }
            }
        ]
    }
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://privatelabelexpress.com/"
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Fulfillment",
            item: "https://privatelabelexpress.com/fulfillment/supplement-fulfillment"
        }
    ]
};

const capabilities = [
    {
        icon: <Thermometer className="w-12 h-12 stroke-[1.5]" />,
        title: "Temperature-Controlled Storage",
        description:
            "Gummies, probiotics, and softgels require precise temperature management. Our warehouse maintains controlled zones to protect the potency and integrity of your products.",
    },
    {
        icon: <ShieldCheck className="w-12 h-12 stroke-[1.5]" />,
        title: "FDA & GMP Compliant Handling",
        description:
            "Our fulfillment operations are governed by the same compliance standards as our manufacturing floor. Dietary supplements stored and shipped under verified SOPs.",
    },
    {
        icon: <ClipboardList className="w-12 h-12 stroke-[1.5]" />,
        title: "Lot Tracking & Expiration Management (FEFO)",
        description:
            "We use First-Expired, First-Out (FEFO) inventory management and full lot-level tracking. In the event of a recall, we can locate and isolate every affected unit within hours.",
    },
    {
        icon: <Package className="w-12 h-12 stroke-[1.5]" />,
        title: "Kitting & Subscription Box Services",
        description:
            "Fulfilling custom bundles, welcome kits, or monthly subscription boxes? We handle complex kitting workflows and personalized inserts at scale.",
    },
];

const integrations = [
    { name: "Shopify", icon: "🛍️" },
    { name: "WooCommerce", icon: "🌐" },
    { name: "Amazon FBM", icon: "📦" },
    { name: "TikTok Shop", icon: "🎵" },
    { name: "ClickFunnels", icon: "🔧" },
    { name: "Wholesale EDI", icon: "🏢" },
];

const processSteps = [
    {
        step: 1,
        title: "Submit Initial Deposit",
        description:
            "Secure your partnership with a deposit starting at just $299. This immediately activates our team to begin your dedicated account setup and integration.",
    },
    {
        step: 2,
        title: "Integration & Onboarding",
        description:
            "We connect directly to your sales channels and configure your SKUs, kitting rules, and shipping preferences within 1-2 business days.",
    },
    {
        step: 3,
        title: "Inbound & Receiving",
        description:
            "Product arrives at our warehouse and is received, lot-numbered, and placed into temperature-appropriate storage zones within 1 business day.",
    },
    {
        step: 4,
        title: "Pick, Pack & Ship",
        description:
            "Orders flow automatically from your store to our WMS. We pick, pack with your branded inserts, and ship same- or next-day.",
    },
];

const testimonials = [
    {
        quote:
            "We switched from a general 3PL after a gummy shipment arrived at customers damaged from heat exposure. PLE's temperature-controlled storage solved that problem permanently. We've had zero product complaints since.",
        name: "David K.",
        title: "CEO",
        company: "Functional Gummies",
    },
    {
        quote:
            "The FEFO lot tracking gave our compliance team the ability to audit any order in seconds. When a supplier sent us a COA discrepancy, we isolated the affected inventory in under an hour. That would have been impossible with our old 3PL.",
        name: "Amanda L.",
        title: "Director of Operations",
        company: "Probiotic Brand",
    },
    {
        quote:
            "Going from manufacturing directly into PLE's fulfillment pipeline cut two weeks off our time-to-market. No transport between warehouses, no receiving delays. Production ends on a Friday, orders go out Monday.",
        name: "Kevin S.",
        title: "Founder",
        company: "Sports Supplements",
    },
];

const relatedContent = [
    {
        title: "How to Choose a Supplement 3PL: 8 Questions You Must Ask",
        description: "Most 3PLs lack the compliance infrastructure dietary supplements require. Here's what to look for before you sign.",
        href: "/blog/how-to-choose-supplement-3pl",
        readTime: "6 min read",
    },
    {
        title: "FEFO vs. FIFO: Why Expiration-Based Fulfillment Matters for Supplement Brands",
        description: "Understanding inventory rotation methods and why FEFO specifically protects your brand from recalls and waste.",
        href: "/blog/fefo-vs-fifo-supplement-fulfillment",
        readTime: "5 min read",
    },
    {
        title: "How Manufacturing + Fulfillment Under One Roof Cuts Your Lead Time",
        description: "A breakdown of how vertical integration between production and logistics eliminates the hidden delays in most supplement supply chains.",
        href: "/blog/supplement-manufacturing-fulfillment-integration",
        readTime: "7 min read",
    },
];

const faqItems = [
    {
        question: "Do you offer temperature-controlled storage for gummies and probiotics?",
        answer:
            "Yes. Our warehouse includes dedicated temperature-controlled zones for temperature-sensitive supplement formats such as gummies, probiotics, and softgels. We maintain documented temperature logs for compliance purposes.",
    },
    {
        question: "How do you handle lot tracking and potential product recalls?",
        answer:
            "We track every inbound unit by lot number at the point of receiving. Using FEFO (First Expired, First Out) inventory logic, we can trace any SKU to its specific lot, production date, and outbound shipment destination in the event of a recall.",
    },
    {
        question: "What e-commerce platforms do you integrate with?",
        answer:
            "We integrate directly with Shopify, WooCommerce, Amazon (FBM and FBA Prep), TikTok Shop, ClickFunnels, and standard wholesale EDI. Custom integrations are available via our API.",
    },
    {
        question: "Can you handle subscription and custom insert kitting?",
        answer:
            "Yes. We support subscription box fulfillment, custom bundle kitting, and personalized insert programs. These workflows are configured during onboarding at no additional setup fee.",
    },
    {
        question: "Can you fulfill both DTC orders and B2B/wholesale orders?",
        answer:
            "Absolutely. We handle single-unit Shopify orders and palletized retail freight to major distributors using retailer-specific routing guides. You don't need a separate 3PL for each channel.",
    },
];

export default function SupplementFulfillmentServicesPage() {
    return (
        <div className="min-h-screen bg-white">
            <QuickNav />

            {/* Mobile Quick-Jump Nav */}
            <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm lg:hidden">
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2 px-4 py-2 whitespace-nowrap">
                        {[
                            { label: "Overview", href: "#difference" },
                            { label: "Capabilities", href: "#capabilities" },
                            { label: "Integrations", href: "#integrations" },
                            { label: "Process", href: "#process" },
                            { label: "Testimonials", href: "#testimonials" },
                            { label: "FAQ", href: "#faq" },
                            { label: "Get a Quote", href: "#contact" },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-xs font-semibold text-ple-navy border border-gray-200 rounded-full px-3 py-1.5 hover:bg-ple-orange hover:text-white hover:border-ple-orange transition-all shrink-0"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <script
                id="fulfillment-service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                id="fulfillment-breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                id="fulfillment-faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: faqItems.map((item) => ({
                            "@type": "Question",
                            name: item.question,
                            acceptedAnswer: { "@type": "Answer", text: item.answer },
                        })),
                    }),
                }}
            />
            <Script
                id="fulfillment-service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        serviceType: "Supplement Order Fulfillment",
                        provider: { "@type": "Organization", name: "Private Label Express", url: "https://privatelabelexpress.com" },
                        areaServed: "US",
                        description: "Specialized 3PL fulfillment for supplement and nutraceutical brands. Temperature-controlled storage, lot tracking, FDA-compliant handling, and seamless e-commerce integrations.",
                    }),
                }}
            />

            {/* Hero — Split layout with warehouse image */}
            <section id="hero" className="relative bg-ple-navy text-white overflow-hidden min-h-[85vh] flex items-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images/supplement-warehouse.webp"
                        alt="Supplement fulfillment warehouse with temperature-controlled storage"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ple-navy via-ple-navy/95 to-ple-navy/60"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-32">
                    {/* Left text */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ple-orange/20 text-ple-orange text-xs font-bold uppercase tracking-wider mb-6 border border-ple-orange/30">
                            <span className="w-2 h-2 rounded-full bg-ple-orange animate-pulse"></span>
                            Manufacturing + Fulfillment Under One Roof
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            <span className="text-ple-orange">Fulfillment</span> Services
                        </h1>
                        <p className="text-xl text-ple-light mb-6 leading-relaxed">
                            Fast, compliant, and accurate order fulfillment for supplement, wellness, beauty, and general CPG brands. Launch faster and avoid unnecessary shipping costs. Manufacturing and fulfillment under one roof.
                        </p>
                        <p className="text-sm text-gray-400 mb-10">
                            Temperature-controlled storage · Lot tracking · Same-day shipping · Full e-commerce integrations
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <TrackingLink href="/fulfillment-application" eventName="fulfillment_hero_quote">
                                <Button size="lg" className="text-lg px-8 py-6 shadow-xl shadow-orange-900/20">
                                    Get a Fulfillment Quote
                                </Button>
                            </TrackingLink>
                            <Link href="#process">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-white border-white/30 hover:bg-white/10">
                                    See How It Works
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Right — warehouse image close-up */}
                    <div className="hidden lg:block relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                            <Image
                                src="/images/supplement-warehouse.webp"
                                alt="Organized temperature-controlled supplement warehouse with supplement product inventory"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ple-navy/40 to-transparent"></div>
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-ple-orange text-white rounded-xl px-5 py-3 shadow-xl font-bold text-sm">
                            Same-Day Order Fulfillment
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust / Certification Logo Bar (Ticker) */}
            <section id="trust-bar" className="py-6 bg-gray-50 border-b border-gray-100 overflow-hidden relative">
                <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

                <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-5 relative z-20">Fulfillment Built to Supplement Industry Standards</p>

                <div className="flex w-fit animate-scroll gap-4 sm:gap-8">
                    {/* Duplicate the list twice for seamless infinite scrolling */}
                    {[...Array(2)].map((_, arrayIndex) => (
                        <div key={arrayIndex} className="flex gap-4 sm:gap-8 shrink-0">
                            {[
                                { icon: <Factory className="w-5 h-5 text-ple-orange stroke-[2]" />, label: "GMP-Governed Warehouse" },
                                { icon: <ThermometerSnowflake className="w-5 h-5 text-ple-orange stroke-[2]" />, label: "Temperature-Controlled Storage" },
                                { icon: <Flag className="w-5 h-5 text-ple-orange stroke-[2]" />, label: "US-Based Fulfillment" },
                                { icon: <Hash className="w-5 h-5 text-ple-orange stroke-[2]" />, label: "FEFO Lot Tracking" },
                                { icon: <ShieldCheck className="w-5 h-5 text-ple-orange stroke-[2]" />, label: "FDA Registered Facility" },
                                { icon: <PackageCheck className="w-5 h-5 text-ple-orange stroke-[2]" />, label: "Same-Day Shipping" },
                            ].map((badge) => (
                                <div key={badge.label} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-[0_2px_8px_rgb(0,0,0,0.04)] shrink-0 group hover:border-ple-orange/30 transition-colors">
                                    <span className="flex items-center justify-center">{badge.icon}</span>
                                    <span className="text-xs font-semibold text-ple-navy whitespace-nowrap">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* Process */}
            <section id="process" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-2 block">Getting Started</span>
                        <h2 className="text-3xl font-bold text-ple-navy mb-4">From Onboarding to Shipping in 4 Steps</h2>
                        <p className="text-lg text-gray-600">A structured transition with zero downtime for your current sales channels.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10 transform translate-y-4"></div>
                        {processSteps.map((step) => (
                            <div key={step.step} className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <div className={`w-12 h-12 ${step.step === 4 ? "bg-ple-orange" : "bg-ple-navy"} text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shrink-0`}>
                                    {step.step}
                                </div>
                                <h3 className="text-lg font-bold text-ple-navy mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <TrackingLink href="/fulfillment-application" eventName="fulfillment_process_book_call">
                            <Button size="lg" className="bg-ple-navy text-white hover:bg-ple-navy/90 text-lg px-10 py-6 font-bold shadow-xl">
                                Book your 15 minute call now →
                            </Button>
                        </TrackingLink>
                    </div>
                </div>
            </section>

            {/* SLA Feature Banner */}
            <section className="bg-ple-orange py-6 relative overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.15)]">
                <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-black rounded-2xl p-5 md:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-white/10">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-ple-orange font-bold text-xs uppercase tracking-widest">Elite Fulfillment Standards</span>
                            </div>
                            <h3 className="text-xl md:text-2xl text-white font-extrabold leading-tight mb-2">
                                Unlock Amazon Prime & TikTok Shop Eligibility
                            </h3>
                            <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed">
                                Scale your brand seamlessly. We maintain the strict on-time delivery rates and rapid tracking updates demanded by top marketplaces.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 shrink-0 py-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Amazon_Prime_Logo.svg" alt="Amazon Prime" className="h-7 md:h-10 object-contain brightness-0 invert drop-shadow-md" />
                            <div className="w-px h-10 bg-white/20 hidden sm:block"></div>
                            <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="TikTok Shop" className="h-7 md:h-10 object-contain brightness-0 invert drop-shadow-md" />
                        </div>
                    </div>
                </div>
            </section>

            {/* The Difference — with product image */}
            <section id="difference" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-2 block">Why It Matters</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-ple-navy mb-6">
                                Built for Supplements. Capable of Fulfilling Much More.
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Our fulfillment operation was built around the strictest product category we serve — dietary supplements. That means temperature-controlled zones, FEFO lot tracking, and FDA-compliant handling SOPs as the baseline, not the exception.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Because we&apos;re already operating at that standard, we can fulfill a wide range of product types — wellness products, topicals, beauty and personal care, and general CPG — under the same compliant infrastructure. If your product has a shelf life, a label claim, or a compliance requirement, we can handle it.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "General 3PL", checks: ["Basic storage", "No lot tracking", "No temperature control", "No FDA compliance protocols", "No supplement experience"], highlight: false },
                                { label: "Private Label Express", checks: ["Temperature-controlled zones", "FEFO lot tracking", "FDA & GMP compliant SOPs", "Recall support capability", "Supplement-exclusive operations"], highlight: true },
                            ].map((col) => (
                                <div key={col.label} className={`rounded-2xl p-6 border-2 ${col.highlight ? "border-ple-orange bg-ple-navy text-white" : "border-gray-200 bg-white"}`}>
                                    <h3 className={`font-bold text-lg mb-4 ${col.highlight ? "text-ple-orange" : "text-ple-navy"}`}>{col.label}</h3>
                                    <ul className="space-y-2">
                                        {col.checks.map((check) => (
                                            <li key={check} className="flex items-center gap-2 text-sm">
                                                <span className={col.highlight ? "text-green-400" : "text-red-400"}>{col.highlight ? "✓" : "✗"}</span>
                                                <span className={col.highlight ? "text-white/90" : "text-gray-500"}>{check}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section id="capabilities" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-2 block">What We Offer</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-ple-navy mb-4">
                            End-to-End Supplement Fulfillment Solutions
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to get your product from our warehouse to your customer — compliantly, accurately, and on time.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {capabilities.map((cap) => (
                            <Card key={cap.title} className="border border-gray-100 hover:shadow-lg transition-shadow bg-white">
                                <CardContent className="p-8">
                                    <div className="mb-6 text-ple-orange">{cap.icon}</div>
                                    <h3 className="text-xl font-bold text-ple-navy mb-3">{cap.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{cap.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mid-Page CTA */}
            <section id="mid-cta" className="py-16 bg-ple-slate">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                        <div className="text-left flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Ready to ship with Express Fulfillment?
                            </h2>
                            <p className="text-white/80 text-lg">
                                We can get you integrated and ready to sell within <span className="font-bold text-white underline decoration-white/50 underline-offset-4">24 business hours</span> of your deposit!
                            </p>
                        </div>
                        <TrackingLink href="/fulfillment-application" eventName="fulfillment_mid_cta" className="shrink-0">
                            <Button size="lg" className="bg-ple-orange text-white hover:bg-orange-600 border-none text-lg px-8 py-6 font-bold shadow-lg">
                                Get Started Now →
                            </Button>
                        </TrackingLink>
                    </div>
                </div>
            </section>

            {/* Integrations */}
            <section id="integrations" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-2 block">Connect Your Stack</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-ple-navy mb-4">
                            Seamless Integration with Your Sales Channels
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Orders flow automatically from your store to our warehouse management system. Real-time inventory sync. No manual work.
                        </p>
                    </div>

                    {/* Veeqo Style Integration Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
                        {[
                            { name: "Shopify Plus", file: "shopify.svg" },
                            { name: "Amazon", file: "amazon.svg" },
                            { name: "Walmart", file: "walmart.png" },
                            { name: "eBay", file: "ebay.svg" },
                            { name: "Etsy", file: "etsy.svg" },
                            { name: "WooCommerce", file: "woocommerce.svg" },
                            { name: "TikTok Shop", file: "tiktok.svg" },
                            { name: "BigCommerce", file: "bigcommerce.svg" },
                            { name: "Magento", file: "magento.png" },
                            { name: "Wayfair", file: "wayfair.png" },
                            { name: "NetSuite", file: "netsuite.png" },
                            { name: "SellerCloud", file: "sellercloud.png" },
                            { name: "Rithum", file: "rithum.png" },
                            { name: "Shein", file: "shein.png" },
                            { name: "UPS", file: "ups.svg" },
                            { name: "USPS", file: "usps.svg" },
                            { name: "FedEx", file: "fedex.svg" },
                            { name: "DHL Express", file: "dhl.svg" },
                            { name: "OnTrac", file: "ontrac.png" },
                            { name: "Amazon Shipping", file: "amazon.svg" }
                        ].map((int) => (
                            <div key={int.name} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border-2 border-ple-slate border-opacity-30 shadow-[0_4px_12px_rgb(0,0,0,0.03)] hover:border-opacity-100 hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] transition-all group duration-300 min-h-[140px]">
                                {/* Using next/img standard approach or standard img for clearbit */}
                                <div className="h-12 w-full flex items-center justify-center mb-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`/images/integrations/${int.file}`}
                                        alt={`${int.name} Logo`}
                                        className="max-h-12 max-w-[80%] object-contain group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="text-sm font-semibold text-gray-500 group-hover:text-ple-navy transition-colors text-center">{int.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Warehouse Video / Image Feature */}
            <section id="video" className="py-0 relative h-[420px] overflow-hidden">
                <Image
                    src="/images/supplement-warehouse.webp"
                    alt="Inside the Private Label Express supplement fulfillment center"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-ple-navy/70 backdrop-blur-[1px]"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-3 block">Inside Our Operation</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        A Fulfillment Center Built for Supplements
                    </h2>
                    <p className="text-white/80 text-lg max-w-2xl">
                        Temperature-controlled zones, dedicated lot-tracking workflows, and a team trained exclusively on dietary supplement compliance.
                    </p>
                </div>
            </section>

            {/* B2B + DTC */}
            <section id="btob-dtc" className="py-24 bg-gradient-to-br from-ple-navy to-ple-navy/90 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/supplement-products.webp"
                        alt=""
                        fill
                        className="object-cover opacity-5"
                        aria-hidden="true"
                    />
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-ple-orange/5 -skew-x-12 transform origin-top-right"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Scaling from DTC to Retail Distribution</h2>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
                        We can handle a single-bottle Shopify order just as easily as a palletized wholesale shipment to a major distributor — for any product category, routing guide compliant and on time.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
                        <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm text-left">
                            <h3 className="text-lg font-bold text-ple-orange mb-3">Direct-to-Consumer (DTC)</h3>
                            <ul className="space-y-2 text-sm text-white/90">
                                <li>✓ Same-day Shopify & WooCommerce fulfillment</li>
                                <li>✓ Subscription box kitting & personalization</li>
                                <li>✓ Branded unboxing inserts included</li>
                            </ul>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm text-left">
                            <h3 className="text-lg font-bold text-ple-orange mb-3">B2B & Wholesale</h3>
                            <ul className="space-y-2 text-sm text-white/90">
                                <li>✓ Retailer routing-guide compliant</li>
                                <li>✓ EDI integration available</li>
                                <li>✓ Pallet prep for Amazon FBA & distributors</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <TrackingLink href="/fulfillment-application" eventName="fulfillment_b2b_dtc_cta">
                            <Button size="lg" className="bg-ple-orange text-white hover:bg-orange-600 border-none text-lg px-10 py-6 font-bold shadow-xl">
                                Get Started with Fulfillment →
                            </Button>
                        </TrackingLink>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-2 block">Client Voices</span>
                        <h2 className="text-3xl font-bold text-ple-navy mb-4">What Our Fulfillment Partners Say</h2>
                        <p className="text-lg text-gray-600">Real stories from brands that switched to specialized supplement fulfillment.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t) => (
                            <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                                <div className="text-ple-orange text-4xl font-serif leading-none mb-4">&ldquo;</div>
                                <p className="text-gray-700 leading-relaxed flex-1 italic mb-6">{t.quote}</p>
                                <div className="border-t border-gray-100 pt-4">
                                    <div className="font-bold text-ple-navy">{t.name}</div>
                                    <div className="text-sm text-gray-500">{t.title} · {t.company}</div>
                                    <div className="flex gap-1 mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-ple-orange text-sm">★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-ple-navy mb-4">Common Questions About Supplement 3PL Services</h2>
                        <p className="text-lg text-gray-600">Everything you should know before choosing a fulfillment partner.</p>
                    </div>

                    {/* E-E-A-T Author Transparency Block */}
                    <AuthorBio
                        name="Chris Gonzalez"
                        title="Fulfillment & Logistics Systems Director"
                        expertise={["15+ Years Logistics Experience", "FDA Compliance", "Cold Chain Storage", "DTC & B2B Freight"]}
                        bio={`With over 15 years of intensive logistics and supply chain systems experience, Chris has helped engineer the fulfillment infrastructure for over 100 scaling CPG brands. He specializes in designing compliance-first, efficiency-driven warehousing operation systems that meet stringent FDA and cGMP standards—ensuring dietary supplements and consumer products maintain their integrity from the manufacturing floor to the consumer's door.

Fact-checked by Private Label Express Operations Review Board • Updated March 2026`}
                        hideFooter={true}
                    />

                    <Accordion items={faqItems} />
                </div>
            </section>

            {/* Related Content */}
            <section id="related" className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-ple-navy mb-8 flex items-center gap-2"><BookOpen className="w-6 h-6 stroke-[1.5]" /> You Might Also Find Helpful</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedContent.map((post) => (
                            <div key={post.title} className="h-full">
                                <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col h-full">
                                    <span className="text-xs font-bold uppercase tracking-widest text-ple-orange mb-3 block">{post.readTime}</span>
                                    <h3 className="font-bold text-ple-navy text-sm mb-2 leading-snug">{post.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed flex-1">{post.description}</p>
                                    <span className="text-ple-orange text-xs font-bold mt-4 block">Coming soon!</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="contact" className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-ple-navy mb-6">Stop Worrying About Logistics. Start Scaling Your Brand.</h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Request a custom fulfillment quote. We&apos;ll review your SKU count, monthly volume, and channel mix, then send a transparent pricing breakdown within 2 business days.
                    </p>
                    <div className="bg-gray-50 shadow-lg rounded-2xl p-8 max-w-lg mx-auto border border-gray-100">
                        <TrackingLink href="/fulfillment-application" eventName="fulfillment_bottom_cta">
                            <Button size="lg" className="w-full text-lg py-6 shadow-xl bg-ple-orange text-white hover:bg-orange-600 border-none">
                                Request a Fulfillment Quote
                            </Button>
                        </TrackingLink>
                        <p className="mt-4 text-sm text-gray-400">Volume-based pricing. No long-term lock-in required to get started.</p>
                    </div>
                    <div className="mt-12">
                        <p className="text-gray-500 text-sm">
                            Need a custom supplement formula first?{" "}
                            <Link href="/custom-supplement-manufacturing-2" className="text-ple-orange font-bold hover:underline">
                                Explore our Custom Manufacturing service →
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
