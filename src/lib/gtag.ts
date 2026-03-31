export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const event = (action: string, params: Record<string, unknown>) => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;
    (window as any).gtag('event', action, params);
};
