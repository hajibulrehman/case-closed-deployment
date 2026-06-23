import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import StoryCard from '../components/StoryCard';
import { Search, PenLine } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const GENRES = ['all', 'thriller', 'mystery', 'horror', 'drama', 'fantasy'];

export default function StoriesPage() {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 12 };
      if (search) params.search = search;
      if (genre !== 'all') params.genre = genre;
      const { data } = await api.get('/stories/fantasy', { params });
      setStories(data.stories || []);
      setTotalPages(data.pages || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStories(); }, [page, genre]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchStories();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Fiction Stories</h1>
          <p className="text-zinc-400">User-written stories reimagining real events with alternate plots.</p>
        </div>
        {user && (
          <Link to="/dashboard/write" className="btn-primary flex items-center gap-2 flex-shrink-0">
            <PenLine size={16} /> Write Story
          </Link>
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 mb-6 text-sm text-zinc-400">
        <span className="text-white font-semibold">📖 Fiction Zone:</span> These are creative stories written by users. They are inspired by real events but contain fictional elements and alternate plotlines. Original cases remain unchanged.
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input className="input pl-9" placeholder="Search stories..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary px-5">Search</button>
        </form>
        <div className="flex gap-2 flex-wrap">
          {GENRES.map(g => (
            <button
              key={g}
              onClick={() => { setGenre(g); setPage(1); }}
              className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize transition-colors ${
                genre === g ? 'bg-red-700 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => <div key={i} className="card h-52 animate-pulse" />)}
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📖</div>
          <p className="text-zinc-500 mb-4">No stories found. Be the first to write one!</p>
          {user && <Link to="/dashboard/write" className="btn-primary">Write a Story</Link>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stories.map((s: any) => <StoryCard key={s.id} {...s} />)}
        </div>
      )}

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
