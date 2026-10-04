import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/shop',     label: 'Shop' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-bg">
      {/* Main row */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 border-b border-border-dark pb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="block mb-3">
              <Image
                src="/images/Corpift_logo.png"
                alt="Corpift"
                width={160}
                height={54}
                className="h-28 md:h-40 w-auto object-contain invert -ml-3"
              />
            </Link>
            <p className="font-display italic text-muted-dark text-[17px] mb-4">
              Where tradition meets modernity
            </p>
            <p className="text-[13px] text-muted-dark font-body leading-relaxed">
              Premium handcrafted corporate gifts from Jaipur, crafted with care for the businesses that care about their people.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase font-body text-accent mb-4">
              Navigate
            </p>
            <ul className="space-y-1.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1.5 text-[14px] md:text-[13px] font-body text-muted-dark hover:text-bg transition-colors duration-200 tracking-[0.03em]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase font-body text-accent mb-4">
              Find Us
            </p>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 text-accent flex-shrink-0" />
                <span className="text-[13px] font-body text-muted-dark leading-relaxed">
                  546, Shanti Nagar, near CK Birla Hospital,<br />Durgapura, Jaipur – 302018
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-accent flex-shrink-0" />
                <a href="tel:+919057370100" className="inline-block py-1 text-[14px] md:text-[13px] font-body text-muted-dark hover:text-bg transition-colors">
                  +91 9057370100
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={14} className="text-accent flex-shrink-0" />
                <a href="https://wa.me/919057370100" className="inline-block py-1 text-[14px] md:text-[13px] font-body text-muted-dark hover:text-bg transition-colors">
                  +91 9057370100
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-accent flex-shrink-0" />
                <a href="mailto:corpift@outlook.com" className="inline-block py-1 text-[14px] md:text-[13px] font-body text-muted-dark hover:text-bg transition-colors">
                  corpift@outlook.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="mt-0.5 text-accent flex-shrink-0" />
                <span className="text-[13px] font-body text-muted-dark leading-relaxed">
                  Mon–Fri: 7am–10pm<br />Sat–Sun: 9am–5pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[12px] font-body text-muted-dark tracking-[0.03em]">
            © {new Date().getFullYear()} Corpift. All rights reserved.
          </p>
          <p className="text-[12px] font-body text-muted-dark">
            Crafted with care in Jaipur, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
