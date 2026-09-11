import { Course } from '@/types';

export interface AppliedBundle {
    /** The two courses that form the bundle */
    courses: [Course, Course];
    /** Sum of both courses at normal price */
    normalPrice: number;
    /** Promo price for the pair */
    bundlePrice: number;
    /** normalPrice - bundlePrice */
    saving: number;
    label: string;
}

/**
 * Finds every bundle deal that the current cart qualifies for.
 * A bundle applies automatically when both courses of a `bundleWith` pair
 * are in the cart. Each course can only be part of one bundle.
 */
export function getAppliedBundles(items: Course[]): AppliedBundle[] {
    const bundles: AppliedBundle[] = [];
    const used = new Set<string>();

    for (const course of items) {
        if (!course.bundleWith || used.has(course.id)) continue;

        const partner = items.find(i => i.id === course.bundleWith!.courseId);
        if (!partner || used.has(partner.id)) continue;

        const normalPrice = course.price + partner.price;
        const bundlePrice = course.bundleWith.bundlePrice;
        if (bundlePrice >= normalPrice) continue;

        used.add(course.id);
        used.add(partner.id);

        bundles.push({
            courses: [course, partner],
            normalPrice,
            bundlePrice,
            saving: normalPrice - bundlePrice,
            label: course.bundleWith.label ?? 'Bundle Deal',
        });
    }

    return bundles;
}
