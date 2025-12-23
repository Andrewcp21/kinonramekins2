'use client';

import { motion } from 'framer-motion';

const favorites = [
    {
        title: "Basque Cheesecake",
        video: "/videos/OT4-C.MOV",
    },
    {
        title: "Tiramisu",
        video: "/videos/OT5-N.MOV",
    },
    {
        title: "OG Brown Butter Chocolate Chunk Cookie",
        video: "/videos/C3-A.MOV",
    },
    {
        title: "Crunchy Bite-Sized Chocolate Chip Cookies",
        video: "/videos/C4.MOV",
    },
    {
        title: "Levain Bakery Style Cookie",
        video: "/videos/C2.mov",
    }
];

export default function FavoritesVideoSection() {
    return (
        <section className="py-20 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Our Highlights
                    </span>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold text-amber-950">
                        Most Favorites Menu
                    </h2>
                    <div className="h-1 w-20 bg-amber-600 mx-auto mt-6 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favorites.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-2xl bg-amber-50 shadow-xl shadow-amber-900/5 ${index >= 3 ? 'lg:col-span-1.5' : ''
                                }`}
                        >
                            <div className="aspect-[9/16] md:aspect-square relative overflow-hidden">
                                <video
                                    src={item.video}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500">
                                    <h3 className="text-white text-xl md:text-2xl font-headline font-bold leading-tight">
                                        {item.title}
                                    </h3>
                                    <div className="h-0.5 w-0 group-hover:w-full bg-amber-400 transition-all duration-500 mt-2" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
