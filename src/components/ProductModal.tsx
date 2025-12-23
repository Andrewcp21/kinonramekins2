"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Check, MessageCircle, PlayCircle, FileText, Settings, Users } from 'lucide-react';
import { Course } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
    course: Course | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ course, isOpen, onClose }: ProductModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

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

    const trackLead = () => {
        if (!course) return;
        import('react-facebook-pixel')
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.track('Lead', {
                    content_name: course.name,
                    content_category: course.category,
                    value: course.price,
                    currency: 'IDR'
                });
            });
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
                            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col md:overflow-y-auto">
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
                            </div>
                        </div>

                        {/* Sticky Footer */}
                        <div className="p-4 md:p-6 bg-white border-t border-gray-100 shrink-0">
                            <a
                                href={getWhatsappLink(course)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={trackLead}
                                className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-none flex items-center justify-center gap-2 hover:bg-green-700 transition-colors uppercase tracking-widest text-sm shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Order via WhatsApp
                            </a>
                            <p className="text-center text-xs text-gray-400 mt-2">
                                Order via WhatsApp Admin
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
