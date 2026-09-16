"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/Brand";
import { useAuth } from "@/contexts/AuthContext";

export default function NovoProdutoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  function Voltar(){
    router.replace("/dashboard")
  }

  function VoltarCategoria(){
    router.replace("/nova-categoria")
  }

  // Protege a página inicial: sem sessão, volta para o login.
  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace("/");
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return <div className="center-screen">Carregando…</div>;
  }

  return (
    <div className="app">
      <header className="topbar">
        <Brand tagline={false} />
        <div className="topbar__user">
          <span>{user?.nome}</span>
          <div className="avatar">{user?.nome?.charAt(0).toUpperCase()}</div>
          <button
            type="button"
            onClick={Voltar}
            className="btn btn--ghost"
            style={{ width: "auto", padding: "9px 14px" }}
          > 
            Voltar
          </button>
          <button
            type="button"
            onClick={VoltarCategoria}
            className="btn btn--ghost"
            style={{ width: "auto", padding: "9px 14px" }}
          > 
            Categoria
          </button>
        </div>
      </header>

      <main className="content" style={{ marginInline: "auto" }}>
        {children}
      </main>
    </div>
  );
}
