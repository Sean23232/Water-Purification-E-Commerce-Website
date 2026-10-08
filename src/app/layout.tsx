import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { QuoteProvider } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: {
    default: "AquaPure Water Solutions — Water Purification for Home, Business & Municipal",
    template: "%s · AquaPure Water Solutions",
  },
  description:
    "Water purification and treatment products for homes, commercial operations, industrial facilities and municipal projects. Shop filters and request a system quote.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <CartProvider>
          <QuoteProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
          </QuoteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
