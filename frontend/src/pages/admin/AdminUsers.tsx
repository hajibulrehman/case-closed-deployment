import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Trash2, Shield, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users').then(r => setUsers(r.data)).finally(() => setLoading(false));
  }, []);

  const toggleRole = async (u: any) => {
    if (u.id === currentUser?.id) return toast.error("Can't change your own role");
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    if (!confirm(`Make ${u.username} a ${newRole}?`)) return;
    await api.patch(`/admin/users/${u.id}/role`, { role: newRole });
    setUsers(users.map(x => x.id === u.id ? { ...x, role: newRole } : x));
    toast.success(`${u.username} is now ${newRole}`);
  };

  const deleteUser = async (u: any) => {
    if (u.id === currentUser?.id) return toast.error("Can't delete yourself");
    if (!confirm(`Delete user ${u.username}? This is irreversible.`)) return;
    await api.delete(`/admin/users/${u.id}`);
    setUsers(users.filter(x => x.id !== u.id));
    toast.success('User deleted');
  };

  if (loading) return <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="card h-14 animate-pulse" />)}</div>;

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Manage Users ({users.length})</h2>
      <div className="space-y-2">
        {users.map(u => (
          <div key={u.id} className="card p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${u.role === 'admin' ? 'bg-amber-900 text-amber-300' : 'bg-zinc-700 text-white'}`}>
              {u.username[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{u.username}</span>
                {u.role === 'admin' && <span className="badge bg-amber-900/60 text-amber-300">Admin</span>}
                {u.id === currentUser?.id && <span className="badge bg-zinc-700 text-zinc-400">You</span>}
              </div>
              <p className="text-xs text-zinc-500 truncate">{u.email} · {u._count?.stories} stories · joined {formatDistanceToNow(new Date(u.createdAt), { addSuffix: true })}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => toggleRole(u)}
                disabled={u.id === currentUser?.id}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-medium transition-colors disabled:opacity-30 ${
                  u.role === 'admin'
                    ? 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                    : 'bg-amber-900/40 text-amber-400 hover:bg-amber-900/70'
                }`}
              >
                {u.role === 'admin' ? <><User size={12} /> Demote</> : <><Shield size={12} /> Make Admin</>}
              </button>
              <button
                onClick={() => deleteUser(u)}
                disabled={u.id === currentUser?.id}
                className="text-red-500 hover:text-red-400 p-1.5 hover:bg-red-950/30 rounded transition-colors disabled:opacity-30"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
