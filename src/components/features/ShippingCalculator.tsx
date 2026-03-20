"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Product } from './ProductCard';

interface ShippingCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ isOpen, onClose, product }) => {
    const [zipCode, setZipCode] = useState('');
    const [quantity, setQuantity] = useState(50);
    const [quote, setQuote] = useState<{ cost: number; date: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen || !product) return null;

    const handleCalculate = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const baseRate = 4.50;
            const weightMultiplier = 0.1; // Mock weight factor
            const zoneMultiplier = 1.2; // Mock zone factor

            const estimatedCost = (baseRate + (weightMultiplier * zoneMultiplier)) * quantity;

            // Mock date (3 days from now)
            const date = new Date();
            date.setDate(date.getDate() + 3);

            setQuote({
                cost: estimatedCost,
                date: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
            });
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <Card className="w-full max-w-md bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
                <CardHeader className="flex justify-between items-center border-b border-gray-100">
                    <h3 className="font-bold text-ple-navy text-lg">Quick Ship Quote</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        ✕
                    </button>
                </CardHeader>

                <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl">📦</div>
                        <div>
                            <div className="font-bold text-ple-navy text-sm">{product.name}</div>
                            <div className="text-xs text-gray-500">MOQ: {product.moq} units</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Zip Code</label>
                            <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ple-orange focus:border-transparent"
                                placeholder="12345"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ple-orange focus:border-transparent"
                                min={1}
                            />
                        </div>
                    </div>

                    {quote && (
                        <div className="mt-6 bg-green-50 border border-green-100 rounded-lg p-4 text-center animate-in slide-in-from-bottom-2">
                            <div className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Estimated Cost</div>
                            <div className="text-3xl font-bold text-ple-navy">${quote.cost.toFixed(2)}</div>
                            <div className="text-sm text-gray-600 mt-1">Arrives by {quote.date}</div>

                            <div className="mt-3 text-xs text-gray-500 border-t border-green-100 pt-2">
                                💡 Tip: Add 50 more units to save 10% on shipping.
                            </div>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-end gap-2 bg-gray-50">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={handleCalculate}
                        isLoading={isLoading}
                        disabled={!zipCode || quantity < 1}
                    >
                        Calculate
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};
