import { useState, useEffect } from "react";
import { api } from "../../services/api";
import ListaAvaliacoes from "../avaliacao/ListaAvaliacoes";
import FormularioAvaliacao from "../avaliacao/FormularioAvaliacao";
import "../avaliacao/Avaliacao.css";
import "./CatalogoLivros.css";

export interface Livro {
  id: number;
  isbn: string;
  mediaAvaliacoes: number;
  titulo: string;
  autor: string;
  editora: string;
  categoria: string;
  capa?: string;
  descricao?: string;
}

function RenderEstrelas({ nota }: { nota: number }) {
  const notaArredondada = Math.round(nota);
  return (
    <div className="book-rating" title={`Nota: ${nota.toFixed(1)} / 5.0`}>
      <span className="stars-icons">
        {"★".repeat(Math.min(5, Math.max(0, notaArredondada)))}
        {"☆".repeat(Math.max(0, 5 - notaArredondada))}
      </span>
      <span className="rating-number">
        {nota > 0 ? nota.toFixed(1) : "Sem avaliações"}
      </span>
    </div>
  );
}

export default function CatalogoLivros() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);
  const [gatilhoAvaliacoes, setGatilhoAvaliacoes] = useState<number>(0);

  const buscarLivros = async () => {
    try {
      const response = await api.get("/livro");
      setLivros(response.data);
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.erro ||
        "Falha ao buscar os livros no servidor.";
      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarLivros();
  }, []);

  const handleAvaliacaoSalva = () => {
    setGatilhoAvaliacoes((prev) => prev + 1);
    buscarLivros(); // Atualiza a média de notas dos livros
  };

  return (
    <section className="catalog-container">
      <h2 className="catalog-header">Catálogo de Livros</h2>

      {carregando && (
        <p className="status-message">Carregando acervo de livros...</p>
      )}

      {erro && <p className="status-message error">Erro: {erro}</p>}

      {!carregando && !erro && livros.length === 0 && (
        <p className="status-message">Nenhum livro cadastrado no momento.</p>
      )}

      {!carregando && !erro && livros.length > 0 && (
        <ul className="books-grid">
          {livros.map((livro) => (
            <li
              key={livro.id}
              className="book-card"
              style={{ cursor: "pointer" }}
              onClick={() => setLivroSelecionado(livro)}
            >
              <img
                src={
                  livro.capa ||
                  `https://covers.openlibrary.org/b/isbn/${livro.isbn}-M.jpg`
                }
                alt={`Capa de ${livro.titulo}`}
                className="book-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/128x192?text=Sem+Capa";
                }}
              />
              <div className="book-info">
                <div className="book-title">{livro.titulo}</div>
                <div className="book-author">{livro.autor}</div>
                <div className="book-meta">
                  <span className="badge-meta">{livro.categoria}</span>
                  <span className="publisher-text">{livro.editora}</span>
                </div>
                <RenderEstrelas nota={livro.mediaAvaliacoes ?? 0} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de Detalhes e Avaliações */}
      {livroSelecionado && (
        <div className="modal-overlay" onClick={() => setLivroSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setLivroSelecionado(null)}
              aria-label="Fechar"
            >
              ✕
            </button>

            <div className="modal-book-header">
              <img
                src={
                  livroSelecionado.capa ||
                  `https://covers.openlibrary.org/b/isbn/${livroSelecionado.isbn}-M.jpg`
                }
                alt={livroSelecionado.titulo}
                className="modal-book-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/100x150?text=Sem+Capa";
                }}
              />
              <div className="modal-book-info">
                <h3 style={{ fontSize: "20px", color: "#0f172a", margin: 0 }}>
                  {livroSelecionado.titulo}
                </h3>
                <div style={{ fontSize: "14px", color: "#475569" }}>
                  <strong>Autor:</strong> {livroSelecionado.autor}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  <strong>ISBN:</strong> {livroSelecionado.isbn} |{" "}
                  <strong>Editora:</strong> {livroSelecionado.editora}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  <strong>Categoria:</strong> {livroSelecionado.categoria}
                </div>
                <RenderEstrelas nota={livroSelecionado.mediaAvaliacoes ?? 0} />
              </div>
            </div>

            {livroSelecionado.descricao && (
              <div style={{ margin: "16px 0", fontSize: "13px", color: "#334155", lineHeight: "1.5" }}>
                <strong>Sinopse:</strong>
                <p style={{ marginTop: "4px" }}>{livroSelecionado.descricao}</p>
              </div>
            )}

            <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "16px 0" }} />

            <h4 style={{ fontSize: "16px", color: "#0f172a", marginBottom: "8px" }}>
              Avaliações dos Leitores
            </h4>

            <ListaAvaliacoes
              livroId={livroSelecionado.id}
              recarregarGatilho={gatilhoAvaliacoes}
            />

            <FormularioAvaliacao
              livroId={livroSelecionado.id}
              onAvaliacaoSalva={handleAvaliacaoSalva}
            />
          </div>
        </div>
      )}
    </section>
  );
}
