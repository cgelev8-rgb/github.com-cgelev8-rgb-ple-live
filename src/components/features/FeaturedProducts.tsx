"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductCard, Product } from './ProductCard';
import { Button } from '../ui/Button';
import { useCart } from '@/context/CartContext';

// Hardcoded "Flash Sale" Products
const FEATURED_PRODUCTS: Product[] = [
    {
        id: '2',
        name: 'Elderberry + Zinc Gummies',
        description: 'Immune support gummies with great berry flavor. High demand season.',
        image: '/placeholder.png',
        moq: 500,
        leadTime: 'Quick Ship (3 Days)',
        costPerUnit: 5.25,
        msrp: 24.99,
        category: 'Immune Support',
        isLowStock: true
    },
    {
        id: '5',
        name: 'Magnesium Glycinate',
        description: 'High absorption magnesium for sleep and recovery. Top trending SKU.',
        image: '/placeholder.png',
        moq: 500,
        leadTime: 'Quick Ship (5 Days)',
        costPerUnit: 5.80,
        msrp: 22.99,
        category: 'Sleep',
        isTrending: true
    }
];

export const FeaturedProducts = () => {
    const { addItem } = useCart();

    // Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState({
        hours: 14,
        minutes: 42,
        seconds: 15
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev; // Expired
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleQuickQuote = (product: Product) => {
        // Just scroll to contact section or open modal for now
        console.log("Quick quote for", product.name);
    };

    const handleAddToCart = (product: Product) => {
        addItem(product);
    };

    return (
        <section className="py-16 bg-gradient-to-br from-gray-900 to-ple-navy text-white overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-ple-orange/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                                TIME SENSITIVE OFFER
                            </span>
                            <span className="text-gray-400 text-sm font-medium tracking-wide uppercase">
                                Flash Manufacture Run
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Available Capacity: <span className="text-ple-orange">Ready To Ship</span>
                        </h2>
                        <p className="text-gray-300 mt-4 max-w-xl text-lg">
                            We have excess production capacity for these specific SKUs.
                            Lock in your order now to skip the 12-week lead time.
                        </p>
                    </div>

                    {/* Timer Display */}
                    <div className="flex gap-4 items-center bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="text-center">
                            <div className="text-3xl font-mono font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                            <div className="text-xs text-gray-400 uppercase">Hours</div>
                        </div>
                        <div className="text-2xl font-bold text-ple-orange">:</div>
                        <div className="text-center">
                            <div className="text-3xl font-mono font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                            <div className="text-xs text-gray-400 uppercase">Mins</div>
                        </div>
                        <div className="text-2xl font-bold text-ple-orange">:</div>
                        <div className="text-center">
                            <div className="text-3xl font-mono font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                            <div className="text-xs text-gray-400 uppercase">Secs</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_PRODUCTS.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onQuickQuote={handleQuickQuote}
                            onAddToCart={handleAddToCart}
                        />
                    ))}

                    {/* CTA Card */}
                    <div className="bg-ple-orange rounded-xl p-8 flex flex-col justify-center items-center text-center text-white h-full transform hover:scale-[1.02] transition-transform cursor-pointer border-2 border-transparent hover:border-white/20 shadow-2xl">
                        <div className="text-6xl mb-4">🚀</div>
                        <h3 className="text-2xl font-bold mb-2">Don't Miss The Boat</h3>
                        <p className="mb-6 opacity-90">View our full catalog of 50+ ready-to-ship formulas.</p>
                        <Link href="/products">
                            <Button size="lg" className="bg-white text-ple-orange hover:bg-gray-100 border-none w-full">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
