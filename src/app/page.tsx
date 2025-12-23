import Hero from "@/components/Hero";
import FavoritesVideoSection from "@/components/FavoritesVideoSection";
import CourseGrid from "@/components/CourseGrid";
import ReviewsSection from "@/components/ReviewsSection";
import MetaPixel from "@/components/MetaPixel";
import { Suspense } from "react";

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
