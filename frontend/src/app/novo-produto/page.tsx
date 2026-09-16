"use client";

import { useState, useEffect } from "react";

type Categoria = {
  id: string;
  nome: string;
};

export default function ProdutoForm() {
  const [nome, setNome] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [id_categoria, setIdCategoria] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensagem, setMensagem] = useState<string>("");


  // Busca as categorias cadastradas
  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const response = await fetch(
          "/api/categoria/listarCategorias",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar categorias");
        }

        const data = await response.json();

        setCategorias(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    };

    buscarCategorias();
  }, []);

  // Função para cadastrar produto
  const criarProduto = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("preco", String(Number(preco)));
    formData.append("descricao", descricao);
    formData.append("id_categoria", id_categoria);
    if (imagem) formData.append("file", imagem); // arquivo de verdade, não .name


    try {
      const response = await fetch(
        "/api/produto/criarProduto",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const erroData = await response.json().catch(() => null);
        console.error("DETALHE DO ERRO:", erroData);
        throw new Error(erroData?.error || erroData?.message || "Erro ao criar produto");
      }

      setMensagem("Produto criado com sucesso!");

      setNome("");
      setPreco("");
      setDescricao("");
      setIdCategoria("");
      setImagem(null);

    } catch (error) {
      console.error("ERROR:", error);
      setMensagem("Erro ao criar produto.");
    }
  };

return (
  <>
    <div className="balcao">
      <form className="comanda" onSubmit={criarProduto}>
        <div className="topoSerrilhado" aria-hidden="true" />

        <div className="cabecalho">
          <span className="selo">Comanda</span>
          <h1 className="titulo">Cadastro de produto</h1>
        </div>

        <div className="linhaTracejada" aria-hidden="true" />

        <div className="linha">
          <div className="campo">
            <label htmlFor="nome">Nome do produto</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="ex.: Marguerita, Calabresa"
            />
          </div>

          <div className="campo">
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              value={id_categoria}
              onChange={(e) => setIdCategoria(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="linha">
          <div className="campo">
            <label htmlFor="preco">Preço</label>
            <input
              id="preco"
              type="number"
              step="0.01"
              min="0"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Ex: 39.90"
            />
          </div>

          <div className="campo">
            <label htmlFor="imagem">Imagem do produto</label>
            <input
              id="imagem"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setImagem(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

        <div className="campo">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Molho de tomate, mussarela, manjericão fresco..."
          />
        </div>

        <button type="submit">Cadastrar produto</button>

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
        width: 600px;
        padding: 40px 44px 32px;
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
        font-size: 24px;
        color: #241a14;
        margin: 0;
      }

      .linhaTracejada {
        border-top: 2px dashed #c1391f;
        opacity: 0.4;
        margin-bottom: 28px;
      }

      .linha {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      .campo {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 24px;
      }

      .campo label {
        font-family: "Courier New", ui-monospace, monospace;
        font-size: 13px;
        color: #5c5646;
      }

      input,
      select,
      textarea {
        font-family: "Courier New", ui-monospace, monospace;
        font-size: 15px;
        color: #241a14;
        background: #fffaf0;
        border: 1px solid #d8cba8;
        padding: 10px 12px;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.15s ease;
      }

      input::placeholder,
      textarea::placeholder {
        color: #b0a582;
      }

      input:focus,
      select:focus,
      textarea:focus {
        border-color: #c1391f;
      }

      textarea {
        min-height: 110px;
        resize: vertical;
      }

      input[type="file"] {
        padding: 8px;
        width: 100%;
      }

      button {
        width: 100%;
        margin-top: 4px;
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
        transform: scale(0.98);
      }

      .mensagem {
        margin-top: 16px;
        text-align: center;
        font-family: "Courier New", ui-monospace, monospace;
        font-size: 13px;
        color: #5c5646;
      }

      @media (max-width: 700px) {
        .comanda {
          width: 90%;
        }

        .linha {
          grid-template-columns: 1fr;
          gap: 0;
        }
      }
    `}</style>
  </>
);
}