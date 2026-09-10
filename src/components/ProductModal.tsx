"use client";

import { useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { X, Check, MessageCircle, PlayCircle, FileText, Settings, Users, ShoppingCart, Gift } from 'lucide-react';
import { Course } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/components/CartContext';
import coursesData from '@/data/courses.json';

interface ProductModalProps {
    course: Course | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ course, isOpen, onClose }: ProductModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const { toggleItem, isInCart } = useCart();
    const inCart = course ? isInCart(course.id) : false;

    const partnerCourse = useMemo(() => {
        if (!course?.bundleWith) return null;
        const found = coursesData.find(c => c.id === course.bundleWith!.courseId);
        return found ? (found as Course) : null;
    }, [course]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Fire ViewContent tracking when modal opens
    useEffect(() => {
        if (!isOpen || !course) return;

        import('@/lib/fpixel').then(fpixel => {
            fpixel.track('ViewContent', {
                content_name: course.name,
                content_category: course.category,
                content_ids: [course.id],
                content_type: 'product',
                value: course.price,
                currency: 'IDR',
            });
        });

        import('@/lib/gtag').then(gtag => {
            gtag.event('view_item', {
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
    }, [isOpen, course]);

    // Prevent background scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getWhatsappLink = (course: Course) => {
        const message = `Halo, saya tertarik dengan kelas ${course.name}. Boleh minta info lebih lanjut?`;
        return `https://wa.me/6289522453978?text=${encodeURIComponent(message)}`;
    };

    const getBundleWhatsappLink = (course: Course, partner: Course, bundlePrice: number) => {
        const message = `Halo, saya tertarik dengan paket bundling ${course.name} + ${partner.name} seharga ${formatPrice(bundlePrice)}. Boleh minta info lebih lanjut?`;
        return `https://wa.me/6289522453978?text=${encodeURIComponent(message)}`;
    };

    const trackLead = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!course) return;
        e.preventDefault();
        const href = e.currentTarget.href;

        import('@/lib/fpixel').then(fpixel => {
            fpixel.track('Lead', {
                content_name: course.name,
                content_category: course.category,
                value: course.price,
                currency: 'IDR'
            });
        });

        import('@/lib/gtag').then(gtag => {
            gtag.event('generate_lead', {
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

        setTimeout(() => {
            window.open(href, '_blank', 'noopener,noreferrer');
        }, 300);
    };

    const trackBundleLead = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!course || !partnerCourse || !course.bundleWith) return;
        e.preventDefault();
        const href = e.currentTarget.href;
        const bundlePrice = course.bundleWith.bundlePrice;

        import('@/lib/fpixel').then(fpixel => {
            fpixel.track('Lead', {
                content_name: `${course.name} + ${partnerCourse.name} (Bundle)`,
                content_category: course.category,
                content_ids: [course.id, partnerCourse.id],
                value: bundlePrice,
                currency: 'IDR',
            });
        });

        import('@/lib/gtag').then(gtag => {
            gtag.event('generate_lead', {
                currency: 'IDR',
                value: bundlePrice,
                items: [
                    { item_id: course.id, item_name: course.name, item_category: course.category, price: course.price, quantity: 1 },
                    { item_id: partnerCourse.id, item_name: partnerCourse.name, item_category: partnerCourse.category, price: partnerCourse.price, quantity: 1 },
                ],
            });
        });

        setTimeout(() => {
            window.open(href, '_blank', 'noopener,noreferrer');
        }, 300);
    };

    if (!course) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-white shadow-2xl industrial-border flex flex-col"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-black hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                            {/* Image Section - Sticky on Desktop */}
                            <div className="w-full md:w-1/2 min-h-[300px] md:h-full relative bg-gray-100 flex items-center justify-center shrink-0">
                                {course.image ? (
                                    <div className="relative w-full aspect-square">
                                        <Image
                                            src={course.image}
                                            alt={course.name}
                                            fill
                                            className="object-contain p-4"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                )}
                            </div>

                            {/* Content Section - Scrollable on Desktop */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                                <div className="mb-2 text-gold font-bold uppercase tracking-widest text-sm">
                                    {course.category}
                                </div>

                                <h2 className="font-headline text-2xl md:text-3xl font-medium mb-4 leading-tight">
                                    {course.name}
                                </h2>

                                <div className="text-3xl font-bold mb-6 font-mono">
                                    {formatPrice(course.price)}
                                </div>

                                <div className="prose prose-sm mb-6 text-gray-600">
                                    <p>{course.description}</p>
                                    {course.components && course.components !== '-' && (
                                        <p className="mt-2 text-sm italic">Component: {course.components}</p>
                                    )}
                                </div>

                                {/* Value Stack */}
                                <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
                                    <h4 className="font-bold uppercase tracking-wider text-sm mb-4 border-b border-gray-200 pb-2">
                                        What You Get
                                    </h4>
                                    <ul className="space-y-3">
                                        {course.facilities.map((facility, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                                <div className="mt-0.5 shrink-0 text-gold">
                                                    {facility.toLowerCase().includes('video') ? <PlayCircle className="w-4 h-4" /> :
                                                        facility.toLowerCase().includes('resep') ? <FileText className="w-4 h-4" /> :
                                                            facility.toLowerCase().includes('trouble') ? <Settings className="w-4 h-4" /> :
                                                                facility.toLowerCase().includes('group') ? <Users className="w-4 h-4" /> :
                                                                    <Check className="w-4 h-4" />}
                                                </div>
                                                <span>{facility}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bundle Deal */}
                                {course.bundleWith && partnerCourse && (
                                    <div className="bg-gold/5 p-6 rounded-lg mb-8 border-2 border-gold/30">
                                        <h4 className="font-bold uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
                                            <Gift className="w-4 h-4 text-gold" />
                                            {course.bundleWith.label ?? 'Bundle Deal'}
                                        </h4>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="relative w-16 h-16 shrink-0 bg-white rounded border border-gray-200 overflow-hidden">
                                                {partnerCourse.image ? (
                                                    <Image
                                                        src={partnerCourse.image}
                                                        alt={partnerCourse.name}
                                                        fill
                                                        className="object-contain p-1"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Image</div>
                                                )}
                                            </div>
                                            <div className="text-sm">
                                                <p className="text-gray-500">Bundle with</p>
                                                <p className="font-semibold leading-tight">{partnerCourse.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-baseline gap-3 mb-4">
                                            <span className="text-sm line-through text-gray-400">
                                                {formatPrice(course.price + partnerCourse.price)}
                                            </span>
                                            <span className="text-xl font-bold font-mono text-gold">
                                                {formatPrice(course.bundleWith.bundlePrice)}
                                            </span>
                                        </div>

                                        <a
                                            href={getBundleWhatsappLink(course, partnerCourse, course.bundleWith.bundlePrice)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={trackBundleLead}
                                            className="w-full bg-black text-white font-bold py-3 px-6 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors uppercase tracking-widest text-xs"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Ambil Paket Bundle via WhatsApp
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sticky Footer */}
                        <div className="p-4 md:p-6 bg-white border-t border-gray-100 shrink-0 flex flex-col gap-3">
                            <a
                                href={getWhatsappLink(course)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={trackLead}
                                className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-none flex items-center justify-center gap-2 hover:bg-green-700 transition-colors uppercase tracking-widest text-sm shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Daftar Kelas via WhatsApp
                            </a>
                            <button
                                onClick={() => toggleItem(course)}
                                className={`w-full font-bold py-3 px-6 flex items-center justify-center gap-2 uppercase tracking-widest text-sm transition-all active:scale-[0.98] border-2 ${
                                    inCart
                                        ? 'bg-green-50 border-green-600 text-green-700 hover:bg-red-50 hover:border-red-500 hover:text-red-600'
                                        : 'bg-white border-black text-black hover:bg-black hover:text-white'
                                }`}
                            >
                                {inCart ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Ditambahkan ke Keranjang
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="w-4 h-4" />
                                        Tambah ke Keranjang
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
