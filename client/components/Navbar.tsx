"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (!user) return null;

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-900/80 border-b border-zinc-800/50 shadow-lg shadow-zinc-900/20">
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-amber-400 flex items-center justify-center shrink-0">
                        <span className="text-slate-950 font-black text-xs tracking-tight">DS</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-100 tracking-tight">
                        DSA Tracker
                    </span>
                </div>

                <div className="flex items-center gap-5">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-sm font-medium text-slate-200 leading-none">{user.name}</span>
                        <span className="text-xs text-grey-500 mt-0.5">
                            {user.email}
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-all duration-200 border border-zinc-700 hover:border-zinc-600 hover:shadow-lg hover:shadow-zinc-900/50"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
