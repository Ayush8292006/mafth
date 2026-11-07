import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Calendar, Award } from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import ProductCard from '../../components/storefront/ProductCard';

export default function VendorStorePage() {
  const { vendorSlug } = useParams();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVendorData() {
      setLoading(true);
      try {
        const v = await mockApi.getVendorById(vendorSlug);
        if (v) {
          setVendor(v);
          const p = await mockApi.getProducts({ vendorId: v.id, limit: 12 });
          setProducts(p.products);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadVendorData();
  }, [vendorSlug]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs uppercase font-bold text-grey-500">Loading Vendor Atelier...</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="py-20 text-center">
        <h2 className="font-display text-2xl font-bold">Vendor Not Found</h2>
        <Link to="/" className="text-xs underline font-semibold mt-2 inline-block">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Vendor Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full bg-brand-700 overflow-hidden border-b border-mist-300">
        <img
          src={vendor.banner}
          alt={vendor.name}
          className="w-full h-full object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        
        <div className="absolute bottom-6 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded border-2 border-white object-cover bg-white shadow-lift"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold">{vendor.name}</h1>
                  <ShieldCheck className="w-5 h-5 text-status-success fill-status-success/20" />
                </div>
                <div className="flex items-center gap-3 text-xs text-mist-300 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {vendor.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Member since {vendor.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded border border-white/20 text-xs">
              <div className="flex items-center gap-1 text-white font-bold">
                <Star className="w-4 h-4 fill-marigold-500 text-marigold-500" />
                <span>{vendor.rating}</span>
                <span className="text-grey-300 font-normal">({vendor.reviewsCount})</span>
              </div>
              <span className="text-white/40">|</span>
              <div>
                <span className="font-bold text-white">{vendor.metrics.fulfillmentRate}</span>
                <span className="text-grey-300 ml-1">Fulfillment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Bio and Catalogue */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-6 bg-mist-50 border border-mist-300 rounded mb-10 max-w-3xl">
          <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider block mb-1">
            Guild Statement & Craft Heritage
          </span>
          <p className="text-xs sm:text-sm text-grey-700 leading-relaxed font-light">
            {vendor.description}
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between pb-3 border-b border-mist-300">
          <h2 className="font-display text-2xl font-bold text-black">
            Artisanal Batches by {vendor.name} ({products.length})
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

