import clsx from 'clsx';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
    return (
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md py-4 w-full flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={clsx(
                        "px-6 py-2 text-sm font-sans uppercase tracking-widest transition-all duration-300 border border-transparent",
                        activeCategory === category
                            ? "border-black font-bold bg-black text-white"
                            : "text-gray-500 hover:text-black hover:border-gray-300"
                    )}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
