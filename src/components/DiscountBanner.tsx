"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Sparkles, Clock } from 'lucide-react';
import { useCart } from '@/components/CartContext';

const PROMO_DEADLINE = new Date('2026-04-01T23:59:00');

function useCountdown() {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        function update() {
            const diff = PROMO_DEADLINE.getTime() - Date.now();
            if (diff <= 0) {
                setTimeLeft('');
                return;
            }
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            const parts = [];
            if (d > 0) parts.push(`${d}h`);
            parts.push(`${h.toString().padStart(2, '0')}j`);
            parts.push(`${m.toString().padStart(2, '0')}m`);
            parts.push(`${s.toString().padStart(2, '0')}d`);
            setTimeLeft(parts.join(' '));
        }
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return timeLeft;
}

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

export default function DiscountBanner() {
    const { items, hasDiscount } = useCart();
    const remaining = Math.max(0, 3 - items.length);
    const hasItems = items.length > 0;
    const countdown = useCountdown();
    const promoActive = usePromoActive();

    if (!promoActive) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
            style={{ background: '#D4AF37' }}
        >
            <div className="relative max-w-4xl mx-auto px-8 py-1.5 flex flex-col items-center justify-center gap-0.5 text-black text-sm font-semibold text-center">
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Pay Day Limited Promo!</span>
                <AnimatePresence mode="wait">
                    {hasDiscount ? (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4 shrink-0" />
                                <span className="font-bold tracking-wide">Diskon 15% aktif!</span>
                                <span className="opacity-70 font-normal hidden sm:inline">· Hemat 15% sudah diterapkan ke pesananmu</span>
                            </div>
                            {countdown && (
                                <span className="flex items-center justify-center gap-1 bg-black text-white font-mono text-sm font-bold px-3 py-0.5 rounded-full">
                                    <Clock className="w-3.5 h-3.5 shrink-0" />
                                    {countdown}
                                </span>
                            )}
                        </motion.div>
                    ) : hasItems ? (
                        <motion.div
                            key="almost"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Tag className="w-4 h-4 shrink-0" />
                                <span>
                                    Diskon 15% untuk 3 menu atau lebih
                                    <span className="font-bold"> · Tambah {remaining} menu lagi untuk hemat!</span>
                                </span>
                            </div>
                            {countdown && (
                                <span className="flex items-center justify-center gap-1 opacity-70 font-mono text-sm font-bold">
                                    <Clock className="w-4 h-4 shrink-0" />
                                    {countdown}
                                </span>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="default"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Tag className="w-4 h-4 shrink-0" />
                                <span>Diskon 15% untuk 3 menu atau lebih</span>
                            </div>
                            {countdown && (
                                <span className="flex items-center justify-center gap-1 opacity-70 font-mono text-sm font-bold">
                                    <Clock className="w-4 h-4 shrink-0" />
                                    {countdown}
                                </span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
