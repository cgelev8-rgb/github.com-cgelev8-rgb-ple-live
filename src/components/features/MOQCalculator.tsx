"use client";

import React, { useState } from 'react';
import { Calculator, Package, CheckCircle2 } from 'lucide-react';

type FormType = 'capsules' | 'tablets' | 'softgels' | 'gummies' | 'powders';

interface MOQItem {
    minUnits: number;
    label: string;
    unitName: string;
    isFinishedCount?: boolean;
}

const MOQ_DATA: Record<FormType, MOQItem> = {
    capsules: { minUnits: 150000, label: 'Capsules', unitName: 'capsules' },
    tablets: { minUnits: 150000, label: 'Tablets', unitName: 'tablets' },
    softgels: { minUnits: 250000, label: 'Softgels', unitName: 'softgels' },
    gummies: { minUnits: 500000, label: 'Gummies', unitName: 'gummies' },
    powders: { minUnits: 2000, label: 'Powders', unitName: 'containers', isFinishedCount: true },
};

export const MOQCalculator = () => {
    const [selectedForm, setSelectedForm] = useState<FormType>('capsules');
    const [fillCount, setFillCount] = useState<number>(60);

    // Calculate Bottle MOQ
    const calculateBottles = (form: FormType, count: number) => {
        const data = MOQ_DATA[form];
        if (data.isFinishedCount) {
            return data.minUnits; // Powders are fixed at 2k containers
        }
        return Math.ceil((data.minUnits / count) / 100) * 100;
    };

    const minBottles = calculateBottles(selectedForm, fillCount);

    return (
        <div className="w-full mx-auto my-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Orange accent header bar */}
                <div className="bg-gradient-to-r from-ple-orange to-orange-500 px-6 md:px-8 py-4 flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest">MOQ Calculator</span>
                </div>
                <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-ple-navy mb-6">What is the bottle MOQ for my custom supplement?</h3>
                    <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                        {/* Inputs Section */}
                        <div className="flex-1 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Question 1: Form Type */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                        1. Supplement Form
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedForm}
                                            onChange={(e) => setSelectedForm(e.target.value as FormType)}
                                            className="w-full appearance-none p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ple-orange focus:border-ple-orange font-medium text-ple-navy cursor-pointer transition-all hover:border-gray-300"
                                        >
                                            {(Object.keys(MOQ_DATA) as FormType[]).map((form) => (
                                                <option key={form} value={form}>
                                                    {MOQ_DATA[form].label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Question 2: Fill Count */}
                                {!MOQ_DATA[selectedForm].isFinishedCount && (
                                    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            2. Count Per Bottle
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="30"
                                                step="30"
                                                value={fillCount}
                                                onChange={(e) => setFillCount(Math.max(1, parseInt(e.target.value) || 0))}
                                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ple-orange focus:border-ple-orange font-mono text-lg"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                                                {MOQ_DATA[selectedForm].unitName}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Calculations Breakdown (Compact) */}
                            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100 text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-2 items-center">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-ple-orange" />
                                    <span className="font-semibold text-ple-navy">Logic:</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Base Requirement:</span> <span className="font-mono font-bold text-ple-navy">{MOQ_DATA[selectedForm].minUnits.toLocaleString()}</span>
                                </div>
                                {!MOQ_DATA[selectedForm].isFinishedCount && (
                                    <div>
                                        <span className="text-gray-400">÷</span> <span className="text-gray-500">Count:</span> <span className="font-mono font-bold text-ple-navy">{fillCount}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Results Section (Right Side) */}
                        <div className="bg-ple-navy text-white rounded-xl p-6 lg:w-72 flex flex-col justify-center items-center text-center shadow-lg transform transition-all">
                            <div className="p-3 bg-white/10 rounded-full mb-3">
                                <Package className="w-8 h-8 text-ple-orange" />
                            </div>
                            <h4 className="text-ple-light font-medium text-sm mb-1 uppercase tracking-wider">Estimated MOQ</h4>
                            <div className="text-5xl font-bold text-white mb-2 tracking-tight">
                                {minBottles.toLocaleString()}
                            </div>
                            <div className="text-lg text-gray-300 font-medium">
                                Total Bottles
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
