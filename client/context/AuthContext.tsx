"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "../lib/api";

interface User {
    _id: string;
    email: string;
    name?: string;
    completedProblems: string[];
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async (authToken: string) => {
        try {
            const userData = await getUserProfile(authToken);
            setUser(userData);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            logout();
        }
    };

    const login = (authToken: string) => {
        localStorage.setItem("token", authToken);
        setToken(authToken);
        fetchUser(authToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const refreshUser = async () => {
        if (token) {
            await fetchUser(token);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            fetchUser(storedToken).finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, isLoading, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
