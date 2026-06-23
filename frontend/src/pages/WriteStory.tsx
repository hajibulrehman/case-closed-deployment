import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Upload, AlertCircle, Plus, Trash2, BookOpen, Shield } from 'lucide-react';

const GENRES     = ['thriller', 'mystery', 'horror', 'drama', 'fantasy', 'other'];
const CATEGORIES = ['murder', 'suicide', 'missing', 'genocide', 'police', 'other'];

export default function WriteStory() {
  const navigate = useNavigate();
  const [type, setType] = useState<'fantasy' | 'real'>('fantasy');
  const [cases, setCases] = useState<any[]>([]);

  // ── Fiction fields ────────────────────────────────────────────────────────
  const [fiction, setFiction] = useState({
    title: '', content: '', caseId: '', genre: '', tags: '',
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview,    setPreview]    = useState('');

  // ── Real Life fields (mirrors real case model) ────────────────────────────
  const [real, setReal] = useState({
    title: '', category: 'murder', location: '', date: '',
    summary: '', content: '',
    victims: '', perpetrator: '', verdict: '',
  });
  const [keyFacts, setKeyFacts] = useState<string[]>(['']);
  const [sources,  setSources]  = useState<string[]>(['']);   // reference links

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Only load solved cases for fiction "based on" dropdown
    api.get('/cases?limit=200').then(r => setCases(r.data.cases || []));
  }, []);

  // ── Fiction helpers ───────────────────────────────────────────────────────
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setCoverImage(file); setPreview(URL.createObjectURL(file)); }
  };

  // ── Key Facts helpers (real life) ─────────────────────────────────────────
  const addFact    = () => setKeyFacts(f => [...f, '']);
  const removeFact = (i: number) => setKeyFacts(f => f.filter((_, idx) => idx !== i));
  const setFact    = (i: number, v: string) => setKeyFacts(f => f.map((x, idx) => idx === i ? v : x));

  // ── Sources helpers (real life) ───────────────────────────────────────────
  const addSource    = () => setSources(s => [...s, '']);
  const removeSource = (i: number) => setSources(s => s.filter((_, idx) => idx !== i));
  const setSource    = (i: number, v: string) => setSources(s => s.map((x, idx) => idx === i ? v : x));

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'fantasy') {
      if (!fiction.title.trim() || !fiction.content.trim())
        return toast.error('Title and content are required');

      setSubmitting(true);
      try {
        const fd = new FormData();
        fd.append('title',   fiction.title);
        fd.append('content', fiction.content);
        fd.append('type',    'fantasy');
        if (fiction.caseId) fd.append('caseId', fiction.caseId);
        if (fiction.genre)  fd.append('genre',  fiction.genre);
        if (fiction.tags)   fd.append('tags',   fiction.tags);
        if (coverImage)     fd.append('coverImage', coverImage);

        const { data } = await api.post('/stories', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Story published!');
        navigate(`/stories/${data.id}`);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to publish');
      } finally { setSubmitting(false); }

    } else {
      // Real life — goes to requests/admin review
      if (!real.title.trim() || !real.content.trim())
        return toast.error('Title and full account are required');

      setSubmitting(true);
      try {
        // Build sources string from array
        const cleanSources = sources.filter(s => s.trim()).join('\n');
        const cleanFacts   = keyFacts.filter(f => f.trim());

        // Build content with structured fields
        const structuredContent =
          `CATEGORY: ${real.category}\n` +
          `LOCATION: ${real.location || 'Unknown'}\n` +
          `DATE: ${real.date || 'Unknown'}\n\n` +
          `VICTIMS\n${real.victims || 'Not specified'}\n\n` +
          `PERPETRATOR / SUSPECT\n${real.perpetrator || 'Unknown / Unidentified'}\n\n` +
          `FULL ACCOUNT\n${real.content}\n\n` +
          (cleanFacts.length ? `KEY FACTS\n${cleanFacts.map((f, i) => `${i + 1}. ${f}`).join('\n')}\n\n` : '') +
          `VERDICT / OUTCOME\n${real.verdict || 'Unknown'}\n\n` +
          (cleanSources ? `SOURCES & REFERENCES\n${cleanSources}` : '');

        await api.post('/requests', {
          title:   real.title,
          content: structuredContent,
          sources: cleanSources,
        });

        toast.success('Submitted for admin review! You\'ll be notified of the decision.');
        navigate('/dashboard');
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to submit');
      } finally { setSubmitting(false); }
    }
  };

  const wordCount = type === 'fantasy'
    ? fiction.content.trim().split(/\s+/).filter(Boolean).length
    : real.content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-bold text-white mb-2">Write a New Story</h2>

      {/* Type selector */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button type="button" onClick={() => setType('fantasy')}
          className={`card p-4 text-left transition-all ${type === 'fantasy' ? 'border-teal-600 bg-teal-950/20' : 'hover:border-zinc-600'}`}>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={16} className={type === 'fantasy' ? 'text-teal-400' : 'text-zinc-500'} />
            <div className="font-semibold text-white text-sm">Fiction / Fantasy</div>
          </div>
          <div className="text-xs text-zinc-400">Published instantly to the Fiction section</div>
        </button>
        <button type="button" onClick={() => setType('real')}
          className={`card p-4 text-left transition-all ${type === 'real' ? 'border-red-600 bg-red-950/20' : 'hover:border-zinc-600'}`}>
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className={type === 'real' ? 'text-red-400' : 'text-zinc-500'} />
            <div className="font-semibold text-white text-sm">Real Life Account</div>
          </div>
          <div className="text-xs text-zinc-400">Submitted for admin review before publishing</div>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ══════════════════════════════════════════
            FICTION FIELDS
            ══════════════════════════════════════════ */}
        {type === 'fantasy' && (
          <>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Title *</label>
              <input className="input" placeholder="Your story title"
                value={fiction.title} onChange={e => setFiction({ ...fiction, title: e.target.value })} required />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Based on Real Case <span className="text-zinc-600">(optional)</span></label>
              <select className="input" value={fiction.caseId} onChange={e => setFiction({ ...fiction, caseId: e.target.value })}>
                <option value="">— None (standalone story) —</option>
                {cases.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Genre</label>
                <select className="input" value={fiction.genre} onChange={e => setFiction({ ...fiction, genre: e.target.value })}>
                  <option value="">— Select Genre —</option>
                  {GENRES.map(g => <option key={g} value={g} className="capitalize">{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Tags <span className="text-zinc-600">(comma-separated)</span></label>
                <input className="input" placeholder="crime, thriller, 1970s"
                  value={fiction.tags} onChange={e => setFiction({ ...fiction, tags: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Cover Image <span className="text-zinc-600">(auto-assigned by genre if blank)</span></label>
              <label className="flex items-center gap-3 border border-dashed border-zinc-700 rounded-lg p-4 cursor-pointer hover:border-zinc-500 transition-colors">
                <Upload size={18} className="text-zinc-500 shrink-0" />
                <span className="text-zinc-400 text-sm">{coverImage ? coverImage.name : 'Choose cover image...'}</span>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
              {preview && (
                <div className="relative mt-2 inline-block">
                  <img src={preview} alt="Preview" className="h-28 rounded-lg object-cover" />
                  <button type="button" onClick={() => { setCoverImage(null); setPreview(''); }}
                    className="absolute top-1 right-1 bg-zinc-900/80 rounded-full p-0.5 text-red-400 hover:text-red-300 text-xs">✕</button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Story Content *</label>
              <textarea className="input min-h-[300px] font-mono text-sm leading-relaxed"
                placeholder="Write your story here..."
                value={fiction.content} onChange={e => setFiction({ ...fiction, content: e.target.value })} required />
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>{fiction.content.length} characters</span>
                <span>{wordCount} words · ~{Math.ceil(wordCount / 200)} min read</span>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            REAL LIFE FIELDS — mirrors real case model
            ══════════════════════════════════════════ */}
        {type === 'real' && (
          <>
            <div className="bg-amber-950/30 border border-amber-900/40 rounded-xl p-4 flex items-start gap-2 text-sm text-amber-300">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>Real life accounts require admin approval before appearing in the Real Cases section. Fill in as much detail as possible to speed up review.</span>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Case Title *</label>
              <input className="input" placeholder="e.g. The 1987 Riverside Disappearance"
                value={real.title} onChange={e => setReal({ ...real, title: e.target.value })} required />
            </div>

            {/* Category + Location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Category *</label>
                <select className="input" value={real.category} onChange={e => setReal({ ...real, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Location</label>
                <input className="input" placeholder="e.g. Detroit, Michigan, USA"
                  value={real.location} onChange={e => setReal({ ...real, location: e.target.value })} />
              </div>
            </div>

            {/* Date + Summary */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Date / Period</label>
              <input className="input" placeholder="e.g. June 12, 1994 or 1989–1991"
                value={real.date} onChange={e => setReal({ ...real, date: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Brief Summary <span className="text-zinc-600">(shown on case cards)</span></label>
              <textarea className="input min-h-[70px]" placeholder="One or two sentences summarising the case..."
                value={real.summary} onChange={e => setReal({ ...real, summary: e.target.value })} />
            </div>

            {/* Victim / Perpetrator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Victim(s)</label>
                <textarea className="input min-h-[80px]" placeholder="Names, ages, background..."
                  value={real.victims} onChange={e => setReal({ ...real, victims: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Perpetrator / Suspect</label>
                <textarea className="input min-h-[80px]" placeholder="Name, description, or 'Unknown'..."
                  value={real.perpetrator} onChange={e => setReal({ ...real, perpetrator: e.target.value })} />
              </div>
            </div>

            {/* Full account */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Full Account * <span className="text-zinc-600">(detailed narrative)</span></label>
              <textarea className="input min-h-[220px] text-sm leading-relaxed"
                placeholder="Describe the full case in detail — what happened, when, the investigation, any evidence..."
                value={real.content} onChange={e => setReal({ ...real, content: e.target.value })} required />
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>{real.content.length} characters</span>
                <span>{wordCount} words</span>
              </div>
            </div>

            {/* Key Facts */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-zinc-400">Key Facts <span className="text-zinc-600">(bullet points)</span></label>
                <button type="button" onClick={addFact}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400">
                  <Plus size={12} /> Add fact
                </button>
              </div>
              <div className="space-y-2">
                {keyFacts.map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <input className="input flex-1" placeholder={`Key fact ${i + 1}...`}
                      value={f} onChange={e => setFact(i, e.target.value)} />
                    {keyFacts.length > 1 && (
                      <button type="button" onClick={() => removeFact(i)}
                        className="text-zinc-600 hover:text-red-400 transition-colors p-2">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Verdict */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Verdict / Outcome</label>
              <textarea className="input min-h-[70px]" placeholder="e.g. Convicted of murder, sentenced to life. Or: Unsolved, case remains open."
                value={real.verdict} onChange={e => setReal({ ...real, verdict: e.target.value })} />
            </div>

            {/* Sources */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-zinc-400">Sources & Evidence Links <span className="text-zinc-600">(helps admin verify)</span></label>
                <button type="button" onClick={addSource}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400">
                  <Plus size={12} /> Add source
                </button>
              </div>
              <div className="space-y-2">
                {sources.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input className="input flex-1" placeholder="e.g. https://en.wikipedia.org/... or news article URL"
                      value={s} onChange={e => setSource(i, e.target.value)} />
                    {sources.length > 1 && (
                      <button type="button" onClick={() => removeSource(i)}
                        className="text-zinc-600 hover:text-red-400 transition-colors p-2">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={submitting} className="btn-primary px-6">
            {submitting
              ? 'Submitting...'
              : type === 'fantasy'
              ? '✓ Publish Story'
              : '✓ Submit for Review'}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary">Cancel</button>
        </div>

      </form>
    </div>
  );
}
