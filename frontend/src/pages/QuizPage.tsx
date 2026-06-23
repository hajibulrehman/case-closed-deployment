import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { CheckCircle, XCircle, ArrowLeft, Trophy, RotateCcw } from 'lucide-react';

type Phase = 'intro' | 'quiz' | 'result';

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/quizzes/${id}`).then(r => {
      setQuiz(r.data);
      setAnswers(new Array(r.data.questions?.length || 0).fill(null));
    }).finally(() => setLoading(false));
  }, [id]);

  const select = (optionIdx: number) => {
    const next = [...answers];
    next[current] = optionIdx;
    setAnswers(next);
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const { data } = await api.post(`/quizzes/${id}/submit`, { answers });
      setResult(data);
      setPhase('result');
    } finally { setSubmitting(false); }
  };

  const reset = () => {
    setCurrent(0);
    setAnswers(new Array(quiz.questions?.length || 0).fill(null));
    setResult(null);
    setPhase('intro');
  };

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-12"><div className="card h-64 animate-pulse" /></div>;
  if (!quiz) return <div className="text-center py-16 text-zinc-500">Quiz not found.</div>;

  const q = quiz.questions?.[current];
  const answered = answers[current] !== null;
  const allAnswered = answers.every(a => a !== null);

  if (phase === 'intro') return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link to="/interactive" className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm mb-6"><ArrowLeft size={14} /> Back</Link>
      {quiz.coverImage && <div className="rounded-xl overflow-hidden mb-6 aspect-video bg-zinc-800"><img src={quiz.coverImage} alt={quiz.title} className="w-full h-full object-cover" /></div>}
      <span className="badge bg-amber-900/60 text-amber-300 capitalize mb-3 inline-block">{quiz.difficulty}</span>
      <h1 className="text-3xl font-black text-white mb-3">{quiz.title}</h1>
      <p className="text-zinc-400 mb-6">{quiz.description}</p>
      <div className="flex gap-4 text-sm text-zinc-400 mb-8">
        <span>{quiz.questions?.length} questions</span>
        <span>·</span>
        <span>{quiz.plays} people played</span>
      </div>
      <button onClick={() => setPhase('quiz')} className="btn-primary flex items-center gap-2 text-base px-6 py-3">
        Start Quiz →
      </button>
    </div>
  );

  if (phase === 'result' && result) return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link to="/interactive" className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm mb-6"><ArrowLeft size={14} /> Back to Interactive</Link>
      <div className="card p-8 text-center mb-6">
        <Trophy size={48} className={`mx-auto mb-4 ${result.percent >= 70 ? 'text-amber-400' : result.percent >= 40 ? 'text-zinc-400' : 'text-red-500'}`} />
        <div className="text-5xl font-black text-white mb-2">{result.percent}%</div>
        <div className="text-zinc-400 mb-2">{result.score} out of {result.total} correct</div>
        <div className={`text-lg font-bold ${result.percent >= 70 ? 'text-amber-400' : result.percent >= 40 ? 'text-zinc-300' : 'text-red-400'}`}>
          {result.percent >= 90 ? 'Outstanding! 🏆' : result.percent >= 70 ? 'Well done! 👍' : result.percent >= 40 ? 'Not bad — keep learning' : 'Keep studying 📚'}
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {result.results.map((r: any, i: number) => (
          <div key={i} className={`card p-4 border-l-4 ${r.isCorrect ? 'border-l-green-600' : 'border-l-red-600'}`}>
            <div className="flex items-start gap-2 mb-2">
              {r.isCorrect ? <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> : <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />}
              <p className="text-sm font-semibold text-white">{r.question}</p>
            </div>
            <div className="grid grid-cols-1 gap-1 ml-6 mb-2">
              {r.options.map((opt: string, oi: number) => (
                <div key={oi} className={`text-xs px-2 py-1 rounded ${oi === r.correct ? 'bg-green-900/40 text-green-300' : oi === r.selected && !r.isCorrect ? 'bg-red-900/40 text-red-300' : 'text-zinc-500'}`}>
                  {oi === r.correct ? '✓ ' : oi === r.selected && !r.isCorrect ? '✗ ' : '  '}{opt}
                </div>
              ))}
            </div>
            {r.explanation && <p className="text-xs text-zinc-400 ml-6 italic">{r.explanation}</p>}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={reset} className="btn-secondary flex items-center gap-2"><RotateCcw size={14} /> Try Again</button>
        <Link to="/interactive" className="btn-primary">More Quizzes</Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-zinc-400 mb-4">
        <span>Question {current + 1} of {quiz.questions?.length}</span>
        <span>{answers.filter(a => a !== null).length} answered</span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-8">
        <div className="bg-amber-500 h-1.5 rounded-full transition-all" style={{ width: `${((current + 1) / quiz.questions?.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="card p-6 mb-5">
        <p className="text-lg font-semibold text-white leading-relaxed">{q?.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {q?.options?.map((opt: string, oi: number) => (
          <button key={oi} onClick={() => select(oi)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
              answers[current] === oi
                ? 'border-amber-500 bg-amber-900/30 text-white'
                : 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800'
            }`}>
            <span className="text-zinc-500 mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
          className="btn-secondary disabled:opacity-30">← Previous</button>
        {current < (quiz.questions?.length - 1) ? (
          <button onClick={() => setCurrent(c => c + 1)} disabled={!answered} className="btn-primary disabled:opacity-30">
            Next →
          </button>
        ) : (
          <button onClick={submit} disabled={!allAnswered || submitting}
            className="btn-primary disabled:opacity-30 flex items-center gap-2">
            {submitting ? 'Submitting...' : <><Trophy size={15} /> Submit Answers</>}
          </button>
        )}
      </div>
    </div>
  );
}
