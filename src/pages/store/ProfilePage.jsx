import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Package, MapPin, Wallet, Bell, ShieldCheck, ChevronRight, Truck } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

export default function ProfilePage() {
  const { user, addresses } = useAuthStore();
  const [activeTab, setActiveTab] = useState('orders');

  const mockOrders = [
    {
      id: "MF-ORD-8921",
      date: "01 Nov 2026",
      status: "In Transit",
      vendor: "Rawat Heritage Weaves",
      itemsCount: 2,
      total: 5780,
      trackingStep: 3, // 1: Placed, 2: Packed, 3: Shipped, 4: Delivered
      estimatedDelivery: "Tomorrow, 2:00 PM",
      carrier: "BlueDart Express (AWB: BLU998231)"
    },
    {
      id: "MF-ORD-7740",
      date: "24 Oct 2026",
      status: "Delivered",
      vendor: "Studio Mitti Ceramics",
      itemsCount: 1,
      total: 2600,
      trackingStep: 4,
      estimatedDelivery: "Delivered on 27 Oct 2026",
      carrier: "Delhivery Surface"
    }
  ];

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="p-6 bg-mist-50 border border-mist-300 rounded mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-brand-600 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold text-black">{user.name}</h1>
                <span className="text-[10px] uppercase font-bold bg-brand-700 text-white px-2 py-0.5 rounded">
                  {user.loyaltyTier}
                </span>
              </div>
              <p className="text-xs text-grey-600 mt-0.5">{user.email} • {user.phone}</p>
              <p className="text-[11px] text-brand-600 mt-1">Patron Member since {user.joinedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-mist-300 pt-3 sm:pt-0 sm:pl-6 text-xs">
            <div>
              <span className="text-[10px] text-grey-500 uppercase block">MAFTH Wallet</span>
              <span className="font-display text-lg font-bold text-black">{formatPrice(user.walletBalance)}</span>
            </div>
            <div>
              <span className="text-[10px] text-grey-500 uppercase block">Active Orders</span>
              <span className="font-display text-lg font-bold text-black">1 In Transit</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-mist-300 text-xs font-semibold uppercase tracking-wider mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'orders' ? 'border-brand-600 text-black' : 'border-transparent text-grey-500 hover:text-black'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders & Timeline</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'addresses' ? 'border-brand-600 text-black' : 'border-transparent text-grey-500 hover:text-black'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab 1: Orders with Amazon/Flipkart tracking timeline */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {mockOrders.map((ord) => (
              <div key={ord.id} className="border border-mist-300 rounded overflow-hidden bg-white">
                <div className="bg-mist-50 p-4 border-b border-mist-300 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-grey-500 uppercase block">Order ID</span>
                      <strong className="text-black font-semibold">{ord.id}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-grey-500 uppercase block">Order Placed</span>
                      <span>{ord.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-grey-500 uppercase block">Shipped By</span>
                      <span className="font-semibold text-black">{ord.vendor}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-grey-500 uppercase block">Total Amount</span>
                    <strong className="text-sm font-bold text-black">{formatPrice(ord.total)}</strong>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      Status: <span className={ord.status === 'Delivered' ? 'text-status-success' : 'text-black font-semibold'}>{ord.status}</span>
                    </span>
                    <span className="text-xs text-grey-600">{ord.estimatedDelivery}</span>
                  </div>

                  {/* Tracking Timeline Bar */}
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px] mb-6">
                    {['Placed', 'Packed', 'Shipped', 'Delivered'].map((step, idx) => {
                      const isComplete = idx + 1 <= ord.trackingStep;
                      return (
                        <div key={step} className="flex flex-col items-center">
                          <div
                            className={`w-full h-1.5 rounded-full mb-2 ${
                              isComplete ? 'bg-brand-700' : 'bg-mist-200'
                            }`}
                          />
                          <span className={isComplete ? 'font-bold text-black' : 'text-grey-400'}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs text-grey-600">
                    Carrier Partner: <strong className="text-black">{ord.carrier}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {addresses.map((addr) => (
              <div key={addr.id} className="p-5 border border-mist-300 rounded bg-mist-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-mist-200 text-black px-2 py-0.5 rounded">
                      {addr.type}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[11px] text-status-success font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Default Address
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-bold text-black">{addr.name}</h3>
                  <p className="text-xs text-grey-600 mt-1 leading-relaxed">
                    {addr.addressLine}, {addr.city}, {addr.state} — <strong>{addr.pincode}</strong>
                  </p>
                  <p className="text-xs text-grey-600 mt-2">Mobile: {addr.phone}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

