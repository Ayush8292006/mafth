import React, { useState } from 'react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, Table, Td, FilterTabs, Avatar } from '../../components/dashboard/ui';

export default function AuditPage() {
  const audit = usePlatformStore((s) => s.audit);
  const [filter, setFilter] = useState('All');
  const roles = ['All', 'Super Admin', 'Admin', 'Vendor Partner'];
  const list = filter === 'All' ? audit : audit.filter((a) => a.role === filter);

  return (
    <>
      <PageHeader title="Activity Log" subtitle="Every important change made by any staff role is recorded here." />
      <Panel title={`${list.length} entries`} action={<FilterTabs options={roles} value={filter} onChange={setFilter} />}>
        <Table columns={['Who', 'Role', 'Action', 'When']}>
          {list.map((a) => (
            <tr key={a.id}>
              <Td>
                <div className="flex items-center gap-2.5">
                  <Avatar name={a.who} size="w-7 h-7" />
                  <span className="font-semibold">{a.who}</span>
                </div>
              </Td>
              <Td className="text-xs text-grey-500">{a.role}</Td>
              <Td className="whitespace-normal min-w-[260px]">{a.action}</Td>
              <Td className="text-xs text-grey-500">
                {new Date(a.at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
