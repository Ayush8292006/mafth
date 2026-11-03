import React from 'react';
import { Link } from 'react-router-dom';
import { Store, TrendingUp, Package, DollarSign, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { formatPrice } from '../../lib/utils';
import Logo from '../../components/ui/Logo';

export default function VendorDashboard() {
  const { activeVendor } = useAuthStore();

  return (
    <div className="bg-white min-h-screen">
      {/* Top bar */}
      <div className="bg-beige-50 border-b border-beige-300 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="sm" asLink={false} />
          <div>
            <h1 className="font-serif text-lg font-bold text-black leading-none">{activeVendor.name}</h1>
            <span className="text-[10px] uppercase font-bold text-beige-500 tracking-wider">Vendor Partner Console</span>
          </div>
        </div>
        <Link
          to="/"
          className="text-xs font-semibold text-black hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch to Storefront</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 p-4 bg-beige-100/60 border border-beige-300 rounded flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
            <span className="text-xs font-medium text-black">
              GST: <strong>{activeVendor.gstNumber}</strong> • KYC Status: <strong className="text-status-success uppercase font-bold">{activeVendor.kycStatus}</strong>
            </span>
          </div>
          <span className="text-xs text-grey-500">Scheduled Payout: Thursday, 12:00 PM</span>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Net Sales (MTD)', val: '₹4,89,200', change: '+18.4% vs last month', icon: TrendingUp },
            { label: 'Pending Dispatches', val: '14 Orders', change: 'BlueDart SLA: Within 8 hrs', icon: Package },
            { label: 'Next Direct Settlement', val: '₹84,350', change: 'Auto-credited to ICICI Bank', icon: DollarSign },
            { label: 'Low Stock Alerts', val: '2 SKUs', change: 'Kora Camp Collar Shirts', icon: AlertCircle },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-5 border border-beige-300 rounded bg-beige-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-grey-500 uppercase tracking-wider font-semibold">{stat.label}</span>
                  <Icon className="w-4 h-4 text-grey-400" />
                </div>
                <div className="font-serif text-2xl font-bold text-black">{stat.val}</div>
                <div className="text-[11px] text-grey-600 mt-1">{stat.change}</div>
              </div>
            );
          })}
        </div>

        <div className="p-8 border border-dashed border-beige-400 rounded text-center bg-beige-50/30">
          <h3 className="font-serif text-lg font-bold text-black mb-1">
            Vendor Panel Suite (Phase 3 Milestone)
          </h3>
          <p className="text-xs text-grey-600 max-w-lg mx-auto mb-4">
            Full seller registration & KYC UI, catalog add/edit with variant matrices, order fulfillment dispatch workflows, and commission settlement statements will be fully implemented in Phase 3.
          </p>
          <Link
            to="/"
            className="inline-block px-5 py-2.5 bg-black text-white text-xs uppercase font-semibold rounded hover:bg-black/90"
          >
            Explore Phase 1 Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

