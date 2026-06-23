import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { Plus, Trash2, Eye, Edit } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

export default function AdminCases() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/cases/admin/all').then(r => setCases(r.data)).finally(() => setLoading(false));
  }, []);

  const toggleStatus = async (c: any) => {
    const newStatus = c.status === 'published' ? 'draft' : 'published';
    await api.put(`/cases/${c.id}`, { ...c, status: newStatus });
    setCases(cases.map(x => x.id === c.id ? { ...x, status: newStatus } : x));
    toast.success(`Case ${newStatus}`);
  };

  const deleteCase = async (id: string) => {
    if (!confirm('Delete this case and all its media?')) return;
    await api.delete(`/cases/${id}`);
    setCases(cases.filter(c => c.id !== id));
    toast.success('Case deleted');
  };

  if (loading) return <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="card h-14 animate-pulse" />)}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Manage Cases ({cases.length})</h2>
        <div className="flex gap-2">
          <Link to="/admin/stories/new" className="btn-secondary flex items-center gap-1.5 text-sm">
            <Plus size={14} /> Add Fictional Case
          </Link>
          <Link to="/admin/cases/new" className="btn-primary flex items-center gap-1.5 text-sm">
            <Plus size={14} /> Add Real Case
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        {cases.map(c => (
          <div key={c.id} className="card p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="badge capitalize text-xs bg-zinc-700 text-zinc-300">{c.category}</span>
                <span className={`text-xs font-medium ${c.status === 'published' ? 'text-green-400' : 'text-zinc-500'}`}>{c.status}</span>
                {c.featured && <span className="text-xs text-amber-400 font-medium">★ Featured</span>}
              </div>
              <h3 className="font-semibold text-white truncate">{c.title}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })} · {c.media?.length || 0} media files</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link to={`/cases/${c.id}`} target="_blank" className="text-zinc-400 hover:text-white p-1.5 hover:bg-zinc-700 rounded transition-colors" title="View">
                <Eye size={15} />
              </Link>
              <button onClick={() => toggleStatus(c)} className={`text-xs px-2 py-1 rounded-lg font-medium transition-colors ${c.status === 'published' ? 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600' : 'bg-green-900/50 text-green-400 hover:bg-green-900'}`}>
                {c.status === 'published' ? 'Unpublish' : 'Publish'}
              </button>
              <button onClick={() => deleteCase(c.id)} className="text-red-500 hover:text-red-400 p-1.5 hover:bg-red-950/30 rounded transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
        {cases.length === 0 && <div className="text-center py-8 text-zinc-500">No cases yet. <Link to="/admin/cases/new" className="text-red-500">Add one</Link>.</div>}
      </div>
    </div>
  );
}
