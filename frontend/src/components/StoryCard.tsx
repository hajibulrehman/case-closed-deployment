import { Link } from 'react-router-dom';
import { Eye, User, BookOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface StoryCardProps {
  id: string;
  title: string;
  content: string;
  author: { username: string; avatar?: string };
  genre?: string;
  views: number;
  createdAt: string;
  coverImage?: string;
  case?: { title: string };
  type: 'fantasy' | 'real';
}

const genreColors: Record<string, string> = {
  thriller: 'bg-red-900/60 text-red-300',
  mystery: 'bg-purple-900/60 text-purple-300',
  horror: 'bg-zinc-700 text-zinc-300',
  drama: 'bg-blue-900/60 text-blue-300',
  fantasy: 'bg-teal-900/60 text-teal-300',
};

/** Route external image URLs through our backend proxy so they always load. */
function proxied(url: string): string {
  if (!url) return url;
  if (url.startsWith('/')) return url;
  return `/api/imgproxy?url=${encodeURIComponent(url)}`;
}

export default function StoryCard({ id, title, content, author, genre, views, createdAt, coverImage, case: caseRef, type }: StoryCardProps) {
  const color = genre ? (genreColors[genre] || 'bg-zinc-700 text-zinc-400') : '';
  const imgSrc = coverImage ? proxied(coverImage) : null;

  return (
    <Link to={`/stories/${id}`} className="card hover:border-zinc-600 transition-colors group block">
      {/* Cover */}
      <div className="relative h-40 bg-zinc-800 overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-900">
            <BookOpen size={40} className="text-zinc-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900/80 to-transparent" />
        {genre && <span className={`badge absolute top-3 left-3 ${color}`}>{genre}</span>}
        {type === 'real' && (
          <span className="badge absolute top-3 right-3 bg-amber-900/80 text-amber-300">Real Account</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {caseRef && (
          <p className="text-red-500 text-xs font-medium mb-1 truncate">Based on: {caseRef.title}</p>
        )}
        <h3 className="font-bold text-white text-base leading-tight mb-2 group-hover:text-zinc-300 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-zinc-500 text-xs line-clamp-2 mb-3">{content.replace(/<[^>]*>/g, '')}</p>
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold">
              {author.username[0].toUpperCase()}
            </div>
            {author.username}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Eye size={11} />{views}</span>
            <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
