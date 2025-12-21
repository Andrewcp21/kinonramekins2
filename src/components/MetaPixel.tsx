"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const FB_PIXEL_ID = '2330472814091420';

export default function MetaPixel() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        import('react-facebook-pixel')
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init(FB_PIXEL_ID);
                ReactPixel.pageView();
            });
    }, [pathname, searchParams]);

    return null;
}
