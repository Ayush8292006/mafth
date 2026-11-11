import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store, TrendingUp, Wallet, Truck, CheckCircle2, ArrowRight, Users } from 'lucide-react';
import VendorApplicationForm from '../../components/storefront/VendorApplicationForm';
import { usePlatformStore } from '../../store/usePlatformStore';

const BENEFITS = [
  { icon: Users, title: 'Lakhs of buyers', text: 'Reach shoppers across India in 10 departments from day one.' },
  { icon: Wallet, title: 'On-time payouts', text: 'Settlements straight to your bank on a fixed cycle.' },
  { icon: Truck, title: 'Shipping handled', text: 'Pickup from your door with our logistics partners.' },
  { icon: TrendingUp, title: 'Your own Seller Panel', text: 'Add products, manage stock, ship orders and track earnings yourself.' },
];

const STEPS = [
  ['Apply', 'Fill the short form below — it takes 3 minutes.'],
  ['Verify instantly', 'Verify your mobile with OTP and PAN with DigiLocker — no paperwork.'],
  ['KYC verified', 'Your shop and Seller Panel login are created.'],
  ['Go live', 'List products, get approved and start selling.'],
];


export default function PartnerWithUsPage() {
  const { settings } = usePlatformStore();
  const [done, setDone] = useState(null);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-700/60" />
        <div className="absolute right-40 bottom-[-8rem] w-72 h-72 rounded-full bg-marigold-400/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-marigold-300">
              <Store className="w-4 h-4" /> Vendor Partnership
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold leading-[1.02] mt-4">
              Sell on MAFTH.<br />
              <span className="text-marigold-400">Grow across India.</span>
            </h1>
            <p className="text-white/75 mt-5 max-w-lg">
              Join a multi-vendor marketplace with 10 departments. Get your own shop page and Seller Panel, low commission and fast payouts.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#apply" className="btn-accent !rounded-full !px-6 !py-3">
                Apply now <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#process" className="inline-flex items-center px-6 py-3 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/10">
                How it works
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['0', 'Joining fee'],
              ['10', 'Departments to sell in'],
              [settings.payoutCycle, 'Payout cycle'],
              ['48 hrs', 'Application review'],
            ].map(([n, l]) => (
              <div key={l} className="rounded-xl bg-white/5 border border-white/10 p-5">
                <div className="font-display text-3xl font-bold text-marigold-400">{n}</div>
                <div className="text-sm text-white/60 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-bold text-black">Why vendors choose MAFTH</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-mist-300 p-6 hover:border-brand-600 hover:shadow-card transition-all">
              <span className="w-11 h-11 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <div className="font-bold text-black mt-4">{title}</div>
              <p className="text-sm text-grey-500 mt-1">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-mist-50 border-y border-mist-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-display text-3xl font-bold text-black">How onboarding works</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="relative bg-white rounded-xl border border-mist-300 p-6">
                <span className="font-display text-5xl font-extrabold text-marigold-400">{i + 1}</span>
                <div className="font-bold text-black mt-2">{t}</div>
                <p className="text-sm text-grey-500 mt-1">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="bg-brand-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lift">
            {done ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-brand-600 mx-auto" />
                <h2 className="font-display text-2xl font-bold mt-4">Application received!</h2>
                <p className="text-sm text-grey-500 mt-2 max-w-sm mx-auto">
                  Thanks, <strong>{done}</strong>. Our onboarding team will call you within 48 hours. After KYC you get your own Seller Panel to list products and receive orders.
                </p>
                <Link to="/" className="btn-primary mt-6">Back to shopping</Link>
              </div>
            ) : (
              <>
                <h2 className="font-display text-3xl font-bold text-black">Become a vendor partner</h2>
                <p className="text-sm text-grey-500 mt-1 mb-6">Takes about 3 minutes. No payment required.</p>
                <VendorApplicationForm onDone={setDone} />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
