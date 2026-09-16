"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Brand } from "@/components/Brand";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUpPage() {
  const { handleSignUp } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nome || !email || !senha) {
      toast.warning("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
      await handleSignUp(nome, email, senha);
      toast.success("Conta criada com sucesso!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao cadastrar.");
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
          <h1 className="auth-title">Criar conta</h1>

          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                className="input"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="seuemail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>

            <button type="submit" className="btn btn--green" disabled={loading}>
              {loading ? <span className="spinner" /> : "Cadastrar"}
            </button>
          </form>

          <p className="auth-foot">
            Já tem conta? <Link href="/">Fazer login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
