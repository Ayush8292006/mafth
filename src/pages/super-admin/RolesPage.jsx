import React, { useState } from 'react';
import { Crown, ShieldCheck, Handshake, ShoppingBag, Check } from 'lucide-react';
import { usePlatformStore, MODULES, ACTIONS } from '../../store/usePlatformStore';
import { ROLES } from '../../store/useAuthStore';
import { PageHeader, Panel, Toggle, useActor } from '../../components/dashboard/ui';
import { cn } from '../../lib/utils';

const ROLE_INFO = [
  { role: ROLES.SUPER_ADMIN, label: 'Super Admin', icon: Crown, text: 'Everything, always. Cannot be restricted.', fixed: true },
  { role: ROLES.ADMIN, label: 'Admin', icon: ShieldCheck, text: 'Vendor approvals, product approvals, orders, customers, support.' },
  { role: ROLES.PARTNERSHIP_MANAGER, label: 'Partnership Manager (Vendor)', icon: Handshake, text: 'Each vendor sees only their own shop, products, orders and payouts.', fixed: true },
  { role: ROLES.USER, label: 'Customer', icon: ShoppingBag, text: 'Storefront only: shop, cart, wishlist, orders.', fixed: true },
];

export default function RolesPage() {
  const { permissions, togglePermission } = usePlatformStore();
  const actor = useActor();
  const [role, setRole] = useState(ROLES.ADMIN);

  return (
    <>
      <PageHeader
        title="Roles & Permissions"
        subtitle="MAFTH has 4 roles. Choose exactly what Admins can see and do — vendors are always limited to their own shop."
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {ROLE_INFO.map(({ role: r, label, icon: Icon, text, fixed }) => (
          <button
            key={r}
            disabled={fixed}
            onClick={() => setRole(r)}
            className={cn(
              'text-left rounded-lg border p-4 transition-all',
              role === r ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-100' : 'border-mist-300 bg-white',
              fixed ? 'opacity-80 cursor-default' : 'hover:border-brand-600'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={cn('w-9 h-9 rounded-md flex items-center justify-center', r === ROLES.SUPER_ADMIN ? 'bg-marigold-400' : 'bg-brand-700 text-white')}>
                <Icon className="w-[18px] h-[18px]" />
              </span>
              {fixed && <span className="text-[10px] font-bold uppercase tracking-wider text-grey-400">Fixed</span>}
            </div>
            <div className="font-bold text-black">{label}</div>
            <div className="text-xs text-grey-500 mt-0.5">{text}</div>
          </button>
        ))}
      </div>

      <Panel
        title={`Permission matrix — ${ROLE_INFO.find((r) => r.role === role).label}`}
        subtitle="Changes apply instantly to every account with this role."
        bodyClass="p-0"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-grey-500 border-b border-mist-200 bg-mist-50">
                <th className="text-left font-semibold px-5 py-3">Module</th>
                {ACTIONS.map((a) => (
                  <th key={a} className="font-semibold px-4 py-3 capitalize">{a}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-mist-200">
              {MODULES.map((m) => (
                <tr key={m.key} className="hover:bg-mist-50">
                  <td className="px-5 py-3 font-semibold text-black whitespace-nowrap">{m.label}</td>
                  {ACTIONS.map((a) => (
                    <td key={a} className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <Toggle
                          label={`${m.label} ${a}`}
                          checked={!!permissions[role]?.[m.key]?.[a]}
                          disabled={a !== 'view' && !permissions[role]?.[m.key]?.view}
                          onChange={() => togglePermission(role, m.key, a, actor)}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-mist-200 text-xs text-grey-500 flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-brand-600" /> Turn on “view” first — other actions need it. Saved automatically.
        </div>
      </Panel>
    </>
  );
}
