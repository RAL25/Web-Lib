import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import ListaLivros from "../components/gerenciar_livros/ListaLivros";
import "../assets/styles/GerenciarLivros.css";

export default function GerenciarLivros() {
  const [livros, setLivros] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const [filtro, setFiltro] = useState(searchParams.get("busca") || "");

  const carregarLivros = async () => {
    try {
      const response = await api.get("/livro");
      setLivros(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  const termoBusca = searchParams.get("busca");
  useEffect(() => {
    if (termoBusca) {
      setFiltro(termoBusca);
    }
  }, [termoBusca]);

  const livrosFiltrados = livros.filter((livro) => {
    if (!filtro.trim()) return true;
    const f = filtro.toLowerCase().trim();
    return (
      livro.titulo?.toLowerCase().includes(f) ||
      livro.autor?.toLowerCase().includes(f) ||
      livro.isbn?.toLowerCase().includes(f) ||
      livro.categoria?.toLowerCase().includes(f) ||
      livro.editora?.toLowerCase().includes(f) ||
      String(livro.id).includes(f)
    );
  });

  const deletarLivro = async (id: number) => {
    if (window.confirm("Certeza que deseja deletar este livro?")) {
      try {
        await api.delete(`/livro/${id}`);
        carregarLivros();
      } catch (error) {
        alert("Erro ao deletar livro.");
      }
    }
  };

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="page-header header-with-actions">
          <h1>Gerenciamento de Acervo</h1>
          <Link to="/cadastrar-livro" className="btn-primary btn-add">
            + Novo Livro
          </Link>
        </header>

        <section className="books-card">
          <ListaLivros onExcluir={deletarLivro} livros={livrosFiltrados} />
        </section>
      </main>
    </div>
  );
}
