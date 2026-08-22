import { useState, useEffect } from "react";
import { api } from "../../services/api";
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
      <span className="rating-number">{nota > 0 ? nota.toFixed(1) : "Sem avaliações"}</span>
    </div>
  );
}

export default function CatalogoLivros() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
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

    buscarLivros();
  }, []);

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
            <li key={livro.id} className="book-card">
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
    </section>
  );
}
