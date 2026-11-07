import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  User, 
  ChevronDown, 
  HelpCircle, 
  Store, 
  ShieldCheck, 
  X,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import Logo from '../ui/Logo';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore, ROLES, ROLE_LABELS, ROLE_HOME } from '../../store/useAuthStore';
import { categories } from '../../data/categories';
import { mockApi } from '../../lib/mockApi';
import { formatPrice } from '../../lib/utils';

export default function Header() {
  const navigate = useNavigate();
  const { getTotalCount, openDrawer, deliveryPincode, deliveryCity, setPincode } = useCartStore();
  const { getCount: getWishlistCount } = useWishlistStore();
  const { currentRole, user: customer, isAuthenticated, staff, logout } = useAuthStore();
  const user = staff ? { ...customer, name: staff.name, email: staff.email, loyaltyTier: ROLE_LABELS[currentRole] } : customer;
  const isStaff = isAuthenticated && currentRole !== ROLES.USER;
  const dashboardPath = ROLE_HOME[currentRole] || '/';

  const cartCount = getTotalCount();
  const wishlistCount = getWishlistCount();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [tempPincode, setTempPincode] = useState(deliveryPincode);
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchRef = useRef(null);
  const megaMenuRef = useRef(null);

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setActiveMegaCategory(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autosuggest lookup
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      mockApi.searchAutosuggest(searchQuery).then((res) => {
        setSuggestions(res);
        setIsSearchOpen(true);
      });
    } else {
      setSuggestions([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim() && selectedCategory === 'all') return;
    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&cat=${selectedCategory}`);
  };

  const handlePincodeSave = (e) => {
    e.preventDefault();
    if (tempPincode.trim().length === 6) {
      const cities = {
        '110001': 'New Delhi',
        '400001': 'Mumbai',
        '560038': 'Bengaluru',
        '600001': 'Chennai',
        '700001': 'Kolkata',
        '500001': 'Hyderabad',
      };
      setPincode(tempPincode, cities[tempPincode] || 'Metro Zone');
      setIsLocationModalOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-mist-300 transition-all duration-300 ${isScrolled ? 'shadow-card' : ''}`}>
      {/* 1. TOP UTILITY BAR */}
      <div className={`bg-brand-800 text-[11px] text-white/80 transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 py-0' : 'max-h-10 opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
          
          {/* Location Delivery Selector */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none"
            >
              <MapPin className="w-3.5 h-3.5 text-marigold-400" />
              <span>Deliver to:</span>
              <strong className="text-white font-semibold underline decoration-marigold-400 underline-offset-2">
                {deliveryCity} {deliveryPincode}
              </strong>
            </button>
            <span className="hidden sm:inline-block text-white/30">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-white/80">
              <ShieldCheck className="w-3 h-3 text-marigold-400" />
              Verified vendors across 10 departments
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/partner-with-us"
              className="flex items-center gap-1 text-marigold-300 hover:text-marigold-200 font-semibold transition-colors"
            >
              <Store className="w-3 h-3" />
              <span>Sell on MAFTH</span>
            </Link>

            <span className="text-white/30 hidden md:inline">|</span>

            <Link
              to="/help"
              className="items-center gap-1 hover:text-white transition-colors hidden md:flex"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Help Centre</span>
            </Link>

            <span className="text-white/30 hidden md:inline">|</span>

            {isStaff ? (
              <Link
                to={dashboardPath}
                className="flex items-center gap-1 bg-white/10 hover:bg-white/20 rounded-full px-2.5 py-0.5 font-semibold text-white transition-colors"
              >
                <LayoutDashboard className="w-3 h-3" />
                <span>{ROLE_LABELS[currentRole]} Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1 hover:text-white font-medium transition-colors"
              >
                <Sparkles className="w-3 h-3 text-marigold-400" />
                <span>Login / Staff Portal</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-6 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-2.5' : 'py-3 sm:py-3.5'}`}>
        
        {/* Brand logo */}
        <div className="flex items-center gap-3">
          <Logo size="md" />
          <div className="hidden sm:block">
            <span className="block font-display text-lg font-extrabold tracking-tight text-brand-700 leading-none">
              MAFTH
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-brand-600 font-medium">
              Multi-Vendor Marketplace
            </span>
          </div>
        </div>

        {/* Large Smart Search Bar */}
        <div ref={searchRef} className="flex-1 max-w-2xl relative">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border-2 border-brand-700 rounded-full overflow-hidden transition-colors bg-white focus-within:ring-4 focus-within:ring-brand-100"
          >
            {/* Category Filter dropdown */}
            <div className="hidden md:flex items-center pl-3 pr-2 border-r border-mist-300 text-xs text-grey-700 bg-mist-100 h-10">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter search by category"
                className="bg-transparent pr-4 focus:outline-none cursor-pointer font-medium text-xs text-black"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="flex-1 flex items-center px-3">
              <Search className="w-4 h-4 text-grey-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search products or shops across 10 departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setIsSearchOpen(true);
                }}
                className="w-full text-xs sm:text-sm bg-transparent py-2 focus:outline-none placeholder:text-grey-400 text-black"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                  className="p-1 text-grey-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Action Button */}
            <button
              type="submit"
              aria-label="Search catalogue"
              className="px-4 sm:px-6 h-10 bg-marigold-400 text-black hover:bg-marigold-300 transition-colors flex items-center justify-center text-xs font-bold uppercase tracking-wider"
            >
              <Search className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          {/* Autosuggest and Recent Searches Dropdown */}
          {isSearchOpen && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-mist-300 rounded shadow-lift z-50 overflow-hidden">
              <div className="p-2 border-b border-mist-200 bg-mist-50 text-[11px] font-semibold text-grey-600 uppercase tracking-wider flex justify-between">
                <span>Matching Catalogue Items</span>
                <span>Press Enter to view all</span>
              </div>
              <div className="divide-y divide-mist-100 max-h-80 overflow-y-auto">
                {suggestions.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-3 p-2.5 hover:bg-mist-50 transition-colors group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded border border-mist-300 bg-mist-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-black group-hover:underline truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-grey-500 flex items-center gap-2">
                        <span>{item.brand}</span>
                        <span>•</span>
                        <span className="font-semibold text-black">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-grey-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Icons: Account, Wishlist, Cart */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Account Menu */}
          <div className="relative">
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded hover:bg-mist-100 transition-colors text-black"
            >
              <User className="w-5 h-5 text-black" />
              <div className="hidden xl:block text-left text-xs leading-tight">
                <span className="text-[10px] text-grey-500 block">Hello,</span>
                <span className="font-semibold text-black truncate max-w-[80px] block">{user.name.split(' ')[0]}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-grey-500 hidden sm:block" />
            </button>

            {/* Account Popover */}
            {isAccountMenuOpen && (
              <div
                onMouseLeave={() => setIsAccountMenuOpen(false)}
                className="absolute right-0 mt-2 w-56 bg-white border border-mist-300 rounded shadow-lift p-2 z-50 text-xs"
              >
                <div className="p-2 border-b border-mist-200">
                  <p className="font-semibold text-black">{user.name}</p>
                  <p className="text-[11px] text-grey-500 truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[10px] bg-marigold-100 text-marigold-700 px-1.5 py-0.5 rounded font-semibold">
                    {user.loyaltyTier}
                  </span>
                </div>
                <div className="py-1 space-y-0.5">
                  <Link
                    to="/profile"
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="block px-2.5 py-1.5 rounded hover:bg-mist-100 text-black"
                  >
                    My Orders & Timeline
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="block px-2.5 py-1.5 rounded hover:bg-mist-100 text-black"
                  >
                    Saved Items ({wishlistCount})
                  </Link>
                  <Link
                    to="/partner-with-us"
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="block px-2.5 py-1.5 rounded hover:bg-mist-100 text-black font-medium"
                  >
                    Become a Vendor Partner
                  </Link>
                  <Link
                    to={isStaff ? dashboardPath : '/login'}
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="block px-2.5 py-1.5 rounded hover:bg-brand-50 text-brand-700 font-semibold"
                  >
                    {isStaff ? `${ROLE_LABELS[currentRole]} Dashboard` : 'Login / Switch Account'}
                  </Link>
                  {isAuthenticated && (
                    <button
                      onClick={() => {
                        logout();
                        setIsAccountMenuOpen(false);
                      }}
                      className="block w-full text-left px-2.5 py-1.5 rounded hover:bg-mist-100 text-grey-600"
                    >
                      Log out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <Link
            to="/wishlist"
            className="relative p-2 rounded hover:bg-mist-100 transition-colors text-black"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Bag with Drawer Trigger */}
          <button
            onClick={openDrawer}
            className="relative flex items-center gap-2 p-2 sm:px-3.5 sm:py-2 bg-brand-700 text-white rounded-full hover:bg-brand-800 transition-colors"
            aria-label="Shopping Cart Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold hidden md:inline">Bag</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 bg-marigold-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. CATEGORY MEGA-MENU STRIP (Desktop) */}
      <nav ref={megaMenuRef} className="hidden md:block bg-white border-t border-mist-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between text-xs font-medium text-grey-700 py-2.5 overflow-x-auto no-scrollbar">
            <li className="flex-shrink-0" onMouseEnter={() => setActiveMegaCategory(null)}>
              <Link
                to="/shops"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-700 text-white font-semibold hover:bg-brand-800"
              >
                <Store className="w-3.5 h-3.5" /> All Shops
              </Link>
            </li>
            {categories.map((cat) => (
              <li
                key={cat.id}
                onMouseEnter={() => setActiveMegaCategory(cat)}
                className="relative flex-shrink-0"
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className={`hover:text-brand-700 transition-colors px-2.5 py-1 flex items-center gap-1 ${
                    activeMegaCategory?.id === cat.id ? 'text-brand-700 font-semibold bg-brand-50 rounded-full' : ''
                  }`}
                >
                  <span>{cat.name}</span>
                  <ChevronDown className="w-3 h-3 text-grey-400" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mega-menu Flyout */}
        {activeMegaCategory && (
          <div
            onMouseLeave={() => setActiveMegaCategory(null)}
            className="absolute top-full left-0 right-0 bg-white border-b border-mist-300 shadow-lift py-6 z-40 transition-all"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 gap-8">
              <div className="col-span-1 border-r border-mist-200 pr-6">
                <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider">
                  Featured Category
                </span>
                <h3 className="font-display text-xl font-bold text-black mt-1 mb-2">
                  {activeMegaCategory.name}
                </h3>
                <p className="text-xs text-grey-600 mb-4 leading-relaxed">
                  {activeMegaCategory.description}
                </p>
                <Link
                  to={`/category/${activeMegaCategory.slug}`}
                  onClick={() => setActiveMegaCategory(null)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-black underline underline-offset-4 hover:text-grey-700"
                >
                  <span>View All {activeMegaCategory.count} Items</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="col-span-2">
                <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider">
                  Popular Sub-Collections
                </span>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-6 mt-3 text-xs">
                  {activeMegaCategory.subcategories.map((sub, idx) => (
                    <Link
                      key={idx}
                      to={`/category/${activeMegaCategory.slug}?sub=${encodeURIComponent(sub)}`}
                      onClick={() => setActiveMegaCategory(null)}
                      className="text-grey-700 hover:text-black hover:translate-x-1 transition-transform flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-mist-300" />
                      <span>{sub}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="col-span-1">
                <div className="relative rounded overflow-hidden aspect-[4/3] group border border-mist-300">
                  <img
                    src={activeMegaCategory.image}
                    alt={activeMegaCategory.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium">
                      Curated Artisanal Drop
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Pincode Change Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded border border-mist-300 shadow-2xl max-w-sm w-full p-6 relative">
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute top-4 right-4 text-grey-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-display text-lg font-bold text-black mb-1">Choose Delivery Location</h3>
            <p className="text-xs text-grey-600 mb-4">
              Enter your Indian 6-digit postal code to see real-time vendor shipping speeds and slots.
            </p>
            <form onSubmit={handlePincodeSave} className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={tempPincode}
                onChange={(e) => setTempPincode(e.target.value)}
                placeholder="e.g. 560038"
                className="w-full text-sm font-semibold tracking-widest text-center py-2.5 border border-mist-300 rounded focus:border-brand-600 focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(false)}
                  className="flex-1 py-2 text-xs border border-mist-300 rounded hover:bg-mist-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs bg-brand-700 text-white font-semibold rounded hover:bg-brand-800"
                >
                  Update Pincode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

