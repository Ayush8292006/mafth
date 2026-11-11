import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, StatusBadge, FilterTabs, NoAccess, inr, shortDate, useActor, useCan } from '../../components/dashboard/ui';

const TABS = ['Pending', 'Approved', 'Rejected', 'All'];

export default function ProductsPage() {
  const { productQueue, moderateProduct } = usePlatformStore();
  const actor = useActor();
  const can = useCan();
  const [tab, setTab] = useState('Pending');

  if (!can('products')) return <NoAccess module="Products" />;
  const canApprove = can('products', 'approve');

  const counts = Object.fromEntries(TABS.map((t) => [t, t === 'All' ? productQueue.length : productQueue.filter((p) => p.status === t).length]));
  const list = productQueue.filter((p) => tab === 'All' || p.status === tab);

  return (
    <>
      <PageHeader title="Product Moderation" subtitle="Vendors submit products — approve them before they go live on the storefront." />
      <Panel action={<FilterTabs options={TABS} value={tab} onChange={setTab} counts={counts} />} title="Submissions">
        {list.length === 0 ? (
          <p className="text-center text-sm text-grey-500 py-10">No products in “{tab}”.</p>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {list.map((p) => (
              <div key={p.id} className="border border-mist-300 rounded-lg overflow-hidden flex">
                <img src={p.image} alt="" className="w-28 object-cover bg-mist-100 flex-shrink-0" />
                <div className="p-3 flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-semibold text-brand-700 truncate">{p.vendor}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="text-sm font-semibold text-black line-clamp-2 mt-1">{p.title}</div>
                  <div className="text-xs text-grey-500 mt-1">
                    {p.department} · {inr(p.price)} · {shortDate(p.submitted)}
                  </div>
                  {canApprove && p.status === 'Pending' && (
                    <div className="flex gap-2 mt-auto pt-3">
                      <button onClick={() => moderateProduct(p.id, 'Approved', actor)} className="btn-primary !px-3 !py-1.5 text-xs flex-1">
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button onClick={() => moderateProduct(p.id, 'Rejected', actor)} className="btn-ghost !px-3 !py-1.5 text-xs flex-1 hover:!border-red-500 hover:!text-red-600">
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}
