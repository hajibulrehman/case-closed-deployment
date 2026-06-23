import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { Clock, Eye, ArrowLeft, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/articles/${slug}`).then(r => setArticle(r.data)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      {[...Array(5)].map((_, i) => <div key={i} className="h-8 bg-zinc-800 rounded animate-pulse" />)}
    </div>
  );
  if (!article) return <div className="text-center py-16 text-zinc-500">Article not found.</div>;

  const readTime = Math.ceil(article.content.split(' ').length / 200);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/learn" className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to Learn
      </Link>

      {/* Category */}
      <span className="badge bg-red-900/60 text-red-300 capitalize mb-4 inline-block">
        {article.category.replace(/-/g, ' ')}
      </span>

      <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{article.title}</h1>

      <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-6">
        <span className="flex items-center gap-1"><Clock size={13} />{readTime} min read</span>
        <span className="flex items-center gap-1"><Eye size={13} />{article.views} views</span>
        <span>{formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}</span>
      </div>

      {article.coverImage && (
        <div className="rounded-xl overflow-hidden mb-6 aspect-video bg-zinc-800">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Summary */}
      <div className="card p-5 mb-6 border-l-4 border-l-red-700">
        <p className="text-zinc-300 leading-relaxed italic">{article.summary}</p>
      </div>

      {/* Content — render section headings */}
      <div className="space-y-4 text-zinc-300 text-base leading-7">
        {article.content.split('\n\n').map((para: string, i: number) => {
          const isHeading = /^[A-Z][A-Z\s\(\)\/\-–]{4,}$/.test(para.trim());
          if (isHeading) {
            return (
              <h2 key={i} className="text-red-400 font-bold text-sm uppercase tracking-wider pt-4 pb-1 border-b border-zinc-800">
                {para.trim()}
              </h2>
            );
          }
          return <p key={i}>{para}</p>;
        })}
      </div>

      {/* Tags */}
      {article.tags && (
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-zinc-800">
          {article.tags.split(',').map((tag: string) => (
            <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Tag size={9} />#{tag.trim()}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-zinc-800">
        <Link to="/learn" className="btn-secondary inline-flex items-center gap-2">
          <ArrowLeft size={14} /> More Articles
        </Link>
      </div>
    </div>
  );
}
