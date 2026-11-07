import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../lib/utils';

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getTotalMrp,
    getDiscountAmount,
    getFinalTotal,
    deliveryCity,
    deliveryPincode,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);

  const subtotal = getSubtotal();
  const totalMrp = getTotalMrp();
  const discount = getDiscountAmount();
  const finalTotal = getFinalTotal();
  const savings = totalMrp > finalTotal ? totalMrp - finalTotal : 0;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) setCouponCode('');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-mist-300"
            >
              {/* Header */}
              <div className="p-4 border-b border-mist-300 flex items-center justify-between bg-mist-50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-black" />
                  <h2 className="font-display text-lg font-bold text-black">Your Shopping Bag</h2>
                  <span className="text-xs bg-mist-200 text-grey-700 px-2 py-0.5 rounded-full font-medium">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-1.5 rounded-full text-grey-600 hover:text-black hover:bg-mist-200 transition-colors"
                  aria-label="Close bag drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery notice */}
              <div className="px-4 py-2.5 bg-mist-100 text-xs text-grey-700 border-b border-mist-300 flex items-center justify-between">
                <span>
                  Delivering to <strong className="text-black">{deliveryCity} ({deliveryPincode})</strong>
                </span>
                <span className="text-status-success font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Free Shipping
                </span>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 px-6">
                    <div className="w-16 h-16 rounded-full bg-mist-100 flex items-center justify-center text-brand-600 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-black mb-1">Your bag is empty</h3>
                    <p className="text-sm text-grey-600 mb-6">
                      Discover hand-crafted products, artisanal weaves and precision audio from India’s finest makers.
                    </p>
                    <button
                      onClick={closeDrawer}
                      className="px-6 py-2.5 bg-brand-700 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-800 transition-colors"
                    >
                      Explore Marketplace
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.itemKey}
                      className="flex gap-3 pb-4 border-b border-mist-200 last:border-0"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-24 object-cover rounded bg-mist-100 border border-mist-300 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] text-brand-600 uppercase tracking-wider font-medium truncate">
                            {item.vendorName}
                          </div>
                          <h4 className="text-xs font-semibold text-black line-clamp-2 leading-tight">
                            {item.title}
                          </h4>
                          <div className="text-[11px] text-grey-600 mt-1">
                            Size: <span className="font-medium text-black">{item.selectedSize}</span> | Color: <span className="font-medium text-black">{item.selectedColor}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1">
                          <div className="flex items-center gap-1.5 border border-mist-300 rounded bg-mist-50 px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                              className="p-1 hover:text-black text-grey-600"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                              className="p-1 hover:text-black text-grey-600"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-sm font-bold text-black">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                              {item.mrp > item.price && (
                                <div className="text-[10px] text-grey-400 line-through">
                                  {formatPrice(item.mrp * item.quantity)}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.itemKey)}
                              className="p-1 text-grey-400 hover:text-status-error transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Coupon and Summary footer */}
              {items.length > 0 && (
                <div className="p-4 bg-mist-50 border-t border-mist-300 space-y-3">
                  {/* Coupon section */}
                  {appliedCoupon ? (
                    <div className="p-2.5 bg-mist-100 border border-mist-300 rounded flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-status-success font-medium">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.label})</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-grey-600 hover:text-status-error text-[11px] underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon (e.g. MAFTH10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 text-xs px-3 py-2 bg-white border border-mist-300 rounded focus:border-brand-600 focus:outline-none uppercase placeholder:normal-case"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-brand-700 text-white text-xs font-semibold rounded hover:bg-brand-800 transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponFeedback && (
                    <p
                      className={`text-[11px] ${
                        couponFeedback.success ? 'text-status-success font-medium' : 'text-status-error'
                      }`}
                    >
                      {couponFeedback.message}
                    </p>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-grey-700 pt-1 border-t border-mist-200">
                    <div className="flex justify-between">
                      <span>Total MRP</span>
                      <span>{formatPrice(totalMrp)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-status-success font-medium">
                        <span>Catalogue & Coupon Savings</span>
                        <span>- {formatPrice(savings)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Convenience & Delivery</span>
                      <span className="text-status-success font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-mist-300 text-sm font-bold text-black">
                      <span>Total Payable</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <div className="pt-2">
                    <Link
                      to="/checkout"
                      onClick={closeDrawer}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-brand-700 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-800 transition-transform active:scale-[0.99] shadow-subtle"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

