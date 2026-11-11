import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, X, Clock } from 'lucide-react';
import { usePlatformStore } from '../../store/usePlatformStore';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { PageHeader, Panel, Table, Td, StatusBadge, Toggle, FilterTabs, inr, useActor, useMyShop } from '../../components/dashboard/ui';
import { cn } from '../../lib/utils';

const PAGE = 15;

export default function MyProductsPage() {
  const { vendorId, vendorName } = useMyShop();
  const actor = useActor();
  const { vendorProducts, listingOverrides, updateListing, addVendorProduct } = usePlatformStore();
  const [params, setParams] = useSearchParams();
  const [tab, setTab] = useState('Live listings');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const showForm = params.get('new') === '1';

  const mine = useMemo(() => products.filter((p) => p.vendorId === vendorId), [vendorId]);
  const submitted = vendorProducts.filter((p) => p.vendorId === vendorId);
  const presetImages = useMemo(() => [...new Set(mine.map((p) => p.primaryImage))].slice(0, 8), [mine]);

  const [form, setForm] = useState({ title: '', category: categories[0].slug, price: '', mrp: '', stock: '', image: '', description: '' });
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const filtered = mine.filter((p) => !q || p.title.toLowerCase().includes(q.toLowerCase()));
  const pageItems = filtered.slice((page - 1) * PAGE, page * PAGE);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));

  const submit = (e) => {
    e.preventDefault();
    addVendorProduct({ ...form, image: form.image || presetImages[0], vendorId, vendorName }, actor);
    setForm({ title: '', category: categories[0].slug, price: '', mrp: '', stock: '', image: '', description: '' });
    setParams({});
    setTab('Submitted for approval');
  };

  return (
    <>
      <PageHeader
        title="My Products"
        subtitle="Only your shop's products. New products go live after MAFTH Admin approves them."
        actions={
          <button onClick={() => setParams({ new: '1' })} className="btn-primary">
            <Plus className="w-4 h-4" /> Add product
          </button>
        }
      />

      {showForm && (
        <Panel
          title="Add a new product"
          subtitle="Fill the basics — you can add more details after approval."
          className="mb-4"
          action={
            <button onClick={() => setParams({})} className="p-1.5 rounded hover:bg-mist-100" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          }
        >
          <form onSubmit={submit} className="grid md:grid-cols-3 gap-4">
            <label className="block md:col-span-2">
              <span className="text-xs font-semibold text-grey-700">Product name</span>
              <input className="input mt-1" required value={form.title} onChange={f('title')} placeholder="e.g. Hand-block Printed Cotton Kurta" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Department</span>
              <select className="input mt-1" value={form.category} onChange={f('category')}>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Selling price (₹)</span>
              <input className="input mt-1" type="number" min={1} required value={form.price} onChange={f('price')} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">MRP (₹)</span>
              <input className="input mt-1" type="number" min={1} value={form.mrp} onChange={f('mrp')} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-grey-700">Stock quantity</span>
              <input className="input mt-1" type="number" min={0} required value={form.stock} onChange={f('stock')} />
            </label>
            <label className="block md:col-span-3">
              <span className="text-xs font-semibold text-grey-700">Description</span>
              <textarea className="input mt-1 min-h-[70px]" value={form.description} onChange={f('description')} />
            </label>
            <div className="md:col-span-3">
              <span className="text-xs font-semibold text-grey-700">Product photo</span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {presetImages.map((img) => (
                  <button
                    type="button"
                    key={img}
                    onClick={() => setForm({ ...form, image: img })}
                    className={cn('w-16 h-20 rounded-md overflow-hidden border-2', (form.image || presetImages[0]) === img ? 'border-brand-600' : 'border-transparent')}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <input className="input mt-2" placeholder="…or paste an image URL" value={presetImages.includes(form.image) ? '' : form.image} onChange={f('image')} />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button className="btn-accent">Submit for approval</button>
            </div>
          </form>
        </Panel>
      )}

      <div className="mb-4">
        <FilterTabs
          options={['Live listings', 'Submitted for approval']}
          value={tab}
          onChange={setTab}
          counts={{ 'Live listings': mine.length, 'Submitted for approval': submitted.length }}
        />
      </div>

      {tab === 'Live listings' ? (
        <Panel
          title={
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-grey-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input className="input !py-2 pl-9" placeholder="Search my products…" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
            </div>
          }
          action={<span className="text-xs text-grey-500">Edit price & stock inline — saved instantly</span>}
        >
          <Table columns={['Product', 'Department', 'Price (₹)', 'Stock', 'Visible', '']}>
            {pageItems.map((p) => {
              const o = listingOverrides[p.id] || {};
              const stock = o.stock ?? p.stock;
              return (
                <tr key={p.id} className="hover:bg-mist-50">
                  <Td className="max-w-[340px]">
                    <div className="flex items-center gap-3">
                      <img src={p.primaryImage} alt="" className="w-10 h-12 rounded object-cover bg-mist-100" />
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{p.title}</div>
                        <div className="text-xs text-grey-500">{p.id} · MRP {inr(p.mrp)}</div>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-xs">{categories.find((c) => c.slug === p.category)?.name}</Td>
                  <Td>
                    <input type="number" className="input !w-24 !py-1 text-xs font-semibold" defaultValue={o.price ?? p.price}
                      onBlur={(e) => updateListing(p.id, { price: Number(e.target.value) })} />
                  </Td>
                  <Td>
                    <input type="number" className={cn('input !w-20 !py-1 text-xs font-semibold', stock <= 5 && '!border-marigold-500 bg-marigold-50')} defaultValue={stock}
                      onBlur={(e) => updateListing(p.id, { stock: Number(e.target.value) })} />
                  </Td>
                  <Td>
                    <Toggle checked={o.active !== false} onChange={() => updateListing(p.id, { active: o.active === false })} label="Visible on store" />
                  </Td>
                  <Td>{stock <= 5 && <span className="text-[11px] font-semibold text-marigold-700">Low stock</span>}</Td>
                </tr>
              );
            })}
          </Table>
          <div className="flex items-center justify-between mt-4 text-xs text-grey-500">
            <span>{filtered.length} products</span>
            <div className="flex items-center gap-2">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn-ghost !py-1 !px-3 text-xs disabled:opacity-40">Prev</button>
              <span>{page} / {pages}</span>
              <button disabled={page === pages} onClick={() => setPage(page + 1)} className="btn-ghost !py-1 !px-3 text-xs disabled:opacity-40">Next</button>
            </div>
          </div>
        </Panel>
      ) : (
        <Panel title="Submitted products">
          {submitted.length === 0 ? (
            <p className="text-center text-sm text-grey-500 py-10">You haven't submitted any new products yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {submitted.map((p) => (
                <div key={p.id} className="flex gap-3 border border-mist-300 rounded-lg p-3">
                  <img src={p.image} alt="" className="w-16 h-20 rounded object-cover bg-mist-100" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2"><span className="text-sm font-semibold truncate">{p.title}</span><StatusBadge status={p.status} /></div>
                    <div className="text-xs text-grey-500 mt-1">{inr(p.price)} · {p.stock} in stock</div>
                    {p.status === 'Pending' && (
                      <div className="text-[11px] text-grey-500 mt-2 flex items-center gap-1"><Clock className="w-3 h-3" /> Waiting for Admin review</div>
                    )}
                    {p.status === 'Approved' && <div className="text-[11px] text-brand-700 font-semibold mt-2">Live on the storefront</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}
    </>
  );
}
