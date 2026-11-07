import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee, Store, Users, ArrowRight, UserCog, Layers, ShieldCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { usePlatformStore } from '../../store/usePlatformStore';
import { useAuthStore } from '../../store/useAuthStore';
import { PageHeader, StatCard, Panel, StatusBadge, inrCompact, shortDate, CHART } from '../../components/dashboard/ui';

const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
const GMV = [62, 71, 79, 96, 118, 134]; // ₹ lakh

export default function SuperAdminOverview() {
  const staff = useAuthStore((s) => s.staff);
  const { orders, partnerVendors, customers, applications, admins, departments, audit } = usePlatformStore();

  const activeVendors = partnerVendors.filter((v) => v.status === 'Active').length;
  const pendingApps = applications.filter((a) => ['New', 'Documents Review', 'KYC Verified'].includes(a.stage)).length;

  const gmvData = MONTHS.map((m, i) => ({ m, gmv: GMV[i], commission: +(GMV[i] * 0.12).toFixed(1) }));

  const deptData = useMemo(() => {
    const map = {};
    orders.forEach((o) => (map[o.department] = (map[o.department] || 0) + o.amount));
    return departments
      .map((d) => ({ name: d.name.split(' ')[0].replace("'s", ''), value: Math.round((map[d.name] || 0) / 1000) }))
      .sort((a, b) => b.value - a.value);
  }, [orders, departments]);

  return (
    <>
      <PageHeader
        title={`Good day, ${staff?.name?.split(' ')[0] || 'Admin'}`}
        subtitle="Platform-wide snapshot across all 10 departments and every role."
        actions={
          <Link to="/super-admin/team" className="btn-primary">
            <UserCog className="w-4 h-4" /> Manage team
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Gross sales (30d)" value="₹1.34 Cr" trend="+13.6%" hint="vs last month" icon={IndianRupee} tone="ink" />
        <StatCard label="Commission earned" value="₹16.1 L" trend="+11.2%" hint="avg 12% blended" icon={ShieldCheck} tone="gold" />
        <StatCard label="Active vendors" value={activeVendors} hint={`${pendingApps} applications in pipeline`} icon={Store} />
        <StatCard label="Customers" value={`${customers.length * 1042}`} trend="+4.8%" hint="registered users" icon={Users} tone="blue" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <Panel title="Gross sales vs commission" subtitle="₹ in lakh, last 6 months" className="xl:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gmvData} margin={{ left: -18, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="gGmv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART.brand} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={CHART.brand} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 12, fill: CHART.axis }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: CHART.axis }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #D2DDD8', fontSize: 12 }} formatter={(v) => `₹${v} L`} />
                <Area type="monotone" dataKey="gmv" name="Gross sales" stroke={CHART.brand} strokeWidth={2.5} fill="url(#gGmv)" />
                <Area type="monotone" dataKey="commission" name="Commission" stroke={CHART.gold} strokeWidth={2.5} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Sales by department" subtitle="₹ thousand, recent orders">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} layout="vertical" margin={{ left: 6, right: 8 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 11, fill: CHART.axis }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#EEF3F0' }} contentStyle={{ borderRadius: 10, fontSize: 12 }} formatter={(v) => `₹${v}k`} />
                <Bar dataKey="value" fill={CHART.brand} radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="Role overview" subtitle="Who can do what on MAFTH">
          <ul className="space-y-3 text-sm">
            {[
              ['Super Admin', 1, 'Full platform control'],
              ['Admins', admins.filter((a) => a.role === 'admin').length, 'Operations & support'],
              ['Partnership Managers', admins.filter((a) => a.role === 'partnership_manager').length, 'Vendor onboarding'],
              ['Customers', `${customers.length * 1042}`, 'Storefront shoppers'],
            ].map(([r, n, d]) => (
              <li key={r} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-black">{r}</div>
                  <div className="text-xs text-grey-500">{d}</div>
                </div>
                <span className="font-display text-lg font-bold text-brand-700">{n}</span>
              </li>
            ))}
          </ul>
          <Link to="/super-admin/roles" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
            Edit permissions <ArrowRight className="w-4 h-4" />
          </Link>
        </Panel>

        <Panel title="Latest orders" action={<Link to="/super-admin/orders" className="text-xs font-semibold text-brand-700">View all</Link>}>
          <ul className="divide-y divide-mist-200 -my-2">
            {orders.slice(0, 5).map((o) => (
              <li key={o.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-black">{o.id}</div>
                  <div className="text-xs text-grey-500 truncate">{o.customer} · {o.vendor}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{inrCompact(o.amount)}</div>
                  <StatusBadge status={o.status} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Activity log" action={<Link to="/super-admin/audit" className="text-xs font-semibold text-brand-700">Full log</Link>}>
          <ul className="space-y-3 text-sm">
            {audit.slice(0, 5).map((a) => (
              <li key={a.id} className="flex gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-marigold-400 flex-shrink-0" />
                <div>
                  <div className="text-black leading-snug">{a.action}</div>
                  <div className="text-xs text-grey-500">{a.who} · {shortDate(a.at)}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
        {departments.map((d) => (
          <Link
            key={d.id}
            to="/super-admin/departments"
            className="flex items-center gap-2.5 bg-white border border-mist-300 rounded-lg p-2.5 hover:border-brand-600 transition-colors"
          >
            <img src={d.image} alt="" className="w-9 h-9 rounded-md object-cover" />
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate">{d.name}</div>
              <div className="text-[11px] text-grey-500 flex items-center gap-1">
                <Layers className="w-3 h-3" /> {d.commission}% · {d.enabled ? 'Live' : 'Off'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
