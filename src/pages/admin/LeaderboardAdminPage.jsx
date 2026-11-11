import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ExternalLink, Instagram } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Panel, Table, Td, Toggle, inr, useActor } from '../../components/dashboard/ui';

export default function LeaderboardAdminPage() {
  const { leaderboard, settings, updateSettings, toggleBuyerHidden } = usePlatformStore();
  const actor = useActor();
  const ranked = [...leaderboard].sort((a, b) => b.spend - a.spend);
  let rank = 0;

  return (
    <>
      <PageHeader
        title="Top Buyers Leaderboard"
        subtitle="You decide when the Top 20 leaderboard is visible to everyone on the storefront."
        actions={
          <Link to="/leaderboard" className="btn-ghost">
            <ExternalLink className="w-4 h-4" /> Preview public page
          </Link>
        }
      />

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className={`rounded-lg border p-5 flex items-center justify-between ${settings.leaderboardVisible ? 'bg-brand-50 border-brand-200' : 'bg-white border-mist-300'}`}>
          <div>
            <div className="font-bold text-black flex items-center gap-2">
              {settings.leaderboardVisible ? <Eye className="w-4 h-4 text-brand-700" /> : <EyeOff className="w-4 h-4 text-grey-400" />}
              {settings.leaderboardVisible ? 'Visible to everyone' : 'Hidden'}
            </div>
            <div className="text-xs text-grey-500 mt-0.5">Home page section + /leaderboard page</div>
          </div>
          <Toggle
            checked={settings.leaderboardVisible}
            onChange={() => updateSettings({ leaderboardVisible: !settings.leaderboardVisible }, actor)}
            label="Leaderboard visible"
          />
        </div>
        <div className="rounded-lg border border-mist-300 bg-white p-5 flex items-center justify-between">
          <div>
            <div className="font-bold text-black flex items-center gap-2"><Instagram className="w-4 h-4" /> Show Instagram handles</div>
            <div className="text-xs text-grey-500 mt-0.5">Only for buyers who added one</div>
          </div>
          <Toggle
            checked={settings.leaderboardShowInsta}
            onChange={() => updateSettings({ leaderboardShowInsta: !settings.leaderboardShowInsta }, actor)}
            label="Show Instagram"
          />
        </div>
        <label className="rounded-lg border border-mist-300 bg-white p-5 block">
          <span className="text-xs font-semibold text-grey-700">Leaderboard title</span>
          <input
            className="input mt-1"
            defaultValue={settings.leaderboardTitle}
            onBlur={(e) => e.target.value !== settings.leaderboardTitle && updateSettings({ leaderboardTitle: e.target.value }, actor)}
          />
        </label>
      </div>

      <Panel title="Ranking (by total spend)" subtitle="Hide a buyer to remove them from the public list — everyone below moves up.">
        <Table columns={['Rank', 'Buyer', 'City', 'Orders', 'Total spend', 'Instagram', 'On leaderboard']}>
          {ranked.map((b) => {
            const r = b.hidden ? null : ++rank;
            return (
              <tr key={b.id} className={b.hidden ? 'opacity-50' : r <= 20 ? '' : 'text-grey-400'}>
                <Td className="font-display font-bold">{r ? (r <= 20 ? `#${r}` : `#${r} (not shown)`) : '—'}</Td>
                <Td className="font-semibold">{b.name}</Td>
                <Td>{b.city}</Td>
                <Td>{b.orders}</Td>
                <Td className="font-semibold">{inr(b.spend)}</Td>
                <Td className="text-xs">{b.instagram ? `@${b.instagram}` : <span className="text-grey-400">not added</span>}</Td>
                <Td>
                  <Toggle checked={!b.hidden} onChange={() => toggleBuyerHidden(b.id, actor)} label={`Show ${b.name}`} />
                </Td>
              </tr>
            );
          })}
        </Table>
      </Panel>
    </>
  );
}
