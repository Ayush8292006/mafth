import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, Table, Td, StatusBadge, Avatar, NoAccess, inr, useActor, useCan } from '../../components/dashboard/ui';

export default function CustomersPage() {
  const { customers, toggleCustomer } = usePlatformStore();
  const actor = useActor();
  const can = useCan();
  const [q, setQ] = useState('');

  if (!can('customers')) return <NoAccess module="Customers" />;
  const canEdit = can('customers', 'edit');
  const list = customers.filter((c) => !q || `${c.name} ${c.email} ${c.city}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader title="Customers" subtitle="Users who shop on the storefront (the 4th role)." />
      <Panel
        title={
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-grey-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input className="input !py-2 pl-9 font-sans font-normal" placeholder="Search customers…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        }
      >
        <Table columns={['Customer', 'City', 'Orders', 'Total spend', 'Status', '']}>
          {list.map((c) => (
            <tr key={c.id} className="hover:bg-mist-50">
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={c.name} />
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-grey-500">{c.email}</div>
                  </div>
                </div>
              </Td>
              <Td>{c.city}</Td>
              <Td>{c.orders}</Td>
              <Td className="font-semibold">{inr(c.spend)}</Td>
              <Td><StatusBadge status={c.status} /></Td>
              <Td className="text-right">
                {canEdit && (
                  <button onClick={() => toggleCustomer(c.id, actor)} className="btn-ghost !px-3 !py-1 text-xs">
                    {c.status === 'Active' ? 'Block' : 'Unblock'}
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
