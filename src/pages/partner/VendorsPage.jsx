import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, ExternalLink } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, Table, Td, StatusBadge, Avatar, FilterTabs, NoAccess, inrCompact, useActor, useCan } from '../../components/dashboard/ui';

export default function VendorsPage() {
  const { partnerVendors, setVendorCommission, toggleVendor } = usePlatformStore();
  const actor = useActor();
  const can = useCan();
  const [tab, setTab] = useState('All');
  const [q, setQ] = useState('');

  if (!can('vendors')) return <NoAccess module="Vendors" />;
  const canEdit = can('vendors', 'edit');

  const list = partnerVendors
    .filter((v) => tab === 'All' || v.status === tab)
    .filter((v) => !q || `${v.name} ${v.city}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader title="Vendors" subtitle="All sellers on MAFTH — commission, status and performance." />
      <Panel
        title={
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-grey-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input className="input !py-2 pl-9" placeholder="Search vendors…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        }
        action={<FilterTabs options={['All', 'Active', 'Suspended']} value={tab} onChange={setTab} />}
      >
        <Table columns={['Vendor', 'Rating', 'Products', 'Sales (30d)', 'Fulfilment', 'Commission', 'Status', '']}>
          {list.map((v) => (
            <tr key={v.id} className="hover:bg-mist-50">
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={v.name} src={v.logo} />
                  <div>
                    <div className="font-semibold">{v.name}</div>
                    <div className="text-xs text-grey-500">{v.city} · since {v.joined}</div>
                  </div>
                </div>
              </Td>
              <Td>
                <span className="inline-flex items-center gap-1 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-marigold-500 text-marigold-500" /> {v.rating || '—'}
                </span>
              </Td>
              <Td>{v.products}</Td>
              <Td className="font-semibold">{inrCompact(v.gmv)}</Td>
              <Td className="text-xs">{v.fulfillment}</Td>
              <Td>
                {canEdit ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={40}
                      defaultValue={v.commission}
                      onBlur={(e) => Number(e.target.value) !== v.commission && setVendorCommission(v.id, Number(e.target.value), actor)}
                      className="input !w-16 !py-1 text-center text-xs font-semibold"
                    />
                    <span className="text-xs text-grey-500">%</span>
                  </div>
                ) : (
                  `${v.commission}%`
                )}
              </Td>
              <Td><StatusBadge status={v.status} /></Td>
              <Td>
                <div className="flex items-center gap-2 justify-end">
                  {v.gmv > 0 && (
                    <Link to={`/vendor/${v.slug}`} className="p-1.5 rounded text-grey-400 hover:text-brand-700" title="View store">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                  {canEdit && (
                    <button onClick={() => toggleVendor(v.id, actor)} className="btn-ghost !px-3 !py-1 text-xs">
                      {v.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  )}
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
