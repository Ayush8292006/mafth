import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Instagram, Crown, ArrowRight, Medal } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';

export const CURRENT_USER_ID = 'usr-101';

/** Points shown publicly instead of exact spend (1 point per ₹100) */
export const points = (spend) => Math.round(spend / 100);

export function useTopBuyers(limit = 20) {
  const leaderboard = usePlatformStore((s) => s.leaderboard);
  return [...leaderboard]
    .filter((b) => !b.hidden)
    .sort((a, b) => b.spend - a.spend)
    .slice(0, limit)
    .map((b, i) => ({ ...b, rank: i + 1 }));
}

export function InstaLink({ handle, light }) {
  if (!handle) return null;
  return (
    <a
      href={`https://instagram.com/${handle}`}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1 text-[11px] font-semibold ${light ? 'text-white/80 hover:text-white' : 'text-brand-700 hover:underline'}`}
    >
      <Instagram className="w-3 h-3" />@{handle}
    </a>
  );
}

const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2);
const PODIUM = [
  { ring: 'ring-marigold-400', badge: 'bg-marigold-400 text-black', h: 'h-28', icon: Crown },
  { ring: 'ring-mist-300', badge: 'bg-white text-brand-900', h: 'h-20', icon: Medal },
  { ring: 'ring-marigold-700', badge: 'bg-marigold-700 text-white', h: 'h-14', icon: Medal },
];

/** Top-3 podium — used on the home section and the full page */
export function Podium({ buyers, showInsta }) {
  const order = [buyers[1], buyers[0], buyers[2]].filter(Boolean);
  return (
    <div className="flex items-end justify-center gap-3 sm:gap-6">
      {order.map((b) => {
        const st = PODIUM[b.rank - 1];
        const Icon = st.icon;
        return (
          <div key={b.id} className="flex flex-col items-center w-28 sm:w-36 text-center">
            <div className="relative">
              <span className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-700 ring-4 ${st.ring} flex items-center justify-center font-display text-xl sm:text-2xl font-bold text-white`}>
                {initials(b.name)}
              </span>
              <span className={`absolute -top-2 -right-1 w-7 h-7 rounded-full flex items-center justify-center ${st.badge} shadow`}>
                <Icon className="w-4 h-4" />
              </span>
            </div>
            <div className="font-bold text-white mt-2 text-sm leading-tight">{b.name}</div>
            <div className="text-[11px] text-white/60">{b.city}</div>
            {showInsta && <InstaLink handle={b.instagram} light />}
            <div className={`mt-2 w-full ${st.h} rounded-t-xl bg-white/10 border border-white/15 flex flex-col items-center justify-center`}>
              <span className="font-display text-2xl font-extrabold text-marigold-400">#{b.rank}</span>
              <span className="text-[10px] text-white/70">{points(b.spend).toLocaleString('en-IN')} pts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Home-page section (only rendered when Admin has made the leaderboard visible) */
export function LeaderboardSection() {
  const { leaderboardVisible, leaderboardShowInsta, leaderboardTitle } = usePlatformStore((s) => s.settings);
  const top = useTopBuyers(20);
  if (!leaderboardVisible || top.length === 0) return null;

  return (
    <section className="bg-brand-900 text-white overflow-hidden relative">
      <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-marigold-400/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-marigold-300">
            <Trophy className="w-4 h-4" /> MAFTH Leaderboard
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-3">{leaderboardTitle}</h2>
          <p className="text-white/70 text-sm mt-2 max-w-md">
            Shop more, climb higher. Top buyers get featured here — add your Instagram handle and get a shout-out.
          </p>
          <ol className="mt-6 space-y-1.5 max-w-md">
            {top.slice(3, 8).map((b) => (
              <li key={b.id} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
                <span className="w-6 text-sm font-bold text-marigold-300">#{b.rank}</span>
                <span className="flex-1 text-sm font-semibold truncate">{b.name}</span>
                {leaderboardShowInsta && <InstaLink handle={b.instagram} light />}
                <span className="text-xs text-white/60">{points(b.spend).toLocaleString('en-IN')} pts</span>
              </li>
            ))}
          </ol>
          <Link to="/leaderboard" className="btn-accent !rounded-full mt-6">
            See all top 20 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Podium buyers={top.slice(0, 3)} showInsta={leaderboardShowInsta} />
      </div>
    </section>
  );
}
