'use client';

import { motion } from 'framer-motion';
import { Video, FileText, MessageCircle, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const features = [
    {
        icon: Video,
        title: 'Video Guide Lengkap & Mudah',
        description: 'Akses seumur hidup ke tutorial video step-by-step.',
        images: [
            '/images/USP Screenshot/tutorial1.png',
            '/images/USP Screenshot/tutorial2.png',
            '/images/USP Screenshot/tutorial3.png'
        ],
        benefits: [
            'Resolusi HD jernih',
            'Angle kamera detail',
            'Step by step mudah diikuti'
        ]
    },
    {
        icon: FileText,
        title: 'Panduan Tertulis Lengkap',
        description: 'Modul PDF detail dan daftar supplier terpercaya.',
        images: [
            '/images/USP Screenshot/files1.png',
            '/images/USP Screenshot/files2.png'
        ],
        benefits: [
            'Resep anti-gagal',
            'Tips & trik rahasia',
            'Rekomendasi bahan & alat'
        ]
    },
    {
        icon: MessageCircle,
        title: 'Konsultasi via Group Whatsapp!',
        description: 'Tanya jawab langsung dengan instruktur dan komunitas.',
        images: [
            '/images/USP Screenshot/Grup1.jpeg',
            '/images/USP Screenshot/Grup2.jpeg',
            '/images/USP Screenshot/Grup3.jpeg'
        ],
        benefits: [
            'Fast response mentor',
            'Review hasil baking',
            'Komunitas suportif'
        ]
    }
];

export default function ClassIncludesSection() {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50/50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold mb-4 border border-amber-200">
                        ✨ Sekali Bayar, Akses Selamanya
                    </span>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-amber-950">
                        Apa yang Kamu Dapat?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Investasi terbaik untuk hobi dan bisnis bakingmu dengan materi terlengkap.
                    </p>
                </motion.div>

                <div className="space-y-24">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 space-y-8 text-center lg:text-left">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center justify-center lg:justify-start gap-3">
                                        <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
                                            <feature.icon size={28} />
                                        </div>
                                        <h3 className="text-3xl font-headline font-bold text-amber-950">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p className="text-xl text-gray-700 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                <ul className="space-y-3 inline-block text-left bg-white/50 p-6 rounded-2xl border border-amber-100">
                                    {feature.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Images Grid */}
                            <div className="flex-1 w-full relative">
                                {/* Decorative blob */}
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-200/20 blur-3xl rounded-full -z-10`} />

                                <div className={`grid gap-4 ${feature.images.length === 3 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-2'}`}>
                                    {feature.images.map((img, imgIndex) => (
                                        <div
                                            key={imgIndex}
                                            className={`relative rounded-2xl overflow-hidden shadow-xl border-4 border-white transform transition-transform duration-500 hover:scale-[1.02] 
                                                ${feature.images.length === 3 && imgIndex === 0 ? 'row-span-2' : ''}
                                                ${feature.images.length === 2 ? 'aspect-[4/3]' : 'aspect-square'}
                                            `}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${feature.title} screenshot ${imgIndex + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button
                        onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg hover:shadow-amber-200/50"
                    >
                        Lihat Pilihan Kelas
                    </button>
                </div>
            </div>
        </section>
    );
}
