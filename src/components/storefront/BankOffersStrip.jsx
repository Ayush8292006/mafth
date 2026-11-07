import React, { useState } from 'react';
import { CreditCard, Tag, Check, ArrowRight, ShieldCheck, Percent } from 'lucide-react';

export default function BankOffersStrip() {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCoupon = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const offers = [
    {
      bank: "HDFC Bank",
      title: "10% Instant Discount",
      desc: "Up to ₹1,500 on HDFC Credit & Debit EMI on min spend of ₹5,000",
      code: "MAFTH10",
      badge: "Instant Bank Discount"
    },
    {
      bank: "ICICI Bank",
      title: "Flat ₹500 Festive Off",
      desc: "Instant savings on Orders above ₹3,999 across all artisanal crafts",
      code: "FESTIVE500",
      badge: "Festive Exclusive"
    },
    {
      bank: "Bajaj Finserv",
      title: "No-Cost EMI up to 6 Months",
      desc: "Available on luxury watches, audio gear and solid wood furniture",
      code: "NOCOSTEMI",
      badge: "0% Interest"
    }
  ];

  return (
    <section className="bg-white border-b border-mist-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-black" />
            <h3 className="text-xs uppercase font-bold tracking-wider text-black">
              Marketplace Bank Offers & Active Coupons
            </h3>
          </div>
          <span className="text-[11px] text-grey-500 hidden sm:inline">
            Discounts auto-applied at checkout
          </span>
        </div>

        {/* 3 Bank Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="p-4 rounded border border-mist-300 bg-mist-50 flex flex-col justify-between hover:border-brand-600 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-2 py-0.5 rounded-full">
                    {offer.bank}
                  </span>
                  <span className="text-[10px] text-status-success font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {offer.badge}
                  </span>
                </div>
                <h4 className="font-display text-base font-bold text-black mb-1">
                  {offer.title}
                </h4>
                <p className="text-xs text-grey-600 leading-relaxed mb-3">
                  {offer.desc}
                </p>
              </div>

              {/* Coupon Copy Pill */}
              <div className="pt-2 border-t border-mist-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-black bg-white px-2.5 py-1 border border-mist-300 rounded">
                  <Tag className="w-3 h-3 text-brand-600" />
                  <span>{offer.code}</span>
                </div>

                <button
                  onClick={() => copyCoupon(offer.code)}
                  className="text-xs font-semibold text-black hover:underline flex items-center gap-1"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-status-success" />
                      <span className="text-status-success">Copied</span>
                    </>
                  ) : (
                    <span>Copy Code</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

