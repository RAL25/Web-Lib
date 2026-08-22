import { useState, useContext } from "react";
import { api } from "../services/api";
import { CarrinhoContext } from "../contexts/CarrinhoContext";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/RealizarEmprestimo.css";

interface ExemplarComLivro {
  id: number;
  livroId: number;
  status: string;
  livro: {
    id: number;
    titulo: string;
    autor: string | null;
  };
}

export default function RealizarEmprestimo() {
  const [busca, setBusca] = useState("");
  const [exemplares, setExemplares] = useState<ExemplarComLivro[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscou, setBuscou] = useState(false);

  const {
    adicionarAoCarrinho,
    totalItens,
    itens = [],
  } = useContext<any>(CarrinhoContext);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setBuscou(true);

    try {
      const response = await api.get(
        `/livro/exemplares/disponiveis?busca=${busca}`,
      );
      setExemplares(response.data);
    } catch (error) {
      console.error("Erro ao buscar exemplares", error);
    } finally {
      setCarregando(false);
    }
  };

  const estaNoCarrinho = (exemplarId: number) => {
    return itens.some((item: any) => item.exemplarId === exemplarId);
  };

  const isDisponivel = (status: string) => {
    const s = status ? status.toLowerCase() : "";
    return s === "disponivel" || s === "disponível";
  };

  const getBadgeStyle = (status: string) => {
    const s = status ? status.toLowerCase() : "";

    if (s === "disponivel" || s === "disponível") {
      return {
        backgroundColor: "var(--primary-light, #e6f4f0)",
        color: "var(--primary, #024935)",
      };
    }
    if (s === "emprestado") {
      return {
        backgroundColor: "var(--warning, #ffedd5)",
        color: "var(--warning-text, #7c2d12)",
      };
    }
    return { backgroundColor: "#f1f5f9", color: "#475569" };
  };

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="page-header header-with-badge">
          <div>
            <h1>Consultar e Emprestar Exemplares</h1>
          </div>
          <div className="cart-counter-badge">
            🛒 Itens no Carrinho: <strong>{totalItens}</strong>
          </div>
        </header>

        <section className="search-section">
          <form onSubmit={handleBuscar} className="search-form">
            <input
              type="text"
              className="form-control"
              placeholder="Digite o título do livro ou autor..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button type="submit" className="btn-primary" disabled={carregando}>
              {carregando ? "Buscando..." : "Buscar"}
            </button>
          </form>
        </section>

        {buscou && exemplares.length === 0 && !carregando && (
          <div className="results-card">
            <p className="empty-message">
              Nenhum exemplar foi encontrado para esta busca.
            </p>
          </div>
        )}

        {exemplares.length > 0 && (
          <section className="results-card">
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Código do Exemplar</th>
                    <th>Título do Livro</th>
                    <th>Autor</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {exemplares.map((exemplar) => {
                    const selecionado = estaNoCarrinho(exemplar.id);
                    const disponivel = isDisponivel(exemplar.status);

                    let textoBotao = "Adicionar ao carrinho";
                    let desabilitado = false;
                    let classeBotao = "btn-primary";

                    if (!disponivel) {
                      textoBotao = "Indisponível";
                      desabilitado = true;
                      classeBotao = "btn-disabled";
                    } else if (selecionado) {
                      textoBotao = "✓ Selecionado";
                      desabilitado = true;
                      classeBotao = "btn-selected";
                    }

                    return (
                      <tr key={exemplar.id}>
                        <td className="code-cell">Exemplar #{exemplar.id}</td>
                        <td className="title-cell">{exemplar.livro.titulo}</td>
                        <td>{exemplar.livro.autor || "Não informado"}</td>
                        <td>
                          <span
                            className="badge"
                            style={getBadgeStyle(exemplar.status)}
                          >
                            {exemplar.status}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className={`btn-action ${classeBotao}`}
                            onClick={() =>
                              adicionarAoCarrinho({
                                exemplarId: exemplar.id,
                                titulo: `${exemplar.livro.titulo} (Exemplar #${exemplar.id})`,
                              })
                            }
                            disabled={desabilitado}
                          >
                            {textoBotao}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
