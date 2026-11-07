import React from 'react';
import { useAuthStore, ROLE_LABELS } from '../../store/useAuthStore';
import { usePlatformStore } from '../../store/usePlatformStore';
import { cn } from '../../lib/utils';

/* ---------- hooks ---------- */
export function useActor() {
  const { staff, currentRole } = useAuthStore();
  return { name: staff?.name || 'Unknown', role: currentRole, roleLabel: ROLE_LABELS[currentRole] };
}

export function useCan() {
  const role = useAuthStore((s) => s.currentRole);
  const can = usePlatformStore((s) => s.can);
  usePlatformStore((s) => s.permissions); // re-render when matrix changes
  return (module, action = 'view') => can(role, module, action);
}

/* ---------- formatting ---------- */
export const inr = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);

export const inrCompact = (n) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  return inr(n);
};

export const shortDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

/* ---------- layout pieces ---------- */
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
      <div>
        <h1 className="font-display text-2xl sm:text-[28px] font-bold text-black leading-tight">{title}</h1>
        {subtitle && <p className="text-sm text-grey-500 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ title, subtitle, action, children, className, bodyClass }) {
  return (
    <section className={cn('bg-white border border-mist-300 rounded-lg', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-mist-200">
          <div>
            {title &&
              (typeof title === 'string' ? (
                <h2 className="font-display text-base font-bold text-black">{title}</h2>
              ) : (
                title
              ))}
            {subtitle && <p className="text-xs text-grey-500 mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={cn('p-5', bodyClass)}>{children}</div>
    </section>
  );
}

const TONES = {
  brand: 'bg-brand-50 text-brand-700',
  gold: 'bg-marigold-50 text-marigold-700',
  ink: 'bg-brand-900 text-white',
  blue: 'bg-blue-50 text-blue-700',
};

export function StatCard({ label, value, hint, icon: Icon, tone = 'brand', trend }) {
  return (
    <div className="bg-white border border-mist-300 rounded-lg p-5 flex flex-col gap-3 hover:shadow-card transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-grey-500 uppercase tracking-wide">{label}</span>
        {Icon && (
          <span className={cn('w-9 h-9 rounded-md flex items-center justify-center', TONES[tone])}>
            <Icon className="w-[18px] h-[18px]" />
          </span>
        )}
      </div>
      <div className="font-display text-2xl font-bold text-black">{value}</div>
      {(hint || trend) && (
        <div className="text-xs text-grey-500 flex items-center gap-2">
          {trend && (
            <span className={cn('font-bold', trend.startsWith('-') ? 'text-status-error' : 'text-status-success')}>
              {trend}
            </span>
          )}
          {hint}
        </div>
      )}
    </div>
  );
}

const STATUS_STYLES = {
  // green
  Active: 'bg-brand-50 text-brand-700 ring-brand-200',
  Approved: 'bg-brand-50 text-brand-700 ring-brand-200',
  Delivered: 'bg-brand-50 text-brand-700 ring-brand-200',
  Paid: 'bg-brand-50 text-brand-700 ring-brand-200',
  Resolved: 'bg-brand-50 text-brand-700 ring-brand-200',
  'KYC Verified': 'bg-brand-50 text-brand-700 ring-brand-200',
  // amber
  Pending: 'bg-marigold-50 text-marigold-700 ring-marigold-200',
  Placed: 'bg-marigold-50 text-marigold-700 ring-marigold-200',
  New: 'bg-marigold-50 text-marigold-700 ring-marigold-200',
  Open: 'bg-marigold-50 text-marigold-700 ring-marigold-200',
  Processing: 'bg-marigold-50 text-marigold-700 ring-marigold-200',
  Medium: 'bg-marigold-50 text-marigold-700 ring-marigold-200',
  // blue
  Packed: 'bg-blue-50 text-blue-700 ring-blue-200',
  Shipped: 'bg-blue-50 text-blue-700 ring-blue-200',
  'In Progress': 'bg-blue-50 text-blue-700 ring-blue-200',
  'Documents Review': 'bg-blue-50 text-blue-700 ring-blue-200',
  Low: 'bg-blue-50 text-blue-700 ring-blue-200',
  // red
  Cancelled: 'bg-red-50 text-red-700 ring-red-200',
  Rejected: 'bg-red-50 text-red-700 ring-red-200',
  Blocked: 'bg-red-50 text-red-700 ring-red-200',
  Suspended: 'bg-red-50 text-red-700 ring-red-200',
  Disabled: 'bg-grey-100 text-grey-600 ring-grey-200',
  'Return Requested': 'bg-red-50 text-red-700 ring-red-200',
  High: 'bg-red-50 text-red-700 ring-red-200',
};

export function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ring-1 ring-inset whitespace-nowrap',
        STATUS_STYLES[status] || 'bg-grey-100 text-grey-600 ring-grey-200'
      )}
    >
      {status}
    </span>
  );
}

export function Table({ columns, children, empty = 'Nothing here yet.' }) {
  const rows = React.Children.toArray(children);
  return (
    <div className="overflow-x-auto -mx-5">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-grey-500 border-b border-mist-200">
            {columns.map((c) => (
              <th key={c} className="font-semibold px-5 py-2.5 whitespace-nowrap">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-mist-200">
          {rows.length ? (
            rows
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-5 py-10 text-center text-grey-500 text-sm">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export const Td = ({ children, className }) => (
  <td className={cn('px-5 py-3 align-middle whitespace-nowrap', className)}>{children}</td>
);

export function Toggle({ checked, onChange, disabled, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={cn(
        'relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
        checked ? 'bg-brand-600' : 'bg-grey-300'
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-[18px]' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}

export function FilterTabs({ options, value, onChange, counts = {} }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors',
            value === o
              ? 'bg-brand-700 text-white border-brand-700'
              : 'bg-white text-grey-700 border-mist-300 hover:border-brand-600'
          )}
        >
          {o}
          {counts[o] !== undefined && <span className="ml-1.5 opacity-70">{counts[o]}</span>}
        </button>
      ))}
    </div>
  );
}

export function NoAccess({ module }) {
  return (
    <div className="bg-white border border-dashed border-mist-400 rounded-lg p-10 text-center">
      <p className="font-display text-lg font-bold text-black">You don't have access to {module}</p>
      <p className="text-sm text-grey-500 mt-1">Ask the Super Admin to enable it in Roles &amp; Permissions.</p>
    </div>
  );
}

export function Avatar({ name, src, size = 'w-8 h-8' }) {
  const letters = (name || '?')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  if (src) return <img src={src} alt="" className={cn(size, 'rounded-full object-cover bg-mist-100')} />;
  return (
    <span className={cn(size, 'rounded-full bg-brand-100 text-brand-800 text-[11px] font-bold flex items-center justify-center flex-shrink-0')}>
      {letters}
    </span>
  );
}

export const CHART = {
  brand: '#0B6B4C',
  brandLight: '#6DBE9C',
  gold: '#F0A800',
  grid: '#E3EBE7',
  axis: '#6E7773',
};
