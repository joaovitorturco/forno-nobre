"use client";
import { useState, useEffect } from "react";

type Categoria = {
  id: string;
  nome: string;
};



export default function CategoriaForm() {
  const [nome, setNome] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Função para criar uma nova categoria
  const criarCategoria = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nome.trim()) {
      setMensagem("Digite o nome da categoria.");
      return;
    }

    try {
      const response = await fetch("/api/categoria/criarCategoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar categoria");
      }

      setMensagem("Categoria criada com sucesso!");
      setNome("");
    } catch (error) {
      setMensagem("Erro ao criar categoria.");
      console.error("ERROR: ", error)
    }
  };


return (
  <>
    <div className="balcao">
      <form className="comanda" onSubmit={criarCategoria}>
        <div className="topoSerrilhado" aria-hidden="true" />

        <div className="cabecalho">
          <span className="selo">Comanda</span>
          <h1 className="titulo">Nova categoria</h1>
        </div>

        <div className="linhaTracejada" aria-hidden="true" />

        <div className="campo">
          <label htmlFor="nome">Nome da categoria</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="ex.: Massas, Bebidas, Sobremesas"
          />
        </div>

        <button type="submit">Criar categoria</button>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <div className="baseSerrilhada" aria-hidden="true" />
      </form>
    </div>

    <style jsx>{`
      .balcao {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        
      }

      .comanda {
        position: relative;
        width: 380px;
        padding: 34px 32px 28px;
        background-color: #f7efdb;
        transform: rotate(-0.6deg);
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

      .cabecalho {
        text-align: center;
        margin-bottom: 18px;
      }

      .selo {
        display: inline-block;
        font-family: "Courier New", ui-monospace, monospace;
        font-size: 12px;
        color: #4a7c3f;
        border: 1px dashed #4a7c3f;
        padding: 2px 10px;
        border-radius: 2px;
        margin-bottom: 10px;
      }

      .titulo {
        font-family: "Courier New", ui-monospace, monospace;
        font-weight: 700;
        font-size: 22px;
        color: #241a14;
        margin: 0;
      }

      .linhaTracejada {
        border-top: 2px dashed #c1391f;
        opacity: 0.4;
        margin-bottom: 24px;
      }

      .campo {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 28px;
      }

      .campo label {
        font-family: "Courier New", ui-monospace, monospace;
        font-size: 13px;
        color: #5c5646;
      }

      .campo input {
        font-family: "Courier New", ui-monospace, monospace;
        font-size: 16px;
        color: #241a14;
        background: #fffaf0;
        border: 1px solid #d8cba8;
        padding: 10px 12px;
        outline: none;
        transition: border-color 0.15s ease;
      }

      .campo input::placeholder {
        color: #b0a582;
      }

      .campo input:focus {
        border-color: #c1391f;
      }

      button {
        width: 100%;
        padding: 13px;
        background-color: #c1391f;
        border: none;
        color: #f7efdb;
        font-family: "Courier New", ui-monospace, monospace;
        font-weight: 700;
        font-size: 15px;
        cursor: pointer;
        transition: transform 0.1s ease, background-color 0.15s ease;
      }

      button:hover {
        background-color: #a12e17;
      }

      button:active {
        transform: scale(0.97);
      }

      .mensagem {
        margin-top: 18px;
        text-align: center;
        font-family: "Courier New", ui-monospace, monospace;
        font-size: 13px;
        color: #5c5646;
      }
    `}</style>
  </>
);
}