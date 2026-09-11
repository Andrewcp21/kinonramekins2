"use client";

import { useState } from 'react';
import { ShoppingCart, X, ChevronUp, ChevronDown, MessageCircle, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/components/CartContext';

const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

export default function CartBar() {
    const { items, removeItem, subtotal, appliedBundles, discount, total } = useCart();
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

        const bundleLines = appliedBundles
            .map(b => `🎁 ${b.label}: ${b.courses[0].name} + ${b.courses[1].name} → ${formatPrice(b.bundlePrice)} (hemat ${formatPrice(b.saving)})`)
            .join('\n');

        const summary = discount > 0
            ? `${bundleLines}\n\nSubtotal: ${formatPrice(subtotal)}\nDiskon bundle: -${formatPrice(discount)}\n*Total: ${formatPrice(total)}*`
            : `*Total: ${formatPrice(total)}*`;

        const message = `Halo kak, saya mau daftar kelas berikut:\n\n${lines}\n\n${summary}\n\nMohon info selanjutnya ya kak 🙏`;

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

                                    {discount > 0 && (
                                        <>
                                            {appliedBundles.map(b => (
                                                <li
                                                    key={`${b.courses[0].id}-${b.courses[1].id}`}
                                                    className="flex items-center justify-between text-sm pt-2 border-t border-white/10"
                                                >
                                                    <span className="flex items-center gap-2 mr-4 min-w-0 text-[#D4AF37]">
                                                        <Gift className="w-4 h-4 shrink-0" />
                                                        <span className="truncate">{b.label}</span>
                                                    </span>
                                                    <span className="font-mono text-[#D4AF37] shrink-0">
                                                        -{formatPrice(b.saving)}
                                                    </span>
                                                </li>
                                            ))}
                                            <li className="flex items-center justify-between text-sm pt-2 border-t border-white/20 font-semibold">
                                                <span>Total</span>
                                                <span className="flex items-baseline gap-2 font-mono">
                                                    <span className="text-xs line-through text-white/50">
                                                        {formatPrice(subtotal)}
                                                    </span>
                                                    <span className="text-[#D4AF37]">{formatPrice(total)}</span>
                                                </span>
                                            </li>
                                        </>
                                    )}
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
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-sm truncate">
                                    {items.length} kelas dipilih&nbsp;·&nbsp;
                                    {discount > 0 && (
                                        <span className="line-through text-white/50 font-normal mr-1">
                                            {formatPrice(subtotal)}
                                        </span>
                                    )}
                                    {formatPrice(total)}
                                </span>
                                {discount > 0 && (
                                    <span className="text-[11px] text-[#D4AF37] truncate">
                                        🎁 Bundle deal otomatis · hemat {formatPrice(discount)}
                                    </span>
                                )}
                            </div>
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
