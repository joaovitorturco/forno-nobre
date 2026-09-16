"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp, signOutRequest } from "@/services/auth/routes";

export type UserData = {
  id: string;
  nome: string;
  email: string;
};

type AuthContextData = {
  user: UserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  handleSignIn: (email: string, senha: string) => Promise<void>;
  handleSignUp: (nome: string, email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const STORAGE_KEY = "@dudus:user";

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Recupera os dados (não sensíveis) do usuário ao recarregar a página.
  // O token fica em cookie httpOnly e nunca é exposto ao JavaScript.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  function persist(data: UserData) {
    setUser(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  async function handleSignIn(email: string, senha: string) {
    const data = await signIn(email, senha);
    persist({ id: data.id, nome: data.nome, email: data.email });
    router.push("/dashboard");
  }

  async function handleSignUp(nome: string, email: string, senha: string) {
    await signUp(nome, email, senha);
    // Após cadastrar, autentica automaticamente para já levar à tela inicial.
    await handleSignIn(email, senha);
  }

  async function signOut() {
    try {
      await signOutRequest();
    } catch {
      /* ignore */
    }
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        handleSignIn,
        handleSignUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
