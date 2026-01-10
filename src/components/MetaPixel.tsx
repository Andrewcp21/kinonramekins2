"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const FB_PIXEL_IDS = ['2330472814091420', '1377894847161754'];

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

    return (
        <noscript>
            {FB_PIXEL_IDS.map(id => (
                <img
                    key={id}
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
                    alt=""
                />
            ))}
        </noscript>
    );
}
