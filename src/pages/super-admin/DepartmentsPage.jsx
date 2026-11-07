import React from 'react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { PageHeader, Toggle, useActor } from '../../components/dashboard/ui';

export default function DepartmentsPage() {
  const { departments, toggleDepartment, setDepartmentCommission } = usePlatformStore();
  const actor = useActor();
  const live = departments.filter((d) => d.enabled).length;

  return (
    <>
      <PageHeader
        title="Departments"
        subtitle={`${live} of ${departments.length} departments live on the storefront. Set commission per department.`}
      />
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {departments.map((d) => (
          <div key={d.id} className={`bg-white border rounded-lg overflow-hidden transition-all ${d.enabled ? 'border-mist-300' : 'border-dashed border-mist-400 opacity-70'}`}>
            <div className="relative h-28">
              <img src={d.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div className="text-white">
                  <div className="font-display text-lg font-bold leading-tight">{d.name}</div>
                  <div className="text-xs text-white/70">{d.products} products</div>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${d.enabled ? 'bg-marigold-400 text-black' : 'bg-white/20 text-white'}`}>
                  {d.enabled ? 'Live' : 'Hidden'}
                </span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-sm">
                <span className="text-grey-500 text-xs font-semibold">Commission</span>
                <input
                  type="number"
                  min={0}
                  max={40}
                  value={d.commission}
                  onChange={(e) => setDepartmentCommission(d.id, Number(e.target.value))}
                  className="input !w-20 !py-1.5 text-center font-semibold"
                />
                <span className="text-grey-500">%</span>
              </label>
              <div className="flex items-center gap-2 text-xs text-grey-500">
                Visible <Toggle checked={d.enabled} onChange={() => toggleDepartment(d.id, actor)} label={`Toggle ${d.name}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
