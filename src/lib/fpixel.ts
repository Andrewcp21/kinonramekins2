import { FB_PIXEL_ID } from '@/components/MetaPixel';

let ReactPixel: any;

// Function to initialize the pixel
export const initPixel = () => {
    if (typeof window !== 'undefined' && !ReactPixel) {
        import('react-facebook-pixel')
            .then((x) => {
                ReactPixel = x.default;
                ReactPixel.init(FB_PIXEL_ID);
            })
            .catch(err => console.error('Failed to load FB Pixel', err));
    }
};

// Function to track a standard event
export const track = (name: string, options = {}) => {
    if (!ReactPixel) {
        initPixel(); // Ensure pixel is initialized
    }
    if (ReactPixel) {
        ReactPixel.track(name, options);
    } else {
        // If ReactPixel is still not available, queue the event
        setTimeout(() => {
            if (ReactPixel) {
                ReactPixel.track(name, options);
            } else {
                console.error('FB Pixel is not initialized to track event:', name);
            }
        }, 500);
    }
};

// Function to track a page view
export const pageview = () => {
    if (!ReactPixel) {
        initPixel();
    }
    if (ReactPixel) {
        ReactPixel.pageView();
    } else {
        setTimeout(() => {
            if (ReactPixel) {
                ReactPixel.pageView();
            } else {
                console.error('FB Pixel is not initialized for pageview.');
            }
        }, 500);
    }
};
