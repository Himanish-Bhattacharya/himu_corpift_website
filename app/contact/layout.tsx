import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Request a quote for corporate gifts. Call, WhatsApp or email Corpift in Jaipur.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
