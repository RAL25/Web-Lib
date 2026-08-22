import { useState, useEffect, useContext } from "react";
import { api } from "../../services/api";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";
import { AuthContext } from "../../contexts/AuthContext";
import ListaAvaliacoes from "../avaliacao/ListaAvaliacoes";
import FormularioAvaliacao from "../avaliacao/FormularioAvaliacao";

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
  ano?: number | string;
  paginas?: number | string;
}

interface Exemplar {
  id: number;
  livroId: number;
  status: string;
}

export default function CatalogoLivros() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");
  const [busca, setBusca] = useState<string>("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("TODAS");
  
  // Modal de Detalhes
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);
  const [exemplares, setExemplares] = useState<Exemplar[]>([]);
  const [carregandoExemplares, setCarregandoExemplares] = useState<boolean>(false);
  const [gatilhoAvaliacoes, setGatilhoAvaliacoes] = useState<number>(0);

  const { adicionarAoCarrinho } = useContext(CarrinhoContext);
  const { role } = useContext(AuthContext);

  const buscarLivros = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/livro");
      setLivros(response.data);
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.erro ||
        "Falha ao carregar o catálogo de livros.";
      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarLivros();
  }, []);

  // Quando um livro é aberto no modal, busca seus exemplares para saber disponibilidade
  useEffect(() => {
    if (livroSelecionado) {
      const carregarExemplares = async () => {
        try {
          setCarregandoExemplares(true);
          const response = await api.get(`/livro/exemplar/${livroSelecionado.id}`);
          setExemplares(response.data);
        } catch {
          setExemplares([]);
        } finally {
          setCarregandoExemplares(false);
        }
      };
      carregarExemplares();
    } else {
      setExemplares([]);
    }
  }, [livroSelecionado]);

  const handleAvaliacaoSalva = () => {
    setGatilhoAvaliacoes((prev) => prev + 1);
    buscarLivros();
  };

  // Categorias únicas encontradas
  const categorias = ["TODAS", ...Array.from(new Set(livros.map((l) => l.categoria).filter(Boolean)))];

  // Livros filtrados
  const livrosFiltrados = livros.filter((livro) => {
    const termo = busca.toLowerCase();
    const matchBusca =
      livro.titulo?.toLowerCase().includes(termo) ||
      livro.autor?.toLowerCase().includes(termo) ||
      livro.categoria?.toLowerCase().includes(termo) ||
      livro.isbn?.includes(termo);

    const matchCategoria =
      categoriaAtiva === "TODAS" || livro.categoria === categoriaAtiva;

    return matchBusca && matchCategoria;
  });

  // Livros mais bem avaliados
  const melhoresAvaliados = [...livros]
    .sort((a, b) => (b.mediaAvaliacoes || 0) - (a.mediaAvaliacoes || 0))
    .slice(0, 6);

  // Cores pastéis para as capas de livros
  const pastelBgs = [
    "bg-pastel-green",
    "bg-pastel-blue",
    "bg-pastel-purple",
    "bg-pastel-yellow",
  ];

  const exemplaresDisponiveis = exemplares.filter((ex) => ex.status === "Disponivel");

  return (
    <div className="w-full space-y-xxl">
      {/* Header Search & Hero */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-soft w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
          <div className="flex-1 w-full max-w-2xl">
            <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface tracking-tight">
              Bem-vindo à Biblioteca
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-2">
              Explore novos títulos, avalie suas leituras e gerencie seus empréstimos de forma simples.
            </p>
          </div>

          <div className="relative w-full md:w-80 shrink-0">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar livros, autores..."
              className="w-full h-12 pl-12 pr-4 rounded-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none text-body-md text-on-surface transition-all placeholder:text-outline"
            />
          </div>
        </div>

        {/* Categorias Pills */}
        <div className="flex items-center gap-2 pt-6 flex-wrap w-full">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                categoriaAtiva === cat
                  ? "bg-primary text-on-primary font-bold shadow-xs"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant"
              }`}
            >
              {cat === "TODAS" ? "Todos os Gêneros" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Loading and Error states */}
      {carregando && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl animate-spin text-primary">
            progress_activity
          </span>
          <p className="font-body-md text-body-md">Carregando catálogo de livros...</p>
        </div>
      )}

      {erro && (
        <div className="p-4 bg-error-container/40 border border-error/30 rounded-xl text-error flex items-center gap-3">
          <span className="material-symbols-outlined">error</span>
          <span>{erro}</span>
        </div>
      )}

      {/* Seção: Melhores Avaliações (quando não há busca ativa) */}
      {!carregando && !erro && !busca && categoriaAtiva === "TODAS" && melhoresAvaliados.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">
                Melhores Avaliações
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Os títulos favoritos dos nossos leitores
              </p>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
            {melhoresAvaliados.map((livro, idx) => {
              const bgClass = pastelBgs[idx % pastelBgs.length];
              return (
                <div
                  key={`top-${livro.id}`}
                  onClick={() => setLivroSelecionado(livro)}
                  className="min-w-[170px] md:min-w-[210px] flex flex-col gap-2 cursor-pointer group shrink-0"
                >
                  <div
                    className={`w-full aspect-[3/4] ${bgClass} rounded-xl shadow-soft border border-outline-variant group-hover:shadow-md transition-all duration-300 relative overflow-hidden flex items-center justify-center p-2`}
                  >
                    <img
                      src={
                        livro.capa ||
                        `https://covers.openlibrary.org/b/isbn/${livro.isbn}-M.jpg`
                      }
                      alt={livro.titulo}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/150x220?text=Sem+Capa";
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-surface-container-lowest/90 backdrop-blur-xs px-2 py-0.5 rounded-full font-label-md text-[10px] text-primary flex items-center gap-1 shadow-xs">
                      <span className="material-symbols-outlined text-[12px] fill text-[#F59E0B]">star</span>
                      <span>{livro.mediaAvaliacoes ? livro.mediaAvaliacoes.toFixed(1) : "Novo"}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-body-md font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                      {livro.titulo}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {livro.autor}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Seção Principal: Catálogo Geral */}
      {!carregando && !erro && (
        <section className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">
                {busca ? `Resultados para "${busca}"` : "Catálogo Completo"}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {livrosFiltrados.length} {livrosFiltrados.length === 1 ? "título encontrado" : "títulos encontrados"}
              </p>
            </div>
          </div>

          {livrosFiltrados.length === 0 ? (
            <div className="w-full p-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-soft">
              <span className="material-symbols-outlined text-5xl text-outline mb-2">
                menu_book
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Nenhum livro encontrado com os filtros selecionados.
              </p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {livrosFiltrados.map((livro, idx) => {
                const bgClass = pastelBgs[idx % pastelBgs.length];
                return (
                  <div
                    key={livro.id}
                    onClick={() => setLivroSelecionado(livro)}
                    className="flex flex-col gap-2 cursor-pointer group"
                  >
                    <div
                      className={`w-full aspect-[3/4] ${bgClass} rounded-xl shadow-soft border border-outline-variant group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-200 relative overflow-hidden flex items-center justify-center p-1.5`}
                    >
                      <img
                        src={
                          livro.capa ||
                          `https://covers.openlibrary.org/b/isbn/${livro.isbn}-M.jpg`
                        }
                        alt={livro.titulo}
                        className="w-full h-full object-cover rounded-lg shadow-xs"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150x220?text=Sem+Capa";
                        }}
                      />
                      {livro.categoria && (
                        <div className="absolute bottom-2 left-2 bg-inverse-surface/75 backdrop-blur-xs text-inverse-on-surface px-2 py-0.5 rounded font-label-md text-[9px] uppercase tracking-wider">
                          {livro.categoria}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-body-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                        {livro.titulo}
                      </h4>
                      <p className="text-xs text-on-surface-variant truncate">
                        {livro.autor}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-[#F59E0B]">
                        <span className="material-symbols-outlined fill text-[14px]">star</span>
                        <span className="font-label-md text-label-md text-on-surface-variant font-bold">
                          {livro.mediaAvaliacoes ? livro.mediaAvaliacoes.toFixed(1) : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Modal de Detalhes do Livro (Idêntico ao detalhes_do_livro.html) */}
      {livroSelecionado && (
        <div
          className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm z-50 flex justify-center items-center p-2 md:p-6"
          onClick={() => setLivroSelecionado(null)}
        >
          <div
            className="bg-surface-container-lowest w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden relative border border-outline-variant animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLivroSelecionado(null)}
              className="absolute top-4 right-4 z-20 text-on-surface-variant hover:text-error bg-surface-container rounded-full p-1.5 hover:bg-error-container/40 transition-colors shadow-xs cursor-pointer"
              aria-label="Fechar"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Left Panel: Book Details & Reviews (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Book Cover */}
                <div className="w-40 sm:w-48 shrink-0 mx-auto sm:mx-0">
                  <div className="w-full aspect-[2/3] rounded-xl overflow-hidden shadow-md border border-outline-variant relative group">
                    <img
                      src={
                        livroSelecionado.capa ||
                        `https://covers.openlibrary.org/b/isbn/${livroSelecionado.isbn}-M.jpg`
                      }
                      alt={livroSelecionado.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/200x300?text=Sem+Capa";
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-label-md text-[11px] shadow-sm">
                      {exemplaresDisponiveis.length > 0 ? "Disponível" : "Indisponível"}
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className="flex-1 flex flex-col gap-3">
                  <div>
                    <span className="bg-surface-container text-on-surface-variant px-2.5 py-1 rounded text-label-md font-label-md uppercase tracking-wider">
                      {livroSelecionado.categoria || "Geral"}
                    </span>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-2 mb-1">
                      {livroSelecionado.titulo}
                    </h2>
                    <h3 className="font-body-lg text-body-lg text-on-surface-variant">
                      por <span className="font-bold text-primary">{livroSelecionado.autor}</span>
                    </h3>
                  </div>

                  {/* Meta Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-surface-container-low border border-outline-variant rounded-xl mt-2">
                    <div>
                      <p className="font-label-md text-[11px] text-outline uppercase">ISBN</p>
                      <p className="font-body-sm text-body-sm font-medium text-on-surface truncate">
                        {livroSelecionado.isbn || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="font-label-md text-[11px] text-outline uppercase">Editora</p>
                      <p className="font-body-sm text-body-sm font-medium text-on-surface truncate">
                        {livroSelecionado.editora || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="font-label-md text-[11px] text-outline uppercase">Ano</p>
                      <p className="font-body-sm text-body-sm font-medium text-on-surface">
                        {livroSelecionado.ano || "2023"}
                      </p>
                    </div>
                    <div>
                      <p className="font-label-md text-[11px] text-outline uppercase">Páginas</p>
                      <p className="font-body-sm text-body-sm font-medium text-on-surface">
                        {livroSelecionado.paginas || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Synopsis */}
                  {livroSelecionado.descricao && (
                    <div className="mt-2">
                      <h4 className="font-body-md font-bold text-on-surface mb-1">Sinopse</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {livroSelecionado.descricao}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-8 border-t border-outline-variant pt-6">
                <h4 className="font-headline-md text-headline-md font-bold text-on-surface mb-4">
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

            {/* Right Panel: Action Area (Idêntico ao painel direito de detalhes_do_livro.html) */}
            <div className="w-full md:w-80 bg-surface-container-low border-t md:border-t-0 md:border-l border-outline-variant flex flex-col p-6 shrink-0 justify-between">
              <div className="space-y-4">
                {/* Availability Widget */}
                <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-soft flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-4xl text-primary mb-2">
                    inventory_2
                  </span>
                  {carregandoExemplares ? (
                    <p className="font-body-sm text-outline animate-pulse">Verificando...</p>
                  ) : (
                    <>
                      <p className="font-headline-lg text-headline-lg font-bold text-on-surface">
                        {exemplaresDisponiveis.length}
                      </p>
                      <p className="font-label-md text-label-md text-outline uppercase tracking-wider mt-1">
                        Exemplares Disponíveis
                      </p>
                    </>
                  )}
                </div>

                {/* Rating Summary Widget */}
                <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-soft flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1.5 text-[#F59E0B] mb-1">
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface mr-1">
                      {livroSelecionado.mediaAvaliacoes
                        ? livroSelecionado.mediaAvaliacoes.toFixed(1)
                        : "0.0"}
                    </span>
                    <span className="material-symbols-outlined fill text-2xl">star</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-outline">Avaliação média</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-outline-variant">
                {role === "CLIENTE" && exemplaresDisponiveis.length > 0 ? (
                  <button
                    onClick={() => {
                      const primeiroExemplar = exemplaresDisponiveis[0];
                      adicionarAoCarrinho({
                        exemplarId: primeiroExemplar.id,
                        titulo: livroSelecionado.titulo,
                        autor: livroSelecionado.autor,
                      });
                    }}
                    className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    <span>Adicionar à Sacola</span>
                  </button>
                ) : role === "CLIENTE" && exemplaresDisponiveis.length === 0 ? (
                  <button
                    disabled
                    className="w-full bg-surface-container text-outline font-label-md text-label-md py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed border border-outline-variant"
                  >
                    <span className="material-symbols-outlined text-[20px]">block</span>
                    <span>Sem exemplares disponíveis</span>
                  </button>
                ) : (
                  <div className="text-center p-3 bg-surface-container-lowest rounded-xl border border-outline-variant text-body-sm text-on-surface-variant">
                    {role === "ADMINISTRADOR"
                      ? "Visualizando como Administrador"
                      : "Faça login como Leitor para solicitar empréstimo."}
                  </div>
                )}
                <p className="text-center font-body-sm text-[12px] text-outline mt-3">
                  Retirada na biblioteca central
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

