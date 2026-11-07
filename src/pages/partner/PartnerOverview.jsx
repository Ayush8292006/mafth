import React from 'react';
import { Link } from 'react-router-dom';
import { Handshake, Store, Wallet, FileClock, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { usePlatformStore, APPLICATION_STAGES } from '../../store/usePlatformStore';
import { useAuthStore, ROLES } from '../../store/useAuthStore';
import { PageHeader, StatCard, Panel, StatusBadge, Avatar, inrCompact, CHART } from '../../components/dashboard/ui';

export default function PartnerOverview() {
  const staff = useAuthStore((s) => s.staff);
  const base = useAuthStore((s) => s.currentRole) === ROLES.SUPER_ADMIN ? '/super-admin' : '/partner';
  const { applications, partnerVendors, payouts } = usePlatformStore();

  const pipeline = APPLICATION_STAGES.map((s) => ({ stage: s.replace('Documents ', 'Docs '), count: applications.filter((a) => a.stage === s).length }));
  const inPipeline = applications.filter((a) => !['Approved', 'Rejected'].includes(a.stage)).length;
  const active = partnerVendors.filter((v) => v.status === 'Active').length;
  const duePayout = payouts.filter((p) => p.status !== 'Paid').reduce((a, p) => a + p.gross - p.commission, 0);
  const top = [...partnerVendors].sort((a, b) => b.gmv - a.gmv).slice(0, 5);

  return (
    <>
      <PageHeader
        title={`Welcome, ${staff?.name?.split(' ')[0] || ''}`}
        subtitle="Grow the vendor network — review applications, onboard sellers and keep payouts on time."
        actions={
          <Link to={`${base}/applications`} className="btn-primary">
            <FileClock className="w-4 h-4" /> Review applications
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Applications in pipeline" value={inPipeline} hint="awaiting action" icon={FileClock} tone="gold" />
        <StatCard label="Active vendors" value={active} trend="+3" hint="this month" icon={Store} tone="ink" />
        <StatCard label="Vendor sales (30d)" value={inrCompact(partnerVendors.reduce((a, v) => a + v.gmv, 0))} trend="+9.1%" icon={Handshake} />
        <StatCard label="Payouts due" value={inrCompact(duePayout)} hint="pending + processing" icon={Wallet} tone="blue" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <Panel title="Onboarding pipeline" subtitle="Applications by stage" className="xl:col-span-3">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipeline} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="stage" tick={{ fontSize: 11, fill: CHART.axis }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: CHART.axis }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#EEF3F0' }} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="count" name="Applications" fill={CHART.gold} radius={[6, 6, 0, 0]} barSize={34} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Top vendors" subtitle="By 30-day sales" className="xl:col-span-2" action={<Link to={`${base}/vendors`} className="text-xs font-semibold text-brand-700">All vendors</Link>}>
          <ul className="space-y-3">
            {top.map((v, i) => (
              <li key={v.id} className="flex items-center gap-3">
                <span className="w-5 text-xs font-bold text-grey-400">{i + 1}</span>
                <Avatar name={v.name} src={v.logo} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{v.name}</div>
                  <div className="text-xs text-grey-500">{v.city}</div>
                </div>
                <span className="text-sm font-bold text-brand-700">{inrCompact(v.gmv)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Newest applications" className="mt-4" action={<Link to={`${base}/applications`} className="text-xs font-semibold text-brand-700 inline-flex items-center gap-1">Open pipeline <ArrowRight className="w-3 h-3" /></Link>}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {applications.slice(0, 4).map((a) => (
            <div key={a.id} className="border border-mist-200 rounded-md p-3">
              <div className="flex justify-between items-start gap-2">
                <div className="text-sm font-bold">{a.business}</div>
                <StatusBadge status={a.stage} />
              </div>
              <div className="text-xs text-grey-500 mt-1">{a.department} · {a.city}</div>
              <div className="text-xs text-grey-500">{a.skus} SKUs · {a.owner}</div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
