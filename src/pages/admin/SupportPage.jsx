import React, { useState } from 'react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, StatusBadge, FilterTabs, NoAccess, shortDate, useActor, useCan } from '../../components/dashboard/ui';

const TABS = ['Open', 'In Progress', 'Resolved', 'All'];

export default function SupportPage() {
  const { tickets, setTicketStatus } = usePlatformStore();
  const actor = useActor();
  const can = useCan();
  const [tab, setTab] = useState('Open');

  if (!can('support')) return <NoAccess module="Support" />;
  const canEdit = can('support', 'edit');
  const counts = Object.fromEntries(TABS.map((t) => [t, t === 'All' ? tickets.length : tickets.filter((x) => x.status === t).length]));
  const list = tickets.filter((t) => tab === 'All' || t.status === tab);

  return (
    <>
      <PageHeader title="Support Tickets" subtitle="Customer issues raised from the Help Centre." />
      <Panel title="Tickets" action={<FilterTabs options={TABS} value={tab} onChange={setTab} counts={counts} />}>
        <ul className="divide-y divide-mist-200 -my-2">
          {list.map((t) => (
            <li key={t.id} className="py-3 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-grey-500">{t.id}</span>
                  <StatusBadge status={t.priority} />
                </div>
                <div className="text-sm font-semibold text-black mt-0.5">{t.subject}</div>
                <div className="text-xs text-grey-500">{t.customer} · {shortDate(t.date)}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={t.status} />
                {canEdit && t.status !== 'Resolved' && (
                  <>
                    {t.status === 'Open' && (
                      <button onClick={() => setTicketStatus(t.id, 'In Progress', actor)} className="btn-ghost !px-3 !py-1 text-xs">
                        Start
                      </button>
                    )}
                    <button onClick={() => setTicketStatus(t.id, 'Resolved', actor)} className="btn-primary !px-3 !py-1 text-xs">
                      Resolve
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
          {list.length === 0 && <li className="py-10 text-center text-sm text-grey-500">All clear 🎉</li>}
        </ul>
      </Panel>
    </>
  );
}
