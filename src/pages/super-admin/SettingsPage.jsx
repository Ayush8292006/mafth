import React, { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, Toggle, useActor } from '../../components/dashboard/ui';

export default function SettingsPage() {
  const { settings, updateSettings, resetDemo } = usePlatformStore();
  const actor = useActor();
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);

  const set = (k, v) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setSaved(false);
  };

  const save = () => {
    const changed = Object.fromEntries(Object.entries(draft).filter(([k, v]) => settings[k] !== v));
    if (Object.keys(changed).length) updateSettings(changed, actor);
    setSaved(true);
  };

  const switches = [
    ['codEnabled', 'Cash on Delivery', 'Allow COD at checkout for all departments'],
    ['vendorSelfSignup', 'Vendor self sign-up', 'Show the “Sell on MAFTH” application form publicly'],
    ['maintenanceMode', 'Maintenance mode', 'Temporarily hide the storefront from customers'],
  ];

  return (
    <>
      <PageHeader
        title="Platform Settings"
        subtitle="Rules that apply across the whole marketplace."
        actions={
          <>
            <button onClick={() => window.confirm('Reset all demo data?') && (resetDemo(), setDraft(usePlatformStore.getState().settings))} className="btn-ghost">
              <RotateCcw className="w-4 h-4" /> Reset demo data
            </button>
            <button onClick={save} className="btn-primary">
              <Save className="w-4 h-4" /> {saved ? 'Saved' : 'Save changes'}
            </button>
          </>
        }
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="General">
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Marketplace name</span>
              <input className="input mt-1" value={draft.platformName} onChange={(e) => set('platformName', e.target.value)} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Customer support email</span>
              <input className="input mt-1" value={draft.supportEmail} onChange={(e) => set('supportEmail', e.target.value)} />
            </label>
          </div>
        </Panel>

        <Panel title="Vendor commercials">
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Default commission (%)</span>
              <input
                type="number"
                className="input mt-1"
                value={draft.defaultCommission}
                onChange={(e) => set('defaultCommission', Number(e.target.value))}
              />
              <span className="text-[11px] text-grey-500">Used when a department has no specific rate.</span>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Vendor payout cycle</span>
              <select className="input mt-1" value={draft.payoutCycle} onChange={(e) => set('payoutCycle', e.target.value)}>
                {['Weekly', 'Fortnightly', 'Monthly'].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>
        </Panel>

        <Panel title="Features" className="lg:col-span-2">
          <ul className="divide-y divide-mist-200 -my-3">
            {switches.map(([k, label, hint]) => (
              <li key={k} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-black">{label}</div>
                  <div className="text-xs text-grey-500">{hint}</div>
                </div>
                <Toggle checked={!!draft[k]} onChange={() => set(k, !draft[k])} label={label} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
