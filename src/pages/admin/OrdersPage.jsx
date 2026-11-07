import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, Table, Td, StatusBadge, FilterTabs, NoAccess, inr, shortDate, useActor, useCan } from '../../components/dashboard/ui';

const FLOW = ['Placed', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Return Requested'];
const TABS = ['All', ...FLOW];

export default function OrdersPage() {
  const { orders, updateOrderStatus } = usePlatformStore();
  const actor = useActor();
  const can = useCan();
  const [tab, setTab] = useState('All');
  const [q, setQ] = useState('');

  if (!can('orders')) return <NoAccess module="Orders" />;
  const canEdit = can('orders', 'edit');

  const counts = Object.fromEntries(TABS.map((t) => [t, t === 'All' ? orders.length : orders.filter((o) => o.status === t).length]));
  const list = orders
    .filter((o) => tab === 'All' || o.status === tab)
    .filter((o) => !q || `${o.id} ${o.customer} ${o.vendor} ${o.product}`.toLowerCase().includes(q.toLowerCase()));

  const exportCsv = () => {
    const rows = [['Order', 'Date', 'Customer', 'City', 'Vendor', 'Department', 'Amount', 'Payment', 'Status']].concat(
      list.map((o) => [o.id, shortDate(o.date), o.customer, o.city, o.vendor, o.department, o.amount, o.payment, o.status])
    );
    const blob = new Blob([rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mafth-orders.csv';
    a.click();
  };

  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Track every order across all vendors and update fulfilment status."
        actions={
          <button onClick={exportCsv} className="btn-ghost">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        }
      />
      <Panel
        title={
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-grey-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input className="input !py-2 pl-9 font-sans font-normal" placeholder="Search order, customer, vendor…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        }
      >
        <div className="mb-4">
          <FilterTabs options={TABS} value={tab} onChange={setTab} counts={counts} />
        </div>
        <Table columns={['Order', 'Customer', 'Product / Vendor', 'Amount', 'Payment', 'Status', canEdit ? 'Update' : '']}>
          {list.map((o) => (
            <tr key={o.id} className="hover:bg-mist-50">
              <Td>
                <div className="font-semibold text-black">{o.id}</div>
                <div className="text-xs text-grey-500">{shortDate(o.date)}</div>
              </Td>
              <Td>
                <div>{o.customer}</div>
                <div className="text-xs text-grey-500">{o.city}</div>
              </Td>
              <Td className="max-w-[260px]">
                <div className="truncate">{o.product}</div>
                <div className="text-xs text-brand-700 font-medium truncate">{o.vendor}</div>
              </Td>
              <Td className="font-semibold">{inr(o.amount)}</Td>
              <Td className="text-xs">{o.payment}</Td>
              <Td><StatusBadge status={o.status} /></Td>
              <Td>
                {canEdit && (
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value, actor)}
                    className="input !py-1.5 !w-40 text-xs"
                  >
                    {FLOW.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                )}
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
