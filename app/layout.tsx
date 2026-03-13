import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import PageTransition from '@/components/shared/PageTransition';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Corpift — Premium Corporate Gifting from Jaipur',
  description:
    'Handcrafted, eco-friendly corporate gift hampers curated for businesses. Sustainable gifting solutions from Jaipur, India.',
  keywords: ['corporate gifts', 'Jaipur', 'handcrafted', 'eco-friendly', 'bulk corporate orders', 'gift hampers'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-bg text-text antialiased">
        {/* Grain texture overlay */}
        <div
          aria-hidden
          className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px',
          }}
        />

        <Header />
        <CartDrawer />

        <main>
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <Footer />
      </body>
    </html>
  );
}
