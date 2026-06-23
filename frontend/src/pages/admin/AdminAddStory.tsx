import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { Upload, X, BookOpen } from 'lucide-react';

const GENRES = ['thriller', 'mystery', 'horror', 'drama', 'fantasy', 'other'];

export default function AdminAddStory() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<any[]>([]);
  const [form, setForm] = useState({
    title:   '',
    content: '',
    genre:   '',
    tags:    '',
    type:    'fantasy',   // fantasy | real
    caseId:  '',
    status:  'published',
  });
  const [coverImage,  setCoverImage]  = useState<File | null>(null);
  const [preview,     setPreview]     = useState('');
  const [submitting,  setSubmitting]  = useState(false);

  // Load cases for the "Based on case" dropdown
  useEffect(() => {
    api.get('/cases?limit=200').then(r => setCases(r.data.cases || []));
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setCoverImage(file); setPreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim())
      return toast.error('Title and content are required');

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
      if (coverImage) fd.append('coverImage', coverImage);

      const { data } = await api.post('/stories', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Story published!');
      navigate(`/stories/${data.id}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to publish');
    } finally {
      setSubmitting(false);
    }
  };

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-900/50 flex items-center justify-center">
          <BookOpen size={20} className="text-teal-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Add Fictional / Creative Story</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Published to the Fiction section. Always clearly labeled as creative writing.</p>
        </div>
      </div>

      {/* Story type toggle */}
      <div className="flex gap-3 mb-6">
        {[
          { value: 'fantasy', label: 'Fiction / Fantasy',   desc: 'Published instantly as creative story' },
          { value: 'real',    label: 'Real-Life Account',   desc: 'User-submitted real account (admin-published)' },
        ].map(t => (
          <button key={t.value} type="button"
            onClick={() => setForm({ ...form, type: t.value })}
            className={`flex-1 card p-4 text-left transition-colors ${
              form.type === t.value ? 'border-teal-600' : 'hover:border-zinc-600'
            }`}>
            <div className="font-semibold text-white text-sm">{t.label}</div>
            <div className="text-xs text-zinc-400 mt-0.5">{t.desc}</div>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Title *</label>
          <input className="input" placeholder="Story title"
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        </div>

        {/* Genre + Tags */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Genre</label>
            <select className="input" value={form.genre}
              onChange={e => setForm({ ...form, genre: e.target.value })}>
              <option value="">— Select genre —</option>
              {GENRES.map(g => <option key={g} value={g} className="capitalize">{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Tags <span className="text-zinc-600">(comma-separated)</span></label>
            <input className="input" placeholder="e.g. crime, thriller, 1970s"
              value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          </div>
        </div>

        {/* Based on case */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Based on Real Case <span className="text-zinc-600">(optional)</span></label>
          <select className="input" value={form.caseId}
            onChange={e => setForm({ ...form, caseId: e.target.value })}>
            <option value="">— None (standalone story) —</option>
            {cases.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          {form.caseId && (
            <p className="text-xs text-zinc-500 mt-1">
              A "Based on" link will appear on the story card and detail page.
            </p>
          )}
        </div>

        {/* Status */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Status</label>
            <select className="input" value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="published">Published</option>
              <option value="pending">Pending Review</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Cover Image <span className="text-zinc-600">(auto-assigned by genre if blank)</span></label>
          <label className="flex items-center gap-3 border-2 border-dashed border-zinc-700 rounded-xl p-4 cursor-pointer hover:border-zinc-500 transition-colors">
            <Upload size={20} className="text-zinc-500" />
            <span className="text-zinc-400 text-sm">{coverImage ? coverImage.name : 'Click to upload cover image...'}</span>
            <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </label>
          {preview && (
            <div className="relative mt-2 inline-block">
              <img src={preview} alt="Preview" className="h-32 rounded-lg object-cover" />
              <button type="button" onClick={() => { setCoverImage(null); setPreview(''); }}
                className="absolute top-1 right-1 bg-zinc-900/80 rounded-full p-0.5 text-red-400 hover:text-red-300">
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Story Content */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Story Content *</label>
          <textarea
            className="input min-h-[320px] font-mono text-sm leading-relaxed"
            placeholder="Write your story here...&#10;&#10;Use blank lines between paragraphs for clean formatting."
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            required
          />
          <div className="flex justify-between text-xs text-zinc-600 mt-1">
            <span>{form.content.length} characters</span>
            <span>{wordCount} words · ~{Math.ceil(wordCount / 200)} min read</span>
          </div>
        </div>

        {/* Fiction disclaimer */}
        <div className="bg-amber-950/30 border border-amber-900/40 rounded-xl p-4 text-xs text-amber-300">
          <span className="font-bold text-amber-400">⚠ Fiction Notice:</span> This story will be automatically labeled as creative fiction on all cards and detail pages. It will not alter or replace the original real case data.
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={submitting}
            className="btn-primary px-8">
            {submitting ? 'Publishing...' : '✓ Publish Story'}
          </button>
          <button type="button" onClick={() => navigate('/admin/stories')}
            className="btn-secondary">Cancel</button>
        </div>

      </form>
    </div>
  );
}
