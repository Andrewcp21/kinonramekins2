"use client";

import { useEffect, useState } from 'react';

/** Payday Sale: 10% off when the cart (at normal price) is at least MIN_PURCHASE */
export const PAYDAY_DEADLINE = new Date('2026-10-31T23:59:59+07:00');
export const PAYDAY_DEADLINE_LABEL = '31 Oktober';
export const PAYDAY_MIN_PURCHASE = 250000;
export const PAYDAY_RATE = 0.10;

/** True until the Payday Sale deadline passes; flips to false on its own at the deadline. */
export function usePaydayActive() {
    const [active, setActive] = useState(() => new Date() <= PAYDAY_DEADLINE);

    useEffect(() => {
        const remaining = PAYDAY_DEADLINE.getTime() - Date.now();
        if (remaining <= 0) return;
        const id = setTimeout(() => setActive(false), remaining);
        return () => clearTimeout(id);
    }, []);

    return active;
}

/** Live "1h 02j 03m 04d" countdown to the Payday Sale deadline; empty once it has passed. */
export function usePaydayCountdown() {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        function update() {
            const diff = PAYDAY_DEADLINE.getTime() - Date.now();
            if (diff <= 0) {
                setTimeLeft('');
                return;
            }
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            const parts = [];
            if (d > 0) parts.push(`${d}h`);
            parts.push(`${h.toString().padStart(2, '0')}j`);
            parts.push(`${m.toString().padStart(2, '0')}m`);
            parts.push(`${s.toString().padStart(2, '0')}d`);
            setTimeLeft(parts.join(' '));
        }
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return timeLeft;
}
