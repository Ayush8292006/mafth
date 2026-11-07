import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store, TrendingUp, Wallet, Truck, BadgeCheck, FileText, CheckCircle2, ArrowRight, Users } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';

const BENEFITS = [
  { icon: Users, title: 'Lakhs of buyers', text: 'Reach shoppers across India in 10 departments from day one.' },
  { icon: Wallet, title: 'On-time payouts', text: 'Settlements straight to your bank on a fixed cycle.' },
  { icon: Truck, title: 'Shipping handled', text: 'Pickup from your door with our logistics partners.' },
  { icon: TrendingUp, title: 'Growth support', text: 'A dedicated Partnership Manager helps you grow sales.' },
];

const STEPS = [
  ['Apply', 'Fill the short form below — it takes 3 minutes.'],
  ['Document check', 'Our Partnership team reviews your GST, PAN and bank details.'],
  ['KYC verified', 'Once verified, your seller account is created.'],
  ['Go live', 'List products, get approved and start selling.'],
];

const DOCS = ['GST certificate (GSTIN)', 'PAN card of business / owner', 'Cancelled cheque or bank statement', 'Brand or trademark proof (if any)'];

export default function PartnerWithUsPage() {
  const { departments, submitApplication, settings } = usePlatformStore();
  const [done, setDone] = useState(null);
  const [form, setForm] = useState({ business: '', owner: '', phone: '', email: '', city: '', department: departments[0]?.name || '', gst: '', skus: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    submitApplication(form);
    setDone(form.business);
  };

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
              Join a multi-vendor marketplace with 10 departments. Low commission, fast payouts and a Partnership Manager on your side.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#apply" className="btn-accent !rounded-full !px-6 !py-3">
                Apply now <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#commission" className="inline-flex items-center px-6 py-3 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/10">
                See commission rates
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['0', 'Joining fee'],
              [`${settings.defaultCommission}%`, 'Avg. commission'],
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

      {/* Commission + KYC */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-8">
        <div id="commission" className="lg:col-span-2">
          <h2 className="font-display text-3xl font-bold text-black">Commission by department</h2>
          <p className="text-sm text-grey-500 mt-1">No listing fee. You only pay when you sell.</p>
          <div className="grid sm:grid-cols-2 gap-2 mt-6">
            {departments.filter((d) => d.enabled).map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-lg border border-mist-300 px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={d.image} alt="" className="w-9 h-9 rounded-md object-cover" />
                  <span className="text-sm font-semibold">{d.name}</span>
                </div>
                <span className="font-display text-lg font-bold text-brand-700">{d.commission}%</span>
              </div>
            ))}
          </div>
        </div>
        <div id="kyc" className="rounded-xl bg-brand-50 border border-brand-100 p-6 h-fit">
          <div className="flex items-center gap-2 text-brand-800 font-bold">
            <FileText className="w-5 h-5" /> Keep these ready
          </div>
          <ul className="mt-4 space-y-3">
            {DOCS.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-black">
                <BadgeCheck className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" /> {d}
              </li>
            ))}
          </ul>
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
                  Thanks, <strong>{done}</strong>. A Partnership Manager will call you within 48 hours to verify your documents.
                </p>
                <Link to="/" className="btn-primary mt-6">Back to shopping</Link>
              </div>
            ) : (
              <>
                <h2 className="font-display text-3xl font-bold text-black">Become a vendor partner</h2>
                <p className="text-sm text-grey-500 mt-1 mb-6">Takes about 3 minutes. No payment required.</p>
                <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
                  {[
                    ['business', 'Business / brand name', 'text'],
                    ['owner', 'Owner name', 'text'],
                    ['phone', 'Mobile number', 'tel'],
                    ['email', 'Email', 'email'],
                    ['city', 'City', 'text'],
                    ['gst', 'GSTIN', 'text'],
                  ].map(([k, label, type]) => (
                    <label key={k} className="block">
                      <span className="text-xs font-semibold text-grey-700">{label}</span>
                      <input className="input mt-1" type={type} required value={form[k]} onChange={set(k)} />
                    </label>
                  ))}
                  <label className="block">
                    <span className="text-xs font-semibold text-grey-700">Main department</span>
                    <select className="input mt-1" value={form.department} onChange={set('department')}>
                      {departments.map((d) => (
                        <option key={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-grey-700">Approx. number of products</span>
                    <input className="input mt-1" type="number" min={1} required value={form.skus} onChange={set('skus')} />
                  </label>
                  <button className="btn-accent sm:col-span-2 !py-3 mt-2">
                    Submit application <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
