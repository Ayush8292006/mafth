import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Save, ExternalLink } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { vendors } from '../../data/vendors';
import { PageHeader, Panel, Toggle, useActor, useMyShop } from '../../components/dashboard/ui';

export default function StoreProfilePage() {
  const { vendorId, vendorName, vendor, profile } = useMyShop();
  const actor = useActor();
  const updateStoreProfile = usePlatformStore((s) => s.updateStoreProfile);
  const seed = vendors.find((v) => v.id === vendorId);
  const [draft, setDraft] = useState({ tagline: '', description: '', dispatchDays: 1, returnDays: 7, bank: '', holidayMode: false, ...profile });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setSaved(false);
  };

  return (
    <>
      <PageHeader
        title="Store Profile"
        subtitle="How your shop looks to customers on MAFTH."
        actions={
          <>
            <Link to={`/vendor/${vendor?.slug || vendorId}`} className="btn-ghost"><ExternalLink className="w-4 h-4" /> Preview shop</Link>
            <button onClick={() => { updateStoreProfile(vendorId, draft, actor); setSaved(true); }} className="btn-primary">
              <Save className="w-4 h-4" /> {saved ? 'Saved' : 'Save'}
            </button>
          </>
        }
      />

      <div className="rounded-xl overflow-hidden border border-mist-300 mb-4 bg-white">
        <div className="relative h-36 bg-brand-800">
          {seed?.banner && <img src={seed.banner} alt="" className="w-full h-full object-cover opacity-80" />}
        </div>
        <div className="px-5 pb-5 -mt-8 flex items-end gap-4">
          {seed?.logo && <img src={seed.logo} alt="" className="w-20 h-20 rounded-xl border-4 border-white object-cover shadow-card" />}
          <div className="pb-1">
            <div className="font-display text-xl font-bold">{vendorName}</div>
            <div className="text-xs text-grey-500">{draft.tagline}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="About the shop">
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Tagline</span>
              <input className="input mt-1" value={draft.tagline} onChange={(e) => set('tagline', e.target.value)} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Description</span>
              <textarea className="input mt-1 min-h-[110px]" value={draft.description} onChange={(e) => set('description', e.target.value)} />
            </label>
          </div>
        </Panel>
        <Panel title="Shipping, returns & bank">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Dispatch within (days)</span>
              <input type="number" min={1} className="input mt-1" value={draft.dispatchDays} onChange={(e) => set('dispatchDays', Number(e.target.value))} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Return window (days)</span>
              <input type="number" min={0} className="input mt-1" value={draft.returnDays} onChange={(e) => set('returnDays', Number(e.target.value))} />
            </label>
            <label className="block col-span-2">
              <span className="text-xs font-semibold text-grey-700">Payout bank account</span>
              <input className="input mt-1" value={draft.bank} onChange={(e) => set('bank', e.target.value)} />
            </label>
            <div className="col-span-2 flex items-center justify-between rounded-md bg-mist-50 p-3">
              <div>
                <div className="text-sm font-semibold">Holiday mode</div>
                <div className="text-xs text-grey-500">Pause new orders while you're away</div>
              </div>
              <Toggle checked={!!draft.holidayMode} onChange={() => set('holidayMode', !draft.holidayMode)} label="Holiday mode" />
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}
