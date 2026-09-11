"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '@/types';
import { getAppliedBundles, AppliedBundle } from '@/lib/bundle';

interface CartState {
    items: Course[];
    addItem: (course: Course) => void;
    removeItem: (id: string) => void;
    toggleItem: (course: Course) => void;
    isInCart: (id: string) => boolean;
    clearCart: () => void;
    /** Sum of all items at normal price */
    subtotal: number;
    /** Bundle deals the cart automatically qualifies for */
    appliedBundles: AppliedBundle[];
    /** Total saved through automatic bundle deals */
    discount: number;
    /** subtotal - discount */
    total: number;
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

    const subtotal = items.reduce((sum, i) => sum + i.price, 0);
    const appliedBundles = getAppliedBundles(items);
    const discount = appliedBundles.reduce((sum, b) => sum + b.saving, 0);
    const total = subtotal - discount;

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, toggleItem, isInCart, clearCart, subtotal, appliedBundles, discount, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
