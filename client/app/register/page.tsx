"use client";

import React, { memo, useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "../../lib/api";
import AuthForm from "../../components/auth/AuthForm";

const page: React.FC = memo(() => {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(async ({ name, email, password }: { name?: string; email?: string; password?: string }) => {
        if (!name || !email || !password) return;

        setError(null);
        setIsLoading(true);

        try {
            await registerUser({ name, email, password });
            router.push("/login?registered=true");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Registration failed. Please try again.";
            console.error("registerUser error:", err);
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center space-y-1">
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded bg-amber-400 mb-4">
                        <span className="text-slate-950 font-black text-sm tracking-tight">DS</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Create Account</h1>
                    <p className="text-sm text-slate-500">Start tracking your DSA progress</p>
                </div>

                <AuthForm
                    mode="register"
                    error={error}
                    isLoading={isLoading}
                    onSubmit={handleSubmit}
                />

                <p className="text-center text-slate-600 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
});


export default page;