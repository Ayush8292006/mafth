import React from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee, Package, Truck, Wallet, Plus, ExternalLink, ArrowRight, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { usePlatformStore } from '../../store/usePlatformStore';
import { products } from '../../data/products';
import { PageHeader, StatCard, Panel, StatusBadge, inr, inrCompact, shortDate, CHART, useMyShop } from '../../components/dashboard/ui';

const SALES = [
  { d: '1 Nov', v: 18.2 },
  { d: '2 Nov', v: 22.4 },
  { d: '3 Nov', v: 19.8 },
  { d: '4 Nov', v: 27.1 },
  { d: '5 Nov', v: 31.6 },
  { d: '6 Nov', v: 29.3 },
  { d: '7 Nov', v: 35.8 },
];

export default function VendorOverview() {
  const { vendorId, vendorName, vendor } = useMyShop();
  const { orders, payouts, vendorProducts, listingOverrides } = usePlatformStore();

  const myOrders = orders.filter((o) => o.vendorId === vendorId);
  const toShip = myOrders.filter((o) => ['Placed', 'Packed'].includes(o.status));
  const myListings = products.filter((p) => p.vendorId === vendorId);
  const live = myListings.filter((p) => listingOverrides[p.id]?.active !== false).length + vendorProducts.filter((p) => p.vendorId === vendorId && p.status === 'Approved').length;
  const pendingApproval = vendorProducts.filter((p) => p.vendorId === vendorId && p.status === 'Pending').length;
  const lowStock = myListings.filter((p) => (listingOverrides[p.id]?.stock ?? p.stock) <= 5).length;
  const nextPayout = payouts.find((p) => p.vendorId === vendorId && p.status !== 'Paid');

  return (
    <>
      <PageHeader
        title={vendorName}
        subtitle={`Your shop on MAFTH · ${vendor?.city || ''} · Commission ${vendor?.commission ?? 12}%`}
        actions={
          <>
            <Link to={`/vendor/${vendor?.slug || vendorId}`} className="btn-ghost">
              <ExternalLink className="w-4 h-4" /> View my shop
            </Link>
            <Link to="/partner/products?new=1" className="btn-primary">
              <Plus className="w-4 h-4" /> Add product
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="My sales (7 days)" value="₹1.84 L" trend="+18.4%" hint="vs last week" icon={IndianRupee} tone="ink" />
        <StatCard label="Orders to ship" value={toShip.length} hint="ship within 24 hrs" icon={Truck} tone="gold" />
        <StatCard label="Live products" value={live} hint={`${pendingApproval} waiting for approval`} icon={Package} />
        <StatCard label="Next payout" value={nextPayout ? inrCompact(nextPayout.gross - nextPayout.commission) : '—'} hint={nextPayout?.period} icon={Wallet} tone="blue" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel title="My daily sales" subtitle="₹ thousand" className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES} margin={{ left: -18, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="vSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART.gold} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={CHART.gold} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 12, fill: CHART.axis }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: CHART.axis }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} formatter={(v) => `₹${v}k`} />
                <Area type="monotone" dataKey="v" name="Sales" stroke={CHART.brand} strokeWidth={2.5} fill="url(#vSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Shop health">
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-grey-500">Rating</span><span className="font-bold flex items-center gap-1"><Star className="w-4 h-4 fill-marigold-500 text-marigold-500" />{vendor?.rating}</span></li>
            <li className="flex justify-between"><span className="text-grey-500">On-time dispatch</span><span className="font-bold">{vendor?.fulfillment}</span></li>
            <li className="flex justify-between"><span className="text-grey-500">Low-stock items</span><span className="font-bold text-marigold-700">{lowStock}</span></li>
            <li className="flex justify-between"><span className="text-grey-500">Account status</span><StatusBadge status={vendor?.status || 'Active'} /></li>
          </ul>
          <Link to="/partner/products" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
            Manage stock <ArrowRight className="w-4 h-4" />
          </Link>
        </Panel>
      </div>

      <Panel title="Orders to ship" className="mt-4" action={<Link to="/partner/orders" className="text-xs font-semibold text-brand-700">All my orders</Link>}>
        {toShip.length === 0 ? (
          <p className="text-sm text-grey-500 text-center py-6">Nothing to ship right now. 🎉</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {toShip.slice(0, 6).map((o) => (
              <div key={o.id} className="flex gap-3 border border-mist-200 rounded-md p-3">
                <img src={o.image} alt="" className="w-14 h-16 rounded object-cover bg-mist-100" />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-sm font-bold">{o.id}</span>
                    <StatusBadge status={o.status} />
                  </div>
                  <div className="text-xs text-grey-600 truncate mt-0.5">{o.product}</div>
                  <div className="text-xs mt-1 flex justify-between">
                    <span className="text-grey-500">{o.city} · {shortDate(o.date)}</span>
                    <span className="font-semibold">{inr(o.amount)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}
