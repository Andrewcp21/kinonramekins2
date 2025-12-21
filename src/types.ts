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
}
