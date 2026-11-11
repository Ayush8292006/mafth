import React, { useState } from 'react';
import { UserPlus, Trash2, X } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { ROLES, ROLE_LABELS } from '../../store/useAuthStore';
import { PageHeader, Panel, Table, Td, StatusBadge, Avatar, useActor, shortDate } from '../../components/dashboard/ui';

export default function TeamPage() {
  const { admins, addAdmin, toggleAdminStatus, removeAdmin } = usePlatformStore();
  const actor = useActor();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: ROLES.ADMIN });

  const list = admins;

  const submit = (e) => {
    e.preventDefault();
    addAdmin(form, actor);
    setForm({ name: '', email: '', role: ROLES.ADMIN });
    setShowForm(false);
  };

  return (
    <>
      <PageHeader
        title="Admin Team"
        subtitle="Create Admin accounts. Their access is controlled in Roles & Permissions. Vendors get their seller login when their application is approved."
        actions={
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <UserPlus className="w-4 h-4" /> Add admin
          </button>
        }
      />

      {showForm && (
        <Panel
          title="New admin account"
          className="mb-4"
          action={
            <button onClick={() => setShowForm(false)} className="p-1.5 rounded hover:bg-mist-100" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          }
        >
          <form onSubmit={submit} className="grid sm:grid-cols-4 gap-3 items-end">
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Full name</span>
              <input className="input mt-1" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Work email</span>
              <input className="input mt-1" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Role</span>
              <select className="input mt-1" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value={ROLES.ADMIN}>Admin</option>
              </select>
            </label>
            <button className="btn-accent">Create & send invite</button>
          </form>
        </Panel>
      )}

      <Panel
        title={`${list.length} admins`}
        action={
null
        }
      >
        <Table columns={['Member', 'Role', 'Status', 'Last active', '']}>
          {list.map((a) => (
            <tr key={a.id} className="hover:bg-mist-50">
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={a.name} />
                  <div>
                    <div className="font-semibold text-black">{a.name}</div>
                    <div className="text-xs text-grey-500">{a.email}</div>
                  </div>
                </div>
              </Td>
              <Td>
                <span className="text-xs font-semibold text-brand-800 bg-brand-50 rounded-full px-2 py-0.5">{ROLE_LABELS[a.role]}</span>
              </Td>
              <Td><StatusBadge status={a.status} /></Td>
              <Td className="text-grey-500 text-xs">{shortDate(a.lastActive)}</Td>
              <Td className="text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => toggleAdminStatus(a.id, actor)} className="btn-ghost !px-3 !py-1 text-xs">
                    {a.status === 'Active' ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => window.confirm(`Remove ${a.name}?`) && removeAdmin(a.id, actor)}
                    className="p-1.5 rounded-md text-grey-400 hover:text-red-600 hover:bg-red-50"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
