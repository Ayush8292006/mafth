import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { ArrowRight } from 'lucide-react';

export default function CategoriesOverviewPage() {
  return (
    <div className="bg-white min-h-screen py-5 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-mist-300">
          <span className="text-[11px] uppercase font-bold text-brand-600 tracking-wider">
            All 10 Marketplace Departments
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-black mt-1">
            Browse by Department
          </h1>
          <p className="text-xs text-grey-600 mt-1 max-w-xl">
            Explore authentic handloom textiles, horology, ceramics, and artisanal products organized by regional guild categories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group border border-mist-300 rounded overflow-hidden bg-mist-50 hover:border-brand-600 transition-all hover:shadow-card flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden bg-mist-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-brand-600 font-medium mb-1">
                    <span>{cat.count}+ Products</span>
                    <span className="text-black font-semibold">Artisanal Guilds</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-black group-hover:underline">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-grey-600 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-mist-200 flex items-center justify-between text-xs font-semibold text-black">
                  <span>Explore Department</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

