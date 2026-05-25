"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '@/types';

const PROMO_DEADLINE = new Date('2026-04-01T23:59:00');

function usePromoActive() {
    const [active, setActive] = useState(() => new Date() <= PROMO_DEADLINE);

    useEffect(() => {
        const remaining = PROMO_DEADLINE.getTime() - Date.now();
        if (remaining <= 0) return;
        const id = setTimeout(() => setActive(false), remaining);
        return () => clearTimeout(id);
    }, []);

    return active;
}

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
            import('@/lib/gtag').then(gtag => {
                gtag.event('add_to_cart', {
                    currency: 'IDR',
                    value: course.price,
                    items: [{
                        item_id: course.id,
                        item_name: course.name,
                        item_category: course.category,
                        price: course.price,
                        quantity: 1,
                    }],
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
            import('@/lib/gtag').then(gtag => {
                gtag.event('add_to_cart', {
                    currency: 'IDR',
                    value: course.price,
                    items: [{
                        item_id: course.id,
                        item_name: course.name,
                        item_category: course.category,
                        price: course.price,
                        quantity: 1,
                    }],
                });
            });
            return [...prev, course];
        });
    };

    const isInCart = (id: string) => items.some(i => i.id === id);

    const clearCart = () => setItems([]);

    const promoActive = usePromoActive();
    const total = items.reduce((sum, i) => sum + i.price, 0);
    const hasDiscount = items.length >= 3 && promoActive;
    const savings = hasDiscount ? Math.round(total * 0.15) : 0;
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
