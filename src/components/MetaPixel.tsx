"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const FB_PIXEL_ID = '2330472814091420';

export default function MetaPixel() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        import('@/lib/fpixel')
            .then((fpixel) => {
                fpixel.initPixel();
                fpixel.pageview();
            })
            .catch(err => console.error('Failed to load fpixel utility', err));
    }, [pathname, searchParams]);

    return null;
}
