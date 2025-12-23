"use client";

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Course } from '@/types';
import CourseCard from './CourseCard';
import CategoryFilter from './CategoryFilter';
import ProductModal from './ProductModal';
import coursesData from '@/data/courses.json';
import { motion, AnimatePresence } from 'framer-motion';

function CourseGridContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('Cookies');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const categories = useMemo(() => {
        const cats = new Set(coursesData.map(c => c.category));
        // Ensure specific order if desired, or just sort
        const order = ['Cookies', 'Breads', 'Pastries', 'Bars & Brownies', 'Others'];
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
        <section className="py-20 px-4 max-w-7xl mx-auto" id="courses">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-headline font-medium mb-4">
                    Pilihan Kelas
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Kelas baking online premium untuk rumahan.
                    Belajar teknik profesional dari dapurmu sendiri.
                </p>
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
