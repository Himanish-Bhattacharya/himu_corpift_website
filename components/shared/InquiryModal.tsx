'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const schema = z.object({
  name:    z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company is required'),
  email:   z.string().email('Invalid email address'),
  phone:   z.string().min(10, 'Phone number is required'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const WA_NUMBER = '919057370100';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { items, clearCart, closeCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          isInquiry: true,
          cartItems: items,
        }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setSubmitted(true);
      reset();

      setTimeout(() => {
        clearCart();
        onClose();
        closeCart();
        setSubmitted(false);
      }, 2500);
    } catch {
      setError('Something went wrong. Please try WhatsApp instead.');
    }
  };

  // Build a WhatsApp message pre-filled with cart items
  const buildWaMessage = () => {
    const formData = getValues();
    const lines = [
      `Hi! I'd like to place a corporate gift inquiry.`,
      formData.name    ? `Name: ${formData.name}`    : '',
      formData.company ? `Company: ${formData.company}` : '',
      '',
      'Items:',
      ...items.map((i) => `• ${i.name} × ${i.quantity} = Rs. ${(i.price * i.quantity).toLocaleString('en-IN')}`),
      '',
      `Total: Rs. ${items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString('en-IN')}`,
    ].filter((l) => l !== undefined).join('\n');

    return encodeURIComponent(lines);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1400] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        data-lenis-prevent
        className="relative bg-bg-card w-full max-w-lg rounded-sm shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-1.5 text-muted hover:text-text transition-colors"
        >
          <X size={18} />
        </button>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center p-16 gap-5"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="text-accent" size={28} />
              </div>
              <div>
                <h3 className="font-display text-heading-sm text-text mb-2">
                  Inquiry Sent!
                </h3>
                <p className="text-sm text-muted font-body">
                  Thank you! We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 md:p-10"
            >
              <div className="mb-8">
                <span className="text-[11px] font-medium tracking-[0.14em] uppercase font-body text-accent block mb-2">
                  Inquiry Form
                </span>
                <h2 className="font-display text-heading-md text-text">
                  Submit Your Inquiry
                </h2>
                <p className="text-sm text-muted mt-2 font-body">
                  We&apos;ll reply with a customised quote within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    rows={3}
                    placeholder="Any special requirements or customisation requests..."
                    className={cn(
                      'w-full px-4 py-3 bg-bg border border-border rounded-sm text-[16px] md:text-[14px] font-body text-text placeholder:text-light',
                      'transition-all duration-200 outline-none resize-none',
                      'focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent'
                    )}
                  />
                </div>

                {/* Cart summary */}
                {items.length > 0 && (
                  <div className="bg-bg-alt rounded-sm p-4 border border-border">
                    <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted font-body mb-2">
                      Items in Inquiry
                    </p>
                    <ul className="space-y-1">
                      {items.map((item) => (
                        <li key={item.id} className="flex justify-between text-[13px] font-body text-text">
                          <span>{item.name} × {item.quantity}</span>
                          <span className="text-accent">
                            Rs. {(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-border mt-2 pt-2 flex justify-between text-[13px] font-medium font-body">
                      <span>Estimated Total</span>
                      <span className="text-accent">
                        Rs. {items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <p className="text-[13px] text-red-500 font-body">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-accent w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending…' : 'Send Inquiry'}
                </button>

                {/* WhatsApp alternative */}
                <div className="relative flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[11px] font-body text-light uppercase tracking-[0.1em]">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${buildWaMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 border border-[#25D366] text-[#25D366] rounded-sm py-3 px-8 text-[13px] font-medium tracking-[0.06em] uppercase font-body transition-all duration-300 hover:bg-[#25D366] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send via WhatsApp
                </a>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
