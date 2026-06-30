import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import {
  MapPin, Calendar, BookOpen, MessageCircle, Send,
  ExternalLink, ChevronDown, ChevronUp, Clock, Users,
  AlertTriangle, Scale, FileText, Film, Globe, BookMarked
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import StoryCard from '../components/StoryCard';
import toast from 'react-hot-toast';

// ─── Link type config ─────────────────────────────────────────────────────────
const LINK_ICONS: Record<string, any> = {
  article:    { icon: Globe,      color: 'text-blue-400',   bg: 'bg-blue-900/30'   },
  official:   { icon: FileText,   color: 'text-green-400',  bg: 'bg-green-900/30'  },
  documentary:{ icon: Film,       color: 'text-purple-400', bg: 'bg-purple-900/30' },
  news:       { icon: Globe,      color: 'text-amber-400',  bg: 'bg-amber-900/30'  },
  video:      { icon: Film,       color: 'text-red-400',    bg: 'bg-red-900/30'    },
  book:       { icon: BookMarked, color: 'text-teal-400',   bg: 'bg-teal-900/30'   },
};

const CATEGORY_COLORS: Record<string, string> = {
  murder:   'bg-red-900/80 text-red-300 border-red-800',
  missing:  'bg-blue-900/80 text-blue-300 border-blue-800',
  genocide: 'bg-orange-900/80 text-orange-300 border-orange-800',
  police:   'bg-zinc-700 text-zinc-300 border-zinc-600',
  suicide:  'bg-purple-900/80 text-purple-300 border-purple-800',
  other:    'bg-teal-900/80 text-teal-300 border-teal-800',
};

function Section({ title, icon: Icon, children, defaultOpen = true }: any) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card mb-5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-zinc-800/50 transition-colors"
      >
        <h2 className="font-bold text-white flex items-center gap-2 text-base">
          <Icon size={17} className="text-red-500" />
          {title}
        </h2>
        {open ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

// Route external image URLs through the backend proxy — fixes Unsplash hotlink blocking
function proxied(url: string): string {
  if (!url || url.startsWith('/')) return url;
  return `/api/imgproxy?url=${encodeURIComponent(url)}`;
}

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeMedia, setActiveMedia] = useState<any>(null);

  useEffect(() => {
    api.get(`/cases/${id}`).then(r => {
      setCaseData(r.data);
      const firstImage = r.data.media?.find((m: any) => m.type === 'image');
      if (firstImage) setActiveMedia(firstImage);
    }).finally(() => setLoading(false));
  }, [id]);

  const submitComment = async () => {
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post(`/cases/${id}/comments`, { content: comment });
      setCaseData((prev: any) => ({ ...prev, comments: [data, ...prev.comments] }));
      setComment('');
      toast.success('Comment added!');
    } catch { toast.error('Failed to add comment'); }
    finally { setSubmitting(false); }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
      {[...Array(4)].map((_, i) => <div key={i} className="card h-32 animate-pulse" />)}
    </div>
  );
  if (!caseData) return <div className="text-center py-16 text-zinc-500">Case not found.</div>;

  const images  = caseData.media?.filter((m: any) => m.type === 'image').map((m: any) => ({ ...m, url: proxied(m.url) }))    || [];
  const audio   = caseData.media?.filter((m: any) => m.type === 'audio')    || [];
  const video   = caseData.media?.filter((m: any) => m.type === 'video')    || [];
  const catColor = CATEGORY_COLORS[caseData.category] || CATEGORY_COLORS.other;

  // Parse JSON fields safely
  const timeline:  { year: string; event: string }[]             = (() => { try { return JSON.parse(caseData.timeline || '[]'); } catch { return []; } })();
  const keyFacts:  string[]                                       = (() => { try { return JSON.parse(caseData.keyFacts || '[]'); } catch { return []; } })();
  const links:     { label: string; url: string; type: string }[] = (() => { try { return JSON.parse(caseData.links || '[]'); } catch { return []; } })();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <div className="mb-6">
        <span className={`badge border ${catColor} capitalize mb-3 inline-block`}>{caseData.category}</span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">{caseData.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
          {caseData.location && <span className="flex items-center gap-1.5"><MapPin size={13} />{caseData.location}</span>}
          {caseData.date     && <span className="flex items-center gap-1.5"><Calendar size={13} />{caseData.date}</span>}
        </div>
      </div>

      {/* ── Cover Image ────────────────────────────────────────── */}
      {images.length > 0 && (
        <div className="mb-6">
          <div className="rounded-xl overflow-hidden bg-zinc-800 aspect-video">
            <img
              src={activeMedia?.url || images[0].url}
              alt={caseData.title}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
              {images.map((img: any) => (
                <button key={img.id} onClick={() => setActiveMedia(img)}
                  className={`shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${activeMedia?.id === img.id ? 'border-red-600' : 'border-zinc-700'}`}>
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Summary callout ────────────────────────────────────── */}
      <div className="card p-5 mb-5 border-l-4 border-l-red-700">
        <p className="text-zinc-300 leading-relaxed italic text-base">{caseData.summary}</p>
      </div>

      {/* ── Key Facts ──────────────────────────────────────────── */}
      {keyFacts.length > 0 && (
        <Section title="Key Facts at a Glance" icon={AlertTriangle}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {keyFacts.map((fact: string, i: number) => (
              <div key={i} className="flex items-start gap-2 bg-zinc-800/50 rounded-lg px-3 py-2">
                <span className="text-red-500 font-black text-sm mt-0.5 shrink-0">→</span>
                <span className="text-sm text-zinc-300">{fact}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Victim / Perpetrator quick cards ───────────────────── */}
      {(caseData.victims || caseData.perpetrator) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {caseData.victims && (
            <div className="card p-4 border-t-2 border-t-blue-700">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Users size={13} /> Victim(s)
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{caseData.victims}</p>
            </div>
          )}
          {caseData.perpetrator && (
            <div className="card p-4 border-t-2 border-t-red-700">
              <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <AlertTriangle size={13} /> Perpetrator
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{caseData.perpetrator}</p>
            </div>
          )}
        </div>
      )}

      {/* ── Full Detailed Content ───────────────────────────────── */}
      <Section title="Full Case Report" icon={FileText}>
        <div className="text-zinc-300 leading-relaxed text-sm whitespace-pre-wrap space-y-4">
          {caseData.fullContent.split('\n\n').map((para: string, i: number) => {
            // Detect ALL-CAPS headings like "BACKGROUND" or "THE MURDERS"
            const isHeading = /^[A-Z][A-Z\s\(\)\/\-–]{4,}$/.test(para.trim());
            if (isHeading) {
              return (
                <h3 key={i} className="text-red-400 font-bold text-sm uppercase tracking-wider pt-2 pb-1 border-b border-zinc-800">
                  {para.trim()}
                </h3>
              );
            }
            return <p key={i} className="text-zinc-300 leading-7">{para}</p>;
          })}
        </div>
      </Section>

      {/* ── Timeline ───────────────────────────────────────────── */}
      {timeline.length > 0 && (
        <Section title="Timeline of Events" icon={Clock}>
          <div className="relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-700" />
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-5">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-600 border-2 border-zinc-900" />
                  <div className="text-xs font-bold text-red-400 mb-0.5">{item.year}</div>
                  <div className="text-sm text-zinc-300">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── Verdict / Outcome ──────────────────────────────────── */}
      {caseData.verdict && (
        <Section title="Verdict & Outcome" icon={Scale}>
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <p className="text-zinc-300 text-sm leading-relaxed">{caseData.verdict}</p>
          </div>
        </Section>
      )}

      {/* ── Audio ──────────────────────────────────────────────── */}
      {audio.length > 0 && (
        <Section title="Audio Evidence & Recordings" icon={FileText}>
          <div className="space-y-3">
            {audio.map((a: any) => (
              <div key={a.id} className="bg-zinc-800/50 rounded-lg p-3">
                {a.caption && <p className="text-xs text-zinc-400 mb-2">{a.caption}</p>}
                <audio controls className="w-full" src={a.url} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Video ──────────────────────────────────────────────── */}
      {video.length > 0 && (
        <Section title="Video Evidence" icon={Film}>
          <div className="space-y-3">
            {video.map((v: any) => (
              <div key={v.id} className="bg-zinc-800/50 rounded-lg p-3">
                {v.caption && <p className="text-xs text-zinc-400 mb-2">{v.caption}</p>}
                <video controls className="w-full rounded" src={v.url} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Reference Links ────────────────────────────────────── */}
      {links.length > 0 && (
        <Section title="References, Articles & Documentaries" icon={ExternalLink}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map((link, i) => {
              const cfg = LINK_ICONS[link.type] || LINK_ICONS.article;
              const Icon = cfg.icon;
              return (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-all group ${cfg.bg}`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${cfg.bg}`}>
                    <Icon size={15} className={cfg.color} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white group-hover:text-zinc-200 truncate">{link.label}</div>
                    <div className={`text-xs capitalize ${cfg.color}`}>{link.type}</div>
                  </div>
                  <ExternalLink size={12} className="text-zinc-600 group-hover:text-zinc-400 shrink-0" />
                </a>
              );
            })}
          </div>
        </Section>
      )}

      {/* ── Related Fiction Stories ─────────────────────────────── */}
      {caseData.stories?.length > 0 && (
        <Section title={`Fiction Stories Based on This Case (${caseData.stories.length})`} icon={BookOpen} defaultOpen={false}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseData.stories.map((s: any) => <StoryCard key={s.id} {...s} />)}
          </div>
        </Section>
      )}

      {/* ── Discussion ─────────────────────────────────────────── */}
      <div className="card p-5">
        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
          <MessageCircle size={17} className="text-red-500" />
          Discussion ({caseData.comments?.length || 0})
        </h2>

        {user ? (
          <div className="flex gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-red-700 shrink-0 flex items-center justify-center text-xs font-bold text-white">
              {user.username[0].toUpperCase()}
            </div>
            <div className="flex-1 flex gap-2">
              <input
                className="input flex-1"
                placeholder="Share your thoughts on this case..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitComment()}
              />
              <button onClick={submitComment} disabled={submitting || !comment.trim()} className="btn-primary px-4">
                <Send size={15} />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-800/50 rounded-xl p-4 mb-5 text-center text-zinc-400 text-sm">
            <Link to="/login" className="text-red-500 hover:underline">Sign in</Link> to join the discussion.
          </div>
        )}

        <div className="space-y-4">
          {caseData.comments?.map((c: any) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-700 shrink-0 flex items-center justify-center text-xs font-bold text-white">
                {c.author.username[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{c.author.username}</span>
                  <span className="text-xs text-zinc-500">{formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}</span>
                </div>
                <p className="text-sm text-zinc-300">{c.content}</p>
              </div>
            </div>
          ))}
          {caseData.comments?.length === 0 && (
            <p className="text-zinc-600 text-sm text-center py-4">No comments yet. Be the first.</p>
          )}
        </div>
      </div>

    </div>
  );
}
