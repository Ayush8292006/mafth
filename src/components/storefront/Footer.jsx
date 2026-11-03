import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RotateCcw, Truck, Lock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Logo from '../ui/Logo';
import { categories } from '../../data/categories';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-grey-800">
      
      {/* 1. TRUST BADGES STRIP */}
      <div className="border-b border-grey-800 bg-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded border border-grey-800 bg-white/5 flex items-center justify-center text-beige-300 flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-beige-300" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                  100% Verified Sellers
                </h4>
                <p className="text-[11px] text-grey-400 mt-0.5 leading-snug">
                  Every vendor undergoes strict KYC, GST check & workshop audits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded border border-grey-800 bg-white/5 flex items-center justify-center text-beige-300 flex-shrink-0">
                <RotateCcw className="w-5 h-5 text-beige-300" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                  7-Day Doorstep Returns
                </h4>
                <p className="text-[11px] text-grey-400 mt-0.5 leading-snug">
                  No questions asked hassle-free reverse pickup from your pincode.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded border border-grey-800 bg-white/5 flex items-center justify-center text-beige-300 flex-shrink-0">
                <Lock className="w-5 h-5 text-beige-300" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                  Encrypted UPI & Payments
                </h4>
                <p className="text-[11px] text-grey-400 mt-0.5 leading-snug">
                  256-bit PCI-DSS banking gateway supporting UPI, Cards & EMI.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded border border-grey-800 bg-white/5 flex items-center justify-center text-beige-300 flex-shrink-0">
                <Truck className="w-5 h-5 text-beige-300" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                  Express Surface Logistics
                </h4>
                <p className="text-[11px] text-grey-400 mt-0.5 leading-snug">
                  Direct dispatch from artisan hubs across 19,000+ Indian postal codes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. NEWSLETTER & EDITORIAL SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-grey-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase font-bold text-beige-400 tracking-widest block mb-1">
              THE MAFTH JOURNAL & CURATED DROPS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              Direct access to limited artisan editions, weaver spotlights, and secret marketplace sales.
            </h3>
          </div>
          <div className="lg:col-span-5">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-grey-700 px-4 py-3 rounded text-xs text-white placeholder:text-grey-500 focus:outline-none focus:border-beige-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black text-xs uppercase tracking-wider font-bold rounded hover:bg-beige-100 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-[10px] text-grey-500 mt-2">
              By subscribing, you agree to MAFTH Privacy Policy. No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* 3. MAIN DIRECTORY LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand & Manifesto Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {/* Pink logo tile sits naturally on dark background as per brand spec */}
              <Logo size="lg" />
              <div>
                <span className="font-serif text-lg font-bold tracking-wider block text-white">MAFTH</span>
                <span className="text-[10px] uppercase tracking-widest text-beige-400 block">The Curated Indian Marketplace</span>
              </div>
            </div>
            <p className="text-xs text-grey-400 max-w-sm leading-relaxed">
              MAFTH bridges master regional craft guilds and independent Indian designers with discerning patrons across India. Founded on radical transparency, authentic provenance, and prompt vendor payouts.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-[11px] text-beige-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success" /> Made in India Marketplace
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-beige-300 mb-4">
              Catalogue
            </h4>
            <ul className="space-y-2 text-xs text-grey-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace Vendors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-beige-300 mb-4">
              Vendors & Sell
            </h4>
            <ul className="space-y-2 text-xs text-grey-400">
              <li>
                <Link to="/vendor" className="hover:text-white flex items-center gap-1">
                  <span>Seller Registration</span>
                  <ArrowUpRight className="w-3 h-3 text-grey-500" />
                </Link>
              </li>
              <li>
                <Link to="/vendor/kyc" className="hover:text-white transition-colors">
                  KYC & GST Guidelines
                </Link>
              </li>
              <li>
                <Link to="/vendor/payouts" className="hover:text-white transition-colors">
                  Commission Structure
                </Link>
              </li>
              <li>
                <Link to="/vendor/orders" className="hover:text-white transition-colors">
                  Dispatch & Logistics SLA
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors text-beige-400 font-medium">
                  Admin & RBAC Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-beige-300 mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-grey-400">
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Returns & Replacements
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Bank Offer Terms
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Authenticity Guarantee
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Grievance Officer (India)
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 4. LEGAL & PAYMENT BADGES BOTTOM STRIP */}
      <div className="border-t border-grey-800 bg-black/90 text-[11px] text-grey-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} MAFTH Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-grey-400">Supported Payments:</span>
            <span className="border border-grey-800 px-2 py-0.5 rounded text-white font-mono text-[10px]">UPI / QR</span>
            <span className="border border-grey-800 px-2 py-0.5 rounded text-white font-mono text-[10px]">RuPay</span>
            <span className="border border-grey-800 px-2 py-0.5 rounded text-white font-mono text-[10px]">Visa / MC</span>
            <span className="border border-grey-800 px-2 py-0.5 rounded text-white font-mono text-[10px]">NetBanking</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

