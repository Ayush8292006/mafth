import React, { useState, useEffect, Suspense } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Store, Bell, ChevronRight } from 'lucide-react';
import Logo from '../ui/Logo';
import { useAuthStore, ROLE_LABELS, ROLES } from '../../store/useAuthStore';
import { Avatar } from './ui';
import { cn } from '../../lib/utils';

const ROLE_ACCENT = {
  [ROLES.SUPER_ADMIN]: 'bg-marigold-400 text-black',
  [ROLES.ADMIN]: 'bg-white text-brand-800',
  [ROLES.PARTNERSHIP_MANAGER]: 'bg-brand-300 text-brand-950',
};

/**
 * Shared shell for all staff dashboards.
 * nav: [{ section?: string, to, label, icon, end? , show?: boolean }]
 */
export default function DashboardLayout({ nav, title }) {
  const { staff, currentRole, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const items = nav.filter((n) => n.show !== false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebar = (
    <div className="flex flex-col h-full bg-brand-900 text-white">
      <div className="px-5 h-16 flex items-center gap-3 border-b border-white/10">
        <Logo size="sm" asLink={false} />
        <div className="leading-tight">
          <div className="font-display font-extrabold text-[17px] tracking-tight">MAFTH</div>
          <div className="text-[10px] uppercase tracking-widest text-white/50">{title}</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {items.map((item, i) =>
          item.section ? (
            <div key={`s-${i}`} className="px-3 pt-5 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
              {item.section}
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive ? 'bg-white text-brand-900 shadow-sm' : 'text-white/75 hover:bg-white/10 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn('w-4 h-4', isActive ? 'text-brand-700' : 'text-white/60')} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge ? (
                    <span className="text-[10px] font-bold bg-marigold-400 text-black rounded-full px-1.5 py-0.5">
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
          )
        )}
      </nav>

      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar name={staff?.name} />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold truncate">{staff?.name}</div>
            <div className="text-[11px] text-white/50 truncate">{staff?.email}</div>
          </div>
          <button onClick={handleLogout} title="Log out" className="p-2 rounded-md hover:bg-white/10 text-white/70 hover:text-white">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-mist-50 lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-30">{sidebar}</aside>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 shadow-2xl">{sidebar}</aside>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 left-[300px] w-9 h-9 rounded-full bg-white flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top bar */}
      <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur border-b border-mist-300 flex items-center gap-3 px-4 sm:px-6">
        <button onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-2 rounded-md hover:bg-mist-100" aria-label="Open menu">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-grey-500">
          <span>{title}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-semibold capitalize">
            {pathname.split('/').filter(Boolean)[1]?.replace(/-/g, ' ') || 'Overview'}
          </span>
        </div>
        <div className="flex-1" />
        <span
          className={cn(
            'hidden sm:inline-flex text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ring-1 ring-brand-700/20',
            ROLE_ACCENT[currentRole]
          )}
        >
          {ROLE_LABELS[currentRole]}
        </span>
        <button className="relative p-2 rounded-md hover:bg-mist-100" aria-label="Notifications">
          <Bell className="w-5 h-5 text-grey-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-marigold-500" />
        </button>
        <Link to="/" className="btn-ghost !py-1.5 !px-3 text-xs">
          <Store className="w-4 h-4" />
          <span className="hidden sm:inline">View Store</span>
        </Link>
      </header>

      <main className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">
        <Suspense
          fallback={
            <div className="space-y-4 animate-pulse">
              <div className="h-8 w-64 rounded-md bg-mist-200" />
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-28 rounded-lg bg-mist-200" />
                ))}
              </div>
              <div className="h-72 rounded-lg bg-mist-200" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
