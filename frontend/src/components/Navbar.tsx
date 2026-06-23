import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, BookOpen, Shield, User, LogOut, GraduationCap, Zap, Search } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false); };
  const isActive = (path: string) => location.pathname.startsWith(path);

  const navLinks = [
    { path: '/cases',       label: 'Real Cases',  icon: Shield       },
    { path: '/unsolved',    label: 'Unsolved',    icon: Search       },
    { path: '/stories',     label: 'Fiction',     icon: BookOpen     },
    { path: '/learn',       label: 'Learn',       icon: GraduationCap },
    { path: '/interactive', label: 'Interactive', icon: Zap          },
  ];

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
          <span className="text-red-600 text-2xl">⚖</span>
          <span className="text-white">Case<span className="text-red-600">Closed</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <link.icon size={15} />
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/admin')
                  ? 'bg-amber-900/40 text-amber-300'
                  : 'text-zinc-400 hover:text-amber-400 hover:bg-amber-900/20'
              }`}
            >
              <Shield size={15} /> Admin
            </Link>
          )}
        </div>

        {/* Auth — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-xs font-bold text-white">
                  {user.username[0].toUpperCase()}
                </div>
                <span className="hidden lg:block">{user.username}</span>
              </Link>
              <button onClick={handleLogout} className="text-zinc-500 hover:text-red-400 transition-colors p-1">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">Sign In</Link>
              <Link to="/register" className="btn-primary text-sm">Join Now</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-zinc-400" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-4 py-4 flex flex-col gap-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <link.icon size={15} /> {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-amber-400 hover:bg-amber-900/20">
              <Shield size={15} /> Admin
            </Link>
          )}
          <div className="border-t border-zinc-800 pt-2 mt-1">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white">
                  <User size={15} /> {user.username}
                </Link>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 w-full text-left">
                  <LogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-zinc-300">Sign In</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                  className="block btn-primary text-center mt-1">Join Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
