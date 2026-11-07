import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { formatPrice } from '../../lib/utils';
import { ShieldCheck, MapPin, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getFinalTotal, getDiscountAmount, clearCart, deliveryCity, deliveryPincode } = useCartStore();
  const { addresses } = useAuthStore();

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  const finalTotal = getFinalTotal();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/order-success');
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="font-display text-2xl font-bold mb-2">No items to checkout</h2>
        <Link to="/" className="text-xs underline font-semibold">Explore Store</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <h1 className="font-display text-3xl font-bold text-black mb-8 pb-4 border-b border-mist-300">
          Secure Marketplace Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Checkout Form */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Delivery Address */}
            <div className="p-5 border border-mist-300 rounded bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-mist-200">
                <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-black" /> 1. Select Delivery Address
                </span>
                <span className="text-[11px] text-grey-500">
                  Deliver to {deliveryCity} ({deliveryPincode})
                </span>
              </div>

              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`block p-3.5 border rounded cursor-pointer transition-colors ${
                      selectedAddress === addr.id
                        ? 'border-brand-600 bg-mist-50/80 shadow-sm'
                        : 'border-mist-300 hover:border-mist-500 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="mt-1 accent-black"
                      />
                      <div className="text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-black">{addr.name}</span>
                          <span className="text-[10px] bg-mist-200 px-1.5 py-0.5 rounded font-medium">{addr.type}</span>
                        </div>
                        <p className="text-grey-600 mt-1 leading-relaxed">
                          {addr.addressLine}, {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                        <p className="text-grey-500 mt-0.5">Phone: {addr.phone}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="p-5 border border-mist-300 rounded bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-mist-200">
                <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-black" /> 2. Choose Payment Method
                </span>
                <span className="text-[11px] text-status-success font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'upi', label: 'Instant UPI / QR (GPay, PhonePe, Paytm)', desc: 'Scan QR or enter Virtual Payment Address' },
                  { id: 'card', label: 'Credit / Debit Card (Visa, MasterCard, RuPay)', desc: 'Bank instant discounts apply automatically' },
                  { id: 'cod', label: 'Cash on Delivery (COD)', desc: 'Pay with cash or UPI at the doorstep upon arrival' },
                ].map((pay) => (
                  <label
                    key={pay.id}
                    className={`block p-3.5 border rounded cursor-pointer transition-colors ${
                      paymentMethod === pay.id
                        ? 'border-brand-600 bg-mist-50/80 shadow-sm'
                        : 'border-mist-300 hover:border-mist-500 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === pay.id}
                        onChange={() => setPaymentMethod(pay.id)}
                        className="mt-1 accent-black"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-black block">{pay.label}</span>
                        <span className="text-grey-500 text-[11px] block mt-0.5">{pay.desc}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === 'upi' && (
                <div className="pt-3 border-t border-mist-200">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-black block mb-1.5">
                    Enter UPI ID (VPA)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 border border-mist-300 rounded focus:border-brand-600 focus:outline-none"
                    placeholder="mobilenumber@upi"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-brand-700 text-white text-xs uppercase tracking-wider font-bold rounded hover:bg-brand-800 transition-all flex items-center justify-center gap-2 shadow-subtle disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Confirming Order with Regional Artisans...</span>
              ) : (
                <>
                  <span>Place Order & Pay {formatPrice(finalTotal)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Right Summary Panel */}
          <div className="lg:col-span-5 sticky top-24 p-5 rounded border border-mist-300 bg-mist-50 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black pb-2 border-b border-mist-200">
              Items in this Shipment ({items.length})
            </h3>

            <div className="divide-y divide-mist-200 max-h-72 overflow-y-auto no-scrollbar">
              {items.map((it) => (
                <div key={it.itemKey} className="py-2.5 flex items-center gap-3">
                  <img src={it.image} alt={it.title} className="w-12 h-14 object-cover rounded border border-mist-300" />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-medium text-black truncate">{it.title}</p>
                    <p className="text-[11px] text-grey-500">Qty: {it.quantity} • {it.selectedSize}</p>
                    <p className="font-bold text-black mt-0.5">{formatPrice(it.price * it.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-mist-300 space-y-1.5 text-xs text-grey-700">
              <div className="flex justify-between">
                <span>Shipping & Doorstep Pickup Fee</span>
                <span className="text-status-success font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-mist-200">
                <span>Total Amount to Pay</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

