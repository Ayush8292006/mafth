import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Smartphone, X, Loader2, BadgeCheck } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';

/* ------------------------------------------------------------------
 * DEMO ONLY — replace these two functions with real APIs:
 *  - sendOtp / verifyOtp  → SMS provider (MSG91 / Twilio / Firebase Auth) via your backend
 *  - fetchPanFromDigiLocker → DigiLocker (MeitY) OAuth flow via an aggregator such as Setu / Surepass
 * ------------------------------------------------------------------ */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function sendOtp(phone) {
  await wait(700);
  return { ok: true, hint: '123456' };
}
async function verifyOtp(phone, otp) {
  await wait(500);
  return { ok: /^\d{6}$/.test(otp) }; // demo: any 6 digits work
}
async function fetchPanFromDigiLocker(ownerName) {
  await wait(1400);
  const letters = (ownerName || 'MAFTH VENDOR').replace(/[^A-Za-z]/g, '').toUpperCase().padEnd(5, 'X');
  return { ok: true, pan: `${letters.slice(0, 3)}P${letters[0]}${Math.floor(1000 + Math.random() * 8999)}K`, name: (ownerName || 'Vendor').toUpperCase() };
}

const GST_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

export default function VendorApplicationForm({ onDone }) {
  const { departments, submitApplication } = usePlatformStore();
  const [form, setForm] = useState({ business: '', owner: '', phone: '', email: '', city: '', department: departments[0]?.name || '', gst: '', skus: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // Mobile OTP
  const [otpState, setOtpState] = useState('idle'); // idle | sending | sent | verifying | verified
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(0);

  // DigiLocker PAN
  const [pan, setPan] = useState(null); // { pan, name }
  const [dlOpen, setDlOpen] = useState(false);
  const [dlLoading, setDlLoading] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const phoneOk = /^[6-9]\d{9}$/.test(form.phone);

  const handleSendOtp = async () => {
    setOtpError('');
    setOtpState('sending');
    await sendOtp(form.phone);
    setOtpState('sent');
    setTimer(30);
  };

  const handleVerifyOtp = async () => {
    setOtpState('verifying');
    const res = await verifyOtp(form.phone, otp);
    if (res.ok) setOtpState('verified');
    else {
      setOtpState('sent');
      setOtpError('Invalid OTP. Please enter the 6-digit code.');
    }
  };

  const handleDigiLocker = async () => {
    setDlLoading(true);
    const res = await fetchPanFromDigiLocker(form.owner);
    setDlLoading(false);
    if (res.ok) {
      setPan({ pan: res.pan, name: res.name });
      setDlOpen(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (otpState !== 'verified') return setError('Please verify your mobile number with OTP.');
    if (!pan) return setError('Please verify your PAN with DigiLocker.');
    if (form.gst && !GST_RE.test(form.gst.toUpperCase())) return setError('GSTIN looks incorrect. Leave it blank if you don’t have one.');
    submitApplication({ ...form, gst: form.gst.toUpperCase(), phone: `+91 ${form.phone}`, phoneVerified: true, pan: pan.pan, panName: pan.name, panVerified: true });
    onDone(form.business);
  };

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
      {[
        ['business', 'Business / brand name', 'text'],
        ['owner', 'Owner name (as on PAN)', 'text'],
        ['email', 'Email', 'email'],
        ['city', 'City', 'text'],
      ].map(([k, label, type]) => (
        <label key={k} className="block">
          <span className="text-xs font-semibold text-grey-700">{label}</span>
          <input className="input mt-1" type={type} required value={form[k]} onChange={set(k)} />
        </label>
      ))}

      {/* Mobile + OTP */}
      <div className="sm:col-span-2 rounded-xl border border-mist-300 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-grey-700 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4" /> Mobile number <span className="text-red-500">*</span>
          </span>
          {otpState === 'verified' && (
            <span className="chip bg-brand-50 text-brand-700"><CheckCircle2 className="w-3.5 h-3.5" /> Verified</span>
          )}
        </div>
        <div className="flex gap-2">
          <span className="input !w-16 text-center text-grey-500 bg-mist-50">+91</span>
          <input
            className="input"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            value={form.phone}
            disabled={otpState === 'verified'}
            onChange={(e) => {
              setForm({ ...form, phone: e.target.value.replace(/\D/g, '') });
              if (otpState !== 'idle') setOtpState('idle');
            }}
          />
          {otpState !== 'verified' && (
            <button
              type="button"
              disabled={!phoneOk || otpState === 'sending' || timer > 0}
              onClick={handleSendOtp}
              className="btn-primary whitespace-nowrap !px-4"
            >
              {otpState === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : otpState === 'idle' ? 'Send OTP' : timer > 0 ? `Resend ${timer}s` : 'Resend'}
            </button>
          )}
        </div>
        {(otpState === 'sent' || otpState === 'verifying') && (
          <div className="mt-3">
            <p className="text-[11px] text-grey-500 mb-1.5">
              OTP sent to +91 {form.phone}. <span className="text-marigold-700 font-semibold">(Demo: enter any 6 digits, e.g. 123456)</span>
            </p>
            <div className="flex gap-2">
              <input
                className="input tracking-[0.5em] font-bold text-center"
                inputMode="numeric"
                maxLength={6}
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
              <button type="button" disabled={otp.length !== 6 || otpState === 'verifying'} onClick={handleVerifyOtp} className="btn-accent whitespace-nowrap">
                {otpState === 'verifying' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify OTP'}
              </button>
            </div>
            {otpError && <p className="text-xs text-red-600 mt-1">{otpError}</p>}
          </div>
        )}
      </div>

      {/* PAN via DigiLocker */}
      <div className="sm:col-span-2 rounded-xl border border-mist-300 p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <span className="text-xs font-semibold text-grey-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> PAN verification <span className="text-red-500">*</span>
            </span>
            <p className="text-[11px] text-grey-500 mt-0.5">Fetched securely from DigiLocker — no upload needed.</p>
          </div>
          {pan ? (
            <div className="flex items-center gap-3 rounded-lg bg-brand-50 border border-brand-100 px-3 py-2">
              <BadgeCheck className="w-5 h-5 text-brand-600" />
              <div className="text-xs">
                <div className="font-mono font-bold text-black tracking-wider">{pan.pan}</div>
                <div className="text-grey-500">{pan.name} · Verified via DigiLocker</div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setDlOpen(true)}
              disabled={!form.owner.trim()}
              title={!form.owner.trim() ? 'Enter owner name first' : ''}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#1A3B8B] text-white text-sm font-semibold hover:bg-[#152f70] disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" /> Verify PAN with DigiLocker
            </button>
          )}
        </div>
      </div>

      <label className="block">
        <span className="text-xs font-semibold text-grey-700">
          GSTIN <span className="text-grey-400 font-normal">(optional)</span>
        </span>
        <input className="input mt-1 uppercase" maxLength={15} placeholder="Leave blank if not registered" value={form.gst} onChange={set('gst')} />
      </label>
      <label className="block">
        <span className="text-xs font-semibold text-grey-700">Main department</span>
        <select className="input mt-1" value={form.department} onChange={set('department')}>
          {departments.map((d) => (
            <option key={d.id}>{d.name}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="text-xs font-semibold text-grey-700">Approx. number of products</span>
        <input className="input mt-1" type="number" min={1} required value={form.skus} onChange={set('skus')} />
      </label>

      {error && <p className="sm:col-span-2 text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">{error}</p>}

      <button className="btn-accent sm:col-span-2 !py-3 mt-1">
        Submit application <ArrowRight className="w-4 h-4" />
      </button>

      {/* DigiLocker consent (demo) */}
      {dlOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => !dlLoading && setDlOpen(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-[#1A3B8B] text-white px-5 py-4 flex items-center justify-between">
              <div>
                <div className="font-bold">DigiLocker</div>
                <div className="text-[11px] text-white/70">Consent to share document</div>
              </div>
              <button type="button" onClick={() => setDlOpen(false)} disabled={dlLoading} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 text-sm space-y-3">
              <p>
                <strong>MAFTH Marketplace</strong> is requesting access to:
              </p>
              <ul className="rounded-lg bg-mist-50 p-3 space-y-1.5 text-xs">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> PAN Verification Record (Income Tax Dept.)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> Name as on PAN</li>
              </ul>
              <p className="text-[11px] text-grey-500">Demo mode — in production this opens the official DigiLocker login (Aadhaar / mobile OTP).</p>
              <button type="button" onClick={handleDigiLocker} disabled={dlLoading} className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#1A3B8B] text-white font-semibold">
                {dlLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Fetching PAN…
                  </>
                ) : (
                  'Allow & share'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
