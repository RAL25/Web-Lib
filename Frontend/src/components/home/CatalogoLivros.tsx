import { useState, useEffect } from "react";
import { api } from "../../services/api";
import "./CatalogoLivros.css";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
}

interface CapaLivroProps {
  titulo: string;
  autor: string;
}

// Sub-componente responsável por buscar a capa de cada livro individualmente
function CapaLivro({ titulo, autor }: CapaLivroProps) {
  const [capaUrl, setCapaUrl] = useState<string>("");
  const [carregandoCapa, setCarregandoCapa] = useState<boolean>(true);

  useEffect(() => {
    const buscarCapaGoogle = async () => {
      try {
        const apiKey = "AIzaSyC-qB1kug9MVmHgFTxygYUAB5a3RpSudWo"; // Opcional para buscas simples
        const query = encodeURIComponent(`${titulo} inauthor:${autor}`);
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const thumbnail = data.items[0].volumeInfo.imageLinks?.thumbnail;
          // Subtitui HTTP por HTTPS para evitar problemas de segurança
          const urlSegura = thumbnail?.replace("http://", "https://");
          setCapaUrl(
            urlSegura || "https://via.placeholder.com/128x192?text=Sem+Capa",
          );
        } else {
          setCapaUrl("https://via.placeholder.com/128x192?text=Sem+Capa");
        }
      } catch (error) {
        setCapaUrl("https://via.placeholder.com/128x192?text=Sem+Capa");
      } finally {
        setCarregandoCapa(false);
      }
    };

    buscarCapaGoogle();
  }, [titulo, autor]);

  if (carregandoCapa) {
    return <div className="book-cover-loading">Carregando capa...</div>;
  }

  return <img src={capaUrl} alt={`Capa de ${titulo}`} className="book-cover" />;
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
              <CapaLivro titulo={livro.titulo} autor={livro.autor} />
              <div className="book-info">
                <div className="book-title">{livro.titulo}</div>
                <div className="book-author">{livro.autor}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
