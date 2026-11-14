import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BadgePercent, Store, CreditCard, Truck, Gift, Copy, Check, ArrowRight } from 'lucide-react';
import { useUiStore } from '../../store/useUiStore';

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const OFFERS = [
  {
    tab: 'New Launch',
    icon: Sparkles,
    eyebrow: 'Just launched',
    title: 'Automatic watches by Kronos Horology',
    text: 'Limited first batch — only 500 pieces, made in Hyderabad.',
    image: img('1522335789203-aabd1fc54bc9'),
    cta: 'Shop the launch',
    to: '/category/watches-accessories',
  },
  {
    tab: 'Top Brands',
    icon: Store,
    eyebrow: 'Brand spotlight',
    title: 'Rawat Heritage Weaves',
    text: 'Block-printed linen from Jaipur. Up to 40% off this week.',
    image: img('1617137984095-74e4e5e3613f'),
    cta: 'Visit the shop',
    to: '/vendor/rawat-heritage',
  },
  {
    tab: 'Mega Offer',
    icon: BadgePercent,
    eyebrow: 'Opening sale',
    title: 'Flat 10% off your first order',
    text: 'On top of sale prices, across all 10 departments.',
    image: img('1490481651871-ab68de25d43d'),
    code: 'MAFTH10',
    cta: 'Shop deals',
    to: '/deals',
  },
  {
    tab: 'Bank Deals',
    icon: CreditCard,
    eyebrow: 'Bank offer',
    title: '₹500 off on orders above ₹4,999',
    text: 'Use code at checkout. Valid on all cards and UPI.',
    image: img('1505740420928-5e560c06d30e'),
    code: 'FESTIVE500',
    cta: 'Start shopping',
    to: '/',
  },
  {
    tab: 'Free Delivery',
    icon: Truck,
    eyebrow: 'Every order',
    title: 'Free delivery from every seller',
    text: 'Mix products from many shops — still no delivery fee.',
    image: img('1549298916-b41d501d3772'),
    cta: 'Browse shops',
    to: '/shops',
  },
  {
    tab: 'Gift Store',
    icon: Gift,
    eyebrow: 'Festive gifting',
    title: 'Gifts under ₹1,999',
    text: 'Handpicked gifts for family and friends, gift-wrapped free.',
    image: img('1618221195710-dd6b41faaea6'),
    cta: 'Find a gift',
    to: '/category/home-kitchen',
  },
];


export default function OffersPopup() {
  const { offersOpen, closeOffers } = useUiStore();
  // Opens only when the shopper taps an Offers button (no auto pop-up)
  const [idx, setIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // Auto-rotate offers every 3 seconds
  useEffect(() => {
    if (!offersOpen) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % OFFERS.length), 3000);
    return () => clearTimeout(t);
  }, [idx, offersOpen]);

  useEffect(() => setCopied(false), [idx]);

  const o = OFFERS[idx];

  return (
    <AnimatePresence>
      {offersOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm" onClick={closeOffers} />
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
          >
            <button
              onClick={closeOffers}
              aria-label="Close offers"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Tabs */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-4 pt-4 pb-3 bg-brand-900 pr-14">
              {OFFERS.map((x, i) => (
                <button
                  key={x.tab}
                  onClick={() => setIdx(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                    i === idx ? 'bg-marigold-400 text-black' : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  <x.icon className="w-3.5 h-3.5" /> {x.tab}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={o.tab + '-img'}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="relative h-40 sm:h-auto bg-brand-800"
                >
                  <img src={o.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute left-4 top-4 chip bg-marigold-400 text-black uppercase tracking-wider">{o.eyebrow}</span>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={o.tab + '-txt'}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 sm:p-8 flex flex-col justify-center"
                >
                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-black leading-tight">{o.title}</h3>
                  <p className="text-sm text-grey-500 mt-2">{o.text}</p>
                  {o.code && (
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(o.code);
                        setCopied(true);
                      }}
                      className="mt-4 self-start flex items-center gap-2 border-2 border-dashed border-marigold-500 bg-marigold-50 rounded-lg px-4 py-2 font-mono font-bold text-marigold-700"
                    >
                      {o.code} {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                  <Link to={o.to} onClick={closeOffers} className="btn-primary !rounded-full mt-6 self-start">
                    {o.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <div className="flex gap-1 mt-6">
                    {OFFERS.map((_, i) => (
                      <span key={i} className={`h-1 rounded-full transition-all ${i === idx ? 'w-6 bg-brand-700' : 'w-2 bg-mist-300'}`} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
