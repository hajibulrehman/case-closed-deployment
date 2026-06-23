import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Search, Clock, Eye } from 'lucide-react';

const CATEGORIES = [
  { id: 'all',              label: 'All'               },
  { id: 'crime-techniques', label: 'Crime Techniques'  },
  { id: 'investigation',    label: 'Investigation'     },
  { id: 'legal',            label: 'Legal Knowledge'   },
  { id: 'evidence',         label: 'Evidence'          },
  { id: 'profiling',        label: 'Criminal Profiles' },
  { id: 'detective',        label: 'Detective Training'},
];

const CATEGORY_COLORS: Record<string, string> = {
  'crime-techniques': 'bg-red-900/80 text-red-300',
  'investigation':    'bg-blue-900/80 text-blue-300',
  'legal':            'bg-amber-900/80 text-amber-300',
  'evidence':         'bg-teal-900/80 text-teal-300',
  'profiling':        'bg-purple-900/80 text-purple-300',
  'detective':        'bg-green-900/80 text-green-300',
};

function readTime(content: string) {
  return Math.ceil((content || '').split(' ').length / 200);
}

export default function LearnPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch]     = useState('');
  const [page, setPage]         = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 12 };
      if (category !== 'all') params.category = category;
      if (search) params.search = search;
      const { data } = await api.get('/articles', { params });
      setArticles(data.articles || []);
      setTotalPages(data.pages || 1);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchArticles(); }, [page, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchArticles();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Learn</h1>
        <p className="text-zinc-400">Deep-dive articles on crime techniques, forensics, psychology, and the law.</p>
      </div>

      {/* Search + Category row — identical layout to Real Cases */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              className="input pl-9"
              placeholder="Search articles..."
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

      {/* Grid — 4 columns same as Real Cases */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => <div key={i} className="card h-64 animate-pulse" />)}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">No articles found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {articles.map(a => (
            <Link
              key={a.id}
              to={`/learn/${a.slug}`}
              className="card hover:border-red-900 transition-colors group block"
            >
              {/* Image — same h-44 as CaseCard */}
              <div className="relative h-44 bg-zinc-800 overflow-hidden">
                {a.coverImage ? (
                  <img
                    src={a.coverImage}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl opacity-20">📖</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-zinc-900/80 to-transparent" />
                <span className={`badge absolute top-3 left-3 capitalize text-xs ${CATEGORY_COLORS[a.category] || 'bg-zinc-700 text-zinc-300'}`}>
                  {a.category.replace(/-/g, ' ')}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-white text-base leading-tight mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{a.summary}</p>
                <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Clock size={11} />{readTime(a.content)} min read</span>
                  <span className="flex items-center gap-1"><Eye size={11} />{a.views} views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
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
