"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/Brand";
import { useAuth } from "@/contexts/AuthContext";
import { FiLogOut } from "react-icons/fi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  function newCategory(){
    router.replace("/nova-categoria")
  }

  function newProduct(){
    router.replace("/novo-produto")
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
            onClick={newCategory}
            className="btn btn--ghost"
            style={{ width: "auto", padding: "9px 14px" }}
          > 
            Categoria
          </button>
          <button
            type="button"
            onClick={newProduct}
            className="btn btn--ghost"
            style={{ width: "auto", padding: "9px 14px" }}
          > 
            Produto
          </button>
        </div>
      </header>

      <main className="content" style={{ marginInline: "auto" }}>
        {children}
      </main>
    </div>
  );
}
