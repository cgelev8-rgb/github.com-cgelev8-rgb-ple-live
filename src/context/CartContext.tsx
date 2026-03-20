"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/components/features/ProductCard';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    itemCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('ple-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        localStorage.setItem('ple-cart', JSON.stringify(items));
    }, [items]);

    const addItem = (product: Product, quantity = 500) => { // Default MOQ
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (productId: string) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setItems([]);

    const cartTotal = items.reduce((total, item) => total + (item.costPerUnit * item.quantity), 0);
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            cartTotal,
            itemCount,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
