"use client";

import React, { useState } from 'react';
import { Truck, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FulfillmentSavingsProps {
    moq: number;
    unitWeightLbs: number; // e.g., 0.5 lbs per bottle
    productName: string;
}

export const FulfillmentSavings: React.FC<FulfillmentSavingsProps> = ({
    moq,
    unitWeightLbs,
    productName
}) => {
    // Simple mock calculation logic
    // Assumption: Average LTL pallet shipping is ~$1.50/lb or distinct pallet costs
    const totalWeight = moq * unitWeightLbs;
    const estimatedShippingCost = Math.round(totalWeight * 0.85) + 150; // Base fee + weight cost
    const handlingSavings = 125; // Saved inbound receiving fees at 3PL
    const totalSavings = estimatedShippingCost + handlingSavings;

    return (
        <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">

                    {/* Left: The Hook / Calculator */}
                    <div className="flex-1 p-8 md:p-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-6">
                            <Wallet className="w-4 h-4" /> Smart Savings
                        </div>
                        <h2 className="text-3xl font-bold text-ple-navy mb-4">
                            Don't Pay to Move Boxes.
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-lg">
                            Shipping <strong>{moq.toLocaleString()} units</strong> of {productName} to another warehouse (3PL) or your office eats into your margin before you even sell one bottle.
                        </p>

                        {/* Calculation Visual */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 max-w-md">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-500 font-medium text-sm">Freight to 3rd Party</span>
                                <span className="text-gray-400 font-mono decoration-red-400 line-through">
                                    ${estimatedShippingCost.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-500 font-medium text-sm">3PL Inbound Fees</span>
                                <span className="text-gray-400 font-mono decoration-red-400 line-through">
                                    ${handlingSavings.toFixed(2)}
                                </span>
                            </div>
                            <div className="h-px bg-gray-200 my-3"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-ple-navy font-bold">Instantly Saved</span>
                                <span className="text-2xl font-bold text-green-600">
                                    ${totalSavings.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: The Pitch / Visual */}
                    <div className="flex-1 bg-ple-navy text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-ple-orange/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <Truck className="w-6 h-6 text-ple-orange" />
                                PLE Fulfillment Advantage
                            </h3>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                    <span className="text-gray-200 text-sm"><strong>Zero Transit Time:</strong> Stock moves from manufacturing to shipping floor instantly.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                    <span className="text-gray-200 text-sm"><strong>Same-Day Shipping:</strong> Orders received by 2PM ship today.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                    <span className="text-gray-200 text-sm"><strong>Wholesale Rates:</strong> Access our discounted FedEx & USPS zones.</span>
                                </li>
                            </ul>

                            <Button className="w-full bg-ple-orange hover:bg-orange-600 border-none text-white h-12 text-base shadow-lg shadow-orange-900/20 group">
                                Switch to PLE Fulfillment <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                *Select "Fulfillment by PLE" at checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
