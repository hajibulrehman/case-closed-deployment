import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import CaseCard from '../components/CaseCard';
import StoryCard from '../components/StoryCard';
import { Shield, BookOpen, ArrowRight, TrendingUp } from 'lucide-react';

export default function Home() {
  const [featuredCases, setFeaturedCases] = useState([]);
  const [recentStories, setRecentStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/cases/featured'),
      api.get('/stories/fantasy?limit=3')
    ]).then(([casesRes, storiesRes]) => {
      setFeaturedCases(casesRes.data);
      setRecentStories(storiesRes.data.stories || []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-zinc-950 border-b border-zinc-800 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(127,29,29,0.15)_0%,_transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-red-950/50 border border-red-900/50 text-red-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Real Cases · Fiction · True Crime
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            The Truth Behind
            <span className="text-red-600 block">Every Case</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Explore real-world criminal cases, missing persons, and historical events — then read creative fiction that reimagines them.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/cases" className="btn-primary flex items-center gap-2">
              <Shield size={16} /> Browse Real Cases
            </Link>
            <Link to="/stories" className="btn-secondary flex items-center gap-2">
              <BookOpen size={16} /> Read Fiction Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-center">
          {[
            { label: 'Real Cases', value: '100+', icon: '⚖' },
            { label: 'Fiction Stories', value: '500+', icon: '📖' },
            { label: 'Categories', value: '8+', icon: '🗂' },
            { label: 'Contributors', value: '1000+', icon: '👥' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Cases */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-red-500" />
            <h2 className="text-xl font-bold text-white">Featured Cases</h2>
          </div>
          <Link to="/cases" className="text-sm text-red-500 hover:text-red-400 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card h-64 animate-pulse bg-zinc-900" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCases.map((c: any) => (
              <CaseCard key={c.id} {...c} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Stories */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-zinc-400" />
            <h2 className="text-xl font-bold text-white">Recent Fiction</h2>
          </div>
          <Link to="/stories" className="text-sm text-zinc-400 hover:text-white flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <div key={i} className="card h-52 animate-pulse" />)}
          </div>
        ) : recentStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentStories.map((s: any) => <StoryCard key={s.id} {...s} />)}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <BookOpen size={40} className="text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500">No stories yet. Be the first to write one!</p>
            <Link to="/dashboard/write" className="btn-secondary mt-4 inline-block">Write a Story</Link>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-red-950/30 border-t border-red-900/30 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Have a Story to Tell?</h2>
          <p className="text-zinc-400 mb-6">Write your own fiction inspired by real events, or submit a real case for review.</p>
          <Link to="/register" className="btn-primary">Get Started Free</Link>
        </div>
      </section>
    </div>
  );
}
