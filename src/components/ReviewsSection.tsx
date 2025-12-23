"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const reviews = [
    "IMG_6424.jpeg",
    "IMG_6425.jpeg",
    "IMG_6426.jpeg",
    "IMG_6427.jpeg",
    "IMG_6428.jpeg",
    "IMG_6429.jpeg",
    "IMG_6430.jpeg",
    "IMG_6431.jpeg",
    "IMG_6432.jpeg",
    "IMG_6433.jpeg",
    "IMG_6434.jpeg",
    "IMG_6435.jpeg",
    "IMG_6436.jpeg",
    "IMG_6437.jpeg",
    "IMG_6438.jpeg",
    "IMG_6439.jpeg",
];

export default function ReviewsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });

    return (
        <section className="py-20 bg-gray-50 overflow-hidden" id="reviews">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-headline font-medium mb-4">
                    Kata Alumni
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Ribuan alumni telah sukses membuat bakingan premium dari rumah.
                </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="flex overflow-x-auto gap-6 px-4 pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {reviews.map((img, idx) => (
                    <div
                        key={idx}
                        className="flex-none w-80 md:w-96 snap-center first:pl-4 last:pr-4"
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50/50">
                            <Image
                                src={`/reviews/${img}`}
                                alt={`Review ${idx + 1}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* WhatsApp CTA Section */}
            <div className="mt-12 text-center">
                <a
                    href="https://api.whatsapp.com/message/I2GYXZIM4RQMI1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-green-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] uppercase tracking-wider"
                >
                    <MessageCircle className="w-6 h-6" />
                    Mulai Belajar!
                </a>
            </div>
        </section>
    );
}
