"use client";

import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, X, ChevronUp, ChevronDown, MessageCircle, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/components/CartContext';

const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

export default function CartBar() {
    const { items, removeItem, total, hasDiscount, discountedTotal, savings } = useCart();
    const [expanded, setExpanded] = useState(false);
    const prevCountRef = useRef(items.length);

    // Fire confetti when cart crosses 3 items
    useEffect(() => {
        const prev = prevCountRef.current;
        const curr = items.length;
        prevCountRef.current = curr;

        if (prev < 3 && curr >= 3) {
            import('canvas-confetti').then(({ default: confetti }) => {
                confetti({
                    particleCount: 180,
                    spread: 90,
                    origin: { y: 0.7 },
                    colors: ['#D4AF37', '#FFD700', '#ffffff', '#000000', '#FFF8DC'],
                    startVelocity: 45,
                    gravity: 0.9,
                });
                // Second burst for extra flair
                setTimeout(() => {
                    confetti({
                        particleCount: 80,
                        spread: 60,
                        origin: { x: 0.2, y: 0.7 },
                        colors: ['#D4AF37', '#FFD700', '#ffffff'],
                    });
                    confetti({
                        particleCount: 80,
                        spread: 60,
                        origin: { x: 0.8, y: 0.7 },
                        colors: ['#D4AF37', '#FFD700', '#ffffff'],
                    });
                }, 200);
            });
        }
    }, [items.length]);

    const handleWhatsApp = () => {
        if (items.length === 0) return;

        import('@/lib/fpixel').then(fpixel => {
            fpixel.track('InitiateCheckout', {
                num_items: items.length,
                value: discountedTotal,
                currency: 'IDR',
                content_ids: items.map(i => i.id),
            });
        });

        const lines = items
            .map((item, idx) => `${idx + 1}. ${item.name} – ${formatPrice(item.price)}`)
            .join('\n');

        let message = `Halo kak, saya mau daftar kelas berikut:\n\n${lines}\n\nSubtotal: ${formatPrice(total)}`;
        if (hasDiscount) {
            message += `\nDiskon 10%: -${formatPrice(savings)}\n*Total: ${formatPrice(discountedTotal)}*`;
        } else {
            message += `\n*Total: ${formatPrice(total)}*`;
        }
        message += `\n\nMohon info selanjutnya ya kak 🙏`;

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
                    {/* Discount badge strip */}
                    <AnimatePresence>
                        {hasDiscount && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center justify-center gap-2 py-1.5 text-xs font-bold tracking-wide"
                                    style={{ background: '#D4AF37', color: '#000' }}>
                                    <Tag className="w-3 h-3" />
                                    <span>Diskon 10% aktif · Hemat {formatPrice(savings)}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

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

                                {/* Totals in expanded view */}
                                {hasDiscount && (
                                    <div className="max-w-4xl mx-auto px-4 pb-3 border-t border-white/10 pt-2 space-y-1">
                                        <div className="flex justify-between text-xs text-white/50">
                                            <span>Subtotal</span>
                                            <span className="font-mono">{formatPrice(total)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-[#D4AF37]">
                                            <span>Diskon 10%</span>
                                            <span className="font-mono">-{formatPrice(savings)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-bold">
                                            <span>Total</span>
                                            <span className="font-mono">{formatPrice(discountedTotal)}</span>
                                        </div>
                                    </div>
                                )}
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
                                    {items.length} kelas dipilih
                                    {hasDiscount ? (
                                        <>
                                            &nbsp;·&nbsp;
                                            <span className="line-through text-white/40">{formatPrice(total)}</span>
                                            &nbsp;
                                            <span className="text-[#D4AF37]">{formatPrice(discountedTotal)}</span>
                                        </>
                                    ) : (
                                        <>&nbsp;·&nbsp;{formatPrice(total)}</>
                                    )}
                                </span>
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
