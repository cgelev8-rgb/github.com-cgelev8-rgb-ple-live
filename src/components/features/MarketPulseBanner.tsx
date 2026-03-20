"use client";

import React from 'react';
import { TrendingUp, Search, Users, Activity } from 'lucide-react';

interface MarketPulseBannerProps {
    term: string;
    monthlySearches: string;
    trendPercentage: number;
}

export const MarketPulseBanner: React.FC<MarketPulseBannerProps> = ({
    term,
    monthlySearches,
    trendPercentage
}) => {
    return (
        <div className="bg-ple-navy/95 border-b border-white/10 text-white py-3 overflow-hidden whitespace-nowrap relative z-20 backdrop-blur-sm">
            {/* Gradient Fade Edges */}
            <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-ple-navy to-transparent z-10"></div>
            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-ple-navy to-transparent z-10"></div>

            <div className="inline-block animate-marquee pl-full">
                <div className="flex items-center gap-12 text-sm font-medium text-ple-light">

                    {/* Item 1 */}
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-400" />
                        <span className="text-white font-bold">LIVE MARKET DATA:</span>
                        High Demand Detected for <span className="text-ple-orange">"{term}"</span>
                    </div>

                    {/* Separator */}
                    <span className="text-white/20">•</span>

                    {/* Item 2 */}
                    <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-blue-400" />
                        Monthly Search Volume: <span className="text-white font-bold">{monthlySearches}</span>
                    </div>

                    {/* Separator */}
                    <span className="text-white/20">•</span>

                    {/* Item 3 */}
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        Trend: <span className="text-green-400 font-bold">+{trendPercentage}% Increase</span> (Last 30 Days)
                    </div>

                    {/* Separator */}
                    <span className="text-white/20">•</span>

                    {/* Item 4 */}
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        Consumer Interest: <span className="text-white font-bold">Very High</span>
                    </div>

                    {/* Duplicate for smooth loop (Optional depending on animation implementation, but good for filling space) */}
                    <span className="text-white/20 mx-4">|</span>

                    <div className="flex items-center gap-2">
                        <span className="bg-red-500 rounded-full w-2 h-2 animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-red-400">Inventory Moving Fast</span>
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};
