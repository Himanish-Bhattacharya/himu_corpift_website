'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronRight, MapPin, Phone, MessageCircle, Mail, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { cn } from '@/lib/utils';

const schema = z.object({
  name:    z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company is required'),
  email:   z.string().email('Invalid email'),
  phone:   z.string().min(10, 'Phone is required'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Address',
    value: '546, Shanti Nagar, near CK Birla Hospital, Durgapura, Jaipur – 302018',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9057370100',
    href: 'tel:+919057370100',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 9057370100',
    href: 'https://wa.me/919057370100',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'corpift@outlook.com',
    href: 'mailto:corpift@outlook.com',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Fri: 7am–10pm · Sat–Sun: 9am–5pm',
    href: null,
  },
];

const WA_NUMBER = '919057370100';
const WA_DEFAULT_MSG = encodeURIComponent("Hi! I'm interested in corporate gifting. Can you help me?");

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, isInquiry: false }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('Something went wrong. Please try again or reach us on WhatsApp.');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-bg-alt pt-[72px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-[12px] font-body text-muted mb-6">
            <Link href="/" className="hover:text-text transition-colors">Home</Link>
            <ChevronRight size={13} className="text-light" />
            <span className="text-text">Contact</span>
          </nav>
          <SectionLabel className="block mb-4">Get in Touch</SectionLabel>
          <h1 className="font-display text-display-sm text-text max-w-2xl leading-tight">
            Let&apos;s talk gifting
          </h1>
        </div>
      </section>

      {/* Split layout */}
      <section className="bg-bg py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Left: Info */}
            <RevealOnScroll>
              <div>
                <h2 className="font-display text-heading-lg text-text mb-8">
                  We&apos;d love to hear<br />from you
                </h2>
                <p className="text-[15px] font-body text-muted leading-relaxed mb-10">
                  Whether you&apos;re planning a bulk order, exploring our catalogue, or just want to say hello —
                  our team is ready to help.
                </p>

                {/* WhatsApp CTA — prominent */}
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_DEFAULT_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-[#25D366] text-white rounded-sm px-6 py-4 mb-10 w-fit hover:bg-[#1fbb5a] transition-colors duration-300"
                >
                  {/* WhatsApp icon */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <div>
                    <p className="text-[13px] font-medium tracking-[0.06em] uppercase font-body">Chat on WhatsApp</p>
                    <p className="text-[12px] opacity-80 font-body">+91 9057370100 · Usually replies in minutes</p>
                  </div>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </a>

                <ul className="space-y-6">
                  {CONTACT_INFO.map((info) => (
                    <li key={info.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-sm bg-bg-alt flex items-center justify-center flex-shrink-0 mt-0.5">
                        <info.icon size={16} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium tracking-[0.1em] uppercase font-body text-muted mb-1">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-[14px] font-body text-text hover:text-accent transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-[14px] font-body text-text leading-relaxed">{info.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            {/* Right: Form */}
            <RevealOnScroll delay={0.15}>
              <div className="bg-bg-card border border-border rounded-sm p-8 md:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                      <CheckCircle2 className="text-accent" size={28} />
                    </div>
                    <div>
                      <h3 className="font-display text-heading-sm text-text mb-2">Message Sent!</h3>
                      <p className="text-sm text-muted font-body">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-heading-sm text-text mb-6">Send a Message</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[12px] font-medium tracking-[0.05em] uppercase text-muted font-body mb-1.5">
                            Full Name *
                          </label>
                          <input
                            {...register('name')}
                            autoComplete="name"
                            placeholder="Your name"
                            className={cn(
                              'w-full px-4 py-3 bg-bg border rounded-sm text-[16px] md:text-[14px] font-body text-text placeholder:text-light',
                              'transition-all duration-200 outline-none',
                              'focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent',
                              errors.name ? 'border-red-400' : 'border-border'
                            )}
                          />
                          {errors.name && (
                            <p className="text-[11px] text-red-500 mt-1">{errors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[12px] font-medium tracking-[0.05em] uppercase text-muted font-body mb-1.5">
                            Company *
                          </label>
                          <input
                            {...register('company')}
                            autoComplete="organization"
                            placeholder="Company name"
                            className={cn(
                              'w-full px-4 py-3 bg-bg border rounded-sm text-[16px] md:text-[14px] font-body text-text placeholder:text-light',
                              'transition-all duration-200 outline-none',
                              'focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent',
                              errors.company ? 'border-red-400' : 'border-border'
                            )}
                          />
                          {errors.company && (
                            <p className="text-[11px] text-red-500 mt-1">{errors.company.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[12px] font-medium tracking-[0.05em] uppercase text-muted font-body mb-1.5">
                            Email *
                          </label>
                          <input
                            {...register('email')}
                            autoComplete="email"
                            type="email"
                            placeholder="you@company.com"
                            className={cn(
                              'w-full px-4 py-3 bg-bg border rounded-sm text-[16px] md:text-[14px] font-body text-text placeholder:text-light',
                              'transition-all duration-200 outline-none',
                              'focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent',
                              errors.email ? 'border-red-400' : 'border-border'
                            )}
                          />
                          {errors.email && (
                            <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[12px] font-medium tracking-[0.05em] uppercase text-muted font-body mb-1.5">
                            Phone *
                          </label>
                          <input
                            {...register('phone')}
                            autoComplete="tel"
                            type="tel"
                            placeholder="+91 98765 43210"
                            className={cn(
                              'w-full px-4 py-3 bg-bg border rounded-sm text-[16px] md:text-[14px] font-body text-text placeholder:text-light',
                              'transition-all duration-200 outline-none',
                              'focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent',
                              errors.phone ? 'border-red-400' : 'border-border'
                            )}
                          />
                          {errors.phone && (
                            <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[12px] font-medium tracking-[0.05em] uppercase text-muted font-body mb-1.5">
                          Message (Optional)
                        </label>
                        <textarea
                          {...register('message')}
                          rows={4}
                          placeholder="Tell us about your gifting needs..."
                          className={cn(
                            'w-full px-4 py-3 bg-bg border border-border rounded-sm text-[16px] md:text-[14px] font-body text-text placeholder:text-light',
                            'transition-all duration-200 outline-none resize-none',
                            'focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent'
                          )}
                        />
                      </div>

                      {error && (
                        <p className="text-[13px] text-red-500 font-body">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending…' : 'Send Message'}
                      </button>

                      {/* WhatsApp alternative */}
                      <div className="relative flex items-center gap-3 py-1">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-[11px] font-body text-light uppercase tracking-[0.1em]">or</span>
                        <div className="flex-1 h-px bg-border" />
                      </div>

                      <a
                        href={`https://wa.me/${WA_NUMBER}?text=${WA_DEFAULT_MSG}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full flex items-center justify-center gap-2.5 border border-[#25D366] text-[#25D366] rounded-sm py-3 px-8 text-[13px] font-medium tracking-[0.06em] uppercase font-body transition-all duration-300 hover:bg-[#25D366] hover:text-white"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Continue on WhatsApp
                      </a>
                    </form>
                  </>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
