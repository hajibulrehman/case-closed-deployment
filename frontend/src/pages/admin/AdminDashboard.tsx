import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { BarChart3, Users, BookOpen, Shield, FileText, Plus, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import AdminCases from './AdminCases';
import AdminStories from './AdminStories';
import AdminRequests from './AdminRequests';
import AdminUsers from './AdminUsers';
import AdminAddCase from './AdminAddCase';
import AdminAddStory from './AdminAddStory';

function StatsCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <div className="text-2xl font-black text-white">{value ?? '—'}</div>
        <div className="text-xs text-zinc-500">{label}</div>
      </div>
    </div>
  );
}

function Overview() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    api.get('/admin/stats').then(r => setStats(r.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-5">Dashboard Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total Users" value={stats?.totalUsers} icon={Users} color="bg-blue-900/50 text-blue-400" />
        <StatsCard label="Real Cases" value={stats?.totalCases} icon={Shield} color="bg-red-900/50 text-red-400" />
        <StatsCard label="Total Stories" value={stats?.totalStories} icon={BookOpen} color="bg-teal-900/50 text-teal-400" />
        <StatsCard label="Pending Reviews" value={(stats?.pendingStories || 0) + (stats?.pendingRequests || 0)} icon={Clock} color="bg-amber-900/50 text-amber-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-bold text-white mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/admin/cases/new" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg">
              <Plus size={14} /> Add Real Case
            </Link>
            <Link to="/admin/stories/new" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg">
              <BookOpen size={14} /> Add Fictional Story
            </Link>
            <Link to="/admin/stories" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg">
              <BookOpen size={14} /> Moderate Stories ({stats?.pendingStories || 0} pending)
            </Link>
            <Link to="/admin/requests" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg">
              <FileText size={14} /> Review Requests ({stats?.pendingRequests || 0} pending)
            </Link>
            <Link to="/admin/users" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg">
              <Users size={14} /> Manage Users
            </Link>
          </div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-white mb-3">Content Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Fantasy Stories</span><span className="text-white font-semibold">{stats?.fantasyStories}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Real Accounts</span><span className="text-white font-semibold">{stats?.realStories}</span>
            </div>
            <div className="flex justify-between text-amber-400">
              <span>Pending Stories</span><span className="font-semibold">{stats?.pendingStories}</span>
            </div>
            <div className="flex justify-between text-amber-400">
              <span>Pending Requests</span><span className="font-semibold">{stats?.pendingRequests}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) navigate('/');
  }, [user, isAdmin, isLoading]);

  if (!user || !isAdmin) return null;

  const tabs = [
    { path: '/admin', label: 'Overview', icon: BarChart3 },
    { path: '/admin/cases', label: 'Cases', icon: Shield },
    { path: '/admin/stories', label: 'Stories', icon: BookOpen },
    { path: '/admin/requests', label: 'Requests', icon: FileText },
    { path: '/admin/users', label: 'Users', icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Shield size={22} className="text-amber-400" />
        <h1 className="text-xl font-black text-white">Admin Dashboard</h1>
        <span className="badge bg-amber-900/60 text-amber-300 ml-2">Admin</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 mb-6 border border-zinc-800 flex-wrap">
        {tabs.map(tab => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive(tab.path) ? 'bg-amber-900/50 text-amber-300' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <tab.icon size={14} /> {tab.label}
          </Link>
        ))}
      </div>

      <Routes>
        <Route index element={<Overview />} />
        <Route path="cases" element={<AdminCases />} />
        <Route path="cases/new" element={<AdminAddCase />} />
        <Route path="stories" element={<AdminStories />} />
        <Route path="stories/new" element={<AdminAddStory />} />
        <Route path="requests" element={<AdminRequests />} />
        <Route path="users" element={<AdminUsers />} />
      </Routes>
    </div>
  );
}
