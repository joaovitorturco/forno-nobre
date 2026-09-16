"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Brand } from "@/components/Brand";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { handleSignIn } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !senha) {
      toast.warning("Preencha e-mail e senha.");
      return;
    }
    setLoading(true);
    try {
      await handleSignIn(email, senha);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="tricolor-bar" />
        <div className="auth-card__body">
          <Brand />
          <h1 className="auth-title">Bem-vindo de volta</h1>
          <p className="auth-subtitle">Entre para gerenciar os pedidos da pizzaria.</p>

          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="seuemail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                className="input"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? <span className="spinner" /> : "Entrar"}
            </button>
          </form>

          <p className="auth-foot">
            Ainda não tem conta? <Link href="/signup">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
