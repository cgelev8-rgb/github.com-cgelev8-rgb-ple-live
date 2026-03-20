"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '../ui/Button';
import Link from 'next/link';

export const CartDrawer = () => {
    const { items, removeItem, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-ple-navy">Your Order</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            <div className="text-4xl mb-4">🛒</div>
                            <p>Your cart is empty.</p>
                            <Button variant="outline" className="mt-4" onClick={() => setIsCartOpen(false)}>
                                Continue Browsing
                            </Button>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                    💊
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-ple-navy">{item.name}</h3>
                                    <div className="text-sm text-gray-500 mb-2">MOQ: {item.moq}</div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center border rounded">
                                            <button
                                                className="px-2 py-1 hover:bg-gray-100"
                                                onClick={() => updateQuantity(item.id, item.quantity - 500)}
                                                disabled={item.quantity <= item.moq}
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                            <button
                                                className="px-2 py-1 hover:bg-gray-100"
                                                onClick={() => updateQuantity(item.id, item.quantity + 500)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="font-bold text-ple-navy">
                                            ${(item.costPerUnit * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-xs text-red-500 mt-2 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-2xl font-bold text-ple-navy">${cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 text-center">
                            Shipping calculated at checkout.
                        </p>
                        <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                            <Button className="w-full py-4 text-lg shadow-lg shadow-orange-100">
                                Proceed to Checkout
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
