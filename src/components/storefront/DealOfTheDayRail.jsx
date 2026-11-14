import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Timer, ArrowRight, Flame } from 'lucide-react';
import ProductCard from './ProductCard';

export default function DealOfTheDayRail({ deals }) {
  // Live ticking countdown timer: 7 hours, 42 minutes, 19 seconds remaining
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => n.toString().padStart(2, '0');

  return (
    <section className="bg-marigold-50 border-b border-marigold-200 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rail Header with Live Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 sm:mb-6 pb-4 border-b border-mist-300">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black">
              <span className="w-2 h-2 rounded-full bg-status-error animate-ping" />
              <span>Flash Marketplace Deals</span>
              <span className="text-mist-400">|</span>
              <span className="text-grey-600 font-normal">Up to 45% Off Certified Stock</span>
            </div>
            <h2 className="font-display text-xl sm:text-3xl font-bold text-black mt-1">
              Deals of the Day
            </h2>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-black bg-white border border-mist-300 px-3 py-1.5 rounded shadow-subtle">
              <Timer className="w-4 h-4 text-black animate-pulse" />
              <span className="text-grey-600 text-[11px] uppercase mr-1">Ends in:</span>
              <span className="font-mono bg-brand-800 text-marigold-300 px-1.5 py-0.5 rounded text-xs font-bold">
                {pad(timeLeft.hours)}
              </span>
              <span className="font-bold">:</span>
              <span className="font-mono bg-brand-800 text-marigold-300 px-1.5 py-0.5 rounded text-xs font-bold">
                {pad(timeLeft.minutes)}
              </span>
              <span className="font-bold">:</span>
              <span className="font-mono bg-brand-800 text-marigold-300 px-1.5 py-0.5 rounded text-xs font-bold">
                {pad(timeLeft.seconds)}
              </span>
            </div>

            <Link
              to="/deals"
              className="text-xs font-semibold text-black underline underline-offset-4 hover:text-grey-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {deals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}

