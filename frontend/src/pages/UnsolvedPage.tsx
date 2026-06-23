import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Search, MapPin, Calendar, HelpCircle } from 'lucide-react';

const CATEGORIES = [
  { id: 'all',      label: 'All'       },
  { id: 'murder',   label: 'Murder'    },
  { id: 'missing',  label: 'Missing'   },
  { id: 'genocide', label: 'Genocide'  },
  { id: 'police',   label: 'Police'    },
  { id: 'other',    label: 'Other'     },
];

const CATEGORY_COLORS: Record<string, string> = {
  murder:   'bg-red-900/80 text-red-300',
  missing:  'bg-blue-900/80 text-blue-300',
  genocide: 'bg-orange-900/80 text-orange-300',
  police:   'bg-zinc-700 text-zinc-300',
  other:    'bg-teal-900/80 text-teal-300',
};

export default function UnsolvedPage() {
  const [cases, setCases]           = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('all');
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal]           = useState(0);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 12, section: 'unsolved' };
      if (category !== 'all') params.category = category;
      if (search) params.search = search;
      const { data } = await api.get('/cases', { params });
      setCases(data.cases || []);
      setTotalPages(data.pages || 1);
      setTotal(data.total || 0);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchCases(); }, [page, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchCases();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle size={28} className="text-red-500" />
          <h1 className="text-3xl font-black text-white">Unsolved Cases</h1>
        </div>
        <p className="text-zinc-400">
          {total} documented cases that remain unsolved — no suspect charged, no conviction, no closure.
        </p>
      </div>

      {/* Banner */}
      <div className="bg-red-950/30 border border-red-900/40 rounded-xl p-4 mb-6 text-sm text-red-300">
        <span className="font-semibold text-red-400">🔍 Cold &amp; Open:</span> These cases have no confirmed perpetrator.
        Evidence may exist, suspects may have been named, but no one has been convicted.
        Some remain active investigations.
      </div>

      {/* Search + Category — identical to Real Cases */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              className="input pl-9"
              placeholder="Search unsolved cases..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary px-5">Search</button>
        </form>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setCategory(cat.id); setPage(1); }}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                category === cat.id
                  ? 'bg-red-700 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >{cat.label}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => <div key={i} className="card h-64 animate-pulse" />)}
        </div>
      ) : cases.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">No unsolved cases found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cases.map((c: any) => {
            const coverImage = c.media?.find((m: any) => m.type === 'image');
            const color = CATEGORY_COLORS[c.category] || CATEGORY_COLORS.other;
            return (
              <Link
                key={c.id}
                to={`/cases/${c.id}`}
                className="card hover:border-red-900 transition-colors group block"
              >
                <div className="relative h-44 bg-zinc-800 overflow-hidden">
                  {coverImage ? (
                    <img src={coverImage.url} alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <HelpCircle size={40} className="text-zinc-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-900/80 to-transparent" />
                  <span className={`badge absolute top-3 left-3 ${color}`}>{c.category}</span>
                  <span className="badge absolute top-3 right-3 bg-red-950/90 text-red-400 border border-red-800">
                    UNSOLVED
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-base leading-tight mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{c.summary}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
                    {c.location && <span className="flex items-center gap-1"><MapPin size={11} />{c.location}</span>}
                    {c.date     && <span className="flex items-center gap-1"><Calendar size={11} />{c.date}</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                page === i + 1 ? 'bg-red-700 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  );
}
