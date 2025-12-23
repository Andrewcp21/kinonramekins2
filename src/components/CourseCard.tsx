import Image from 'next/image';
import { Course } from '@/types';
import { BadgeCheck, Sparkles, MessageCircle } from 'lucide-react';

interface CourseCardProps {
    course: Course;
    onClick: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
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

    const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation(); // Prevent card click from triggering
        e.preventDefault(); // Prevent the default link navigation

        const href = e.currentTarget.href;

        import('@/lib/fpixel').then(fpixel => {
            fpixel.track('Lead', {
                content_name: course.name,
                content_category: course.category,
                value: course.price,
                currency: 'IDR'
            });
        });

        // Open the link in a new tab after a short delay
        setTimeout(() => {
            window.open(href, '_blank', 'noopener,noreferrer');
        }, 300);
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
                </div>

                {/* WhatsApp CTA Button */}
                <a
                    href={getWhatsappLink(course)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-600 text-white font-bold py-2.5 px-4 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
                >
                    <MessageCircle className="w-4 h-4" />
                    Order
                </a>
            </div>
        </div>
    );
}
