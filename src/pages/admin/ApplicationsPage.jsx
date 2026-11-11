import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, FileCheck2, ArrowRight, Ban } from 'lucide-react';
import { usePlatformStore, APPLICATION_STAGES } from '../../store/usePlatformStore';
import { PageHeader, StatusBadge, NoAccess, shortDate, useActor, useCan } from '../../components/dashboard/ui';
import { cn } from '../../lib/utils';

const NEXT = { New: 'Documents Review', 'Documents Review': 'KYC Verified', 'KYC Verified': 'Approved' };
const NEXT_LABEL = { New: 'Start document review', 'Documents Review': 'Mark KYC verified', 'KYC Verified': 'Approve & create vendor' };

export default function ApplicationsPage() {
  const { applications, moveApplication } = usePlatformStore();
  const actor = useActor();
  const can = useCan();
  const [openId, setOpenId] = useState(null);
  const [note, setNote] = useState('');

  if (!can('applications')) return <NoAccess module="Vendor Applications" />;
  const canAct = can('applications', 'approve');
  const open = applications.find((a) => a.id === openId);

  return (
    <>
      <PageHeader title="Vendor Applications" subtitle="Every “Sell on MAFTH” form lands here. Move sellers through KYC to go live." />

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1">
        {APPLICATION_STAGES.map((stage) => {
          const items = applications.filter((a) => a.stage === stage);
          return (
            <div key={stage} className="w-72 flex-shrink-0">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-grey-600">{stage}</span>
                <span className="text-xs font-bold text-grey-400">{items.length}</span>
              </div>
              <div className={cn('rounded-lg p-2 space-y-2 min-h-[120px]', stage === 'Approved' ? 'bg-brand-50' : stage === 'Rejected' ? 'bg-red-50/60' : 'bg-mist-100')}>
                {items.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setOpenId(a.id);
                      setNote('');
                    }}
                    className="w-full text-left bg-white border border-mist-300 rounded-md p-3 hover:border-brand-600 hover:shadow-card transition-all"
                  >
                    <div className="text-sm font-bold text-black">{a.business}</div>
                    <div className="text-xs text-grey-500 mt-0.5">{a.department}</div>
                    <div className="flex items-center justify-between mt-2 text-[11px] text-grey-500">
                      <span>{a.city}</span>
                      <span>{shortDate(a.date)}</span>
                    </div>
                  </button>
                ))}
                {items.length === 0 && <div className="text-xs text-grey-400 text-center py-6">Empty</div>}
              </div>
            </div>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenId(null)} />
          <aside className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-brand-900 text-white px-5 py-4 flex items-start justify-between">
              <div>
                <div className="text-[11px] text-white/60">{open.id}</div>
                <div className="font-display text-xl font-bold">{open.business}</div>
                <div className="mt-1"><StatusBadge status={open.stage} /></div>
              </div>
              <button onClick={() => setOpenId(null)} className="p-1.5 rounded hover:bg-white/10" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-5 text-sm">
              <div className="space-y-2">
                <div className="font-semibold text-black">{open.owner}</div>
                <div className="flex items-center gap-2 text-grey-600"><Phone className="w-4 h-4" /> {open.phone}</div>
                <div className="flex items-center gap-2 text-grey-600"><Mail className="w-4 h-4" /> {open.email}</div>
                <div className="flex items-center gap-2 text-grey-600"><MapPin className="w-4 h-4" /> {open.city}</div>
              </div>
              <dl className="grid grid-cols-2 gap-3">
                {[
                  ['Department', open.department],
                  ['Catalogue size', `${open.skus} SKUs`],
<<<<<<< HEAD
                  ['GSTIN', open.gst || 'Not registered (optional)'],
                  ['PAN', open.pan ? `${open.pan} ${open.panVerified ? '✓ DigiLocker' : ''}` : '—'],
                  ['Mobile', open.phoneVerified ? 'OTP verified ✓' : 'Not verified'],
=======
                  ['GSTIN', open.gst],
>>>>>>> bc75d2a7e123e8022cd2ed0de1aa6593c9eb5191
                  ['Applied on', shortDate(open.date)],
                ].map(([k, v]) => (
                  <div key={k} className="bg-mist-50 rounded-md p-3">
                    <dt className="text-[11px] text-grey-500">{k}</dt>
                    <dd className="font-semibold text-black break-all">{v}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-grey-500 mb-2">KYC checklist</div>
                <ul className="space-y-1.5">
<<<<<<< HEAD
                  {['Mobile OTP verified', 'PAN verified (DigiLocker)', 'Bank account proof', 'GSTIN (optional)'].map((d, i) => {
                    const done = (i === 0 && open.phoneVerified) || (i === 1 && open.panVerified) || (i === 3 && open.gst) || APPLICATION_STAGES.indexOf(open.stage) >= 2 || (open.stage === 'Documents Review' && i < 2);
=======
                  {['GST certificate', 'PAN card', 'Cancelled cheque / bank proof', 'Brand / trademark proof'].map((d, i) => {
                    const done = APPLICATION_STAGES.indexOf(open.stage) >= 2 || (open.stage === 'Documents Review' && i < 2);
>>>>>>> bc75d2a7e123e8022cd2ed0de1aa6593c9eb5191
                    return (
                      <li key={d} className="flex items-center gap-2">
                        <FileCheck2 className={cn('w-4 h-4', done ? 'text-brand-600' : 'text-grey-300')} />
                        <span className={done ? 'text-black' : 'text-grey-500'}>{d}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {open.note && <div className="text-xs bg-red-50 text-red-700 rounded-md p-3">Note: {open.note}</div>}

              {canAct && NEXT[open.stage] && (
                <div className="space-y-2 pt-2 border-t border-mist-200">
                  <textarea
                    className="input min-h-[70px]"
                    placeholder="Internal note (optional, required for rejection)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <button onClick={() => moveApplication(open.id, NEXT[open.stage], actor, note || undefined)} className="btn-primary w-full">
                    {NEXT_LABEL[open.stage]} <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    disabled={!note.trim()}
                    onClick={() => moveApplication(open.id, 'Rejected', actor, note)}
                    className="btn-ghost w-full hover:!border-red-500 hover:!text-red-600 disabled:opacity-50"
                  >
                    <Ban className="w-4 h-4" /> Reject application
                  </button>
                </div>
              )}
              {open.stage === 'Approved' && (
                <div className="text-sm bg-brand-50 text-brand-800 rounded-md p-3">
                  Approved — this seller now appears under <strong>Vendors</strong> and gets a Seller Panel login to list products and receive orders.
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
