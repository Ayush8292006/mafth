import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function EditorialBanner({ inverted = false }) {
  if (inverted) {
    return (
      <section className="bg-black text-white border-b border-grey-800 py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] uppercase font-bold tracking-widest text-beige-400">
                02 • THE RAWAT ARCHIVE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
                Authentic vegetable indigo. Hand-carved teakwood blocks. Centuries of Rajasthani lineage.
              </h2>
              <p className="text-xs sm:text-sm text-grey-400 font-light leading-relaxed max-w-lg pt-1">
                Every meter of fabric requires seven days of sun drying, natural river washing, and organic fermented mud resist dyeing. Woven for those who value heritage over transient fast fashion.
              </p>
              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  to="/category/mens-fashion"
                  className="px-6 py-3 bg-white text-black text-xs uppercase tracking-wider font-bold rounded hover:bg-beige-100 transition-colors"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/vendor/rawat-heritage"
                  className="px-6 py-3 border border-grey-700 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-white/10 transition-colors"
                >
                  Meet Master Weaver
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded overflow-hidden border border-grey-800">
                <img
                  src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
                  alt="Raw Khadi shirt"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/4] rounded overflow-hidden border border-grey-800 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80"
                  alt="Tailored linen detail"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-beige-50 border-b border-beige-300 py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded overflow-hidden border border-beige-300 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="Tactile stoneware ceramics"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 border border-beige-300 rounded text-xs">
                <span className="font-serif font-bold text-black block">Studio Mitti Stoneware</span>
                <span className="text-[10px] text-grey-500 uppercase tracking-wider">Hand-thrown in Pondicherry</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="text-[11px] uppercase font-bold tracking-widest text-beige-500">
              01 • EDITORIAL CURATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-black leading-tight">
              Tactile Living: Where Indian Clay Meets Modern Dining.
            </h2>
            <p className="text-xs sm:text-sm text-grey-600 font-light leading-relaxed max-w-lg pt-1">
              Elevate your home ritual with lead-free, high-fired stoneware. Speckled with natural minerals and glazed by hand, no two pieces are ever identical.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                to="/category/home-kitchen"
                className="px-6 py-3 bg-black text-white text-xs uppercase tracking-wider font-bold rounded hover:bg-black/90 transition-colors shadow-subtle flex items-center gap-2"
              >
                <span>Shop Studio Ceramics</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

