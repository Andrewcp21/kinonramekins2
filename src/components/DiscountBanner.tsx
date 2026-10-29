"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Sparkles, Clock, Gift } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { PAYDAY_DEADLINE_LABEL, PAYDAY_MIN_PURCHASE, usePaydayCountdown } from '@/lib/promo';

const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const slide = {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 28 },
};

export default function DiscountBanner() {
    const { items, subtotal, paydayActive, appliedPromo } = useCart();
    const countdown = usePaydayCountdown();
    const remaining = Math.max(0, PAYDAY_MIN_PURCHASE - subtotal);

    if (!paydayActive) return null;

    // Which message to show: payday applied, bundle beats payday, almost there, or the default pitch
    const state =
        appliedPromo === 'payday' ? 'active'
            : appliedPromo === 'bundle' && remaining === 0 ? 'bundle'
                : items.length > 0 && remaining > 0 ? 'almost'
                    : 'default';

    const timer = countdown && (
        <span className="flex items-center justify-center gap-1 opacity-70 font-mono text-sm sm:text-base font-bold">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            {countdown}
        </span>
    );

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
            style={{ background: '#D4AF37' }}
        >
            <div className="relative max-w-5xl mx-auto px-4 sm:px-8 py-1.5 sm:py-2 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-3 text-black text-sm sm:text-base font-semibold text-center sm:whitespace-nowrap">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest opacity-60 shrink-0">Payday Sale!</span>
                <span className="hidden sm:inline text-black/30">|</span>
                <AnimatePresence mode="wait">
                    <motion.div key={state} {...slide} className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                        {state === 'active' && (
                            <>
                                <div className="flex items-center justify-center gap-2">
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                    <span className="font-bold tracking-wide">Diskon 10% aktif!</span>
                                    <span className="opacity-70 font-normal hidden sm:inline">· Sudah diterapkan ke pesananmu</span>
                                </div>
                                {countdown && (
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-sm sm:text-base font-semibold opacity-70">s/d {PAYDAY_DEADLINE_LABEL}</span>
                                        <span className="flex items-center gap-1 bg-black text-white font-mono text-sm sm:text-base font-bold px-3 sm:px-4 py-0.5 sm:py-1 rounded-full">
                                            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                                            {countdown}
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                        {state === 'bundle' && (
                            <>
                                <div className="flex items-center justify-center gap-2">
                                    <Gift className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                    <span>Bundle deal lebih hemat sudah diterapkan <span className="opacity-70 font-normal hidden xl:inline">(tidak bisa digabung dengan diskon 10%)</span></span>
                                </div>
                                {timer}
                            </>
                        )}
                        {state === 'almost' && (
                            <>
                                <div className="flex items-center justify-center gap-2">
                                    <Tag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                    <span>
                                        Diskon 10% untuk min. belanja {formatPrice(PAYDAY_MIN_PURCHASE)}
                                        <span className="font-bold"> · Tambah {formatPrice(remaining)} lagi untuk hemat!</span>
                                    </span>
                                </div>
                                {timer}
                            </>
                        )}
                        {state === 'default' && (
                            <>
                                <div className="flex items-center justify-center gap-2">
                                    <Tag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                    <span>Diskon 10% untuk min. belanja {formatPrice(PAYDAY_MIN_PURCHASE)}</span>
                                </div>
                                {timer}
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
