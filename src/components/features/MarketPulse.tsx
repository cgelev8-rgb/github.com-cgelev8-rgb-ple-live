"use client";

import React from 'react';
import { TrendingUp, Users, Search, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

interface MarketPulseProps {
    term: string;
    monthlySearches: string;
    trendPercentage: number;
    competitionLevel: 'Low' | 'Medium' | 'High';
}

export const MarketPulse: React.FC<MarketPulseProps> = ({
    term,
    monthlySearches,
    trendPercentage,
    competitionLevel
}) => {
    return (
        <Card className="bg-gradient-to-br from-gray-900 to-ple-navy text-white overflow-hidden border-none shadow-xl">
            <CardContent className="p-0">
                {/* Header */}
                <div className="bg-white/10 p-3 flex justify-between items-center backdrop-blur-sm border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse"></div>
                        <span className="text-xs font-bold uppercase tracking-wider text-green-400">Live Market Pulse</span>
                    </div>
                    <div className="text-[10px] text-gray-400">
                        Data Source: Google Trends API (Cached)
                    </div>
                </div>

                {/* Main Stats */}
                <div className="p-5">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-ple-orange/20 p-3 rounded-xl border border-ple-orange/20 text-ple-orange shrink-0">
                            <Search className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-400 mb-1">Monthly Search Volume for "{term}"</div>
                            <div className="text-3xl font-bold text-white flex items-center gap-3">
                                {monthlySearches}
                                <span className={`text-sm px-2 py-1 rounded-full flex items-center gap-1 ${trendPercentage > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    <TrendingUp className="w-3 h-3" />
                                    {trendPercentage > 0 ? '+' : ''}{trendPercentage}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                            <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Competition
                            </div>
                            <div className={`font-bold ${competitionLevel === 'Low' ? 'text-green-400' :
                                    competitionLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                                }`}>
                                {competitionLevel}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                                <Users className="w-3 h-3" /> Consumer Interest
                            </div>
                            <div className="font-bold text-blue-400">
                                Very High
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
