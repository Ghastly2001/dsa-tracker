"use client";

import React, { memo, useState, useCallback, useMemo } from "react";
import ProblemItem from "./ProblemItem";

interface Problem {
  _id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  leetcodeLink?: string;
  youtubeLink?: string;
  isCompleted: boolean;
}

interface Topic {
  _id: string;
  title: string;
  description?: string;
  problems: Problem[];
}

interface TopicCardProps {
  topic: Topic;
  onToggleProblem: (problemId: string) => void;
}

const TopicCard: React.FC<TopicCardProps> = memo(({ topic, onToggleProblem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);

  const { completedCount, totalCount, progressPercentage } = useMemo(() => {
    const completed = topic.problems.filter((p) => p.isCompleted).length;
    const total = topic.problems.length;
    return {
      completedCount: completed,
      totalCount: total,
      progressPercentage: total > 0 ? (completed / total) * 100 : 0,
    };
  }, [topic.problems]);

  return (
    <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/40 hover:border-slate-700 transition-colors duration-200">
      <button
        type="button"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        className="w-full text-left px-5 py-4 hover:bg-slate-800/40 transition-colors duration-150"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-slate-100">{topic.title}</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm tabular-nums text-slate-400">
              <span className="text-slate-200 font-medium">{completedCount}</span>
              <span className="mx-1 text-slate-600">/</span>
              {totalCount}
            </span>
            <svg
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="h-px w-full bg-slate-800 overflow-hidden rounded-full">
          <div
            className="h-full bg-amber-400 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-4 space-y-1.5 border-t border-slate-800/60">
          <div className="pt-3 space-y-1.5">
            {topic.problems.map((problem) => (
              <ProblemItem
                key={problem._id}
                problem={problem}
                onToggle={onToggleProblem}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

TopicCard.displayName = "TopicCard";

export default TopicCard;