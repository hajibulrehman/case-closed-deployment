import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

export default function AdminRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [modal, setModal] = useState<{ req: any; action: string } | null>(null);
  const [note, setNote] = useState('');

  const fetch = () => {
    setLoading(true);
    api.get(`/requests/admin/all?status=${filter === 'all' ? '' : filter}`)
      .then(r => setRequests(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, [filter]);

  const decide = async (id: string, status: string, adminNote: string) => {
    await api.patch(`/requests/${id}`, { status, adminNote });
    setRequests(requests.map(r => r.id === id ? { ...r, status, adminNote } : r));
    toast.success(status === 'approved' ? 'Request approved and story created!' : 'Request rejected');
    setModal(null);
    setNote('');
  };

  const statusColor = (s: string) => {
    if (s === 'approved') return 'text-green-400';
    if (s === 'rejected') return 'text-red-400';
    return 'text-amber-400';
  };

  return (
    <div>
      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="card p-5 w-full max-w-md">
            <h3 className="font-bold text-white mb-1">{modal.action === 'approved' ? '✅ Approve Request' : '❌ Reject Request'}</h3>
            <p className="text-zinc-400 text-sm mb-3">"{modal.req.title}"</p>
            {modal.action === 'approved' && (
              <p className="text-xs text-green-400 mb-3">This will publish a real-life story in the Real Life section.</p>
            )}
            <textarea className="input mb-4 min-h-[70px]" placeholder="Message to user (optional)..." value={note} onChange={e => setNote(e.target.value)} />
            <div className="flex gap-2">
              <button onClick={() => decide(modal.req.id, modal.action, note)} className={modal.action === 'approved' ? 'btn-primary' : 'bg-red-800 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg'}>Confirm</button>
              <button onClick={() => { setModal(null); setNote(''); }} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Real Life Requests</h2>
        <div className="flex gap-1">
          {['pending', 'approved', 'rejected', 'all'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize transition-colors ${filter === f ? 'bg-amber-900/60 text-amber-300' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
            >{f}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="card h-20 animate-pulse" />)}</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-8 text-zinc-500">No {filter} requests.</div>
      ) : (
        <div className="space-y-3">
          {requests.map(r => (
            <div key={r.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold capitalize ${statusColor(r.status)}`}>{r.status}</span>
                    <span className="text-xs text-zinc-500">by {r.user?.username} · {formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })}</span>
                  </div>
                  <h3 className="font-semibold text-white">{r.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{r.content}</p>
                  {r.sources && <p className="text-xs text-zinc-500 mt-1">Sources: {r.sources}</p>}
                  {r.adminNote && <p className="text-xs text-amber-400 mt-1">Note: {r.adminNote}</p>}
                </div>
                {r.status === 'pending' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => setModal({ req: r, action: 'approved' })} className="text-xs px-2 py-1 bg-green-900/50 text-green-400 hover:bg-green-900 rounded-lg font-medium transition-colors">Approve</button>
                    <button onClick={() => setModal({ req: r, action: 'rejected' })} className="text-xs px-2 py-1 bg-red-950/50 text-red-400 hover:bg-red-950 rounded-lg font-medium transition-colors">Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
