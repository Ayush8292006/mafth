import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCog,
  KeyRound,
  Layers,
  Settings,
  History,
  ShoppingCart,
  PackageCheck,
  Users,
  LifeBuoy,
  FileClock,
  Store,
  Wallet,
  Package,
  Truck,
  Palette,
} from 'lucide-react';
import StorefrontLayout from './components/storefront/StorefrontLayout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import RequireRole from './components/auth/RequireRole';
import { ROLES, useAuthStore } from './store/useAuthStore';
import { usePlatformStore } from './store/usePlatformStore';

// Storefront (User role)
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
const PartnerWithUsPage = lazy(() => import('./pages/store/PartnerWithUsPage'));
const ShopsPage = lazy(() => import('./pages/store/ShopsPage'));
const NotFoundPage = lazy(() => import('./pages/store/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));

// Super Admin
const SuperAdminOverview = lazy(() => import('./pages/super-admin/SuperAdminOverview'));
const TeamPage = lazy(() => import('./pages/super-admin/TeamPage'));
const RolesPage = lazy(() => import('./pages/super-admin/RolesPage'));
const DepartmentsPage = lazy(() => import('./pages/super-admin/DepartmentsPage'));
const SettingsPage = lazy(() => import('./pages/super-admin/SettingsPage'));
const AuditPage = lazy(() => import('./pages/super-admin/AuditPage'));

// Admin
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const OrdersPage = lazy(() => import('./pages/admin/OrdersPage'));
const ProductsPage = lazy(() => import('./pages/admin/ProductsPage'));
const CustomersPage = lazy(() => import('./pages/admin/CustomersPage'));
const SupportPage = lazy(() => import('./pages/admin/SupportPage'));

const ApplicationsPage = lazy(() => import('./pages/admin/ApplicationsPage'));
const VendorsPage = lazy(() => import('./pages/admin/VendorsPage'));
const PayoutsPage = lazy(() => import('./pages/admin/PayoutsPage'));

// Partnership Manager = Vendor Partner (seller panel)
const VendorOverview = lazy(() => import('./pages/vendor/VendorOverview'));
const MyProductsPage = lazy(() => import('./pages/vendor/MyProductsPage'));
const MyOrdersPage = lazy(() => import('./pages/vendor/MyOrdersPage'));
const EarningsPage = lazy(() => import('./pages/vendor/EarningsPage'));
const StoreProfilePage = lazy(() => import('./pages/vendor/StoreProfilePage'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white p-6">
      <div className="w-12 h-12 rounded-[10px] overflow-hidden shadow-md animate-pulse mb-3 flex-shrink-0">
        <img src="/logo.jpg" alt="MAFTH" className="w-full h-full object-cover" />
      </div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-600">MAFTH Marketplace</span>
    </div>
  );
}

/* Sidebar menus — items hide automatically when the role loses "view" permission */
function useNavs() {
  const role = useAuthStore((s) => s.currentRole);
  const can = usePlatformStore((s) => s.can);
  usePlatformStore((s) => s.permissions);
  const pendingApps = usePlatformStore((s) => s.applications.filter((a) => a.stage === 'New').length);
  const pendingProducts = usePlatformStore((s) => s.productQueue.filter((p) => p.status === 'Pending').length);
  const myVendorId = useAuthStore((s) => s.staff?.vendorId);
  const myToPack = usePlatformStore((s) => s.orders.filter((o) => o.vendorId === myVendorId && o.status === 'Placed').length);
  const v = (m) => can(role, m, 'view');

  return {
    superAdmin: [
      { to: '/super-admin', label: 'Overview', icon: LayoutDashboard, end: true },
      { section: 'Platform' },
      { to: '/super-admin/team', label: 'Team & Staff', icon: UserCog },
      { to: '/super-admin/roles', label: 'Roles & Permissions', icon: KeyRound },
      { to: '/super-admin/departments', label: 'Departments', icon: Layers },
      { to: '/super-admin/settings', label: 'Settings', icon: Settings },
      { to: '/super-admin/audit', label: 'Activity Log', icon: History },
      { section: 'Operations' },
      { to: '/super-admin/orders', label: 'Orders', icon: ShoppingCart },
      { to: '/super-admin/products', label: 'Product Approvals', icon: PackageCheck, badge: pendingProducts },
      { to: '/super-admin/customers', label: 'Customers', icon: Users },
      { to: '/super-admin/support', label: 'Support', icon: LifeBuoy },
      { section: 'Vendor network' },
      { to: '/super-admin/applications', label: 'Vendor Applications', icon: FileClock, badge: pendingApps },
      { to: '/super-admin/vendors', label: 'Vendors', icon: Store },
      { to: '/super-admin/payouts', label: 'Payouts', icon: Wallet },
    ],
    admin: [
      { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
      { section: 'Operations' },
      { to: '/admin/orders', label: 'Orders', icon: ShoppingCart, show: v('orders') },
      { to: '/admin/products', label: 'Product Approvals', icon: PackageCheck, show: v('products'), badge: pendingProducts },
      { to: '/admin/customers', label: 'Customers', icon: Users, show: v('customers') },
      { to: '/admin/support', label: 'Support', icon: LifeBuoy, show: v('support') },
      { section: 'Vendor network' },
      { to: '/admin/applications', label: 'Vendor Applications', icon: FileClock, show: v('applications'), badge: pendingApps },
      { to: '/admin/vendors', label: 'Vendors', icon: Store, show: v('vendors') },
      { to: '/admin/payouts', label: 'Vendor Payouts', icon: Wallet, show: v('payouts') },
    ],
    vendor: [
      { to: '/partner', label: 'My Shop', icon: LayoutDashboard, end: true },
      { section: 'Sell' },
      { to: '/partner/products', label: 'My Products', icon: Package },
      { to: '/partner/orders', label: 'My Orders', icon: Truck, badge: myToPack },
      { section: 'Money & shop' },
      { to: '/partner/earnings', label: 'Earnings & Payouts', icon: Wallet },
      { to: '/partner/store', label: 'Store Profile', icon: Palette },
    ],
  };
}

export default function App() {
  const navs = useNavs();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ROLE 4 — User / Customer storefront */}
        <Route element={<StorefrontLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesOverviewPage />} />
          <Route path="/category/:slug" element={<ListingPage />} />
          <Route path="/deals" element={<ListingPage />} />
          <Route path="/search" element={<ListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/shops" element={<ShopsPage />} />
          <Route path="/vendors" element={<Navigate to="/shops" replace />} />
          <Route path="/vendor/:vendorSlug" element={<VendorStorePage />} />
          <Route path="/partner-with-us" element={<PartnerWithUsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/vendor" element={<Navigate to="/partner-with-us" replace />} />

        {/* ROLE 1 — Super Admin */}
        <Route
          path="/super-admin"
          element={
            <RequireRole roles={[ROLES.SUPER_ADMIN]}>
              <DashboardLayout nav={navs.superAdmin} title="Super Admin" />
            </RequireRole>
          }
        >
          <Route index element={<SuperAdminOverview />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="payouts" element={<PayoutsPage />} />
        </Route>

        {/* ROLE 2 — Admin */}
        <Route
          path="/admin"
          element={
            <RequireRole roles={[ROLES.ADMIN]}>
              <DashboardLayout nav={navs.admin} title="Admin" />
            </RequireRole>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="payouts" element={<PayoutsPage />} />
        </Route>

        {/* ROLE 3 — Partnership Manager = Vendor Partner (each vendor runs their own shop) */}
        <Route
          path="/partner"
          element={
            <RequireRole roles={[ROLES.PARTNERSHIP_MANAGER]}>
              <DashboardLayout nav={navs.vendor} title="Seller Panel" />
            </RequireRole>
          }
        >
          <Route index element={<VendorOverview />} />
          <Route path="products" element={<MyProductsPage />} />
          <Route path="orders" element={<MyOrdersPage />} />
          <Route path="earnings" element={<EarningsPage />} />
          <Route path="store" element={<StoreProfilePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
