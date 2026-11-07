import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Crown, ShieldCheck, Handshake, ShoppingBag, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import Logo from '../../components/ui/Logo';
import { useAuthStore, ROLES, ROLE_HOME, DEMO_ACCOUNTS } from '../../store/useAuthStore';
import { cn } from '../../lib/utils';

const ROLE_CARDS = [
  {
    role: ROLES.SUPER_ADMIN,
    label: 'Super Admin',
    icon: Crown,
    desc: 'Full control: admins, permissions, commission, departments',
    tone: 'bg-marigold-400 text-black',
  },
  {
    role: ROLES.ADMIN,
    label: 'Admin',
    icon: ShieldCheck,
    desc: 'Orders, product approvals, customers and support',
    tone: 'bg-brand-700 text-white',
  },
  {
    role: ROLES.PARTNERSHIP_MANAGER,
    label: 'Partnership Manager',
    icon: Handshake,
    desc: 'Vendor applications, KYC, vendor accounts and payouts',
    tone: 'bg-brand-200 text-brand-900',
  },
  {
    role: ROLES.USER,
    label: 'Customer',
    icon: ShoppingBag,
    desc: 'Shop, wishlist, cart, orders and addresses',
    tone: 'bg-mist-200 text-black',
  },
];

export default function LoginPage() {
  const { login, loginAs } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(location.state?.denied ? 'Your role does not have access to that page.' : '');

  const go = (role) => {
    const from = location.state?.from;
    navigate(from && !location.state?.denied ? from : ROLE_HOME[role], { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) return setError(res.error);
    go(res.role);
  };

  const quickLogin = (role) => {
    loginAs(role);
    navigate(ROLE_HOME[role], { replace: true });
  };

  const fill = (role) => {
    setEmail(DEMO_ACCOUNTS[role].email);
    setPassword(DEMO_ACCOUNTS[role].password);
    setError('');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-white">
      {/* Brand side */}
      <div className="relative hidden lg:flex flex-col justify-between bg-brand-900 text-white p-12 overflow-hidden">
        <div className="absolute -right-32 -top-32 w-[28rem] h-[28rem] rounded-full bg-brand-700/60" />
        <div className="absolute -left-24 bottom-[-10rem] w-[26rem] h-[26rem] rounded-full bg-marigold-400/15" />
        <Link to="/" className="relative flex items-center gap-3">
          <Logo size="lg" asLink={false} />
          <span className="font-display text-2xl font-extrabold tracking-tight">MAFTH</span>
        </Link>
        <div className="relative max-w-md">
          <p className="text-marigold-300 text-xs font-bold uppercase tracking-[0.2em] mb-4">One platform · Four roles</p>
          <h1 className="font-display text-5xl font-extrabold leading-[1.02]">
            Every seller.<br />Every department.<br />
            <span className="text-marigold-400">One marketplace.</span>
          </h1>
          <p className="text-white/70 mt-5 text-sm leading-relaxed">
            Super Admins set the rules, Admins run operations, Partnership Managers grow the vendor network and customers shop
            across 10 departments.
          </p>
        </div>
        <div className="relative grid grid-cols-3 gap-4 text-sm">
          {[
            ['10', 'Departments'],
            ['14+', 'Verified vendors'],
            ['4', 'Access roles'],
          ].map(([n, l]) => (
            <div key={l} className="border-t border-white/20 pt-3">
              <div className="font-display text-3xl font-bold text-marigold-400">{n}</div>
              <div className="text-white/60 text-xs">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-mist-50">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <Logo size="md" asLink={false} />
            <span className="font-display text-xl font-extrabold text-brand-800">MAFTH</span>
          </Link>

          <h2 className="font-display text-3xl font-bold text-black">Welcome back</h2>
          <p className="text-sm text-grey-500 mt-1 mb-6">Log in with your MAFTH account. Your role decides your dashboard.</p>

          {error && (
            <div className="mb-4 flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Email</span>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 text-grey-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input className="input pl-9" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mafth.in" required />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Password</span>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 text-grey-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input className="input pl-9" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
            </label>
            <button type="submit" className="btn-primary w-full !py-3">
              Log in <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-3 my-7">
            <span className="h-px flex-1 bg-mist-300" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-grey-400">Demo: enter as</span>
            <span className="h-px flex-1 bg-mist-300" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {ROLE_CARDS.map(({ role, label, icon: Icon, desc, tone }) => (
              <div key={role} className="group bg-white border border-mist-300 rounded-lg p-3.5 hover:border-brand-600 hover:shadow-card transition-all">
                <button onClick={() => quickLogin(role)} className="text-left w-full">
                  <span className={cn('w-9 h-9 rounded-md flex items-center justify-center mb-2.5', tone)}>
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                  <span className="block text-sm font-bold text-black group-hover:text-brand-700">{label}</span>
                  <span className="block text-[11px] text-grey-500 leading-snug mt-0.5">{desc}</span>
                </button>
                <button onClick={() => fill(role)} className="mt-2 text-[11px] font-semibold text-brand-700 hover:underline">
                  Fill credentials
                </button>
              </div>
            ))}
          </div>

          <p className="text-xs text-grey-500 mt-8 text-center">
            Want to sell on MAFTH?{' '}
            <Link to="/partner-with-us" className="font-semibold text-brand-700 hover:underline">
              Become a vendor partner
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
