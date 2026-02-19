"use client";

import React, { memo, useCallback } from "react";
import { Youtube } from "lucide-react";
import Link from "next/link";

interface Problem {
  _id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  leetcodeLink?: string;
  youtubeLink?: string;
  isCompleted: boolean;
}

interface ProblemItemProps {
  problem: Problem;
  onToggle: (problemId: string) => void;
}

const DIFFICULTY_STYLES: Record<Problem["difficulty"], string> = {
  Easy: "text-emerald-400 border-emerald-800/60 bg-emerald-900/20",
  Medium: "text-amber-400 border-amber-800/60 bg-amber-900/20",
  Hard: "text-red-400 border-red-800/60 bg-red-900/20",
};

const CheckIcon: React.FC = () => (
  <svg className="w-3 h-3 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const ProblemItem: React.FC<ProblemItemProps> = memo(({ problem, onToggle }) => {
  const handleToggle = useCallback(() => onToggle(problem._id), [onToggle, problem._id]);

  const titleStyles = problem.isCompleted
    ? "text-slate-500 line-through"
    : "text-slate-200";

  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-150 ${problem.isCompleted ? "bg-slate-800/30" : "hover:bg-slate-800/40"}`}>
      <label className="flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={problem.isCompleted}
          onChange={handleToggle}
          className="sr-only peer"
          aria-label={`Mark "${problem.title}" as ${problem.isCompleted ? "incomplete" : "complete"}`}
        />
        <div className="w-4.5 h-4.5 rounded border border-slate-600 peer-checked:border-amber-400 peer-checked:bg-amber-400 transition-all duration-150 flex items-center justify-center">
          {problem.isCompleted && <CheckIcon />}
        </div>
      </label>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        {problem.leetcodeLink ? (
          <Link
            href={problem.leetcodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium truncate hover:text-amber-400 transition-colors ${titleStyles}`}
          >
            {problem.title}
          </Link>
        ) : (
          <span className={`text-sm font-medium truncate ${titleStyles}`}>
            {problem.title}
          </span>
        )}

        {problem.youtubeLink && (
          <Link
            href={problem.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${problem.title} on YouTube`}
            className="shrink-0 text-slate-600 hover:text-red-500 transition-colors"
          >
            <Youtube className="w-4 h-4" />
          </Link>
        )}
      </div>

      <span className={`shrink-0 text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${DIFFICULTY_STYLES[problem.difficulty]}`}>
        {problem.difficulty}
      </span>
    </div>
  );
});

ProblemItem.displayName = "ProblemItem";

export default ProblemItem;