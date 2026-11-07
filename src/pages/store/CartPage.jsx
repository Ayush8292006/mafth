import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../lib/utils';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items,
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

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-mist-100 flex items-center justify-center text-brand-600 mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-display text-2xl font-bold text-black mb-2">Your Bag is Empty</h1>
          <p className="text-xs text-grey-600 mb-6 leading-relaxed">
            There are no items currently in your shopping bag. Explore curated handcrafted textiles, timepieces and home goods across Indian guilds.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-800 transition-colors"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-display text-3xl font-bold text-black mb-8 pb-4 border-b border-mist-300">
          Shopping Bag ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.itemKey}
                className="p-4 sm:p-5 border border-mist-300 rounded bg-white flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-24 object-cover rounded bg-mist-100 border border-mist-300 flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider">
                      {item.vendorName}
                    </span>
                    <h3 className="font-display text-base font-bold text-black mt-0.5 max-w-md">
                      {item.title}
                    </h3>
                    <p className="text-xs text-grey-600 mt-1">
                      Size: <span className="font-semibold text-black">{item.selectedSize}</span> | Color: <span className="font-semibold text-black">{item.selectedColor}</span>
                    </p>
                    <span className="text-[11px] text-status-success font-medium flex items-center gap-1 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> {item.deliveryEstimate}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-mist-200">
                  <div className="text-right">
                    <div className="font-display text-lg font-bold text-black">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    {item.mrp > item.price && (
                      <div className="text-xs text-grey-400 line-through">
                        {formatPrice(item.mrp * item.quantity)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 border border-mist-300 rounded bg-mist-50 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                        className="p-1 hover:text-black text-grey-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                        className="p-1 hover:text-black text-grey-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.itemKey)}
                      className="p-1.5 text-grey-400 hover:text-status-error transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Summary & Checkout Box */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            
            {/* Coupon Card */}
            <div className="p-4 rounded border border-mist-300 bg-mist-50">
              <span className="text-xs font-bold uppercase tracking-wider text-black block mb-2">
                Apply Promo Code
              </span>
              {appliedCoupon ? (
                <div className="p-2.5 bg-mist-100 border border-mist-300 rounded flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-status-success font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span><strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.label})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-grey-600 hover:text-status-error text-[11px] underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code (MAFTH10)"
                    className="flex-1 text-xs px-3 py-2 bg-white border border-mist-300 rounded focus:border-brand-600 focus:outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-700 text-white text-xs font-semibold rounded hover:bg-brand-800"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponFeedback && (
                <p className={`text-[11px] mt-1.5 ${couponFeedback.success ? 'text-status-success' : 'text-status-error'}`}>
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="p-5 rounded border border-mist-300 bg-mist-50/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-black pb-2 border-b border-mist-200">
                Order Price Breakdown
              </h3>

              <div className="space-y-2 text-xs text-grey-700">
                <div className="flex justify-between">
                  <span>Total Catalogue MRP</span>
                  <span>{formatPrice(totalMrp)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-status-success font-medium">
                    <span>Discount & Coupon Savings</span>
                    <span>- {formatPrice(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Nationwide Delivery</span>
                  <span className="text-status-success font-medium">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-mist-300 text-sm font-bold text-black">
                  <span>Total Amount</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/checkout"
                  className="w-full py-3.5 bg-brand-700 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-800 flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-subtle"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-[10px] text-grey-500 text-center pt-2">
                Safe & Secure 256-Bit SSL Checkout • Direct Guild Guarantee
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

