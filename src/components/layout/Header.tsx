"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Header = () => {
    const pathname = usePathname();
    const [isWhatWeDoOpen, setIsWhatWeDoOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const baseUrl = 'https://privatelabelexpress.com';

    // Hide global header on pages with their own custom header
    if (pathname === '/new-home') return null;

    return (
        <header className="bg-white text-ple-navy sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo - Animated GIF Version per inner pages */}
                    <Link href={baseUrl} className="flex-shrink-0 flex items-center">
                        <img
                            src="/images/ple-logo.gif"
                            alt="Private Label Express"
                            className="h-[40px] w-auto md:h-[50px]"
                            style={{ imageRendering: '-webkit-optimize-contrast' }}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="tel:888-404-2773" className="font-bold text-lg text-ple-navy hover:text-ple-orange transition-colors">
                            888-404-2773
                        </a>

                        {/* What We Do Megamenu */}
                        <div
                            className="relative group h-20 flex items-center"
                            onMouseEnter={() => setIsWhatWeDoOpen(true)}
                            onMouseLeave={() => setIsWhatWeDoOpen(false)}
                        >
                            <a
                                href={`${baseUrl}/private-label-products/`}
                                className="flex items-center gap-1 font-bold text-sm tracking-wide uppercase text-ple-navy hover:text-ple-orange transition-colors"
                            >
                                What We Do <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isWhatWeDoOpen ? 'rotate-180 text-ple-orange' : ''}`} />
                            </a>

                            {isWhatWeDoOpen && (
                                <div className="absolute top-full right-0 w-[750px] bg-white shadow-2xl rounded-xl border border-gray-100 p-8 animate-in fade-in slide-in-from-top-2 duration-200 cursor-default">
                                    <div className="grid grid-cols-3 gap-8">

                                        {/* Column 1 */}
                                        <div>
                                            <h6 className="text-ple-orange font-bold text-xs uppercase tracking-widest mb-4">Manufacturing & Fulfillment</h6>
                                            <ul className="space-y-3">
                                                <li><a href={`${baseUrl}/custom-supplement-manufacturer/`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block">Custom Formulations</a></li>
                                                <li><a href={`${baseUrl}/private-label-supplements/`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block">Private Label Supplements</a></li>
                                                <li><a href={`${baseUrl}/fulfillment/supplement-fulfillment`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block">Fulfillment Services</a></li>
                                            </ul>
                                        </div>

                                        {/* Column 2 */}
                                        <div>
                                            <h6 className="text-ple-orange font-bold text-xs uppercase tracking-widest mb-4">Supplement Forms</h6>
                                            <ul className="space-y-3">
                                                <li><a href={`${baseUrl}/product-category/gummies`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block">Gummy Manufacturing</a></li>
                                                <li><a href={`${baseUrl}/product-category/capsule-supplements/`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block">Capsules Manufacturing</a></li>
                                                <li><a href={`${baseUrl}/product-category/tablet-supplements/`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block">Tablets Manufacturing</a></li>
                                                <li><a href={`${baseUrl}/product-category/softgel-supplements/`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block">Softgels Manufacturing</a></li>
                                            </ul>
                                        </div>

                                        {/* Column 3 */}
                                        <div>
                                            <h6 className="text-ple-orange font-bold text-xs uppercase tracking-widest mb-4">Learn</h6>
                                            <ul className="space-y-3">
                                                <li><a href={`${baseUrl}/our-story/`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block">Who We Are</a></li>
                                                <li><a href={`${baseUrl}/private-label-products/`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block">What We Do</a></li>
                                                <li><a href={`${baseUrl}/faqs`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block">Frequently Asked Questions</a></li>
                                                <li><a href={`${baseUrl}/white-label-vs-private-label-vs-contract-manufacturing/`} className="text-gray-600 hover:text-ple-navy hover:pl-1 transition-all text-sm font-medium block leading-snug">Private Label vs Contract Manufacturing</a></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 ml-2 pl-6 border-l border-gray-200">
                            <a href="https://www.facebook.com/PrivateLabelExpressSup" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#4267B2] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/privatelabelexpress/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/private-label-express-usa/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="p-2 text-ple-navy"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="text-3xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 py-6 space-y-6">
                        <a href="tel:888-404-2773" className="block text-2xl font-bold text-ple-navy text-center">888-404-2773</a>

                        <div className="space-y-4">
                            <h6 className="text-ple-orange font-bold text-xs uppercase tracking-widest border-b border-gray-100 pb-2">Manufacturing & Fulfillment</h6>
                            <a href={`${baseUrl}/custom-supplement-manufacturer/`} className="block text-ple-navy font-medium">Custom Formulations</a>
                            <a href={`${baseUrl}/private-label-supplements/`} className="block text-ple-navy font-medium">Private Label Supplements</a>
                            <a href={`${baseUrl}/fulfillment/supplement-fulfillment`} className="block text-ple-navy font-medium">Fulfillment Services</a>
                        </div>

                        <div className="space-y-4">
                            <h6 className="text-ple-orange font-bold text-xs uppercase tracking-widest border-b border-gray-100 pb-2">Supplement Forms</h6>
                            <a href={`${baseUrl}/product-category/gummies`} className="block text-ple-navy font-medium">Gummy Manufacturing</a>
                            <a href={`${baseUrl}/product-category/capsule-supplements/`} className="block text-ple-navy font-medium">Capsules Manufacturing</a>
                            <a href={`${baseUrl}/product-category/tablet-supplements/`} className="block text-ple-navy font-medium">Tablets Manufacturing</a>
                            <a href={`${baseUrl}/product-category/softgel-supplements/`} className="block text-ple-navy font-medium">Softgels Manufacturing</a>
                        </div>

                        <div className="flex justify-center gap-4 pt-6 border-t border-gray-100">
                            <a href="https://www.facebook.com/PrivateLabelExpressSup" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#4267B2] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/privatelabelexpress/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/private-label-express-usa/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
