import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

export default function CategoryIconStrip() {
  return (
    <section className="bg-white border-b border-mist-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider">
            Explore Marketplace Departments
          </span>
          <Link
            to="/categories"
            className="text-xs font-semibold text-black underline underline-offset-4 hover:text-grey-700"
          >
            All 10 Departments
          </Link>
        </div>

        {/* Circular Category Strip with horizontal scroll snap */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-2">
          {categories.map((cat, idx) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group flex flex-col items-center flex-shrink-0 snap-start text-center focus:outline-none transition-transform duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${idx * 25}ms` }}
            >
              {/* Circular Tile with 1px border */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 border border-mist-300 group-hover:border-brand-600 transition-colors duration-300 bg-mist-50">
                <div className="w-full h-full rounded-full overflow-hidden bg-mist-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Label */}
              <span className="text-xs font-semibold text-black mt-2 max-w-[85px] leading-tight line-clamp-1 group-hover:underline">
                {cat.name}
              </span>
              <span className="text-[10px] text-grey-500">
                {cat.count}+ drops
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

