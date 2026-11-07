import React, { useState } from 'react';
import { Wallet, Clock, CheckCircle2 } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, Table, Td, StatusBadge, StatCard, FilterTabs, NoAccess, inr, inrCompact, useActor, useCan } from '../../components/dashboard/ui';

export default function PayoutsPage() {
  const { payouts, advancePayout, settings } = usePlatformStore();
  const actor = useActor();
  const can = useCan();
  const [tab, setTab] = useState('All');

  if (!can('payouts')) return <NoAccess module="Payouts" />;
  const canApprove = can('payouts', 'approve');

  const net = (p) => p.gross - p.commission;
  const sum = (st) => payouts.filter((p) => p.status === st).reduce((a, p) => a + net(p), 0);
  const list = payouts.filter((p) => tab === 'All' || p.status === tab);

  return (
    <>
      <PageHeader title="Vendor Payouts" subtitle={`Settlement cycle: ${settings.payoutCycle}. Net payout = gross sales − MAFTH commission.`} />
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Pending" value={inrCompact(sum('Pending'))} icon={Clock} tone="gold" />
        <StatCard label="Processing" value={inrCompact(sum('Processing'))} icon={Wallet} tone="blue" />
        <StatCard label="Paid this cycle" value={inrCompact(sum('Paid'))} icon={CheckCircle2} />
      </div>
      <Panel title="Settlements" action={<FilterTabs options={['All', 'Pending', 'Processing', 'Paid']} value={tab} onChange={setTab} />}>
        <Table columns={['Payout', 'Vendor', 'Period', 'Gross', 'Commission', 'Net payout', 'Status', '']}>
          {list.map((p) => (
            <tr key={p.id} className="hover:bg-mist-50">
              <Td className="font-semibold">{p.id}</Td>
              <Td>{p.vendor}</Td>
              <Td className="text-xs text-grey-500">{p.period}</Td>
              <Td>{inr(p.gross)}</Td>
              <Td className="text-red-600">− {inr(p.commission)}</Td>
              <Td className="font-bold text-brand-700">{inr(net(p))}</Td>
              <Td><StatusBadge status={p.status} /></Td>
              <Td className="text-right">
                {canApprove && p.status !== 'Paid' && (
                  <button onClick={() => advancePayout(p.id, actor)} className="btn-primary !px-3 !py-1 text-xs">
                    {p.status === 'Pending' ? 'Process' : 'Mark paid'}
                  </button>
                )}
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
