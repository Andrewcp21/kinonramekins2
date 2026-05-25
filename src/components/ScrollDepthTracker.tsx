'use client';

import { useEffect } from 'react';
import { event as gaEvent } from '@/lib/gtag';

const DEPTHS = [25, 50, 75, 100];

export default function ScrollDepthTracker() {
    useEffect(() => {
        const fired = new Set<number>();

        const handleScroll = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            const pct = Math.round((window.scrollY / docHeight) * 100);

            for (const depth of DEPTHS) {
                if (pct >= depth && !fired.has(depth)) {
                    fired.add(depth);
                    gaEvent('scroll', { percent_scrolled: depth });
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return null;
}
