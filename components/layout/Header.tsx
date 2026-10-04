'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/',          label: 'Home' },
  { href: '/shop',      label: 'Shop' },
  { href: '/about',     label: 'About' },
  { href: '/services',  label: 'Services' },
  { href: '/blog',      label: 'Blog' },
  { href: '/contact',   label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Over the homepage's dark hero image the header is transparent with light content.
  // Once scrolled (or with the mobile menu open) it gets an ivory bar with dark content.
  const onDarkHero = pathname === '/' && !scrolled && !menuOpen;
  const { openCart, totalItems } = useCartStore();
  const count = totalItems();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-400 ease-custom',
          scrolled || menuOpen
            ? 'bg-bg shadow-[0_1px_0_theme(colors.border)]'
            : 'bg-transparent'
        )}
      >
        <div className="flex items-center justify-between h-full max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center h-12 overflow-hidden">
            <Image
              src="/images/Corpift_logo.png"
              alt="Corpift"
              width={240}
              height={240}
              className={cn(
                'h-[90px] w-auto object-contain transition-all duration-300 flex-shrink-0',
                onDarkHero ? 'invert mix-blend-screen' : 'mix-blend-multiply'
              )}
              priority
            />
          </Link>

          {/* Center nav — desktop only */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-[12px] font-medium tracking-[0.1em] uppercase font-body',
                    'transition-colors duration-200',
                    'after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-accent',
                    'after:transition-all after:duration-300 after:ease-custom',
                    onDarkHero
                      ? isActive
                        ? 'text-bg after:w-full after:bg-accent-light'
                        : 'text-bg/75 hover:text-bg after:w-0 hover:after:w-full after:bg-accent-light'
                      : isActive
                        ? 'text-text after:w-full'
                        : 'text-muted hover:text-text after:w-0 hover:after:w-full'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Cart */}
            <button
              onClick={openCart}
              className={cn(
                'relative flex items-center gap-2 transition-colors duration-200',
                onDarkHero ? 'text-bg hover:text-accent-light' : 'text-text hover:text-accent'
              )}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="hidden md:block text-[12px] font-medium tracking-[0.08em] uppercase font-body">
                Inquiry
              </span>
              <AnimatePresence>
                {mounted && count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent rounded-full text-white text-[10px] font-bold flex items-center justify-center font-body"
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* CTA — desktop */}
            <Link
              href="/contact"
              className={cn(
                'hidden md:flex group items-center gap-1.5 py-2 px-6 text-[12px]',
                onDarkHero ? 'btn-light' : 'btn-primary'
              )}
            >
              Get a Quote
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                'md:hidden p-1.5 transition-colors duration-300',
                onDarkHero ? 'text-bg' : 'text-text'
              )}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-bg-card border-b border-border shadow-lg md:hidden"
          >
            <nav className="flex flex-col px-5 py-6 gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'py-3 px-3 text-[13px] font-medium tracking-[0.08em] uppercase font-body rounded-sm transition-colors',
                      isActive ? 'text-accent bg-bg-alt' : 'text-muted hover:text-text hover:bg-bg-alt'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="mt-3 btn-primary text-center py-3 flex items-center justify-center gap-2 group"
              >
                Get a Quote
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
