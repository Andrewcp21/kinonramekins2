"use client";

import { useState } from 'react';
import { ShoppingCart, X, ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/components/CartContext';

const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

export default function CartBar() {
    const { items, removeItem, total } = useCart();
    const [expanded, setExpanded] = useState(false);

    const handleWhatsApp = () => {
        if (items.length === 0) return;

        import('@/lib/fpixel').then(fpixel => {
            fpixel.track('InitiateCheckout', {
                num_items: items.length,
                value: total,
                currency: 'IDR',
                content_ids: items.map(i => i.id),
            });
        });

        const lines = items
            .map((item, idx) => `${idx + 1}. ${item.name} – ${formatPrice(item.price)}`)
            .join('\n');
        const message =
            `Halo kak, saya mau order kelas berikut:\n\n${lines}\n\nTotal: ${formatPrice(total)}\n\nMohon info selanjutnya ya kak 🙏`;
        window.open(`https://wa.me/6289522453978?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <AnimatePresence>
            {items.length > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-black text-white shadow-2xl"
                >
                    {/* Expanded item list */}
                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden border-b border-white/20"
                            >
                                <ul className="max-w-4xl mx-auto px-4 py-3 space-y-2">
                                    {items.map(item => (
                                        <li key={item.id} className="flex items-center justify-between text-sm">
                                            <span className="truncate mr-4 text-white/90">{item.name}</span>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <span className="font-mono text-[#D4AF37]">{formatPrice(item.price)}</span>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1 hover:bg-white/20 rounded transition-colors"
                                                    aria-label={`Hapus ${item.name}`}
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom bar */}
                    <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
                        <button
                            onClick={() => setExpanded(e => !e)}
                            className="flex items-center gap-2 flex-1 min-w-0 text-left"
                            aria-expanded={expanded}
                            aria-label="Toggle cart details"
                        >
                            <ShoppingCart className="w-5 h-5 text-[#D4AF37] shrink-0" />
                            <span className="font-semibold text-sm truncate">
                                {items.length} kelas dipilih&nbsp;·&nbsp;{formatPrice(total)}
                            </span>
                            {expanded
                                ? <ChevronDown className="w-4 h-4 ml-auto shrink-0" />
                                : <ChevronUp className="w-4 h-4 ml-auto shrink-0" />
                            }
                        </button>

                        <button
                            onClick={handleWhatsApp}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2 text-xs uppercase tracking-wider transition-colors shrink-0"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Pesan via WhatsApp</span>
                            <span className="sm:hidden">Pesan</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
