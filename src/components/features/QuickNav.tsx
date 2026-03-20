"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
    { id: 'hero', label: 'Top' },
    { id: 'process', label: 'Process' },
    { id: 'calculator', label: 'Custom MOQ' },
    { id: 'comparison', label: 'Trade-Offs' },
    { id: 'guidance', label: 'Guidance' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Start' },
];

export const QuickNav = () => {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200; // Offset for header/padding

            // Find the current section
            for (const item of NAV_ITEMS) {
                const element = document.getElementById(item.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(item.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
                <Link
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="group flex items-center gap-3"
                    aria-label={`Scroll to ${item.label}`}
                >
                    {/* Dot Indicator */}
                    <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${activeSection === item.id
                            ? 'bg-ple-orange border-ple-orange scale-110'
                            : 'bg-transparent border-gray-300 group-hover:border-ple-orange/50'
                            }`}
                    />

                    {/* Label (Only visible on hover or active) */}
                    <span
                        className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeSection === item.id
                            ? 'text-ple-navy opacity-100 translate-x-0'
                            : 'text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                            }`}
                    >
                        {item.label}
                    </span>
                </Link>
            ))}
        </nav>
    );
};
