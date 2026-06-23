import { Link } from 'react-router-dom';
import { MapPin, Calendar, Tag } from 'lucide-react';

interface CaseCardProps {
  id: string;
  title: string;
  category: string;
  summary: string;
  location?: string;
  date?: string;
  media?: { url: string; type: string }[];
}

const categoryColors: Record<string, string> = {
  murder: 'bg-red-900/80 text-red-300',
  suicide: 'bg-purple-900/80 text-purple-300',
  missing: 'bg-blue-900/80 text-blue-300',
  genocide: 'bg-orange-900/80 text-orange-300',
  police: 'bg-zinc-700 text-zinc-300',
  other: 'bg-teal-900/80 text-teal-300',
};

export default function CaseCard({ id, title, category, summary, location, date, media }: CaseCardProps) {
  const coverImage = media?.find(m => m.type === 'image');
  const color = categoryColors[category] || categoryColors.other;

  return (
    <Link to={`/cases/${id}`} className="card hover:border-red-900 transition-colors group block">
      {/* Image */}
      <div className="relative h-44 bg-zinc-800 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage.url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-20">⚖</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900/80 to-transparent" />
        <span className={`badge absolute top-3 left-3 ${color}`}>{category}</span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-white text-lg leading-tight mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{summary}</p>
        <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
          {location && (
            <span className="flex items-center gap-1"><MapPin size={11} />{location}</span>
          )}
          {date && (
            <span className="flex items-center gap-1"><Calendar size={11} />{date}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
