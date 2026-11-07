import React, { useState } from 'react';
import { Printer, Truck, PackageCheck } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, StatusBadge, FilterTabs, inr, shortDate, useActor, useMyShop } from '../../components/dashboard/ui';

const TABS = ['To pack', 'To ship', 'Shipped', 'Delivered', 'Returns / Cancelled', 'All'];
const match = (tab, s) =>
  tab === 'All' ||
  (tab === 'To pack' && s === 'Placed') ||
  (tab === 'To ship' && s === 'Packed') ||
  (tab === 'Shipped' && s === 'Shipped') ||
  (tab === 'Delivered' && s === 'Delivered') ||
  (tab === 'Returns / Cancelled' && ['Cancelled', 'Return Requested'].includes(s));

export default function MyOrdersPage() {
  const { vendorId } = useMyShop();
  const actor = useActor();
  const { orders, updateOrderStatus } = usePlatformStore();
  const [tab, setTab] = useState('To pack');

  const mine = orders.filter((o) => o.vendorId === vendorId);
  const counts = Object.fromEntries(TABS.map((t) => [t, mine.filter((o) => match(t, o.status)).length]));
  const list = mine.filter((o) => match(tab, o.status));

  return (
    <>
      <PageHeader title="My Orders" subtitle="Orders customers placed with your shop. Pack and hand over to courier within 24 hours." />
      <div className="mb-4">
        <FilterTabs options={TABS} value={tab} onChange={setTab} counts={counts} />
      </div>
      <Panel bodyClass="p-0">
        <ul className="divide-y divide-mist-200">
          {list.map((o) => (
            <li key={o.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
              <img src={o.image} alt="" className="w-16 h-20 rounded object-cover bg-mist-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-black">{o.id}</span>
                  <StatusBadge status={o.status} />
                  <span className="text-xs text-grey-400">{shortDate(o.date)}</span>
                </div>
                <div className="text-sm text-black mt-1 truncate">{o.product}</div>
                <div className="text-xs text-grey-500">Qty {o.qty} · {o.customer}, {o.city} · {o.payment}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-bold">{inr(o.amount)}</span>
                {o.status === 'Placed' && (
                  <button onClick={() => updateOrderStatus(o.id, 'Packed', actor)} className="btn-primary !px-3 !py-1.5 text-xs">
                    <PackageCheck className="w-4 h-4" /> Mark packed
                  </button>
                )}
                {o.status === 'Packed' && (
                  <>
                    <button onClick={() => window.print()} className="btn-ghost !px-3 !py-1.5 text-xs">
                      <Printer className="w-4 h-4" /> Label
                    </button>
                    <button onClick={() => updateOrderStatus(o.id, 'Shipped', actor)} className="btn-accent !px-3 !py-1.5 text-xs">
                      <Truck className="w-4 h-4" /> Hand to courier
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
          {list.length === 0 && <li className="p-10 text-center text-sm text-grey-500">No orders in “{tab}”.</li>}
        </ul>
      </Panel>
    </>
  );
}
