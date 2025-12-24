import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display, Fredoka } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import Script from 'next/script';

export const dynamic = 'force-dynamic';

// Font declarations with display: swap for better performance
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff'
};

export const metadata: Metadata = {
  title: 'Kinonramekins Online Baking Class',
  description: 'Premium online baking classes for home bakers.',
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'http-equiv': 'x-ua-compatible',
    content: 'IE=edge',
  },
  alternates: {
    canonical: 'https://kinonramekins.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://kinonramekins.com',
    title: 'Kinonramekins Online Baking Class',
    description: 'Learn baking from professional chefs with our online baking classes',
    siteName: 'Kinonramekins',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kinonramekins',
    title: 'Kinonramekins Online Baking Class',
    description: 'Learn baking from professional chefs with our online baking classes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
        />
        <Script id="load-css" strategy="afterInteractive">
          {`
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/_next/static/css/app/layout.css';
            document.head.appendChild(link);
          `}
        </Script>
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        </noscript>
      </head>
      <body className={`${poppins.variable} ${playfair.variable} ${fredoka.variable} antialiased font-sans`}>
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
