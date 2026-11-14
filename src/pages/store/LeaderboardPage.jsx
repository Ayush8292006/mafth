import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Instagram, Lock, Check } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { Podium, InstaLink, useTopBuyers, points, CURRENT_USER_ID } from '../../components/storefront/Leaderboard';

export function InstagramHandleForm({ compact }) {
  const me = usePlatformStore((s) => s.leaderboard.find((b) => b.id === CURRENT_USER_ID));
  const setInstagram = usePlatformStore((s) => s.setInstagram);
  const [value, setValue] = useState(me?.instagram || '');
  const [saved, setSaved] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setInstagram(CURRENT_USER_ID, value);
        setSaved(true);
      }}
      className={compact ? 'flex gap-2' : 'flex flex-col sm:flex-row gap-2'}
    >
      <div className="relative flex-1">
        <Instagram className="w-4 h-4 text-grey-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-grey-400">@</span>
        <input
          className="input pl-[3.1rem]"
          placeholder="your.handle"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.replace(/^@/, ''));
            setSaved(false);
          }}
        />
      </div>
      <button className="btn-primary whitespace-nowrap">
        {saved ? (
          <>
            <Check className="w-4 h-4" /> Saved
          </>
        ) : (
          'Save handle'
        )}
      </button>
    </form>
  );
}

export default function LeaderboardPage() {
  const { leaderboardVisible, leaderboardShowInsta, leaderboardTitle } = usePlatformStore((s) => s.settings);
  const top = useTopBuyers(20);
  const me = top.find((b) => b.id === CURRENT_USER_ID);

  if (!leaderboardVisible) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-20 bg-mist-50">
        <div className="text-center max-w-sm">
          <Lock className="w-10 h-10 text-grey-400 mx-auto" />
          <h1 className="font-display text-2xl font-bold mt-3">Leaderboard coming soon</h1>
          <p className="text-sm text-grey-500 mt-1">The top buyers leaderboard isn't live right now. Keep shopping — it will be revealed soon!</p>
          <Link to="/" className="btn-primary mt-5">Continue shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mist-50 min-h-screen">
      <section className="bg-brand-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-marigold-300">
            <Trophy className="w-4 h-4" /> MAFTH Leaderboard
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold mt-3">{leaderboardTitle}</h1>
          <p className="text-white/70 text-sm mt-2">1 point for every ₹100 you spend. Rankings refresh every month.</p>
          <div className="mt-10">
            <Podium buyers={top.slice(0, 3)} showInsta={leaderboardShowInsta} />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-mist-300 rounded-xl overflow-hidden">
          <ol className="divide-y divide-mist-200">
            {top.slice(3).map((b) => (
              <li key={b.id} className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 ${b.id === CURRENT_USER_ID ? 'bg-marigold-50' : ''}`}>
                <span className="w-7 sm:w-8 font-display text-base sm:text-lg font-bold text-grey-400 flex-shrink-0">#{b.rank}</span>
                <span className="hidden sm:flex w-9 h-9 rounded-full bg-brand-100 text-brand-800 text-xs font-bold items-center justify-center flex-shrink-0">
                  {b.name.split(' ').map((p) => p[0]).join('')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-black truncate">
                    {b.name} {b.id === CURRENT_USER_ID && <span className="chip bg-marigold-400 text-black ml-1">You</span>}
                  </div>
                  <div className="text-xs text-grey-500 flex flex-wrap items-center gap-x-2">
                    {b.city} · {b.orders} orders {leaderboardShowInsta && <InstaLink handle={b.instagram} />}
                  </div>
                </div>
                <span className="font-bold text-brand-700 text-xs sm:text-sm whitespace-nowrap">{points(b.spend).toLocaleString('en-IN')} pts</span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="space-y-4">
          <div className="bg-white border border-mist-300 rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-grey-500">Your rank</div>
            <div className="font-display text-4xl font-extrabold text-brand-700 mt-1">{me ? `#${me.rank}` : '—'}</div>
            <div className="text-sm text-grey-500">{me ? `${points(me.spend).toLocaleString('en-IN')} points` : 'Shop to enter the top 20'}</div>
          </div>
          <div className="bg-white border border-mist-300 rounded-xl p-5">
            <div className="flex items-center gap-2 font-bold text-black">
              <Instagram className="w-5 h-5 text-brand-700" /> Add your Instagram
            </div>
            <p className="text-xs text-grey-500 mt-1 mb-3">Optional — shown next to your name so others can follow you.</p>
            <InstagramHandleForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
