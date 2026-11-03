import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Package, DollarSign, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import Logo from '../../components/ui/Logo';

export default function AdminDashboard() {
  const { currentRole, setRole, subAdminPreset } = useAuthStore();

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="sm" asLink={false} />
          <div>
            <h1 className="font-serif text-lg font-bold text-white leading-none">MAFTH Super Admin & RBAC Matrix</h1>
            <span className="text-[10px] uppercase font-bold text-beige-400 tracking-wider">Multi-Vendor Control Center</span>
          </div>
        </div>
        <Link
          to="/"
          className="text-xs font-semibold text-white hover:text-beige-300 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Customer Store</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="p-4 bg-beige-100 border border-beige-300 rounded mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-black uppercase tracking-wider block">Role-Based Access Control Mode</span>
            <p className="text-xs text-grey-600 mt-0.5">Currently active role: <strong className="text-black capitalize">{currentRole.replace('_', ' ')}</strong> ({subAdminPreset})</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-grey-600">Switch Demo Role:</span>
            <select
              value={currentRole}
              onChange={(e) => setRole(e.target.value)}
              className="px-3 py-1.5 bg-white border border-beige-300 rounded text-black font-semibold cursor-pointer"
            >
              <option value="super_admin">Super Admin (All Access)</option>
              <option value="sub_admin">Sub-Admin (Restricted Matrix)</option>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>

        {/* 4 Super Admin Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Gross Merchandise Value (GMV)', val: '₹1.84 Crore', sub: '30-Day Volume', icon: DollarSign },
            { label: 'Active Verified Vendors', val: '14 Ateliers', sub: '100% KYC Approved', icon: Users },
            { label: 'Total Catalog SKUs', val: '194 Products', sub: 'Across 10 Categories', icon: Package },
            { label: 'Marketplace Commission Yield', val: '₹22.4 Lakh', sub: 'Avg 12.2% blended rate', icon: Shield },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="p-5 border border-beige-300 rounded bg-beige-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-grey-500 uppercase font-bold tracking-wider">{card.label}</span>
                  <Icon className="w-4 h-4 text-black" />
                </div>
                <div className="font-serif text-2xl font-bold text-black">{card.val}</div>
                <div className="text-[11px] text-grey-600 mt-1">{card.sub}</div>
              </div>
            );
          })}
        </div>

        <div className="p-8 border border-dashed border-beige-400 rounded text-center bg-beige-50/40">
          <h3 className="font-serif text-lg font-bold text-black mb-1">
            Admin + Sub-Admin RBAC Suite (Phase 4 Milestone)
          </h3>
          <p className="text-xs text-grey-600 max-w-lg mx-auto mb-4">
            Custom permission matrices, sub-admin role assignment, route guards, vendor KYC approvals, order dispute moderation, commission rule engines, and Recharts analytics dashboards will be built in Phase 4.
          </p>
          <Link
            to="/"
            className="inline-block px-5 py-2.5 bg-black text-white text-xs uppercase font-semibold rounded hover:bg-black/90"
          >
            Review Phase 1 Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

