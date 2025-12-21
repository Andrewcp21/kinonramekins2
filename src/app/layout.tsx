import type { Metadata } from "next";
import { Inter, Playfair_Display, Fredoka } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kinonramekins Online Baking Class",
  description: "Premium online baking classes for home bakers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${fredoka.variable} antialiased font-sans`}
      >
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
