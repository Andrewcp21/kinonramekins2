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
import { Sparkles, ArrowRight } from 'lucide-react';

function CourseGridContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('Cakes & Desserts');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const matilda = coursesData.find(c => c.id === '31');

    const handleAnnouncementClick = () => {
        setActiveCategory('Cakes & Desserts');
        if (matilda) setSelectedCourse(matilda as Course);
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

                <motion.button
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onClick={handleAnnouncementClick}
                    className="mt-4 inline-flex items-center gap-2 bg-amber-950 text-amber-50 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-800 transition-colors shadow-md"
                >
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>New Recipe: Matilda Inspired Dark Chocolate Fudge Layer Cake</span>
                    <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
                </motion.button>
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
                                onClick={() => setSelectedCourse(course as Course)}
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
