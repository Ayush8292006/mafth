import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  Check, 
  CreditCard,
  Store,
  ChevronRight,
  Share2
} from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { formatPrice, calculateSavings } from '../../lib/utils';
import ProductCard from '../../components/storefront/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, deliveryCity, deliveryPincode } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const item = await mockApi.getProductById(id);
        if (item) {
          setProduct(item);
          setSelectedImage(0);
          setSelectedSize(item.variants?.sizes?.[0] || 'Standard');
          setSelectedColor(item.variants?.colors?.[0] || null);

          // Fetch similar products in same category
          const similarRes = await mockApi.getProducts({ category: item.category, limit: 4 });
          setSimilar(similarRes.products.filter((p) => p.id !== item.id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs uppercase font-bold text-grey-500 tracking-wider">Loading Catalogue Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-black mb-2">Product Not Found</h2>
        <Link to="/" className="text-xs underline font-semibold">Return to Marketplace</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const savings = calculateSavings(product.mrp, product.price);

  const handleAddToCart = () => {
    addItem(product, { size: selectedSize, color: selectedColor });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, { size: selectedSize, color: selectedColor });
    navigate('/checkout');
  };

  return (
    <div className="bg-white min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-[11px] text-grey-500 mb-6 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3 h-3 text-grey-400" />
          <Link to={`/category/${product.category}`} className="hover:text-black capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-3 h-3 text-grey-400" />
          <span className="text-black font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* 2-Column Product Studio: Gallery + Buy Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 border-b border-beige-300">
          
          {/* LEFT: Image Gallery with thumbnail strip */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[550px] no-scrollbar">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === idx ? 'border-black shadow-sm' : 'border-beige-300 hover:border-beige-500'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="flex-1 relative aspect-[3/4] rounded overflow-hidden border border-beige-300 bg-beige-100 group">
              <img
                src={product.images?.[selectedImage] || product.primaryImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-beige-300 flex items-center justify-center text-black hover:bg-white shadow-sm transition-transform active:scale-95"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-black text-black' : ''}`} />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Information & Buy Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand & Vendor Badge */}
              <div className="flex items-center justify-between pb-2 border-b border-beige-200">
                <span className="text-xs uppercase font-bold text-beige-500 tracking-wider">
                  {product.brand}
                </span>
                <span className="text-[11px] text-grey-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
                  MAFTH Assured
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-black mt-3 leading-snug">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded text-xs font-bold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-grey-600">
                  {product.reviewsCount} Customer Reviews & Guild Ratings
                </span>
              </div>

              {/* Price Box */}
              <div className="mt-4 p-4 rounded bg-beige-50 border border-beige-300">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-bold text-black">
                    {formatPrice(product.price)}
                  </span>
                  {product.mrp > product.price && (
                    <>
                      <span className="text-sm text-grey-400 line-through">
                        {formatPrice(product.mrp)}
                      </span>
                      <span className="text-xs font-bold text-status-success uppercase bg-white border border-beige-300 px-2 py-0.5 rounded">
                        Save {product.discount}% ({formatPrice(savings)})
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-grey-500 mt-1">
                  Inclusive of all Indian taxes and GST. Free delivery on this order.
                </p>
              </div>

              {/* Bank Offers pill */}
              <div className="mt-4 p-3 rounded border border-beige-300 bg-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-black" />
                  <span>10% Instant Off with HDFC & ICICI Cards</span>
                </div>
                <span className="font-mono font-bold text-black bg-beige-100 px-2 py-0.5 rounded text-[11px]">
                  MAFTH10
                </span>
              </div>

              {/* Variants: Sizes */}
              {product.variants?.sizes?.length > 1 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-black">Select Size</span>
                    <span className="text-grey-500 underline cursor-pointer">Size Guide</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 text-xs font-semibold rounded border transition-colors ${
                          selectedSize === s
                            ? 'bg-black text-white border-black'
                            : 'border-beige-300 bg-beige-50 text-black hover:border-black'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variants: Colors */}
              {product.variants?.colors?.length > 0 && (
                <div className="mt-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-black block mb-2">
                    Select Colorway: <span className="text-grey-600 font-normal">{selectedColor?.name}</span>
                  </span>
                  <div className="flex items-center gap-2.5">
                    {product.variants.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        title={c.name}
                        className={`w-7 h-7 rounded-full border-2 p-0.5 transition-all ${
                          selectedColor?.name === c.name ? 'border-black scale-110' : 'border-beige-300'
                        }`}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pincode Check */}
              <div className="mt-6 pt-4 border-t border-beige-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-grey-600">Delivering to:</span>
                  <span className="font-bold text-black flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-beige-500" />
                    {deliveryCity} ({deliveryPincode})
                  </span>
                </div>
                <div className="text-xs text-status-success font-medium flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  <span>{product.deliveryEstimate} • Free Shipping & Cash on Delivery Available</span>
                </div>
              </div>
            </div>

            {/* Desktop CTA Action Buttons */}
            <div className="mt-8 space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`py-3.5 text-xs uppercase tracking-wider font-bold rounded flex items-center justify-center gap-2 border transition-all ${
                    addedFeedback
                      ? 'bg-status-success text-white border-status-success'
                      : 'border-black text-black hover:bg-beige-100'
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 bg-black text-white text-xs uppercase tracking-wider font-bold rounded hover:bg-black/90 transition-all shadow-subtle"
                >
                  Buy Now
                </button>
              </div>

              {/* Sold by Vendor card */}
              <div className="p-3 bg-beige-50 border border-beige-300 rounded flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-grey-500 block">Sold & Shipped directly by:</span>
                  <Link to={`/vendor/${product.vendorId}`} className="font-bold text-black hover:underline">
                    {product.vendorName}
                  </Link>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-grey-500 block">Dispatch SLA</span>
                  <span className="text-xs font-semibold text-black">Within 24 Hours</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Specifications & Guild Authenticity Table */}
        <div className="py-12 border-b border-beige-300 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-black mb-4">
              Materials & Master Guild Specifications
            </h3>
            <div className="border border-beige-300 rounded divide-y divide-beige-200 text-xs">
              {Object.entries(product.specs || {}).map(([key, val]) => (
                <div key={key} className="flex p-3 bg-white">
                  <span className="w-1/3 font-semibold text-grey-700">{key}</span>
                  <span className="w-2/3 text-black">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold text-black mb-4">
              About the Craft & Provenance
            </h3>
            <p className="text-xs text-grey-600 leading-relaxed mb-4">
              {product.description}
            </p>
            <div className="p-4 bg-beige-50 border border-beige-300 rounded space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-black">
                <ShieldCheck className="w-4 h-4 text-status-success" />
                <span>MAFTH Authentic Guild Verification</span>
              </div>
              <p className="text-[11px] text-grey-600">
                All textile compositions, metal purity (92.5 Sterling / Brass / 316L Stainless Steel), and leather grain certifications are audited prior to dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Items Rail */}
        {similar.length > 0 && (
          <div className="py-12">
            <h3 className="font-serif text-2xl font-bold text-black mb-6">
              Similar Handcrafted Items
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {similar.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Sticky Add to Bag / Buy Now Bar */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-beige-300 p-3 flex items-center justify-between gap-3 shadow-lift">
        <div>
          <span className="text-[10px] text-grey-500 uppercase block">Total Price</span>
          <span className="text-base font-bold text-black">{formatPrice(product.price)}</span>
        </div>
        <div className="flex gap-2 flex-1 justify-end">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2.5 text-xs uppercase font-bold rounded border border-black text-black"
          >
            {addedFeedback ? 'Added' : 'Add to Bag'}
          </button>
          <button
            onClick={handleBuyNow}
            className="px-5 py-2.5 text-xs uppercase font-bold rounded bg-black text-white shadow-sm"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

