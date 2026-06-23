import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Eye, Calendar, MessageCircle, Send, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/stories/${id}`).then(r => setStory(r.data)).finally(() => setLoading(false));
  }, [id]);

  const submitComment = async () => {
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post(`/stories/${id}/comments`, { content: comment });
      setStory((prev: any) => ({ ...prev, comments: [data, ...prev.comments] }));
      setComment('');
      toast.success('Comment added!');
    } catch {
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-12"><div className="card h-96 animate-pulse" /></div>;
  if (!story) return <div className="text-center py-16 text-zinc-500">Story not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back link to based-on case */}
      {story.case && (
        <Link to={`/cases/${story.case.id}`} className="flex items-center gap-1.5 text-red-500 text-sm hover:text-red-400 mb-4">
          <ExternalLink size={13} /> Based on real case: {story.case.title}
        </Link>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {story.genre && <span className="badge bg-zinc-700 text-zinc-300">{story.genre}</span>}
        {story.type === 'real' && <span className="badge bg-amber-900/80 text-amber-300">Real Account</span>}
        <span className="badge bg-zinc-800 text-zinc-400">Fiction</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-black text-white mb-4">{story.title}</h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-white">
            {story.author.username[0].toUpperCase()}
          </div>
          <span>{story.author.username}</span>
        </div>
        <span className="flex items-center gap-1"><Eye size={13} />{story.views}</span>
        <span className="flex items-center gap-1"><Calendar size={13} />{formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}</span>
      </div>

      {/* Cover */}
      {story.coverImage && (
        <div className="rounded-xl overflow-hidden mb-6 aspect-video bg-zinc-800">
          <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Fiction notice */}
      <div className="bg-amber-950/30 border border-amber-900/40 text-amber-300 text-xs rounded-lg px-4 py-2 mb-6">
        ⚠️ This is a fictional story. Any resemblance to real events is intentional for creative purposes but represents the author's imagination, not facts.
      </div>

      {/* Content */}
      <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-base mb-8">
        {story.content}
      </div>

      {/* Tags */}
      {story.tags && (
        <div className="flex flex-wrap gap-2 mb-8">
          {story.tags.split(',').map((tag: string) => (
            <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">#{tag.trim()}</span>
          ))}
        </div>
      )}

      {/* Comments */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <MessageCircle size={18} /> Comments ({story.comments?.length || 0})
        </h2>

        {user ? (
          <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-red-700 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">
              {user.username[0].toUpperCase()}
            </div>
            <div className="flex-1 flex gap-2">
              <input className="input flex-1" placeholder="Share your thoughts..." value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => e.key === 'Enter' && submitComment()} />
              <button onClick={submitComment} disabled={submitting || !comment.trim()} className="btn-secondary px-4"><Send size={16} /></button>
            </div>
          </div>
        ) : (
          <div className="card p-4 mb-6 text-center text-zinc-400 text-sm">
            <Link to="/login" className="text-red-500 hover:underline">Sign in</Link> to comment.
          </div>
        )}

        <div className="space-y-4">
          {story.comments?.map((c: any) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">
                {c.author.username[0].toUpperCase()}
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{c.author.username}</span>
                  <span className="text-xs text-zinc-500">{formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}</span>
                </div>
                <p className="text-sm text-zinc-300">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
