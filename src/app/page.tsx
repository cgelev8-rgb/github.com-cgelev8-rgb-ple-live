import Image from "next/image";
import Link from "next/link";
import { TrackingLink } from "@/components/ui/TrackingLink";
import { ArrowRight, CheckCircle2, Shield, TestTube2, Factory, Package } from "lucide-react";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Private Label Supplement Manufacturing & Fulfillment",
    description: "GMP-certified custom supplement manufacturing and end-to-end fulfillment. We formulate, encapsulate, bottle, and fulfill directly to your customers.",
    openGraph: {
        title: "Private Label Supplement Manufacturing & Fulfillment",
        description: "GMP-certified custom supplement manufacturing and end-to-end fulfillment.",
        url: "https://privatelabelexpress.com/",
        siteName: "Private Label Express",
        images: [
            {
                url: "https://privatelabelexpress.com/wp-content/uploads/2023/10/Private-Label-Express-Logo.png",
                width: 1200,
                height: 630,
                alt: "Private Label Express",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Private Label Supplement Manufacturing & Fulfillment",
        description: "GMP-certified custom supplement manufacturing and end-to-end fulfillment.",
    },
};

export default function NewHome() {
    return (
        <main className="min-h-screen">
            {/* 1. Hero Section with Background Video & Orange Overlay Buttons */}
            <section className="relative h-[80vh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/vid/promo.mp4" type="video/mp4" />
                </video>

                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Hero Content - pinned just above bottom of video */}
                <div className="absolute bottom-[6%] left-0 right-0 z-10 flex flex-col items-center text-center px-4">

                    {/* Dual Pill CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="https://privatelabelexpress.com/custom-supplement-manufacturer/"
                            className="bg-ple-orange hover:bg-ple-orange/90 text-white font-bold py-2.5 px-5 rounded-full border-2 border-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,165,0,0.4)] text-sm w-full sm:w-auto text-center"
                        >
                            START CUSTOM FORMULA
                        </Link>

                        <Link
                            href="/fulfillment/supplement-fulfillment"
                            className="bg-ple-orange hover:bg-ple-orange/90 text-white font-bold py-2.5 px-5 rounded-full border-2 border-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,165,0,0.4)] text-sm w-full sm:w-auto text-center"
                        >
                            FULFILLMENT SERVICES
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Global Trust / Certifications Banner (Moved up, narrower vertical padding) */}
            <section className="py-4 bg-[#7C8CA1] border-b-0">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white py-3 px-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                            <Shield className="w-10 h-10 text-ple-orange shrink-0" />
                            <div>
                                <h3 className="font-bold text-ple-navy text-lg mb-1">GMP Certified Setup</h3>
                                <p className="text-sm text-gray-600">Manufactured under strict adherence to FDA Good Manufacturing Practices (21 CFR Part 111).</p>
                            </div>
                        </div>
                        <div className="bg-white py-3 px-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                            <Factory className="w-10 h-10 text-ple-orange shrink-0" />
                            <div>
                                <h3 className="font-bold text-ple-navy text-lg mb-1">FDA-Registered Facility</h3>
                                <p className="text-sm text-gray-600">Produced domestically in state-of-the-art facilities in the USA.</p>
                            </div>
                        </div>
                        <div className="bg-white py-3 px-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                            <TestTube2 className="w-10 h-10 text-ple-orange shrink-0" />
                            <div>
                                <h3 className="font-bold text-ple-navy text-lg mb-1">Third-Party Tested</h3>
                                <p className="text-sm text-gray-600">Rigorous microbiological and heavy metal testing protocols ensure pure, unadulterated formulas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Intro Value Prop Ribbon (Moved down) */}
            <section className="bg-black py-14 border-b border-gray-800">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-ple-orange mb-6">
                        Supplement Manufacturing • Fulfillment • Compliance
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                        If your brand is generating $40k in annual revenue or more Private Label Express is the perfect partner for your custom supplement manufacturing, compliance, and fulfillment needs. World-class support, transparent pricing, and industry expertise at your service —{" "}
                        <TrackingLink href="/book-a-call" eventName="homepage_hero_value_prop" className="font-bold text-white hover:text-ple-orange underline underline-offset-4 transition-colors">
                            book your 15 minute call with our experts today!
                        </TrackingLink>
                    </p>
                </div>
            </section>

            {/* 4. Getting Started Steps */}
            <section className="py-16 bg-gray-50 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <span className="text-ple-navy font-bold tracking-wider uppercase text-sm mb-2 block">Simple Process</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-ple-orange mb-4">How to Get Started</h2>
                    <p className="text-gray-500 mb-12 max-w-xl mx-auto">Four simple steps to launching or scaling your supplement brand with Private Label Express.</p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting line (desktop only) */}
                        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-ple-orange/30 z-0" />

                        {/* Step 1 */}
                        <div className="flex flex-col items-center relative z-10 group">
                            <div className="w-16 h-16 rounded-full bg-ple-navy group-hover:bg-ple-orange transition-colors flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">1</div>
                            <h3 className="font-bold text-ple-navy text-lg mb-2">
                                <TrackingLink href="/book-a-call" eventName="homepage_steps_book_call_text" className="group-hover:text-ple-orange transition-colors">Book a Call</TrackingLink>
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Schedule your free 15-minute discovery call with one of our supplement experts.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center relative z-10 group">
                            <div className="w-16 h-16 rounded-full bg-ple-navy group-hover:bg-ple-orange transition-colors flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">2</div>
                            <h3 className="font-bold text-ple-navy text-lg mb-2">
                                <a href="https://privatelabelexpress.com/custom-supplement-manufacturer/" className="group-hover:text-ple-orange transition-colors">Define Your Formula</a>
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Work with our R&D team to select or build the perfect formulation for your brand.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center relative z-10">
                            <div className="w-16 h-16 rounded-full bg-ple-navy flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">3</div>
                            <h3 className="font-bold text-ple-navy text-lg mb-2">Manufacture & Label</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">We handle GMP-certified production, custom labeling, and compliance documentation.</p>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col items-center relative z-10 group">
                            <div className="w-16 h-16 rounded-full bg-ple-navy group-hover:bg-ple-orange transition-colors flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">4</div>
                            <h3 className="font-bold text-ple-navy text-lg mb-2">
                                <a href="/fulfillment/supplement-fulfillment" className="group-hover:text-ple-orange transition-colors">Fulfill & Scale</a>
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">We pick, pack, and ship direct-to-consumer or to your warehouse — globally.</p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <TrackingLink href="/book-a-call" eventName="homepage_steps_book_call_button" className="inline-flex items-center bg-ple-orange hover:bg-ple-navy text-white font-bold py-4 px-10 rounded-full transition-colors shadow-lg">
                            Book Your 15-Minute Call
                        </TrackingLink>
                    </div>
                </div>
            </section>

            {/* 5. Global Testimonials */}
            <section className="py-20 bg-ple-navy border-y border-[#142340]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-white font-bold tracking-wider uppercase text-sm mb-2 block">Brand Experiences</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-ple-orange mb-4">Trusted by Industry Leaders</h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">Discover why hundreds of brands trust us for their formulation, manufacturing, and fulfillment needs.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative pt-12">
                            <div className="absolute top-0 left-8 -translate-y-1/2 text-6xl text-ple-orange opacity-40 font-serif leading-none">"</div>
                            <p className="text-gray-600 mb-6 italic relative z-10">&quot;The transition was seamless. We moved our entire custom pre-workout line to Private Label Express and immediately saw improvements in both turnaround times and product consistency. Their R&D team is unmatched.&quot;</p>
                            <div>
                                <div className="font-bold text-ple-navy">Sarah M.</div>
                                <div className="text-sm text-gray-500">Founder, Velocity Nutrition</div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative pt-12">
                            <div className="absolute top-0 left-8 -translate-y-1/2 text-6xl text-ple-orange opacity-40 font-serif leading-none">"</div>
                            <p className="text-gray-600 mb-6 italic relative z-10">&quot;We use their full-service model—manufacturing straight into fulfillment. It completely eliminated our warehouse overhead and shipping headaches. A massive win for our operational efficiency.&quot;</p>
                            <div>
                                <div className="font-bold text-ple-navy">Marcus T.</div>
                                <div className="text-sm text-gray-500">COO, Vitality Scale</div>
                            </div>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative pt-12">
                            <div className="absolute top-0 left-8 -translate-y-1/2 text-6xl text-ple-orange opacity-40 font-serif leading-none">"</div>
                            <p className="text-gray-600 mb-6 italic relative z-10">&quot;When we needed to reformulate to remove certain excipients, their compliance and formulation teams guided us through the entire process. The new product tastes better and costs less to produce.&quot;</p>
                            <div>
                                <div className="font-bold text-ple-navy">Dr. Elena P.</div>
                                <div className="text-sm text-gray-500">Formulation Director</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Core Capabilities Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2 relative">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
                                <Image
                                    src="/images/supplement-ingredients.png"
                                    alt="Custom Formulation R&D"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-ple-navy/40 to-transparent"></div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <span className="text-ple-orange font-bold tracking-wider uppercase text-sm mb-2 block">Our Capabilities</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-ple-navy mb-6 leading-tight">Expert Execution from R&D to Doorstep</h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start gap-3 group">
                                    <CheckCircle2 className="w-6 h-6 text-ple-orange shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-ple-navy text-lg">
                                            <a href="https://privatelabelexpress.com/custom-supplement-manufacturer/" className="group-hover:text-ple-orange transition-colors">Custom Formulation</a>
                                        </h4>
                                        <p className="text-gray-600">Capsules, powders, and gummies utilizing clinically researched ingredients.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 group">
                                    <CheckCircle2 className="w-6 h-6 text-ple-orange shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-ple-navy text-lg">
                                            <a href="/fulfillment/supplement-fulfillment" className="group-hover:text-ple-orange transition-colors">Pick, Pack & Ship</a>
                                        </h4>
                                        <p className="text-gray-600">Seamless high-volume B2C and B2B fulfillment services globally.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-ple-orange shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-ple-navy text-lg">End-to-End Packaging</h4>
                                        <p className="text-gray-600">Premium retail-ready packaging design and execution in-house.</p>
                                    </div>
                                </div>
                            </div>

                            <TrackingLink href="/book-a-call" eventName="homepage_capabilities_book_call_button">
                                <button className="bg-ple-orange hover:bg-ple-navy text-white px-8 py-4 rounded-full font-bold transition-colors inline-flex items-center gap-2 group">
                                    Book Your Call Now!
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </TrackingLink>
                        </div>
                    </div>
                </div>
            </section>
            {/* 6. Ultimate Bottom CTA */}
            <section className="py-20 bg-ple-navy relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ple-navy to-[#0F1C36]"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-full bg-ple-orange/10 -skew-x-12 transform origin-bottom-right"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Scale Your Brand?</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Choose your path below. Whether you need a groundbreaking new formula or high-volume fulfillment, we have the infrastructure to support you.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="https://privatelabelexpress.com/custom-supplement-manufacturer/">
                            <button className="w-full sm:w-auto bg-ple-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all transform hover:-translate-y-1">
                                Custom Supplements
                            </button>
                        </Link>
                        <Link href="/fulfillment/supplement-fulfillment">
                            <button className="w-full sm:w-auto bg-ple-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all transform hover:-translate-y-1">
                                Product Fulfillment
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
