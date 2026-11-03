import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import StorefrontLayout from './components/storefront/StorefrontLayout';

// Lazy loaded page components
const HomePage = lazy(() => import('./pages/store/HomePage'));
const ListingPage = lazy(() => import('./pages/store/ListingPage'));
const ProductDetailPage = lazy(() => import('./pages/store/ProductDetailPage'));
const CategoriesOverviewPage = lazy(() => import('./pages/store/CategoriesOverviewPage'));
const CartPage = lazy(() => import('./pages/store/CartPage'));
const CheckoutPage = lazy(() => import('./pages/store/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/store/OrderSuccessPage'));
const WishlistPage = lazy(() => import('./pages/store/WishlistPage'));
const ProfilePage = lazy(() => import('./pages/store/ProfilePage'));
const VendorStorePage = lazy(() => import('./pages/store/VendorStorePage'));
const HelpPage = lazy(() => import('./pages/store/HelpPage'));
const NotFoundPage = lazy(() => import('./pages/store/NotFoundPage'));

// Vendor and Admin modules
const VendorDashboard = lazy(() => import('./pages/vendor/VendorDashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// Brand loading fallback with strict pink tile logo
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white p-6">
      <div className="w-12 h-12 rounded-[6px] overflow-hidden shadow-md animate-pulse mb-3 flex-shrink-0">
        <img
          src="/logo.jpg"
          alt="MAFTH"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-beige-500">
        MAFTH Marketplace
      </span>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Customer Storefront Routes */}
        <Route element={<StorefrontLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesOverviewPage />} />
          <Route path="/category/:slug" element={<ListingPage />} />
          <Route path="/deals" element={<ListingPage />} />
          <Route path="/search" element={<ListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/vendor/:vendorSlug" element={<VendorStorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Vendor Portal */}
        <Route path="/vendor" element={<VendorDashboard />} />

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  );
}
