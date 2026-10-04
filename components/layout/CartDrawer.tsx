'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import InquiryModal from '@/components/shared/InquiryModal';
import { displayName, formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const {
    isOpen, isModalOpen,
    closeCart, openModal, closeModal,
    items, removeItem, updateQuantity,
    totalItems, totalPrice,
  } = useCartStore();

  const count = totalItems();
  const total = totalPrice();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-bg-dark/40 backdrop-blur-sm z-[1100]"
              onClick={closeCart}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-[1200] w-full md:w-[440px] bg-bg-card flex flex-col shadow-[-4px_0_40px_rgba(27,25,22,0.12)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-border flex-shrink-0">
                <div>
                  <h2 className="font-display text-2xl text-text">Your Inquiry</h2>
                  {count > 0 && (
                    <p className="text-sm text-muted font-body mt-0.5">
                      {count} {count === 1 ? 'item' : 'items'} added
                    </p>
                  )}
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 text-muted hover:text-text transition-colors rounded-sm hover:bg-bg-alt"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto" data-lenis-prevent>
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
                    <ShoppingBag size={48} className="text-text opacity-20" strokeWidth={1} />
                    <div>
                      <p className="font-display text-xl text-text mb-1">No items yet</p>
                      <p className="text-sm text-muted font-body">
                        Browse our products and add to inquiry
                      </p>
                    </div>
                  </div>
                ) : (
                  <ul className="divide-y divide-border">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4 p-6">
                        {/* Image */}
                        <div className="relative w-[72px] h-[72px] rounded-sm overflow-hidden bg-bg-alt flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="72px"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-accent font-body mb-0.5">
                            {item.category}
                          </p>
                          <p className="font-display text-[17px] text-text leading-tight line-clamp-2">
                            {displayName(item.name)}
                          </p>
                          <p className="font-display text-accent text-[15px] mt-1">
                            Rs. {(item.price * item.quantity).toLocaleString('en-IN')}
                          </p>

                          {/* Controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-2 border border-border rounded-sm">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-muted hover:text-text hover:bg-bg-alt transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center text-[13px] font-body font-medium text-text">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-muted hover:text-text hover:bg-bg-alt transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto p-1.5 text-muted hover:text-text transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border p-8 flex-shrink-0">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[13px] font-body text-muted uppercase tracking-[0.08em]">
                      Estimated Total
                    </span>
                    <span className="font-display text-xl text-accent">
                      Rs. {total.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted font-body mb-4 text-center">
                    Prices are starting estimates. Final quote on confirmation.
                  </p>
                  <button
                    onClick={openModal}
                    className="btn-accent w-full py-4 text-[13px]"
                  >
                    Submit Inquiry
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <InquiryModal isOpen={isModalOpen} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}
