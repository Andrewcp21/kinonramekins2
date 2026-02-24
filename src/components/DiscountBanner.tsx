"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Sparkles } from 'lucide-react';
import { useCart } from '@/components/CartContext';

export default function DiscountBanner() {
    const { items, hasDiscount } = useCart();
    const remaining = Math.max(0, 3 - items.length);
    const hasItems = items.length > 0;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
            style={{ background: '#D4AF37' }}
        >
            <div className="relative max-w-4xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-black text-sm font-semibold">
                <AnimatePresence mode="wait">
                    {hasDiscount ? (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            className="flex items-center gap-2"
                        >
                            <Sparkles className="w-4 h-4 shrink-0" />
                            <span className="font-bold tracking-wide">Diskon 10% aktif!</span>
                            <span className="opacity-70 font-normal hidden sm:inline">· Hemat 10% sudah diterapkan ke pesananmu</span>
                        </motion.div>
                    ) : hasItems ? (
                        <motion.div
                            key="almost"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            className="flex items-center gap-2"
                        >
                            <Tag className="w-4 h-4 shrink-0" />
                            <span>
                                Diskon 10% untuk 3 menu atau lebih
                                <span className="font-bold"> · Tambah {remaining} menu lagi untuk hemat!</span>
                            </span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="default"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            className="flex items-center gap-2"
                        >
                            <Tag className="w-4 h-4 shrink-0" />
                            <span>Diskon 10% untuk 3 menu atau lebih</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
