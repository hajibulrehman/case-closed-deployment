import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { CheckCircle, XCircle, Eye, Clock, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

export default function AdminStories() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [noteModal, setNoteModal] = useState<{ id: string; action: string } | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const fetchStories = () => {
    setLoading(true);
    api.get(`/stories/admin/all?status=${filter}`).then(r => setStories(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchStories(); }, [filter]);

  const moderate = async (id: string, status: string, note?: string) => {
    await api.patch(`/stories/${id}/moderate`, { status, adminNote: note });
    setStories(stories.map(s => s.id === id ? { ...s, status, adminNote: note } : s));
    toast.success(`Story ${status}`);
    setNoteModal(null);
    setAdminNote('');
  };

  const deleteStory = async (id: string) => {
    if (!confirm('Delete this story?')) return;
    await api.delete(`/stories/${id}`);
    setStories(stories.filter(s => s.id !== id));
    toast.success('Story deleted');
  };

  const statusIcon = (s: string) => {
    if (s === 'published') return <CheckCircle size={14} className="text-green-500" />;
    if (s === 'pending') return <Clock size={14} className="text-amber-500" />;
    if (s === 'rejected') return <XCircle size={14} className="text-red-500" />;
    return null;
  };

  return (
    <div>
      {/* Note Modal */}
      {noteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="card p-5 w-full max-w-md">
            <h3 className="font-bold text-white mb-3">
              {noteModal.action === 'published' ? '✅ Approve Story' : '❌ Reject Story'}
            </h3>
            <textarea
              className="input mb-4 min-h-[80px]"
              placeholder="Admin note for the author (optional)..."
              value={adminNote}
              onChange={e => setAdminNote(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={() => moderate(noteModal.id, noteModal.action, adminNote)}
                className={noteModal.action === 'published' ? 'btn-primary' : 'bg-red-800 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors'}
              >
                Confirm
              </button>
              <button onClick={() => { setNoteModal(null); setAdminNote(''); }} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Moderate Stories</h2>
        <div className="flex gap-1">
          {['pending', 'published', 'rejected', 'all'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize transition-colors ${filter === f ? 'bg-amber-900/60 text-amber-300' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
            >{f}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="card h-16 animate-pulse" />)}</div>
      ) : stories.length === 0 ? (
        <div className="text-center py-8 text-zinc-500">No {filter} stories.</div>
      ) : (
        <div className="space-y-2">
          {stories.map(s => (
            <div key={s.id} className="card p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {statusIcon(s.status)}
                    <span className="text-xs text-zinc-500 capitalize">{s.status}</span>
                    <span className="text-xs text-zinc-600">·</span>
                    <span className="text-xs text-zinc-500 capitalize">{s.type}</span>
                    {s.genre && <span className="badge bg-zinc-700 text-zinc-400">{s.genre}</span>}
                  </div>
                  <h3 className="font-semibold text-white truncate">{s.title}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    by <span className="text-zinc-300">{s.author?.username}</span> · {formatDistanceToNow(new Date(s.createdAt), { addSuffix: true })}
                  </p>
                  {s.adminNote && <p className="text-xs text-amber-400 mt-1">Note: {s.adminNote}</p>}
                </div>
                <div className="flex gap-1 flex-shrink-0 flex-wrap justify-end">
                  {s.status === 'published' && (
                    <Link to={`/stories/${s.id}`} target="_blank" className="text-zinc-400 hover:text-white p-1.5 hover:bg-zinc-700 rounded transition-colors">
                      <Eye size={14} />
                    </Link>
                  )}
                  {s.status !== 'published' && (
                    <button onClick={() => setNoteModal({ id: s.id, action: 'published' })}
                      className="text-xs px-2 py-1 bg-green-900/50 text-green-400 hover:bg-green-900 rounded-lg font-medium transition-colors">
                      Approve
                    </button>
                  )}
                  {s.status !== 'rejected' && (
                    <button onClick={() => setNoteModal({ id: s.id, action: 'rejected' })}
                      className="text-xs px-2 py-1 bg-red-950/50 text-red-400 hover:bg-red-950 rounded-lg font-medium transition-colors">
                      Reject
                    </button>
                  )}
                  <button onClick={() => deleteStory(s.id)} className="text-red-500 hover:text-red-400 p-1.5 hover:bg-red-950/30 rounded transition-colors">
                    <Trash2 size={14} />
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
