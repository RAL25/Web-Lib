import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";
import ListaLivros from "../components/gerenciar_livros/ListaLivros";

export default function GerenciarLivros() {
  const [livros, setLivros] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const [filtro, setFiltro] = useState(searchParams.get("busca") || "");
  const [carregando, setCarregando] = useState(true);

  const carregarLivros = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/livro");
      setLivros(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
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
    if (
      window.confirm(
        "Certeza que deseja deletar este livro e todos os seus exemplares?",
      )
    ) {
      try {
        await api.delete(`/livro/${id}`);
        carregarLivros();
      } catch (error) {
        alert("Erro ao deletar livro.");
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MenuLateral />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen w-full">
        <TopNavBar showSearch={false} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant pb-6">
            <div>
              <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
                Gestão de Acervo
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">
                Cadastre novos títulos via ISBN com busca automática e gerencie todos os exemplares.
              </p>
            </div>

            <Link
              to="/cadastrar-livro"
              className="h-11 px-5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Cadastrar Novo Livro</span>
            </Link>
          </div>

          {/* Search Filter Bar */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-soft">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                type="text"
                placeholder="Filtrar por título, autor, ISBN, categoria ou editora..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full h-11 pl-12 pr-4 bg-surface-container-low border border-outline-variant rounded-full text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all placeholder:text-outline"
              />
            </div>
          </div>

          {/* Loading */}
          {carregando ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">
                progress_activity
              </span>
              <p className="font-body-md">Carregando catálogo de livros...</p>
            </div>
          ) : (
            <ListaLivros onExcluir={deletarLivro} livros={livrosFiltrados} />
          )}
        </main>
      </div>
    </div>
  );
}

