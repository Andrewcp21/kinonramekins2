"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Sparkles, Clock } from 'lucide-react';
import { useCart } from '@/components/CartContext';

const PROMO_DEADLINE = new Date('2026-08-31T23:59:00');
const MIN_PURCHASE = 300000;

const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

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
    const { items, total, hasDiscount } = useCart();
    const remaining = Math.max(0, MIN_PURCHASE - total);
    const hasItems = items.length > 0;
    const countdown = useCountdown();
    const promoActive = usePromoActive();

    if (!promoActive) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
            style={{ background: '#D4AF37' }}
        >
            <div className="relative max-w-5xl mx-auto px-4 sm:px-8 py-1.5 sm:py-2 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-3 text-black text-sm sm:text-base font-semibold text-center sm:whitespace-nowrap">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest opacity-60 shrink-0">Payday Sale!</span>
                <span className="hidden sm:inline text-black/30">|</span>
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
                                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span className="font-bold tracking-wide">Diskon 10% aktif!</span>
                                <span className="opacity-70 font-normal hidden sm:inline">· Hemat 10% sudah diterapkan ke pesananmu</span>
                            </div>
                            {countdown && (
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm sm:text-base font-semibold opacity-70">s/d 31 Agustus</span>
                                    <span className="flex items-center gap-1 bg-black text-white font-mono text-sm sm:text-base font-bold px-3 sm:px-4 py-0.5 sm:py-1 rounded-full">
                                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                                        {countdown}
                                    </span>
                                </div>
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
                                <Tag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span>
                                    Diskon 10% untuk min. belanja {formatPrice(MIN_PURCHASE)}
                                    <span className="font-bold"> · Tambah {formatPrice(remaining)} lagi untuk hemat!</span>
                                </span>
                            </div>
                            {countdown && (
                                <span className="flex items-center justify-center gap-1 opacity-70 font-mono text-sm sm:text-base font-bold">
                                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
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
                                <Tag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <span>Diskon 10% untuk min. belanja {formatPrice(MIN_PURCHASE)}</span>
                            </div>
                            {countdown && (
                                <span className="flex items-center justify-center gap-1 opacity-70 font-mono text-sm sm:text-base font-bold">
                                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
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
