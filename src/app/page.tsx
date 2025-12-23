import Hero from "@/components/Hero";
import MetaPixel from "@/components/MetaPixel";
import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Lazy load below-the-fold components
const CourseGrid = dynamic(() => import("@/components/CourseGrid"), {
  loading: () => <div className="min-h-screen bg-white" />,
});

const FavoritesVideoSection = dynamic(() => import("@/components/FavoritesVideoSection"), {
  loading: () => <div className="py-20 bg-white min-h-[400px]" />,
});

const ReviewsSection = dynamic(() => import("@/components/ReviewsSection"), {
  loading: () => <div className="py-20 bg-gray-50 min-h-[300px]" />,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-gold selection:text-white">
      <Suspense fallback={null}>
        <MetaPixel />
      </Suspense>

      <Hero />
      <CourseGrid />
      <FavoritesVideoSection />
      <ReviewsSection />

      {/* Simple Footer */}
      <footer className="py-12 text-center text-xs text-gray-400 border-t border-gray-100 mt-20 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Kinonramekins. All rights reserved.</p>
        <p className="mt-2">Premium Online Baking Classes</p>
      </footer>
    </main>
  );
}
