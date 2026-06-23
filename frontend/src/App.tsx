import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CasesPage from './pages/CasesPage';
import CaseDetail from './pages/CaseDetail';
import StoriesPage from './pages/StoriesPage';
import StoryDetail from './pages/StoryDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import LearnPage from './pages/LearnPage';
import ArticleDetail from './pages/ArticleDetail';
import InteractivePage from './pages/InteractivePage';
import QuizPage from './pages/QuizPage';
import UnsolvedPage from './pages/UnsolvedPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/cases/:id" element={<CaseDetail />} />
            <Route path="/unsolved" element={<UnsolvedPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:slug" element={<ArticleDetail />} />
            <Route path="/interactive" element={<InteractivePage />} />
            <Route path="/interactive/quiz/:id" element={<QuizPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<UserDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: '#18181b', color: '#e5e5e5', border: '1px solid #3f3f46' },
              success: { iconTheme: { primary: '#22c55e', secondary: '#18181b' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#18181b' } },
            }}
          />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
