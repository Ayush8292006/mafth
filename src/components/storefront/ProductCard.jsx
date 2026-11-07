import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../lib/utils';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const primaryImg = product.primaryImage || product.images?.[0];
  const secondaryImg = product.images?.[1] || primaryImg;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-mist-300 rounded-lg overflow-hidden flex flex-col hover:border-brand-600 transition-all duration-300 hover:shadow-card"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-mist-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={isHovered ? secondaryImg : primaryImg}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.discount >= 25 && (
            <span className="bg-marigold-400 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wide uppercase">
              {product.discount}% OFF
            </span>
          )}
          {product.isDealOfTheDay && (
            <span className="bg-brand-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Deal of the Day
            </span>
          )}
        </div>

        {/* Wishlist Button with Heart Pop */}
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-mist-300 flex items-center justify-center text-black hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-status-error text-status-error' : 'text-black'
            }`}
          />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-2 bottom-2 z-10 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 text-xs uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1.5 shadow-lift transition-all active:scale-[0.98] ${
              justAdded
                ? 'bg-status-success text-white'
                : 'bg-brand-700 text-white hover:bg-brand-800'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Vendor / Brand */}
          <div className="flex items-center justify-between text-[11px] text-brand-600 font-medium mb-1">
            <span className="uppercase tracking-wider truncate">{product.brand}</span>
            <div className="flex items-center gap-1 text-black font-semibold">
              <Star className="w-3 h-3 fill-marigold-500 text-marigold-500" />
              <span>{product.rating}</span>
              <span className="text-grey-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.id}`}
            className="font-medium text-xs sm:text-sm text-black line-clamp-2 leading-snug group-hover:text-brand-700 block"
          >
            {product.title}
          </Link>
          <Link
            to={`/vendor/${product.vendorId}`}
            className="mt-1 inline-flex items-center gap-1 text-[11px] text-grey-500 hover:text-brand-700"
          >
            Sold by <span className="font-semibold text-brand-700 truncate max-w-[140px]">{product.vendorName}</span>
          </Link>
        </div>

        {/* Price & Delivery */}
        <div className="mt-3 pt-2 border-t border-mist-100">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-sm sm:text-base text-black">
              {formatPrice(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-grey-400 line-through">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>

          <div className="text-[10px] text-grey-500 mt-1 flex items-center justify-between">
            <span className="text-status-success font-medium">Free Delivery</span>
            <span className="truncate text-grey-400 font-sans">{product.deliveryEstimate}</span>
          </div>

          {/* Mobile Quick Add Button */}
          <div className="sm:hidden mt-2 pt-2 border-t border-mist-100">
            <button
              onClick={handleQuickAdd}
              className={`w-full py-1.5 text-[11px] uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1 ${
                justAdded ? 'bg-status-success text-white' : 'border border-brand-700 text-brand-700'
              }`}
            >
              {justAdded ? 'Added' : '+ Add to Bag'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

