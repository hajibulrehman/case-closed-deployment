import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { Upload, X, Plus, Trash2 } from 'lucide-react';

const CATEGORIES = ['Murder', 'Suicide', 'Missing', 'Genocide', 'Police', 'Other'];
const LINK_TYPES  = ['Article', 'Official', 'Documentary', 'News', 'Video', 'Book'];

interface TimelineEntry { year: string; event: string; }
interface LinkEntry     { label: string; url: string; type: string; }

export default function AdminAddCase() {
  const navigate = useNavigate();

  // Core fields
  const [form, setForm] = useState({
    title: '', category: 'murder', section: 'cases', status: 'published',
    location: '', date: '', summary: '', fullContent: '',
    victims: '', perpetrator: '', verdict: '',
    featured: false,
  });

  // Structured fields
  const [keyFacts,  setKeyFacts]  = useState<string[]>(['']);
  const [timeline,  setTimeline]  = useState<TimelineEntry[]>([{ year: '', event: '' }]);
  const [links,     setLinks]     = useState<LinkEntry[]>([{ label: '', url: '', type: 'article' }]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic'|'detail'|'links'|'media'>('basic');

  // ── keyFacts helpers
  const addFact    = () => setKeyFacts(f => [...f, '']);
  const removeFact = (i: number) => setKeyFacts(f => f.filter((_, idx) => idx !== i));
  const setFact    = (i: number, v: string) => setKeyFacts(f => f.map((x, idx) => idx === i ? v : x));

  // ── timeline helpers
  const addEvent    = () => setTimeline(t => [...t, { year: '', event: '' }]);
  const removeEvent = (i: number) => setTimeline(t => t.filter((_, idx) => idx !== i));
  const setEvent    = (i: number, k: 'year'|'event', v: string) =>
    setTimeline(t => t.map((x, idx) => idx === i ? { ...x, [k]: v } : x));

  // ── links helpers
  const addLink    = () => setLinks(l => [...l, { label: '', url: '', type: 'article' }]);
  const removeLink = (i: number) => setLinks(l => l.filter((_, idx) => idx !== i));
  const setLink    = (i: number, k: keyof LinkEntry, v: string) =>
    setLinks(l => l.map((x, idx) => idx === i ? { ...x, [k]: v } : x));

  // ── media helpers
  const addMedia    = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
  };
  const removeMedia = (i: number) => setMediaFiles(f => f.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.summary || !form.fullContent)
      return toast.error('Title, Summary and Full Content are required');

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));

      // Structured JSON fields — filter out empty entries
      const cleanFacts = keyFacts.filter(f => f.trim());
      if (cleanFacts.length) fd.append('keyFacts', JSON.stringify(cleanFacts));

      const cleanTimeline = timeline.filter(t => t.year.trim() && t.event.trim());
      if (cleanTimeline.length) fd.append('timeline', JSON.stringify(cleanTimeline));

      const cleanLinks = links.filter(l => l.label.trim() && l.url.trim());
      if (cleanLinks.length) fd.append('links', JSON.stringify(cleanLinks));

      mediaFiles.forEach(f => fd.append('media', f));

      await api.post('/cases', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Case created!');
      navigate('/admin/cases');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create case');
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    { id: 'basic',  label: 'Basic Info'   },
    { id: 'detail', label: 'Case Details' },
    { id: 'links',  label: 'References'   },
    { id: 'media',  label: 'Media'        },
  ] as const;

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold text-white mb-5">Add New Case</h2>

      {/* Tab bar */}
      <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 mb-6 border border-zinc-800">
        {tabs.map(t => (
          <button key={t.id} type="button" onClick={() => setActiveTab(t.id)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === t.id ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
            }`}>{t.label}</button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>

        {/* ── TAB 1: Basic Info ─────────────────────────────────── */}
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Title *</label>
              <input className="input" placeholder="Case title" value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Category *</label>
                <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Section</label>
                <select className="input" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })}>
                  <option value="cases">Real Cases (Solved)</option>
                  <option value="unsolved">Unsolved Cases</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Location</label>
                <input className="input" placeholder="e.g. New York, USA" value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Date / Period</label>
                <input className="input" placeholder="e.g. June 1994" value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Status</label>
                <select className="input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured}
                    onChange={e => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 accent-red-600" />
                  <span className="text-sm text-zinc-400">Feature on homepage</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Summary * <span className="text-zinc-600">(shown on cards)</span></label>
              <textarea className="input min-h-[90px]" placeholder="Brief summary of the case..."
                value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} required />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Full Content * <span className="text-zinc-600">(detailed write-up)</span></label>
              <textarea className="input min-h-[220px] font-mono text-sm" placeholder="Detailed case content..."
                value={form.fullContent} onChange={e => setForm({ ...form, fullContent: e.target.value })} required />
              <div className="text-xs text-zinc-600 mt-1">{form.fullContent.length} characters · Use ALL CAPS headings like "BACKGROUND" for section headers</div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="button" onClick={() => setActiveTab('detail')} className="btn-primary px-6">
                Next: Case Details →
              </button>
            </div>
          </div>
        )}

        {/* ── TAB 2: Case Details ───────────────────────────────── */}
        {activeTab === 'detail' && (
          <div className="space-y-6">

            {/* Victim Info */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Victim(s)</label>
              <textarea className="input min-h-[80px]" placeholder="e.g. Nicole Brown Simpson (35), Ron Goldman (25)..."
                value={form.victims} onChange={e => setForm({ ...form, victims: e.target.value })} />
            </div>

            {/* Perpetrator */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Perpetrator / Suspect</label>
              <textarea className="input min-h-[80px]" placeholder="e.g. O.J. Simpson, former NFL player..."
                value={form.perpetrator} onChange={e => setForm({ ...form, perpetrator: e.target.value })} />
            </div>

            {/* Verdict */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Verdict / Outcome</label>
              <textarea className="input min-h-[70px]" placeholder="e.g. Not guilty (criminal 1995). Liable in civil suit 1997..."
                value={form.verdict} onChange={e => setForm({ ...form, verdict: e.target.value })} />
            </div>

            {/* Key Facts */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-zinc-400">Key Facts <span className="text-zinc-600">(bullet points)</span></label>
                <button type="button" onClick={addFact}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400">
                  <Plus size={13} /> Add fact
                </button>
              </div>
              <div className="space-y-2">
                {keyFacts.map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <input className="input flex-1" placeholder={`Fact ${i + 1}...`}
                      value={f} onChange={e => setFact(i, e.target.value)} />
                    {keyFacts.length > 1 && (
                      <button type="button" onClick={() => removeFact(i)}
                        className="text-zinc-600 hover:text-red-400 p-2 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-zinc-400">Timeline of Events</label>
                <button type="button" onClick={addEvent}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400">
                  <Plus size={13} /> Add event
                </button>
              </div>
              <div className="space-y-2">
                {timeline.map((t, i) => (
                  <div key={i} className="flex gap-2">
                    <input className="input w-40 shrink-0" placeholder="Year / Date"
                      value={t.year} onChange={e => setEvent(i, 'year', e.target.value)} />
                    <input className="input flex-1" placeholder="What happened..."
                      value={t.event} onChange={e => setEvent(i, 'event', e.target.value)} />
                    {timeline.length > 1 && (
                      <button type="button" onClick={() => removeEvent(i)}
                        className="text-zinc-600 hover:text-red-400 p-2 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button type="button" onClick={() => setActiveTab('basic')} className="btn-secondary">← Back</button>
              <button type="button" onClick={() => setActiveTab('links')} className="btn-primary px-6">Next: References →</button>
            </div>
          </div>
        )}

        {/* ── TAB 3: References / Links ─────────────────────────── */}
        {activeTab === 'links' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-white">Reference Links</p>
                <p className="text-xs text-zinc-500 mt-0.5">Wikipedia, FBI files, documentaries, news articles, books</p>
              </div>
              <button type="button" onClick={addLink}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400">
                <Plus size={13} /> Add link
              </button>
            </div>

            <div className="space-y-3">
              {links.map((l, i) => (
                <div key={i} className="card p-3 space-y-2">
                  <div className="flex gap-2">
                    <input className="input flex-1" placeholder="Label e.g. Wikipedia — Ted Bundy"
                      value={l.label} onChange={e => setLink(i, 'label', e.target.value)} />
                    <select className="input w-36 shrink-0" value={l.type}
                      onChange={e => setLink(i, 'type', e.target.value)}>
                      {LINK_TYPES.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
                    </select>
                    {links.length > 1 && (
                      <button type="button" onClick={() => removeLink(i)}
                        className="text-zinc-600 hover:text-red-400 p-2 transition-colors shrink-0">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <input className="input" placeholder="https://..."
                    value={l.url} onChange={e => setLink(i, 'url', e.target.value)} />
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-2">
              <button type="button" onClick={() => setActiveTab('detail')} className="btn-secondary">← Back</button>
              <button type="button" onClick={() => setActiveTab('media')} className="btn-primary px-6">Next: Media →</button>
            </div>
          </div>
        )}

        {/* ── TAB 4: Media ──────────────────────────────────────── */}
        {activeTab === 'media' && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-white mb-1">Upload Media Files</p>
              <p className="text-xs text-zinc-500 mb-3">Images, audio recordings, video evidence, documents (PDF). Max 20 files, 100MB each.</p>

              <label className="flex items-center gap-3 border-2 border-dashed border-zinc-700 rounded-xl p-6 cursor-pointer hover:border-zinc-500 transition-colors">
                <Upload size={24} className="text-zinc-500" />
                <div>
                  <p className="text-zinc-300 text-sm font-medium">Click to upload files</p>
                  <p className="text-zinc-500 text-xs mt-0.5">images • audio • video • PDF</p>
                </div>
                <input type="file" multiple accept="image/*,audio/*,video/*,.pdf"
                  onChange={addMedia} className="hidden" />
              </label>

              {mediaFiles.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {mediaFiles.map((f, i) => {
                    const isImg = f.type.startsWith('image/');
                    const icon  = isImg ? '🖼' : f.type.startsWith('audio/') ? '🎙' : f.type.startsWith('video/') ? '📹' : '📄';
                    return (
                      <div key={i} className="flex items-center justify-between bg-zinc-800 rounded-lg px-3 py-2 text-sm">
                        <span className="text-zinc-500 mr-2">{icon}</span>
                        <span className="text-zinc-300 flex-1 truncate">{f.name}</span>
                        <span className="text-zinc-500 text-xs mr-3">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                        <button type="button" onClick={() => removeMedia(i)}
                          className="text-red-400 hover:text-red-300">
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="card p-4 border-l-4 border-l-zinc-600">
              <p className="text-xs text-zinc-400">
                <span className="text-white font-semibold">No files?</span> That's fine — an atmospheric cover image will be auto-assigned based on the case category. You can always add media later from the Cases list.
              </p>
            </div>

            <div className="flex justify-between pt-2">
              <button type="button" onClick={() => setActiveTab('links')} className="btn-secondary">← Back</button>
              <button type="submit" disabled={submitting}
                className="btn-primary px-8 text-base">
                {submitting ? 'Creating case...' : '✓ Create Case'}
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
