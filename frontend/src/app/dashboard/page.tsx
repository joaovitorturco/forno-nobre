"use client";
import { useState, useEffect } from "react";
import { FiLogOut, FiUser, FiMail } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";

type Produto = {
  id: string;
  nome: string;
  preco: number;
  banner: string;
}

export default function DashboardHome() {
  const { user, signOut } = useAuth();
  const [produtos, setProdutos] = useState<Produto[]>([]);

    // Busca as produtos cadastrados ao carregar o componente
    useEffect(() => {
      const buscarProdutos = async () => {
        try {
          const response = await fetch("/api/produto/listarProduto", {
            method: "GET",
            cache: "no-store",
          });
          if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
          }
          const data = await response.json();
          setProdutos(data);
        } catch (error) {
          console.error("ERROR: ", error);
        }
      }
      buscarProdutos();
    }, []);



return (
  <>
    <div className="balcao">
      <div className="cabecalhoPagina">
        <h1 className="saudacao">Olá, {user?.nome?.split(" ")[0]}! 👋</h1>
        <p className="subtitulo">Bem-vindo ao painel do Forno Nobre.</p>
      </div>

      <div className="comanda">
        <div className="topoSerrilhado" aria-hidden="true" />

        <h3 className="tituloCartao">Você está autenticado</h3>
        <p className="descricaoCartao">Estes são os dados da sua sessão atual.</p>

        <div className="linhaTracejada" aria-hidden="true" />

        <div className="linhaInfo">
          <span>
            <FiUser style={{ verticalAlign: "-2px", marginRight: 8 }} />
            Nome
          </span>
          <strong>{user?.nome}</strong>
        </div>

        <div className="linhaInfo">
          <span>
            <FiMail style={{ verticalAlign: "-2px", marginRight: 8 }} />
            E-mail
          </span>
          <strong>{user?.email}</strong>
        </div>

        <button type="button" onClick={signOut} className="botaoSair">
          <FiLogOut style={{ verticalAlign: "-2px", marginRight: 6 }} />
          Encerrar sessão
        </button>

        <div className="baseSerrilhada" aria-hidden="true" />
      </div>
    </div>

    <style jsx>{`
      .balcao {
        min-height: 100vh;
        padding: 60px 20px;
      }

      .cabecalhoPagina {
        max-width: 460px;
        margin: 0 auto 32px;
        text-align: center;
      }


      .saudacao {
        font-family: "Courier New", ui-monospace, monospace;
        font-weight: 700;
        font-size: 24px;
        color: #20201f;
        margin: 0 0 6px;
      }

      .subtitulo {
        font-family: "Courier New", ui-monospace, monospace;
        font-size: 14px;
        color: #352a10;
        margin: 0;
      }

      .comanda {
        position: relative;
        width: 460px;
        max-width: 100%;
        margin: 0 auto;
        padding: 34px 32px 30px;
        background-color: #f7efdb;
        transform: rotate(-0.4deg);
        box-sizing: border-box;
      }

      .topoSerrilhado,
      .baseSerrilhada {
        position: absolute;
        left: 0;
        right: 0;
        height: 10px;
        background-image: linear-gradient(-45deg, #241a14 6px, transparent 0),
          linear-gradient(45deg, #241a14 6px, transparent 0);
        background-size: 12px 12px;
        background-repeat: repeat-x;
      }

      .topoSerrilhado {
        top: -10px;
        background-position: bottom;
      }

      .baseSerrilhada {
        bottom: -10px;
        background-position: top;
        transform: rotate(180deg);
      }

      .tituloCartao {
        font-family: "Courier New", ui-monospace, monospace;
        font-weight: 700;
        font-size: 18px;
        color: #241a14;
        margin: 0 0 6px;
      }

      .descricaoCartao {
        font-family: "Courier New", ui-monospace, monospace;
        font-size: 13px;
        color: #5c5646;
        margin: 0 0 22px;
      }

      .linhaTracejada {
        border-top: 2px dashed #c1391f;
        opacity: 0.4;
        margin-bottom: 22px;
      }

      .linhaInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: "Courier New", ui-monospace, monospace;
        font-size: 14px;
        color: #5c5646;
        padding: 10px 0;
        border-bottom: 1px solid #e3d7b8;
      }

      .linhaInfo strong {
        color: #241a14;
        font-weight: 700;
      }

      .botaoSair {
        width: 100%;
        margin-top: 26px;
        padding: 13px;
        background-color: #c1391f;
        border: none;
        color: #f7efdb;
        font-family: "Courier New", ui-monospace, monospace;
        font-weight: 700;
        font-size: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.1s ease, background-color 0.15s ease;
      }

      .botaoSair:hover {
        background-color: #a12e17;
      }

      .botaoSair:active {
        transform: scale(0.98);
      }
    `}</style>
  </>
);
}
