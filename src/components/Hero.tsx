'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, CheckCircle2, Video } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative w-full flex items-center justify-center overflow-hidden bg-[#f8edd6] text-amber-950 py-8 md:min-h-[50vh] lg:min-h-[60vh]">
            <div className="relative z-20 text-center max-w-4xl px-6 flex flex-col items-center gap-3">
                {/* Logo */}
                <div className="mb-2 relative w-40 h-16 md:w-56 md:h-20">
                    <Image
                        src="/images/logo3.png"
                        alt="Kinonramekins Logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 160px, 224px"
                        priority
                    />
                </div>

                <div className="inline-block border border-amber-900/30 px-3 py-1 rounded-full text-[10px] md:text-xs font-sans font-bold tracking-widest uppercase mb-1 text-amber-800">
                    Online Baking Class
                </div>

                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                    Bikin Kue Enak & Cantik <br />
                    <span className="text-amber-600">
                        Gak Pake Ribet!
                    </span>
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 md:gap-4 my-4 w-full max-w-4xl"
                >
                    {[
                        { icon: Clock, text: "Fleksibel & Praktis" },
                        { icon: CheckCircle2, text: "Resep Anti-Gagal" },
                        { icon: Video, text: "Video Tutorial Lengkap" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/5 border border-amber-900/10"
                        >
                            <item.icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span className="text-[10px] md:text-xs font-sans font-bold text-amber-950 uppercase tracking-wide whitespace-nowrap">
                                {item.text}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                <p className="text-sm md:text-base text-amber-900/80 font-sans font-medium italic mb-2">
                    "Yuk, jadi baker dari rumah!"
                </p>

                <Link
                    href="#courses"
                    className="group flex items-center gap-2 bg-amber-900 text-[#f8edd6] px-8 py-3.5 text-sm font-bold uppercase tracking-widest hover:bg-amber-800 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl active:scale-95"
                >
                    Lihat Kelas
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
