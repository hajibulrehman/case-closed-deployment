import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Zap, Trophy, Users, FileSearch, Lightbulb } from 'lucide-react';

export default function InteractivePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Interactive</h1>
        <p className="text-zinc-400">
          Engage with real cases — post theories, solve mysteries, and challenge other investigators.
        </p>
      </div>

      {/* Main feature cards — 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

        {/* Community Theories */}
        <div className="card p-6 border-t-2 border-t-blue-500 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-blue-900/40 flex items-center justify-center mb-4">
            <Users size={24} className="text-blue-400" />
          </div>
          <h3 className="font-bold text-white text-xl mb-2">Community Theories</h3>
          <p className="text-zinc-400 text-sm mb-5 flex-1">
            Post your own suspect theories on open and unsolved cases. Vote on the most compelling
            arguments from other investigators. Every case has its own theory board.
          </p>
          <Link to="/unsolved" className="btn-primary text-sm text-center">
            Browse Unsolved Cases →
          </Link>
        </div>

        {/* Solve It Yourself */}
        <div className="card p-6 border-t-2 border-t-purple-500 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-purple-900/40 flex items-center justify-center mb-4">
            <FileSearch size={24} className="text-purple-400" />
          </div>
          <h3 className="font-bold text-white text-xl mb-2">Solve It Yourself</h3>
          <p className="text-zinc-400 text-sm mb-5 flex-1">
            Cold cases presented as raw evidence files — crime scene photos, witness statements,
            autopsy reports. Analyze the clues and submit your verdict. No answer shown until you decide.
          </p>
          <span className="badge bg-purple-900/60 text-purple-300 text-center py-1.5">Coming Soon</span>
        </div>

        {/* Mystery Challenges */}
        <div className="card p-6 border-t-2 border-t-amber-500 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-amber-900/40 flex items-center justify-center mb-4">
            <Lightbulb size={24} className="text-amber-400" />
          </div>
          <h3 className="font-bold text-white text-xl mb-2">Mystery Challenges</h3>
          <p className="text-zinc-400 text-sm mb-5 flex-1">
            Timed puzzle challenges — decode a real cipher, identify a suspect from evidence,
            or reconstruct a timeline. New challenges added weekly.
          </p>
          <span className="badge bg-amber-900/60 text-amber-300 text-center py-1.5">Coming Soon</span>
        </div>

      </div>

      {/* Secondary features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

        <div className="card p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-900/40 flex items-center justify-center shrink-0">
            <Brain size={20} className="text-red-400" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">Investigative Journalism</h4>
            <p className="text-zinc-400 text-sm mb-3">
              Submit your own long-form investigation pieces on real cases. Approved by admin and
              published in the Real Life section — separate from fiction.
            </p>
            <Link to="/dashboard/requests" className="text-sm text-red-500 hover:text-red-400 font-medium">
              Submit an investigation →
            </Link>
          </div>
        </div>

        <div className="card p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-teal-900/40 flex items-center justify-center shrink-0">
            <Zap size={20} className="text-teal-400" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">Case Evidence Deep-Dives</h4>
            <p className="text-zinc-400 text-sm mb-3">
              Detailed forensic breakdowns linked to real cases — DNA analysis, crime scene
              reconstruction, digital evidence trails.
            </p>
            <Link to="/learn" className="text-sm text-teal-400 hover:text-teal-300 font-medium">
              Go to Learn section →
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 border-t-2 border-t-amber-500">
          <span className="text-2xl mb-3 block">🧠</span>
          <h3 className="font-bold text-white text-lg mb-1">Detective Quizzes</h3>
          <p className="text-zinc-400 text-sm mb-4">Test your knowledge of real cases, forensics, and criminal history.</p>
          <span className="badge bg-amber-900/60 text-amber-300">Coming Soon</span>
        </div>
        <div className="card p-5 border-t-2 border-t-blue-500">
          <span className="text-2xl mb-3 block">⚡</span>
          <h3 className="font-bold text-white text-lg mb-1">Community Theories</h3>
          <p className="text-zinc-400 text-sm mb-4">Post and vote on suspect theories for unsolved cases.</p>
          <Link to="/unsolved" className="badge bg-blue-900/60 text-blue-300 hover:bg-blue-900 transition-colors cursor-pointer">Browse cases →</Link>
        </div>
        <div className="card p-5 border-t-2 border-t-purple-500">
          <span className="text-2xl mb-3 block">🏆</span>
          <h3 className="font-bold text-white text-lg mb-1">Solve It Yourself</h3>
          <p className="text-zinc-400 text-sm mb-4">Cold cases presented as evidence files — analyze clues and submit your verdict.</p>
          <span className="badge bg-purple-900/60 text-purple-300">Coming soon</span>
        </div>
      </div>

    </div>
  );
}
