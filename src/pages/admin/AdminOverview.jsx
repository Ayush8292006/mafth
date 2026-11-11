import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, PackageCheck, LifeBuoy, Truck, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { usePlatformStore } from '../../store/usePlatformStore';
import { useAuthStore } from '../../store/useAuthStore';
import { PageHeader, StatCard, Panel, StatusBadge, inr, CHART, useCan } from '../../components/dashboard/ui';

const WEEK = [
  { d: 'Mon', orders: 182 },
  { d: 'Tue', orders: 204 },
  { d: 'Wed', orders: 198 },
  { d: 'Thu', orders: 241 },
  { d: 'Fri', orders: 276 },
  { d: 'Sat', orders: 318 },
  { d: 'Sun', orders: 289 },
];

export default function AdminOverview() {
  const staff = useAuthStore((s) => s.staff);
  const { orders, productQueue, tickets } = usePlatformStore();
  const can = useCan();
  const base = useAuthStore((s) => s.currentRole) === 'super_admin' ? '/super-admin' : '/admin';

  const toShip = orders.filter((o) => ['Placed', 'Packed'].includes(o.status)).length;
  const pendingProducts = productQueue.filter((p) => p.status === 'Pending').length;
  const openTickets = tickets.filter((t) => t.status !== 'Resolved').length;
  const returns = orders.filter((o) => o.status === 'Return Requested').length;

  const todo = [
    { label: 'Orders waiting to ship', n: toShip, to: `${base}/orders`, show: can('orders') },
    { label: 'Products waiting for approval', n: pendingProducts, to: `${base}/products`, show: can('products') },
    { label: 'Open support tickets', n: openTickets, to: `${base}/support`, show: can('support') },
    { label: 'Return requests', n: returns, to: `${base}/orders`, show: can('orders') },
  ].filter((t) => t.show);

  return (
    <>
      <PageHeader title={`Hi ${staff?.name?.split(' ')[0] || ''}, here's today`} subtitle="Operations dashboard — orders, catalogue and customer care." />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Orders today" value="289" trend="+8.4%" hint="vs yesterday" icon={ShoppingCart} tone="ink" />
        <StatCard label="To ship" value={toShip} hint="Placed + Packed" icon={Truck} tone="gold" />
        <StatCard label="Products pending" value={pendingProducts} hint="need moderation" icon={PackageCheck} />
        <StatCard label="Open tickets" value={openTickets} hint="avg reply 42 min" icon={LifeBuoy} tone="blue" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel title="Orders this week" className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEK} margin={{ left: -18, right: 8, top: 8 }}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 12, fill: CHART.axis }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: CHART.axis }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Line type="monotone" dataKey="orders" stroke={CHART.brand} strokeWidth={3} dot={{ r: 4, fill: CHART.gold, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Your to-do list">
          <ul className="space-y-2">
            {todo.map((t) => (
              <li key={t.label}>
                <Link to={t.to} className="flex items-center justify-between rounded-md border border-mist-300 px-3 py-2.5 hover:border-brand-600 group">
                  <span className="text-sm text-black">{t.label}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-display font-bold text-brand-700">{t.n}</span>
                    <ArrowRight className="w-4 h-4 text-grey-400 group-hover:text-brand-700" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {can('orders') && (
        <Panel title="Recent orders" className="mt-4" action={<Link to={`${base}/orders`} className="text-xs font-semibold text-brand-700">Manage orders</Link>}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {orders.slice(0, 6).map((o) => (
              <div key={o.id} className="border border-mist-200 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">{o.id}</span>
                  <StatusBadge status={o.status} />
                </div>
                <div className="text-xs text-grey-500 mt-1 truncate">{o.product}</div>
                <div className="text-xs mt-1 flex justify-between">
                  <span className="text-grey-500">{o.customer}</span>
                  <span className="font-semibold">{inr(o.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </>
  );
}
