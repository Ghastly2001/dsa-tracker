"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../lib/api";
import AuthForm from "./auth/AuthForm";


const LoginClient: React.FC = memo(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Account created successfully! Please sign in.");
    }
  }, [searchParams]);

  const handleSubmit = useCallback(
    async ({ email, password }: { email?: string; password?: string }) => {
      if (!email || !password) return;

      setError(null);
      setSuccessMessage(null);
      setIsLoading(true);

      try {
        const response = await loginUser({ email, password });
        login(response.token);
        router.push("/dashboard");
      } catch (err) {
        console.error("loginUser error:", err);
        setError("Invalid email or password. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [login, router],
  );

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded bg-amber-400 mb-4">
            <span className="text-slate-950 font-black text-sm tracking-tight">
              DS
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            DSA Tracker
          </h1>
          <p className="text-sm text-slate-500">
            Sign in to track your DSA progress
          </p>
        </div>

        {successMessage && (
          <div className="px-3 py-2.5 rounded-md bg-emerald-900/20 border border-emerald-800/40 text-emerald-400 text-sm">
            {successMessage}
          </div>
        )}

        <AuthForm
          mode="login"
          error={error}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />

        <p className="text-center text-slate-600 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-slate-300 hover:text-amber-400 transition-colors font-medium"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
});

export default LoginClient;
