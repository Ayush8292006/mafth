import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, BadgeCheck, Search, Store, ArrowRight } from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import { categories } from '../../data/categories';

/** Vendor directory — the heart of a multi-vendor marketplace */
export default function ShopsPage() {
  const [shops, setShops] = useState([]);
  const [dept, setDept] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('rating');

  useEffect(() => {
    mockApi.getVendorsWithStats().then(setShops);
  }, []);

  const list = useMemo(() => {
    let l = shops.filter((s) => s.liveProducts > 0);
    if (dept !== 'all') l = l.filter((s) => s.departments.includes(dept));
    if (q) l = l.filter((s) => `${s.name} ${s.location} ${s.description}`.toLowerCase().includes(q.toLowerCase()));
    return [...l].sort((a, b) => (sort === 'rating' ? b.rating - a.rating : sort === 'products' ? b.liveProducts - a.liveProducts : b.reviewsCount - a.reviewsCount));
  }, [shops, dept, q, sort]);

  return (
    <div className="bg-mist-50 min-h-screen">
      <section className="bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-marigold-300 flex items-center gap-2">
              <Store className="w-4 h-4" /> Shop by seller
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold mt-3 leading-tight">
              {shops.filter((s) => s.liveProducts > 0).length} independent shops.<br />
              <span className="text-marigold-400">One cart.</span>
            </h1>
            <p className="text-white/70 mt-3 max-w-xl text-sm">
              Every product on MAFTH is sold by a verified vendor. Visit their shop, compare sellers and check out from many shops in one go.
            </p>
          </div>
          <Link to="/partner-with-us" className="btn-accent !rounded-full self-start md:self-auto">
            Open your own shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between mb-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[{ slug: 'all', name: 'All departments' }, ...categories].map((c) => (
              <button
                key={c.slug}
                onClick={() => setDept(c.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${
                  dept === c.slug ? 'bg-brand-700 text-white border-brand-700' : 'bg-white border-mist-300 text-grey-700 hover:border-brand-600'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-grey-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input className="input !py-2 pl-9 !w-56" placeholder="Search shops…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <select className="input !py-2 !w-40" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="rating">Top rated</option>
              <option value="products">Most products</option>
              <option value="reviews">Most reviewed</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((s) => (
            <Link
              key={s.id}
              to={`/vendor/${s.slug}`}
              className="group bg-white rounded-xl border border-mist-300 overflow-hidden hover:border-brand-600 hover:shadow-lift transition-all"
            >
              <div className="relative h-32 bg-brand-800">
                <img src={s.banner} alt="" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
              </div>
              <div className="px-5 pb-5 -mt-8 relative">
                <img src={s.logo} alt="" className="w-16 h-16 rounded-xl border-4 border-white object-cover bg-mist-100 shadow-card" />
                <div className="flex items-center gap-1.5 mt-3">
                  <h3 className="font-display text-lg font-bold text-black group-hover:text-brand-700">{s.name}</h3>
                  {s.verified && <BadgeCheck className="w-4 h-4 text-brand-600" />}
                </div>
                <div className="flex items-center gap-3 text-xs text-grey-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-marigold-500 text-marigold-500" />
                    <strong className="text-black">{s.rating}</strong> ({s.reviewsCount})
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {s.location}
                  </span>
                </div>
                <p className="text-xs text-grey-600 mt-2 line-clamp-2">{s.description}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-mist-200 text-xs">
                  <span className="text-grey-500">
                    <strong className="text-black">{s.liveProducts}</strong> products · {s.metrics?.fulfillmentRate} on-time
                  </span>
                  <span className="font-semibold text-brand-700 flex items-center gap-1">
                    Visit shop <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {list.length === 0 && <p className="text-center text-sm text-grey-500 py-16">No shops match your filters.</p>}
      </div>
    </div>
  );
}
