"use client";

import Image from 'next/image';
import { Course } from '@/types';
import { BadgeCheck, Sparkles, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/components/CartContext';

interface CourseCardProps {
    course: Course;
    onClick: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
    const { toggleItem, isInCart } = useCart();
    const inCart = isInCart(course.id);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleCartToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleItem(course);
    };

    return (
        <div
            onClick={onClick}
            className="group relative cursor-pointer industrial-border bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block"
        >
            {/* Badge */}
            {course.badge && (
                <div className="absolute top-2 left-2 z-10 bg-black text-white px-3 py-1 text-xs uppercase tracking-wider font-bold flex items-center gap-1">
                    {course.badge === 'Best Seller' && <BadgeCheck className="w-3 h-3 text-gold" />}
                    {course.badge === 'New' && <Sparkles className="w-3 h-3 text-gold" />}
                    {course.badge}
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden border-b border-gray-100">
                {course.image ? (
                    <Image
                        src={course.image}
                        alt={course.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3">
                <h3 className="font-serif font-medium text-lg leading-tight line-clamp-2 min-h-[3rem] group-hover:text-gold transition-colors">
                    {course.name}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="font-bold text-lg">{formatPrice(course.price)}</span>
                    <span className="text-gold text-sm font-medium hover:underline">Lihat Detail</span>
                </div>

                {/* Cart Toggle Button */}
                <button
                    onClick={handleCartToggle}
                    className={`w-full font-bold py-2.5 px-4 flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-[0.98] ${
                        inCart
                            ? 'bg-green-600 text-white hover:bg-red-600'
                            : 'bg-black text-white hover:bg-gray-800'
                    }`}
                >
                    {inCart ? (
                        <>
                            <Check className="w-4 h-4" />
                            Ditambahkan
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-4 h-4" />
                            Tambah ke Keranjang
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
