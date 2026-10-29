"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '@/types';
import { getAppliedBundles, AppliedBundle } from '@/lib/bundle';
import { usePaydayActive, PAYDAY_MIN_PURCHASE, PAYDAY_RATE } from '@/lib/promo';

/** Which discount is applied to the cart. Promos don't stack — the bigger one wins. */
export type AppliedPromo = 'bundle' | 'payday' | null;

interface CartState {
    items: Course[];
    addItem: (course: Course) => void;
    removeItem: (id: string) => void;
    toggleItem: (course: Course) => void;
    isInCart: (id: string) => boolean;
    clearCart: () => void;
    /** Sum of all items at normal price */
    subtotal: number;
    /** Bundle deals the cart qualifies for (only discounted when appliedPromo is 'bundle') */
    appliedBundles: AppliedBundle[];
    /** Whether the Payday Sale is still running */
    paydayActive: boolean;
    /** Which discount is applied */
    appliedPromo: AppliedPromo;
    /** Total saved through the applied discount */
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
    const bundleSaving = appliedBundles.reduce((sum, b) => sum + b.saving, 0);

    const paydayActive = usePaydayActive();
    const paydaySaving = paydayActive && subtotal >= PAYDAY_MIN_PURCHASE
        ? Math.round(subtotal * PAYDAY_RATE)
        : 0;

    const appliedPromo: AppliedPromo =
        paydaySaving > bundleSaving ? 'payday' : bundleSaving > 0 ? 'bundle' : null;
    const discount = appliedPromo === 'payday' ? paydaySaving : bundleSaving;
    const total = subtotal - discount;

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, toggleItem, isInCart, clearCart, subtotal, appliedBundles, paydayActive, appliedPromo, discount, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
