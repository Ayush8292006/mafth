import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function CategoryProductRail({
  title,
  subtitle,
  categorySlug,
  products = [],
  viewAllLink,
  bg = "bg-white",
  count = 4,
}) {
  const displayItems = products.slice(0, count);

  return (
    <section className={`${bg} border-b border-mist-300 py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rail Header */}
        <div className="flex items-end justify-between gap-4 mb-6 pb-3 border-b border-mist-200">
          <div>
            {subtitle && (
              <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider block">
                {subtitle}
              </span>
            )}
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-black mt-0.5">
              {title}
            </h2>
          </div>

          {(viewAllLink || categorySlug) && (
            <Link
              to={viewAllLink || `/category/${categorySlug}`}
              className="text-xs font-semibold text-black underline underline-offset-4 hover:text-grey-700 flex items-center gap-1 flex-shrink-0"
            >
              <span>View Department</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}

