import { Metadata } from "next";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { TrackingLink } from "@/components/ui/TrackingLink";
import { Card, CardContent } from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import { MOQCalculator } from "@/components/features/MOQCalculator";
import Script from "next/script";
import { QuickNav } from "@/components/features/QuickNav";
import { AuthorBio } from "@/components/features/AuthorBio";
import { ShieldCheck, CheckCircle, FlaskConical, BookOpen, Pill, Droplet, Leaf, Activity, Brain, Sparkles, Bone, Package, Layers, Fingerprint, Microscope, Weight } from "lucide-react";

export const metadata: Metadata = {
    title: "Custom Supplement Formulation & R&D | Private Label Express",
    description:
        "Develop unique, proprietary supplement formulas with our expert R&D team. 100% IP ownership, GMP-certified manufacturing, and low MOQs for custom runs.",
    alternates: {
        canonical: "https://privatelabelexpress.com/custom-formulas-3",
    },
};

const capabilities = [
    {
        icon: <Pill className="w-12 h-12 stroke-[1.5] text-ple-navy" />,
        title: "Capsules & Tablets",
        description: "From standard gelatin to premium pullulan vegan caps, we manufacture high-speed capsule and tablet runs tailored to your exact active ingredient payload.",
    },
    {
        icon: <Leaf className="w-12 h-12 stroke-[1.5] text-ple-navy" />,
        title: "Powder Blends",
        description: "Precision-milled functional powders for pre-workouts, collagen blends, and greens. Our R&D team excels at flavor masking bitter botanicals.",
    },
    {
        icon: <Droplet className="w-12 h-12 stroke-[1.5] text-ple-navy" />,
        title: "Gummies & Softgels",
        description: "Highly stable, pectin-based gummies and lipid-based softgels formulated for maximized bioavailability and exceptional taste profiles.",
    },
];

const testimonials = [
    {
        quote: "Private Label Express didn't just manufacture our formula; their R&D team actively improved it. They identified an ingredient interaction that would have caused clumping and re-engineered the excipients before we ever ran a pilot.",
        name: "Marcus T.",
        title: "Founder",
        company: "Elite Nootropics",
    },
    {
        quote: "Finding a facility that actually understands custom GMP compliance was our biggest hurdle. With PLE, we not only got our proprietary blend exactly as spec'd, but the full batch records and COAs were flawless.",
        name: "Sarah V.",
        title: "Director of Product Development",
        company: "Wellness Co.",
    },
    {
        quote: "We brought them a concept for a complex greens powder that tasted horrible in our kitchen tests. Their flavoring chemists turned it into our #1 best seller in under 12 weeks of R&D.",
        name: "Dr. James W.",
        title: "Chief Medical Officer",
        company: "Vitality Supplements",
    },
];

const relatedContent = [
    {
        title: "The Step-by-Step Guide to Custom Supplement Manufacturing",
        description: "Everything you need to know about taking a supplement from a napkin sketch to a finished, FDA-compliant product ready for retail.",
        href: "/blog/custom-supplement-manufacturing-guide",
        readTime: "8 min read",
    },
    {
        title: "Capsule vs. Tablet: Which Format is Right for Your Formula?",
        description: "An in-depth comparison of the manufacturing costs, bioavailability constraints, and consumer preferences for solid dose supplements.",
        href: "/blog/capsule-vs-tablet-supplements",
        readTime: "5 min read",
    },
    {
        title: "Understanding GMP Certification in Supplement Manufacturing",
        description: "Why working with a truly cGMP-certified facility is the only way to protect your brand from FDA recalls and liability.",
        href: "/blog/gmp-certification-supplement-manufacturing",
        readTime: "6 min read",
    },
];

const categories = [
    {
        icon: <Activity className="w-8 h-8 text-ple-navy" />,
        title: "Sports Nutrition",
        description: "Pre-workouts, BCAAs, and custom protein blends engineered for solubility, flavor, and performance.",
    },
    {
        icon: <Brain className="w-8 h-8 text-ple-navy" />,
        title: "Nootropics & Cognitive",
        description: "Complex synergistic blends of adaptogens and functional mushrooms requiring precise dosing and excipient management.",
    },
    {
        icon: <Sparkles className="w-8 h-8 text-ple-navy" />,
        title: "Beauty & Collagen",
        description: "Highly bioavailable marine and bovine collagen peptides, biotin, and keratin formulations for hair, skin, and nails.",
    },
    {
        icon: <Bone className="w-8 h-8 text-ple-navy" />,
        title: "Pet Supplements",
        description: "Chewables and liquid formulas adhering to AAFCO and NASC guidelines for canine and feline health.",
    },
];

const packagingOptions = [
    {
        title: "PET & HDPE Bottles",
        description: "Industry-standard packer bottles in various sizes, colors, and neck finishes, capped with induction seals for immediate retail compliance.",
    },
    {
        title: "Gusset Bags & Pouches",
        description: "Resealable, stand-up flexible pouches ideal for high-volume powders and cost-effective shipping.",
    },
    {
        title: "Stick Packs & Sachets",
        description: "Single-serving, travel-friendly packaging perfect for hydration multipliers, pre-workouts, and daily greens.",
    },
    {
        title: "Blister Packs",
        description: "Pharmaceutical-grade push-through blister packaging for premium presentation and extended shelf life.",
    },
    {
        title: "Custom Label & Shrink Sleeves",
        description: "Vibrant, full-wrap shrink sleeves and premium metallic/matte labels applied seamlessly in-line during production.",
    },
];

const testingProtocols = [
    {
        icon: <Fingerprint className="w-8 h-8 text-ple-orange" />,
        title: "Identity & Potency Testing (FTIR/HPLC)",
        description: "We scientifically guarantee that every raw material entering our facility exactly matches its Certificate of Analysis, ensuring your label claims are 100% accurate.",
    },
    {
        icon: <Microscope className="w-8 h-8 text-ple-orange" />,
        title: "Strict Microbial Screening",
        description: "Every batch is rigorously tested for Total Plate Count, Yeast, Mold, E. Coli, Salmonella, and Staphylococcus to ensure consumer safety.",
    },
    {
        icon: <Weight className="w-8 h-8 text-ple-orange" />,
        title: "Heavy Metal & Allergen Analysis",
        description: "We utilize ICP-MS technology to screen for Lead, Arsenic, Cadmium, and Mercury, while strictly segregating major allergens like soy and dairy.",
    },
];

export default function CustomFormulasPage() {
    return (
        <div className="min-h-screen bg-white">
            <QuickNav />
            <Script
                id="custom-formula-faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Why is the Minimum Order Quantity (MOQ) 150,000 units?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Custom manufacturing requires sourcing unique raw materials and setting up production lines specifically for your run. To achieve cost-effectiveness and operational efficiency for a bespoke run, a minimum volume of 150,000 capsules or tablets is required."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Do I own the formula?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, absolutely. When you pay for custom R&D and manufacturing, you own 100% of the Intellectual Property (IP) for that formula. We can sign a Non-Disclosure Agreement (NDA) to ensure your trade secrets are protected."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What is the typical lead time?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Custom projects typically take 12-16 weeks from the time the deposit is paid. This timeline includes raw material sourcing, R&D, production, testing, and final packaging."
                                }
                            }
                        ]
                    })
                }}
            />
            {/* Hero Section — Split layout with imagery */}
            <section id="hero" className="relative bg-ple-navy text-white overflow-hidden min-h-[80vh] flex items-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images/manufacturing-facility.png"
                        alt="GMP-certified supplement manufacturing and R&D facility"
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
                            Proprietary Formulas · 100% IP Ownership · GMP Certified
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            Your Vision.{" "}
                            <span className="text-ple-orange">Our Expertise.</span>
                        </h1>
                        <p className="text-xl text-ple-light mb-10 leading-relaxed">
                            Create a completely unique supplement brand with our end-to-end custom formulation services.
                            From R&amp;D to final packaging, we bring your proprietary concepts to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <TrackingLink href="/custom-application" eventName="custom_formulas_hero_button">
                                <Button size="lg" className="text-lg px-8 py-6 shadow-xl shadow-orange-900/20">
                                    Start Your Custom Run
                                </Button>
                            </TrackingLink>
                            <Link href="#process">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-white border-white/30 hover:bg-white/10">
                                    See the Process
                                </Button>
                            </Link>
                        </div>
                        <p className="text-sm text-gray-400">It starts with a 2-minute questionnaire. No commitment required.</p>
                    </div>
                    {/* Right — product image */}
                    <div className="hidden lg:block relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                            <Image
                                src="/images/supplement-capsules-tablets.png"
                                alt="Custom supplement capsules and tablets produced at PLE"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ple-navy/40 to-transparent"></div>
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-ple-orange text-white rounded-xl px-5 py-3 shadow-xl font-bold text-sm">
                            500+ Custom Formulas Produced
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Banner - FTC/FDA Compliant */}
            <section className="bg-white border-b border-gray-100 py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-2 font-bold text-gray-600">
                        <ShieldCheck className="w-6 h-6 text-ple-navy" />
                        <span>GMP Certified Setup</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-gray-600">
                        <CheckCircle className="w-6 h-6 text-ple-navy" />
                        <span>Manufactured in an FDA-Registered Facility</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-gray-600">
                        <FlaskConical className="w-6 h-6 text-ple-navy" />
                        <span>Third-Party Tested</span>
                    </div>
                </div>
            </section>

            {/* The Process */}
            <section id="process" className="py-14 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-ple-navy mb-4">The Custom Process</h2>
                        <p className="text-lg text-gray-600">From concept to shelf in 5 simple steps.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10 transform translate-y-4"></div>

                        <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-full">
                            <div className="w-12 h-12 bg-ple-navy text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shrink-0">1</div>
                            <h3 className="text-lg font-bold text-ple-navy mb-2">Name Your Function</h3>
                            <p className="text-sm text-gray-600">Pick a main ingredient or function you want to target.</p>
                        </div>

                        {/* Step 2 — Questionnaire, highlighted as the entry point */}
                        <div className="relative bg-ple-orange p-6 rounded-xl shadow-lg border-2 border-ple-orange flex flex-col items-center text-center h-full">
                            <div className="w-12 h-12 bg-white text-ple-orange rounded-full flex items-center justify-center font-bold text-xl mb-4 shrink-0">2</div>
                            <h3 className="text-lg font-bold text-white mb-2">Fill Questionnaire</h3>
                            <p className="text-sm text-white/90 mb-4">A short form to tell us your formula needs, format, and volume goals.</p>
                            <TrackingLink href="/custom-application" eventName="custom_formulas_process_button" className="mt-auto">
                                <span className="inline-block bg-white text-ple-orange font-bold text-sm px-4 py-2 rounded-full hover:bg-orange-50 transition-colors">
                                    Start Here →
                                </span>
                            </TrackingLink>
                        </div>

                        <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-full">
                            <div className="w-12 h-12 bg-ple-navy text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shrink-0">3</div>
                            <h3 className="text-lg font-bold text-ple-navy mb-2">Connect With Us</h3>
                            <p className="text-sm text-gray-600">Connect with us via chat, phone, or email.</p>
                        </div>

                        <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-full">
                            <div className="w-12 h-12 bg-ple-navy text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shrink-0">4</div>
                            <h3 className="text-lg font-bold text-ple-navy mb-2">Review Options</h3>
                            <p className="text-sm text-gray-600">Review your formula and manufacturing options with our team.</p>
                        </div>

                        <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-full">
                            <div className="w-12 h-12 bg-ple-orange text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shrink-0">5</div>
                            <h3 className="text-lg font-bold text-ple-navy mb-2">Deposit & Go!</h3>
                            <p className="text-sm text-gray-600">Make your deposit & let's go! Production begins.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Format Capabilities Grid */}
            <section className="py-14 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-ple-navy mb-4">Mastering Every Format</h2>
                        <p className="text-lg text-gray-600">Our state-of-the-art facility is equipped to produce your formula in the exact format your customers demand.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {capabilities.map((cap) => (
                            <div key={cap.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                                <div className="mb-6 bg-white w-20 h-20 rounded-2xl shadow-sm flex items-center justify-center border border-gray-100">
                                    {cap.icon}
                                </div>
                                <h3 className="text-xl font-bold text-ple-navy mb-3">{cap.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{cap.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supplement Categories */}
            <section className="py-14 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-2 block">Industry Expertise</span>
                        <h2 className="text-3xl font-bold text-ple-navy mb-4">Trending Formulation Categories</h2>
                        <p className="text-lg text-gray-600">We specialize in manufacturing the most profitable and high-demand supplement niches.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <div key={cat.title} className="bg-white border flex flex-col items-center border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4">
                                    {cat.icon}
                                </div>
                                <h3 className="font-bold text-ple-navy mb-2">{cat.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packaging Options */}
            <section className="py-14 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/3">
                            <h2 className="text-3xl font-bold text-ple-navy mb-4">End-to-End Packaging</h2>
                            <p className="text-lg text-gray-600 mb-6">Your brand&apos;s first impression matters. We offer fully customized retail-ready packaging solutions applied directly on our production lines.</p>
                            <div className="flex items-center gap-3 text-ple-orange font-bold">
                                <Package className="w-6 h-6" /> Explore Capabilities
                            </div>
                        </div>
                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {packagingOptions.map((pkg) => (
                                <div key={pkg.title} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                    <h4 className="font-bold text-ple-navy flex items-center gap-2 mb-2">
                                        <Layers className="w-4 h-4 text-ple-orange min-w-[16px]" /> {pkg.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">{pkg.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MOQ Calculator Section */}
            <section id="calculator" className="py-8 bg-gradient-to-br from-ple-navy to-ple-navy/80 px-4">
                <div className="max-w-7xl mx-auto">
                    <MOQCalculator />
                </div>
            </section>

            {/* Expert Guidance Subsection */}
            <section id="guidance" className="py-14 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-ple-orange/5 -skew-x-12 transform origin-top-right"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-100">
                                <span className="w-2 h-2 rounded-full bg-teal-500"></span> Expert Support
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-ple-navy mb-6">
                                We Don't Just Measure.<br />
                                <span className="text-teal-600">We Guide.</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Formulating a custom product is a scientific and artistic endeavor. You don't have to walk that path alone.
                                Our R&D team works as an extension of your brand to ensure your vision is commercially viable.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                        📊
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-ple-navy">Market Analysis</h4>
                                        <p className="text-sm text-gray-600 mt-1">We advise on ingredient trends so you don't launch an outdated formula.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                                        🧬
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-ple-navy">Ingredient Synergy</h4>
                                        <p className="text-sm text-gray-600 mt-1">We ensure your chosen ingredients work together effectively and safely.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                                        💰
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-ple-navy">Pricing Guidance</h4>
                                        <p className="text-sm text-gray-600 mt-1">We help you engineer your formula to hit your target cost per bottle.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                        ⚖️
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-ple-navy">Compliance Check</h4>
                                        <p className="text-sm text-gray-600 mt-1">We review label claims to keep you safe from regulatory pitfalls.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ingredients image — replaces placeholder */}
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl">
                                <Image
                                    src="/images/supplement-ingredients.png"
                                    alt="Premium botanical raw ingredients used in custom supplement formulation"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ple-navy/30 to-transparent"></div>
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-ple-navy flex items-center justify-center text-white font-bold text-xs">Dr.</div>
                                    <div className="font-bold text-ple-navy text-sm">Head of Formulation</div>
                                </div>
                                <p className="text-xs text-gray-600 italic">&ldquo;Our goal is to create products that not only sell but truly work.&rdquo;</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality Assurance & Testing Transparency */}
            <section className="py-14 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 max-w-3xl mx-auto">
                        <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-2 block">Clinical Integrity</span>
                        <h2 className="text-3xl font-bold text-ple-navy mb-4">Uncompromising QA Testing</h2>
                        <p className="text-lg text-gray-600">In the supplement industry, trust is built in the lab. Every custom formula undergoes rigorous multi-stage analytical testing before it ever leaves our facility.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testingProtocols.map((test) => (
                            <div key={test.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    {test.icon}
                                </div>
                                <div className="mb-4">
                                    {test.icon}
                                </div>
                                <h3 className="font-bold text-lg text-ple-navy mb-2">{test.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{test.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mid-page CTA banner — after Expert Guidance */}
            <section className="py-12 bg-ple-orange">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                                Your formula starts with a 2-minute questionnaire.
                            </h2>
                            <p className="text-white/80">
                                Tell us your target function, preferred format, and volume — we&apos;ll take it from there.
                            </p>
                        </div>
                        <TrackingLink href="/custom-application" eventName="custom_formulas_mid_cta_button" className="shrink-0">
                            <Button size="lg" className="bg-white text-ple-orange hover:bg-gray-100 border-none text-lg px-8 py-6 font-bold shadow-lg">
                                Start Your Custom Run →
                            </Button>
                        </TrackingLink>
                    </div>
                </div>
            </section>

            {/* Case Study */}
            <section className="py-14 bg-white border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-ple-navy rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-10 md:p-12 text-white flex flex-col justify-center">
                            <span className="text-ple-orange font-bold uppercase tracking-wider text-sm mb-4 block">Success Story</span>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">From Clumping Disaster to #1 Category Best-Seller</h3>
                            <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                                A premium sports nutrition brand came to us after their previous manufacturer failed to stabilize a complex hygroscopic pre-workout powder. Within 4 weeks, our R&D team completely re-engineered the excipient profile, fixed the clumping issue, and enhanced the flavor system.
                            </p>
                            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                                <div>
                                    <div className="text-2xl font-bold text-white mb-1">1M+</div>
                                    <div className="text-xs text-ple-orange font-bold uppercase tracking-wider">Units Sold</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white mb-1">12 Wks</div>
                                    <div className="text-xs text-ple-orange font-bold uppercase tracking-wider">R&D to Shelf</div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative min-h-[300px]">
                            <Image
                                src="/images/supplement-ingredients.png"
                                alt="Supplement R&D Laboratory"
                                fill
                                className="object-cover opacity-80 mix-blend-overlay"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-ple-navy via-transparent to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-14 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-2 block">Brand Experiences</span>
                        <h2 className="text-3xl font-bold text-ple-navy mb-4">Trusted by Industry Leaders</h2>
                        <p className="text-lg text-gray-600">See what happens when you partner with a manufacturer that actually understands R&D.</p>
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

            {/* FAQ Section */}
            <section id="faq" className="py-14 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-ple-navy mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-gray-600">Common questions about our Custom Manufacturing process.</p>
                    </div>

                    {/* E-E-A-T Author Transparency Block */}
                    <AuthorBio
                        name="Dr. William L."
                        title="PhD Formulation Scientist & Lead Product Developer"
                        expertise={["20+ Years Dietary Supplement R&D", "Bioavailability Engineering", "Flavor Masking", "FDA/cGMP Compliance"]}
                        bio="With over 20 years of experience directing custom supplement R&D, Dr. William has formulated hundreds of commercially successful products across sports nutrition, cognitive health, and specialized functional formats. He ensures every custom run is engineered for maximum stability, efficacy, and strict regulatory compliance from day one."
                    />

                    <Accordion
                        items={[
                            {
                                question: "Why is the Minimum Order Quantity (MOQ) 150,000 units?",
                                answer: "Custom manufacturing requires sourcing unique raw materials and setting up production lines specifically for your run. To achieve cost-effectiveness and operational efficiency for a bespoke run, a minimum volume of 150,000 capsules or tablets is required."
                            },
                            {
                                question: "Do I own the formula?",
                                answer: "Yes, absolutely. When you pay for custom R&D and manufacturing, you own 100% of the Intellectual Property (IP) for that formula. We can sign a Non-Disclosure Agreement (NDA) to ensure your trade secrets are protected."
                            },
                            {
                                question: "What is the typical lead time?",
                                answer: "Custom projects typically take 12-16 weeks from the time the deposit is paid. This timeline includes raw material sourcing (which can vary by ingredient availability), R&D, pilot runs, production, testing, and final packaging."
                            },
                            {
                                question: "Can you help me reverse engineer an existing product?",
                                answer: "Yes. Our R&D team can analyze a competitor's product or an existing formula you like and help you create a similar—or improved—version that meets your specific goals."
                            }
                        ]}
                    />
                </div>
            </section>

            {/* Related Content */}
            <section id="related" className="py-14 bg-gray-50 border-t border-gray-100">
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

            {/* CTA Section */}
            <section id="contact" className="py-14 bg-ple-navy text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Ready to Build Your Legacy?</h2>
                    <p className="text-xl text-ple-light mb-6">
                        Custom manufacturing requires a commitment to excellence. If you&apos;re ready for the next level, we&apos;re ready to partner.
                    </p>
                    <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm mx-auto max-w-lg">
                        <p className="mb-2 font-semibold">Ready to get started?</p>
                        <p className="text-sm text-white/70 mb-6">Fill out our short questionnaire — it takes about 2 minutes — and our team will review your project and respond within 1 business day.</p>
                        <TrackingLink href="/custom-application" eventName="custom_formulas_bottom_cta_button">
                            <Button size="lg" className="w-full text-lg py-6 shadow-xl bg-ple-orange text-white hover:bg-orange-600 border-none">
                                Start Your Custom Run
                            </Button>
                        </TrackingLink>
                        <p className="mt-3 text-xs text-gray-400">Minimum 150,000 capsules or tablets per run. Serious inquiries only.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
