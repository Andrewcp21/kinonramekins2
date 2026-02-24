"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '@/types';

interface CartState {
    items: Course[];
    addItem: (course: Course) => void;
    removeItem: (id: string) => void;
    toggleItem: (course: Course) => void;
    isInCart: (id: string) => boolean;
    clearCart: () => void;
    total: number;
    hasDiscount: boolean;
    discountedTotal: number;
    savings: number;
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Course[]>([]);

    const addItem = (course: Course) => {
        setItems(prev => {
            if (prev.some(i => i.id === course.id)) return prev;
            import('@/lib/fpixel').then(fpixel => {
                fpixel.track('AddToCart', {
                    content_name: course.name,
                    content_category: course.category,
                    value: course.price,
                    currency: 'IDR',
                });
            });
            return [...prev, course];
        });
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const toggleItem = (course: Course) => {
        setItems(prev => {
            if (prev.some(i => i.id === course.id)) {
                return prev.filter(i => i.id !== course.id);
            }
            import('@/lib/fpixel').then(fpixel => {
                fpixel.track('AddToCart', {
                    content_name: course.name,
                    content_category: course.category,
                    value: course.price,
                    currency: 'IDR',
                });
            });
            return [...prev, course];
        });
    };

    const isInCart = (id: string) => items.some(i => i.id === id);

    const clearCart = () => setItems([]);

    const total = items.reduce((sum, i) => sum + i.price, 0);
    const hasDiscount = items.length >= 3;
    const savings = hasDiscount ? Math.round(total * 0.1) : 0;
    const discountedTotal = total - savings;

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, toggleItem, isInCart, clearCart, total, hasDiscount, discountedTotal, savings }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
