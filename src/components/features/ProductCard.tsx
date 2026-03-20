"use client";

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import Link from 'next/link';

export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    moq: number;
    leadTime: string;
    costPerUnit: number;
    msrp: number;
    category: string;
    isTrending?: boolean;
    isLowStock?: boolean;
}

interface ProductCardProps {
    product: Product;
    onQuickQuote: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickQuote, onAddToCart }) => {
    const margin = ((product.msrp - product.costPerUnit) / product.msrp) * 100;
    const potentialProfit = (product.msrp - product.costPerUnit) * product.moq;

    return (
        <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 border-gray-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 relative overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-4xl">
                    📷
                </div>
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 w-full pr-12">
                    {product.isTrending && (
                        <div className="bg-ple-orange text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            🔥 TRENDING
                        </div>
                    )}
                    {product.isLowStock && (
                        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm animate-pulse">
                            LOW STOCK
                        </div>
                    )}
                </div>

                <button
                    className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm backdrop-blur-sm transition-all z-10 group/heart"
                    onClick={(e) => {
                        e.preventDefault();
                        // Todo: Add callback
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-gray-400 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-colors"
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </button>
            </div>

            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{product.category}</div>
                        <Link href={`/products/${product.id}`} className="hover:underline decoration-ple-orange decoration-2 underline-offset-4">
                            <h3 className="font-bold text-ple-navy text-lg leading-tight mt-1">{product.name}</h3>
                        </Link>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 py-2">
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                {/* Investor View Stats */}
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold">Est. Retail</div>
                        <div className="font-bold text-gray-700">${product.msrp.toFixed(2)}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold">Your Cost</div>
                        <div className="font-bold text-ple-navy">${product.costPerUnit.toFixed(2)}</div>
                    </div>
                    <div className="col-span-2 border-t border-gray-200 pt-2 mt-1">
                        <div className="flex justify-between items-center">
                            <div className="text-[10px] text-gray-400 uppercase font-bold">Potential Margin</div>
                            <div className="font-bold text-green-600">{margin.toFixed(0)}% (${potentialProfit.toLocaleString()})</div>
                        </div>
                    </div>
                </div>
            </CardContent>

            {onAddToCart && (
                <CardFooter className="pt-4 border-t border-gray-100">
                    <Button
                        size="sm"
                        className="w-full text-xs bg-ple-navy hover:bg-ple-slate"
                        onClick={() => onAddToCart && onAddToCart(product)}
                    >
                        Add to Quote
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};
