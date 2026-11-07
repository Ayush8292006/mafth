import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../lib/utils';
import ProductCard from '../../components/storefront/ProductCard';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-mist-300 flex items-end justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold text-brand-600 tracking-wider">
              Saved Pieces
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-black mt-1">
              My Wishlist ({items.length})
            </h1>
          </div>
          <Link
            to="/"
            className="text-xs font-semibold text-black underline underline-offset-4 hover:text-grey-700"
          >
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-mist-100 flex items-center justify-center text-brand-600 mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-display text-2xl font-bold text-black mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-grey-600 mb-6 leading-relaxed">
              Explore authentic linen, horological timepieces, ceramics, and handcrafted goods, and tap the heart icon to save items here.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-800 transition-colors"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

