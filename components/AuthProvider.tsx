"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthUser = {
  name: string;
  email: string;
};

type AuthResult = {
  ok: boolean;
  message?: string;
};

type RegisteredUser = {
  name: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (email: string, password: string) => AuthResult;
  signup: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const normalizeEmail = (value: string) => value.trim().toLowerCase();

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [registered, setRegistered] = useState<Record<string, RegisteredUser>>({});

  const login = (email: string, password: string): AuthResult => {
    const normalized = normalizeEmail(email);

    if (!normalized) {
      return { ok: false, message: "이메일을 입력해주세요." };
    }

    const account = registered[normalized];

    if (!account) {
      return { ok: false, message: "가입된 계정이 없습니다." };
    }

    if (account.password !== password) {
      return { ok: false, message: "비밀번호가 올바르지 않습니다." };
    }

    setUser({ name: account.name, email: normalized });
    return { ok: true };
  };

  const signup = (name: string, email: string, password: string): AuthResult => {
    const trimmedName = name.trim();
    const normalized = normalizeEmail(email);

    if (!trimmedName) {
      return { ok: false, message: "이름을 입력해주세요." };
    }

    if (!normalized) {
      return { ok: false, message: "이메일을 입력해주세요." };
    }

    if (!password.trim()) {
      return { ok: false, message: "비밀번호를 입력해주세요." };
    }

    if (registered[normalized]) {
      return { ok: false, message: "이미 가입된 이메일입니다." };
    }

    setRegistered((prev) => ({
      ...prev,
      [normalized]: { name: trimmedName, password },
    }));
    setUser({ name: trimmedName, email: normalized });
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }

  return context;
}
