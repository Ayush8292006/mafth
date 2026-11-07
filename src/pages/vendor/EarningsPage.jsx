import React from 'react';
import { Wallet, Percent, CheckCircle2, Landmark } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, Table, Td, StatusBadge, StatCard, inr, inrCompact, useMyShop } from '../../components/dashboard/ui';

export default function EarningsPage() {
  const { vendorId, vendor, profile } = useMyShop();
  const { payouts, settings } = usePlatformStore();
  const mine = payouts.filter((p) => p.vendorId === vendorId);
  const net = (p) => p.gross - p.commission;
  const paid = mine.filter((p) => p.status === 'Paid').reduce((a, p) => a + net(p), 0);
  const due = mine.filter((p) => p.status !== 'Paid').reduce((a, p) => a + net(p), 0);

  return (
    <>
      <PageHeader title="Earnings & Payouts" subtitle={`MAFTH pays you ${settings.payoutCycle.toLowerCase()} — your sales minus the platform commission.`} />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Upcoming payout" value={inrCompact(due)} icon={Wallet} tone="gold" />
        <StatCard label="Paid so far" value={inrCompact(paid)} icon={CheckCircle2} />
        <StatCard label="Your commission" value={`${vendor?.commission ?? 12}%`} hint="set by MAFTH" icon={Percent} tone="ink" />
        <StatCard label="Bank account" value={<span className="text-base">{profile.bank || '—'}</span>} icon={Landmark} tone="blue" />
      </div>
      <Panel title="Settlement statements">
        <Table columns={['Payout', 'Period', 'Your sales', 'MAFTH commission', 'You receive', 'Status']}>
          {mine.map((p) => (
            <tr key={p.id}>
              <Td className="font-semibold">{p.id}</Td>
              <Td className="text-xs text-grey-500">{p.period}</Td>
              <Td>{inr(p.gross)}</Td>
              <Td className="text-red-600">− {inr(p.commission)}</Td>
              <Td className="font-bold text-brand-700">{inr(net(p))}</Td>
              <Td><StatusBadge status={p.status} /></Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
