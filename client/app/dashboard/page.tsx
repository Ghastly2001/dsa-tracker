"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { getTopics, toggleProgress } from "../../lib/api";
import Navbar from "../../components/Navbar";
import TopicCard from "../../components/TopicCard";
import StatCard from "../../components/StatCard";

interface Problem {
    _id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    link?: string;
    isCompleted: boolean;
}

interface Topic {
    _id: string;
    title: string;
    description?: string;
    problems: Problem[];
}

function mergeTopicsWithProgress(topics: Topic[], completedIds: string[]): Topic[] {
    const completedSet = new Set(completedIds);
    return topics.map((topic) => ({
        ...topic,
        problems: topic.problems.map((problem) => ({
            ...problem,
            isCompleted: completedSet.has(problem._id),
        })),
    }));
}

function computeProgressStats(topics: Topic[]) {
    const total = topics.reduce((sum, t) => sum + t.problems.length, 0);
    const completed = topics.reduce(
        (sum, t) => sum + t.problems.filter((p) => p.isCompleted).length,
        0
    );
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return { total, completed, percentage };
}

interface LoadingScreenProps {
    message?: string;
}

function LoadingScreen({ message = "Loading…" }: LoadingScreenProps) {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="w-10 h-10 border-2 border-slate-700 border-t-amber-400 rounded-full animate-spin mx-auto" />
                <p className="text-slate-500 text-sm tracking-wide">{message}</p>
            </div>
        </div>
    );
}

interface ErrorBannerProps {
    message: string;
}

function ErrorBanner({ message }: ErrorBannerProps) {
    return (
        <div className="mb-6 px-4 py-3 rounded-lg bg-red-900/20 border border-red-800/40 text-red-400 text-sm">
            {message}
        </div>
    );
}
const DashboardPage: React.FC = () => {
    const router = useRouter();
    const { user, token, isLoading: authLoading } = useAuth();

    const [topics, setTopics] = useState<Topic[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [authLoading, user, router]);

    useEffect(() => {
        if (!token || !user) return;

        let cancelled = false;

        const fetchTopics = async () => {
            setIsFetching(true);
            setFetchError(null);

            try {
                const raw: Topic[] = await getTopics();
                if (!cancelled) {
                    setTopics(mergeTopicsWithProgress(raw, user.completedProblems));
                }
            } catch (err) {
                if (!cancelled) {
                    setFetchError("Failed to load topics. Please try again.");
                    console.error("[DashboardPage] getTopics error:", err);
                }
            } finally {
                if (!cancelled) setIsFetching(false);
            }
        };

        fetchTopics();
        return () => { cancelled = true; };
    }, [token, user]);

    const handleToggleProblem = useCallback(
        async (problemId: string) => {
            if (!token) return;

            setTopics((prev) =>
                prev.map((topic) => ({
                    ...topic,
                    problems: topic.problems.map((p) =>
                        p._id === problemId ? { ...p, isCompleted: !p.isCompleted } : p
                    ),
                }))
            );

            try {
                await toggleProgress(problemId, token);
            } catch (err) {
                console.error("[DashboardPage] toggleProgress error:", err);
            }
        },
        [token]
    );

    const stats = useMemo(() => computeProgressStats(topics), [topics]);

    const isPageLoading = authLoading || isFetching;

    if (isPageLoading) {
        return <LoadingScreen message="Loading your progress…" />;
    }
    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#0E0F0F] text-slate-100">
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">

                <section aria-labelledby="progress-heading">
                    <h2
                        id="progress-heading"
                        className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5"
                    >
                        Your Progress
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard label="Total Problems" value={stats.total} accent="sky" />
                        <StatCard label="Completed" value={stats.completed} accent="emerald" />
                        <StatCard label="Progress" value={`${stats.percentage.toFixed(1)}%`} accent="amber" />
                    </div>

                    <div className="mt-5 h-1 rounded-full bg-slate-800 overflow-hidden">
                        <div
                            className="h-full bg-amber-400 transition-all duration-500"
                            style={{ width: `${stats.percentage}%` }}
                            role="progressbar"
                            aria-valuenow={stats.percentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>
                </section>

                <section aria-labelledby="topics-heading">
                    <h2
                        id="topics-heading"
                        className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5"
                    >
                        Topics
                    </h2>

                    {fetchError && <ErrorBanner message={fetchError} />}

                    <div className="space-y-3">
                        {topics.map((topic) => (
                            <TopicCard
                                key={topic._id}
                                topic={topic}
                                onToggleProblem={handleToggleProblem}
                            />
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default DashboardPage;