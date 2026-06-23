import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
  BookOpen, PenLine, FileText, User, Clock,
  CheckCircle, XCircle, Eye, Trash2, ExternalLink,
  TrendingUp, MessageSquare, ThumbsUp, Send, Plus
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import WriteStory from './WriteStory';
import toast from 'react-hot-toast';

// ─── STATUS helpers ───────────────────────────────────────────────────────────
const STATUS_ICON: Record<string, React.ReactNode> = {
  published: <CheckCircle size={13} className="text-green-500" />,
  pending:   <Clock       size={13} className="text-amber-500" />,
  rejected:  <XCircle     size={13} className="text-red-500"   />,
};
const STATUS_COLOR: Record<string, string> = {
  published: 'text-green-400', pending: 'text-amber-400', rejected: 'text-red-400',
  approved:  'text-green-400',
};

// ─── MY STORIES ───────────────────────────────────────────────────────────────
function MyStories() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/stories/user/mine').then(r => setStories(r.data)).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this story permanently?')) return;
    await api.delete(`/stories/${id}`);
    setStories(s => s.filter(x => x.id !== id));
    toast.success('Story deleted');
  };

  if (loading) return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{[...Array(4)].map((_, i) => <div key={i} className="card h-36 animate-pulse" />)}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-white">My Stories</h2>
          <p className="text-xs text-zinc-500 mt-0.5">{stories.length} {stories.length === 1 ? 'story' : 'stories'} written</p>
        </div>
        <Link to="/dashboard/write" className="btn-primary text-sm flex items-center gap-1.5">
          <PenLine size={13} /> New Story
        </Link>
      </div>

      {stories.length === 0 ? (
        <div className="card p-12 text-center">
          <BookOpen size={44} className="text-zinc-700 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">No stories yet</h3>
          <p className="text-zinc-500 text-sm mb-5">Write your first fiction story or submit a real-life account.</p>
          <Link to="/dashboard/write" className="btn-primary inline-flex items-center gap-2"><PenLine size={14} /> Write a Story</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {stories.map(s => (
            <div key={s.id} className="card overflow-hidden hover:border-zinc-600 transition-colors">
              <div className="flex gap-0">
                {/* Cover thumbnail */}
                {s.coverImage && (
                  <div className="w-24 shrink-0 bg-zinc-800 overflow-hidden">
                    <img src={s.coverImage} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 p-4 min-w-0">
                  {/* Status + type row */}
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    {STATUS_ICON[s.status]}
                    <span className={`text-xs font-medium capitalize ${STATUS_COLOR[s.status]}`}>{s.status}</span>
                    <span className="text-zinc-700">·</span>
                    {s.genre && <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full capitalize">{s.genre}</span>}
                    {s.type === 'real' && <span className="text-xs bg-amber-900/40 text-amber-400 px-2 py-0.5 rounded-full">Real Account</span>}
                  </div>

                  <h3 className="font-semibold text-white truncate text-base mb-1">{s.title}</h3>

                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    {s.case && <span className="text-red-500 truncate max-w-[140px]">↗ {s.case.title}</span>}
                    <span className="flex items-center gap-1"><Eye size={10} />{s.views}</span>
                    <span>{formatDistanceToNow(new Date(s.createdAt), { addSuffix: true })}</span>
                  </div>

                  {s.adminNote && (
                    <p className="text-xs text-amber-400 mt-1.5 bg-amber-950/30 rounded px-2 py-1">
                      💬 Admin: {s.adminNote}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-center gap-2 pr-4 shrink-0">
                  {s.status === 'published' && (
                    <Link to={`/stories/${s.id}`}
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-2.5 py-1.5 rounded-lg transition-colors">
                      <ExternalLink size={11} /> View
                    </Link>
                  )}
                  <button onClick={() => handleDelete(s.id)}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 border border-red-900/50 hover:bg-red-950/30 px-2.5 py-1.5 rounded-lg transition-colors">
                    <Trash2 size={11} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MY THEORIES ──────────────────────────────────────────────────────────────
function MyTheories() {
  const { user } = useAuth();
  const [theories, setTheories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [unsolvedCases, setUnsolvedCases] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ caseId: '', title: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/theories/mine'),
      api.get('/cases?section=unsolved&limit=100'),
    ]).then(([t, c]) => {
      setTheories(t.data);
      setUnsolvedCases(c.data.cases || []);
    }).finally(() => setLoading(false));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.caseId || !form.title || !form.content) return toast.error('All fields required');
    setSubmitting(true);
    try {
      const { data } = await api.post('/theories', form);
      setTheories(t => [data, ...t]);
      setForm({ caseId: '', title: '', content: '' });
      setShowForm(false);
      toast.success('Theory posted!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to post');
    } finally { setSubmitting(false); }
  };

  const deleteTheory = async (id: string) => {
    if (!confirm('Delete this theory?')) return;
    await api.delete(`/theories/${id}`);
    setTheories(t => t.filter(x => x.id !== id));
    toast.success('Theory deleted');
  };

  if (loading) return <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="card h-20 animate-pulse" />)}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-white">My Theories</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Your suspect theories on unsolved cases</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="btn-primary text-sm flex items-center gap-1.5">
          <Plus size={13} /> Post Theory
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="card p-5 mb-5 space-y-4 border-t-2 border-t-blue-600">
          <h3 className="font-semibold text-white text-sm">Post a New Theory</h3>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Unsolved Case</label>
            <select className="input" value={form.caseId} onChange={e => setForm({ ...form, caseId: e.target.value })} required>
              <option value="">— Select a case —</option>
              {unsolvedCases.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Theory Title</label>
            <input className="input" placeholder="e.g. The killer was known to the victim" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Your Theory</label>
            <textarea className="input min-h-[120px]" placeholder="Explain your theory with evidence and reasoning..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={submitting} className="btn-primary text-sm">{submitting ? 'Posting...' : 'Post Theory'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
          </div>
        </form>
      )}

      {theories.length === 0 && !showForm ? (
        <div className="card p-10 text-center">
          <MessageSquare size={40} className="text-zinc-700 mx-auto mb-3" />
          <h3 className="text-white font-bold mb-2">No theories yet</h3>
          <p className="text-zinc-500 text-sm mb-4">Post your theories on unsolved cases and let the community vote.</p>
          <button onClick={() => setShowForm(true)} className="btn-primary text-sm inline-flex items-center gap-2">
            <Plus size={13} /> Post Your First Theory
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {theories.map(t => (
            <div key={t.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {t.case && <p className="text-xs text-red-500 mb-1 truncate">↗ {t.case.title}</p>}
                  <h3 className="font-semibold text-white">{t.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{t.content}</p>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mt-2">
                    <span className="flex items-center gap-1"><ThumbsUp size={10} />{t.votes} votes</span>
                    <span>{formatDistanceToNow(new Date(t.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
                <button onClick={() => deleteTheory(t.id)}
                  className="text-zinc-600 hover:text-red-400 p-1.5 transition-colors shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── REAL REQUESTS ────────────────────────────────────────────────────────────
function MyRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', content: '', sources: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api.get('/requests/mine').then(r => setRequests(r.data)).finally(() => setLoading(false));
  }, []);

  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post('/requests', form);
      setRequests(r => [data, ...r]);
      setForm({ title: '', content: '', sources: '' });
      setShowForm(false);
      toast.success('Submitted! Admin will review it.');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit');
    } finally { setSubmitting(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-white">Real Life Submissions</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Submit a real-life account for admin review to publish in the Real Cases section.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm flex items-center gap-1.5">
          <Send size={13} /> New Submission
        </button>
      </div>

      {showForm && (
        <form onSubmit={submitRequest} className="card p-5 mb-5 space-y-4 border-t-2 border-t-red-700">
          <h3 className="font-semibold text-white text-sm">Submit Real Life Account</h3>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Case Title</label>
            <input className="input" placeholder="e.g. The 1987 Riverside Disappearance" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Full Account</label>
            <textarea className="input min-h-[180px]" placeholder="Describe the real-life event in as much detail as possible..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Sources / References <span className="text-zinc-600">(optional)</span></label>
            <input className="input" placeholder="News links, books, documents, court records..." value={form.sources} onChange={e => setForm({ ...form, sources: e.target.value })} />
          </div>
          <div className="bg-amber-950/30 border border-amber-900/40 rounded-lg p-3 text-xs text-amber-300">
            ⚠ Your submission will be reviewed by an admin before publishing. You will be notified of the decision.
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={submitting} className="btn-primary text-sm">{submitting ? 'Submitting...' : 'Submit for Review'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-2">{[...Array(2)].map((_, i) => <div key={i} className="card h-16 animate-pulse" />)}</div>
      ) : requests.length === 0 && !showForm ? (
        <div className="card p-10 text-center">
          <FileText size={40} className="text-zinc-700 mx-auto mb-3" />
          <h3 className="text-white font-bold mb-2">No submissions yet</h3>
          <p className="text-zinc-500 text-sm">Submit a real-life case account for admin review.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map(r => (
            <div key={r.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold capitalize ${STATUS_COLOR[r.status] || 'text-zinc-400'}`}>{r.status}</span>
                    <span className="text-zinc-600 text-xs">{formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })}</span>
                  </div>
                  <h3 className="font-semibold text-white">{r.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{r.content}</p>
                </div>
              </div>
              {r.adminNote && (
                <div className="mt-2 text-xs text-amber-400 bg-amber-950/30 rounded px-3 py-2">
                  💬 Admin: {r.adminNote}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ username: user?.username || '', bio: '' });
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/stories/user/mine').then(r => {
      const s = r.data;
      setStats({
        total: s.length,
        published: s.filter((x: any) => x.status === 'published').length,
        views: s.reduce((acc: number, x: any) => acc + (x.views || 0), 0),
      });
    });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/auth/profile', form);
      toast.success('Profile updated!');
    } catch { toast.error('Failed to update'); }
    finally { setSaving(false); }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-lg font-bold text-white mb-5">Profile Settings</h2>

      {/* Stats row */}
      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Stories Written', value: stats.total,     icon: '📝' },
            { label: 'Published',       value: stats.published, icon: '✅' },
            { label: 'Total Views',     value: stats.views,     icon: '👁' },
          ].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={save} className="card p-5 space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Username</label>
          <input className="input" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Bio</label>
          <textarea className="input min-h-[90px]" placeholder="A little about yourself..."
            value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Email <span className="text-zinc-600">(cannot change)</span></label>
          <input className="input opacity-50 cursor-not-allowed" value={user?.email || ''} disabled />
        </div>
        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function UserDashboard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) navigate('/login');
  }, [user, isLoading]);

  if (!user) return null;

  const tabs = [
    { path: '/dashboard',          label: 'My Stories',   icon: BookOpen       },
    { path: '/dashboard/theories', label: 'My Theories',  icon: MessageSquare  },
    { path: '/dashboard/requests', label: 'Submissions',  icon: FileText       },
    { path: '/dashboard/write',    label: 'Write Story',  icon: PenLine        },
    { path: '/dashboard/profile',  label: 'Profile',      icon: User           },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Profile header */}
      <div className="card p-5 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-700 flex items-center justify-center text-2xl font-black text-white shrink-0">
          {user.username[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-black text-xl text-white">{user.username}</h1>
          <p className="text-xs text-zinc-500">{user.email}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Link to="/dashboard/write" className="btn-primary text-sm flex items-center gap-1.5">
            <PenLine size={13} /> Write Story
          </Link>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 mb-6 border border-zinc-800 overflow-x-auto">
        {tabs.map(tab => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              isActive(tab.path)
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <tab.icon size={13} /> {tab.label}
          </Link>
        ))}
      </div>

      {/* Content */}
      <Routes>
        <Route index             element={<MyStories   />} />
        <Route path="theories"   element={<MyTheories  />} />
        <Route path="requests"   element={<MyRequests  />} />
        <Route path="write"      element={<WriteStory  />} />
        <Route path="profile"    element={<Profile     />} />
      </Routes>
    </div>
  );
}
