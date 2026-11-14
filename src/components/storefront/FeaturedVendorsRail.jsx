import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, ArrowRight, Store } from 'lucide-react';
import { vendors } from '../../data/vendors';

export default function FeaturedVendorsRail() {
  const featured = vendors.slice(0, 4);

  return (
    <section className="bg-white border-b border-mist-300 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 sm:mb-8">
          <div>
            <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider">
              Independent Guilds & Ateliers
            </span>
            <h2 className="font-display text-xl sm:text-3xl font-bold text-black mt-1">
              Featured Verified Vendors
            </h2>
            <p className="text-xs text-grey-600 mt-1 max-w-xl">
              Buy directly from the makers. Every vendor on MAFTH ships authentic handcrafted batches with guaranteed origin traceability.
            </p>
          </div>
          <Link
            to="/shops"
            className="text-xs font-semibold text-black underline underline-offset-4 hover:text-grey-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All 14 Vendors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Vendor Cards */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          {featured.map((vendor) => (
            <div
              key={vendor.id}
              className="group w-[78%] sm:w-auto flex-shrink-0 snap-start bg-mist-50 border border-mist-300 rounded-lg overflow-hidden flex flex-col justify-between hover:border-brand-600 transition-all duration-300 hover:shadow-card"
            >
              {/* Vendor Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-mist-200">
                <img
                  src={vendor.banner}
                  alt={vendor.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Vendor Avatar Logo Tile */}
                <div className="absolute bottom-2 left-3 w-11 h-11 rounded border-2 border-white overflow-hidden shadow bg-white">
                  <img
                    src={vendor.logo}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                  <Star className="w-3 h-3 fill-marigold-500 text-marigold-500" />
                  <span>{vendor.rating}</span>
                </div>
              </div>

              {/* Vendor Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-brand-600 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>{vendor.location}</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-black mt-1 line-clamp-1 group-hover:underline">
                    {vendor.name}
                  </h3>

                  <p className="text-xs text-grey-600 mt-1 line-clamp-2 leading-relaxed">
                    {vendor.description}
                  </p>
                </div>

                {/* Metrics & Link */}
                <div className="mt-4 pt-3 border-t border-mist-200 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-grey-500">
                    <strong className="text-black font-semibold">{vendor.metrics.productsCount}</strong> products
                  </div>
                  <Link
                    to={`/vendor/${vendor.slug}`}
                    className="font-semibold text-black hover:underline flex items-center gap-1 text-xs"
                  >
                    <span>Visit Store</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

