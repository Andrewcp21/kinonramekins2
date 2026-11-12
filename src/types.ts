export interface Course {
    id: string;
    category: string;
    name: string;
    price: number;
    description: string;
    components: string;
    facilities: string[];
    image: string | null;
    badge: string | null;
    bundleWith?: {
        courseId: string;
        bundlePrice: number;
        label?: string;
    };
    /** Featured in the "Cocok untuk Pemula" highlight on the homepage */
    beginnerPick?: {
        /** Position in the highlight, lowest first */
        order: number;
        /** Short display name for the compact tile */
        shortName?: string;
    };
}
