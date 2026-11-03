import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Grid, LayoutGrid, Check, RotateCcw } from 'lucide-react';
import ProductCard from '../../components/storefront/ProductCard';
import { mockApi } from '../../lib/mockApi';
import { categories } from '../../data/categories';
import { vendors } from '../../data/vendors';
import { formatPrice } from '../../lib/utils';

export default function ListingPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const filterParam = searchParams.get('filter') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters state
  const [sortBy, setSortBy] = useState('featured');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedMinRating, setSelectedMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const currentCategory = categories.find((c) => c.slug === slug);
  const pageTitle = currentCategory
    ? currentCategory.name
    : searchQuery
    ? `Search results for "${searchQuery}"`
    : filterParam === 'top-picks'
    ? 'Top Curated Picks'
    : 'All Marketplace Products';

  useEffect(() => {
    async function fetchCatalogue() {
      setLoading(true);
      try {
        const res = await mockApi.getProducts({
          category: slug || 'all',
          search: searchQuery,
          sortBy,
          vendorId: selectedVendor || undefined,
          minRating: selectedMinRating || undefined,
          priceRange: [0, maxPrice],
          limit: 36,
        });
        setProducts(res.products);
        setTotalCount(res.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCatalogue();
  }, [slug, searchQuery, sortBy, selectedVendor, selectedMinRating, maxPrice]);

  const resetFilters = () => {
    setSelectedVendor('');
    setSelectedMinRating(0);
    setMaxPrice(30000);
    setSortBy('featured');
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6 pb-4 border-b border-beige-300">
          <nav className="text-[11px] text-grey-500 mb-2 flex items-center gap-1.5">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>/</span>
            {currentCategory ? (
              <span className="text-black font-medium">{currentCategory.name}</span>
            ) : (
              <span className="text-black font-medium">Catalogue</span>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-black">
                {pageTitle}
              </h1>
              <p className="text-xs text-grey-600 mt-1">
                Showing {products.length} of {totalCount} authentic artisanal items
              </p>
            </div>

            {/* Sort & Mobile Filter Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="md:hidden flex items-center gap-1.5 px-3 py-2 border border-beige-300 rounded text-xs font-semibold"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-2 border border-beige-300 rounded px-3 py-1.5 bg-beige-50">
                <span className="text-[11px] text-grey-500 uppercase font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-black focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Left Filter Sidebar (Desktop) */}
          <aside className={`md:block col-span-1 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
            <div className="sticky top-24 space-y-6 p-4 rounded border border-beige-300 bg-beige-50/60">
              
              <div className="flex items-center justify-between pb-3 border-b border-beige-200">
                <span className="text-xs uppercase font-bold tracking-wider text-black flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filter Catalogue
                </span>
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-grey-500 hover:text-black flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Price Filter Slider */}
              <div>
                <label className="text-xs font-bold text-black uppercase tracking-wider block mb-2">
                  Max Price: {formatPrice(maxPrice)}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="35000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-grey-500 mt-1">
                  <span>₹1,000</span>
                  <span>₹35,000+</span>
                </div>
              </div>

              {/* Vendor Filter */}
              <div>
                <label className="text-xs font-bold text-black uppercase tracking-wider block mb-2">
                  Independent Vendors
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar text-xs">
                  <button
                    onClick={() => setSelectedVendor('')}
                    className={`w-full text-left px-2 py-1 rounded flex items-center justify-between ${
                      selectedVendor === '' ? 'bg-black text-white font-medium' : 'hover:bg-beige-200 text-grey-700'
                    }`}
                  >
                    <span>All Vendors</span>
                  </button>
                  {vendors.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVendor(v.id)}
                      className={`w-full text-left px-2 py-1 rounded flex items-center justify-between truncate ${
                        selectedVendor === v.id ? 'bg-black text-white font-medium' : 'hover:bg-beige-200 text-grey-700'
                      }`}
                    >
                      <span className="truncate">{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Rating Filter */}
              <div>
                <label className="text-xs font-bold text-black uppercase tracking-wider block mb-2">
                  Minimum Rating
                </label>
                <div className="space-y-1 text-xs">
                  {[4.8, 4.5, 4.0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedMinRating(selectedMinRating === rating ? 0 : rating)}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between ${
                        selectedMinRating === rating ? 'bg-black text-white font-semibold' : 'hover:bg-beige-200 text-grey-700'
                      }`}
                    >
                      <span>★ {rating} & above</span>
                      {selectedMinRating === rating && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="col-span-1 md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="border border-beige-300 rounded p-4 space-y-3">
                    <div className="aspect-[3/4] rounded shimmer" />
                    <div className="h-4 bg-beige-200 rounded w-2/3" />
                    <div className="h-4 bg-beige-200 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center bg-beige-50 rounded border border-beige-300 p-8">
                <h3 className="font-serif text-xl font-bold text-black mb-1">No products match your criteria</h3>
                <p className="text-xs text-grey-600 mb-4">Try relaxing your price filters or selecting a different vendor.</p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 bg-black text-white text-xs uppercase font-semibold rounded hover:bg-black/90"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

