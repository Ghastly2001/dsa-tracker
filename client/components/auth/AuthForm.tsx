"use client";

import React, { memo, useCallback, useState } from "react";
import { Loader2 } from "lucide-react";

export type AuthMode = "login" | "register";

interface FormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", password: "", confirmPassword: "" };
const MIN_PASSWORD_LENGTH = 6;

const INPUT_CLASS =
    "w-full px-3 py-2.5 rounded-md bg-slate-800/60 border border-slate-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-colors duration-150";

const LABEL_CLASS =
    "block text-xs font-medium text-slate-400 uppercase tracking-wider";

function validateForm(form: FormState, mode: AuthMode): string | null {
    if (mode === "register") {
        if (form.password !== form.confirmPassword) return "Passwords do not match.";
        if (form.password.length < MIN_PASSWORD_LENGTH)
            return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }
    return null;
}

interface AuthFormProps {
    mode: AuthMode;
    error: string | null;
    isLoading: boolean;
    onSubmit: (fields: Partial<FormState>) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = memo(({ mode, error, isLoading, onSubmit }) => {
    const [form, setForm] = useState<FormState>(INITIAL_FORM);
    const [validationError, setValidationError] = useState<string | null>(null);

    const isRegister = mode === "register";

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        const localError = validateForm(form, mode);
        if (localError) {
            setValidationError(localError);
            return;
        }

        setValidationError(null);
        await onSubmit(
            isRegister
                ? { name: form.name, email: form.email, password: form.password }
                : { email: form.email, password: form.password }
        );
    }, [form, mode, isRegister, onSubmit]);

    const displayError = validationError ?? error;

    return (
        <div className="border border-slate-800 rounded-xl bg-slate-900/50 p-7">
            {displayError && (
                <div className="mb-5 px-3 py-2.5 rounded-md bg-red-900/20 border border-red-800/40 text-red-400 text-sm">
                    {displayError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                    <div className="space-y-1.5">
                        <label htmlFor="name" className={LABEL_CLASS}>Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                            placeholder="John Doe"
                            className={INPUT_CLASS}
                        />
                    </div>
                )}

                <div className="space-y-1.5">
                    <label htmlFor="email" className={LABEL_CLASS}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={INPUT_CLASS}
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="password" className={LABEL_CLASS}>Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        autoComplete={isRegister ? "new-password" : "current-password"}
                        placeholder="••••••••"
                        className={INPUT_CLASS}
                    />
                </div>

                {isRegister && (
                    <div className="space-y-1.5">
                        <label htmlFor="confirmPassword" className={LABEL_CLASS}>Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className={INPUT_CLASS}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-semibold rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {isRegister ? "Creating account…" : "Signing in…"}
                        </>
                    ) : (
                        isRegister ? "Create Account" : "Sign In"
                    )}
                </button>
            </form>
        </div>
    );
});

AuthForm.displayName = "AuthForm";

export default AuthForm;