"use client";

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Course } from '@/types';
import CourseCard from './CourseCard';
import CategoryFilter from './CategoryFilter';
import ProductModal from './ProductModal';
import coursesData from '@/data/courses.json';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/components/CartContext';

function CourseGridContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('Cakes & Desserts');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const { addItem, isInCart } = useCart();

    const londonCake = coursesData.find(c => c.id === '32');
    const matildaCake = coursesData.find(c => c.id === '31');

    // Highlighted bundle — all figures come from courses.json so they stay in sync
    const bundle = useMemo(() => {
        if (!londonCake?.bundleWith || !matildaCake) return null;
        const normalPrice = londonCake.price + matildaCake.price;
        const bundlePrice = londonCake.bundleWith.bundlePrice;
        return {
            courses: [londonCake, matildaCake] as Course[],
            label: londonCake.bundleWith.label ?? 'Bundle Deal',
            normalPrice,
            bundlePrice,
        };
    }, [londonCake, matildaCake]);

    const bundleInCart = !!bundle && bundle.courses.every(c => isInCart(c.id));

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    const trackPromotion = (creative: string) => {
        if (!bundle) return;
        import('@/lib/gtag').then(gtag => {
            gtag.event('select_promotion', {
                promotion_id: 'london_matilda_bundle',
                promotion_name: bundle.label,
                creative_name: creative,
                currency: 'IDR',
                value: bundle.bundlePrice,
                items: bundle.courses.map(c => ({
                    item_id: c.id,
                    item_name: c.name,
                    item_category: c.category,
                    price: c.price,
                    quantity: 1,
                })),
            });
        });
    };

    const handleAddBundle = () => {
        if (!bundle || bundleInCart) return;
        trackPromotion('add_bundle');
        bundle.courses.forEach(c => addItem(c));
    };

    const handleAnnouncementClick = () => {
        trackPromotion('view_detail');
        setActiveCategory('Cakes & Desserts');
        if (londonCake) handleSelectCourse(londonCake as Course);
    };

    const categories = useMemo(() => {
        const cats = new Set(coursesData.map(c => c.category));
        // Ensure specific order if desired, or just sort
        const order = ['Cookies', 'Breads', 'Pastries', 'Bars & Brownies', 'Cakes & Desserts', 'Others'];
        return order.filter(c => cats.has(c));
    }, []);

    // Handle direct link via query param
    useEffect(() => {
        const classId = searchParams.get('class');
        const categoryParam = searchParams.get('category');

        if (classId) {
            const course = coursesData.find(c => c.id === classId);
            if (course) {
                setSelectedCourse(course as Course);
                setActiveCategory(course.category);

                // Scroll to courses section
                const element = document.getElementById('courses');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else if (categoryParam) {
            // Check if the category exists in our categories list
            const matchedCategory = categories.find(
                c => c.toLowerCase() === categoryParam.toLowerCase()
            );
            if (matchedCategory) {
                setActiveCategory(matchedCategory);
                // Scroll to courses section
                const element = document.getElementById('courses');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }, [searchParams, categories]);

    const handleCategorySelect = (category: string) => {
        setActiveCategory(category);
        // Clear query params when user manually selects a category
        if (searchParams.get('category') || searchParams.get('class')) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('category');
            params.delete('class');
            router.push(`?${params.toString()}`, { scroll: false });
        }
    };

    // Fire view_item_list whenever the visible category/courses change
    useEffect(() => {
        import('@/lib/gtag').then(gtag => {
            gtag.event('view_item_list', {
                item_list_id: activeCategory.toLowerCase().replace(/\s+/g, '_'),
                item_list_name: activeCategory,
                items: filteredCourses.map((c, idx) => ({
                    item_id: c.id,
                    item_name: c.name,
                    item_category: c.category,
                    price: c.price,
                    index: idx,
                })),
            });
        });
    }, [activeCategory]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSelectCourse = (course: Course) => {
        import('@/lib/gtag').then(gtag => {
            gtag.event('select_item', {
                item_list_id: activeCategory.toLowerCase().replace(/\s+/g, '_'),
                item_list_name: activeCategory,
                items: [{
                    item_id: course.id,
                    item_name: course.name,
                    item_category: course.category,
                    price: course.price,
                }],
            });
        });
        setSelectedCourse(course);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
        // Clear query param without full refresh
        const params = new URLSearchParams(searchParams.toString());
        params.delete('class');
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const filteredCourses = useMemo(() => {
        return coursesData.filter(course => course.category === activeCategory);
    }, [activeCategory]);

    return (
        <section className="pt-10 pb-20 px-4 max-w-7xl mx-auto" id="courses">
            <div className="text-center mb-8">
                {/* Logo */}
                <div className="mb-4 relative w-32 h-14 md:w-40 md:h-16 mx-auto">
                    <Image
                        src="/images/logo3.png"
                        alt="Kinonramekins Logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 128px, 160px"
                        priority
                    />
                </div>

                <h2 className="text-4xl md:text-5xl font-headline font-medium mb-2">
                    Pilihan Kelas
                </h2>

                {bundle && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 mx-auto max-w-5xl bg-amber-950 text-amber-50 rounded-2xl overflow-hidden shadow-lg text-left flex flex-col sm:flex-row"
                    >
                        {/* Images — tap to open details */}
                        <button
                            onClick={handleAnnouncementClick}
                            aria-label={`Lihat detail ${bundle.label}`}
                            className="relative grid grid-cols-2 gap-1 sm:w-1/2 shrink-0 sm:self-center group"
                        >
                            {bundle.courses.map(c => (
                                <div key={c.id} className="relative aspect-square bg-amber-900/40 overflow-hidden">
                                    {c.image && (
                                        <Image
                                            src={c.image}
                                            alt={c.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            sizes="(max-width: 640px) 50vw, 256px"
                                        />
                                    )}
                                </div>
                            ))}
                            {/* Plus badge on the seam */}
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-bold text-lg flex items-center justify-center shadow-md">
                                +
                            </span>
                        </button>

                        {/* Content */}
                        <div className="p-5 md:p-6 flex flex-col justify-center gap-3 min-w-0">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                                <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-amber-400">
                                    {bundle.label}
                                </span>
                            </div>

                            <p className="text-sm md:text-base font-semibold leading-snug">
                                {bundle.courses.map(c => c.name).join(' + ')}
                            </p>

                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <span className="text-sm line-through text-amber-200/60">
                                    {formatPrice(bundle.normalPrice)}
                                </span>
                                <span className="text-2xl md:text-3xl font-bold text-amber-300">
                                    {formatPrice(bundle.bundlePrice)}
                                </span>
                            </div>

                            <button
                                onClick={handleAddBundle}
                                disabled={bundleInCart}
                                className={`mt-1 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-colors ${
                                    bundleInCart
                                        ? 'bg-amber-900/60 text-amber-200 cursor-default'
                                        : 'bg-amber-400 text-amber-950 hover:bg-amber-300 active:scale-[0.98]'
                                }`}
                            >
                                {bundleInCart ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Paket Ada di Keranjang
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="w-4 h-4" />
                                        Ambil Paket Bundle
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelect={handleCategorySelect}
            />

            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredCourses.map((course) => (
                        <motion.div
                            key={course.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CourseCard
                                course={course as Course}
                                onClick={() => handleSelectCourse(course as Course)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <ProductModal
                course={selectedCourse}
                isOpen={!!selectedCourse}
                onClose={handleCloseModal}
            />
        </section>
    );
}

export default function CourseGrid() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <CourseGridContent />
        </Suspense>
    );
}
