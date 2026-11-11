import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { products } from '../../data/products';

/** Auto-scrolling (right → left) department strip. Pauses on hover/touch. */
export default function CategoryIconStrip() {
  const maxOff = useMemo(() => {
    const m = {};
    products.forEach((p) => (m[p.category] = Math.max(m[p.category] || 0, p.discount || 0)));
    return m;
  }, []);

  const loop = [...categories, ...categories];

  return (
    <section className="bg-white border-b border-mist-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] uppercase font-bold text-brand-600 tracking-wider">Shop by Department</span>
          <Link to="/categories" className="text-xs font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800">
            All 10 Departments
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden group/strip">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex w-max animate-marquee group-hover/strip:[animation-play-state:paused] active:[animation-play-state:paused] py-2">
          {loop.map((cat, idx) => (
            <Link
              key={`${cat.id}-${idx}`}
              to={`/category/${cat.slug}`}
              aria-hidden={idx >= categories.length}
              tabIndex={idx >= categories.length ? -1 : 0}
              className="group flex flex-col items-center flex-shrink-0 w-24 sm:w-28 mr-5 sm:mr-8 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 border-mist-200 group-hover:border-brand-600 transition-colors duration-300 bg-white">
                <div className="w-full h-full rounded-full overflow-hidden bg-mist-100">
                  <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                {maxOff[cat.slug] >= 10 && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-marigold-400 text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm">
                    UPTO {maxOff[cat.slug]}% OFF
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-black mt-3 leading-tight min-h-[2rem] group-hover:text-brand-700">{cat.name}</span>
              <span className="text-[10px] text-grey-500">{cat.count}+ products</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
