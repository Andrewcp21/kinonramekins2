'use client';

import { motion } from 'framer-motion';
import { Video, FileText, Utensils, Wrench, MessageCircle } from 'lucide-react';

const includes = [
    {
        icon: Video,
        title: 'Video Guide',
        description: 'Tutorial video lengkap step-by-step'
    },
    {
        icon: FileText,
        title: 'List Alat dan Bahan',
        description: 'Lengkap dengan rekomendasi merk bahan'
    },
    {
        icon: Utensils,
        title: 'Resep Tertulis',
        description: 'Resep detail yang mudah diikuti'
    },
    {
        icon: Wrench,
        title: 'Troubleshooting Guide',
        description: 'Solusi untuk masalah yang sering terjadi'
    },
    {
        icon: MessageCircle,
        title: 'Konsultasi via WhatsApp',
        description: 'Tanya jawab langsung di grup eksklusif'
    }
];

export default function ClassIncludesSection() {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50/30">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-amber-950">
                        Apa yang Kamu Dapat
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Semua yang kamu butuhkan untuk sukses baking dari rumah
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {includes.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-amber-900/5 hover:border-amber-900/20"
                        >
                            {/* Icon */}
                            <div className="mb-6 relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <item.icon className="w-8 h-8 text-amber-600" strokeWidth={2} />
                                </div>
                                {/* Decorative element */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-200/30 rounded-full blur-xl group-hover:bg-amber-300/40 transition-colors duration-300" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-headline font-bold mb-2 text-amber-950">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.description}
                            </p>

                            {/* Hover effect border */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 to-amber-600/0 group-hover:from-amber-400/5 group-hover:to-amber-600/5 transition-all duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-amber-900/70 font-sans font-medium italic text-sm md:text-base">
                        ✨ Semua materi bisa diakses selamanya, belajar sesuai ritme kamu!
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
