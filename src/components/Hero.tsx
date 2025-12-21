import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative w-full flex items-center justify-center overflow-hidden bg-[#f8edd6] text-amber-950 py-12 md:min-h-[60vh] lg:min-h-[70vh]">
            {/* Background with Overlay - REMOVED for flat color request */}
            {/* <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="w-full h-full bg-[url('/images/products/BB1.png')] bg-cover bg-center blur-sm scale-110 opacity-50" />
            </div> */}

            <div className="relative z-20 text-center max-w-4xl px-6 flex flex-col items-center gap-4">
                {/* Logo */}
                <div className="mb-4 relative w-48 h-20 md:w-64 md:h-24">
                    <Image
                        src="/images/logo3.png"
                        alt="Kinonramekins Logo"
                        fill
                        className="object-contain" // Original colors for light background
                        sizes="(max-width: 768px) 192px, 256px"
                        priority
                    />
                </div>

                <div className="inline-block border border-amber-900/30 px-3 py-1 rounded-full text-xs font-sans font-bold tracking-widest uppercase mb-2 text-amber-800">
                    Online Baking Class
                </div>

                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                    Bikin Kue Enak & Cantik <br />
                    <span className="text-amber-600">
                        Gak Pake Ribet!
                    </span>
                </h1>

                <p className="max-w-xl text-base md:text-lg text-amber-900/80 font-sans font-medium leading-relaxed">
                    Kelas baking online praktis buat kamu yang super sibuk.
                    Resep anti-gagal, video lengkap, bisa belajar kapan aja di rumah.
                    Yuk, jadi baker jagoan keluarga!
                </p>

                <Link
                    href="#courses"
                    className="group mt-6 flex items-center gap-3 bg-amber-900 text-[#f8edd6] px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-amber-800 transition-all duration-300 rounded-full"
                >
                    Lihat Kelas
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
