import { useState, useContext, useEffect } from "react";
import { api } from "../services/api";
import { CarrinhoContext } from "../contexts/CarrinhoContext";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";

interface ExemplarComLivro {
  id: number;
  livroId: number;
  status: string;
  livro: {
    id: number;
    titulo: string;
    autor: string | null;
    categoria?: string;
    isbn?: string;
    capa?: string;
  };
}

export default function RealizarEmprestimo() {
  const [busca, setBusca] = useState("");
  const [exemplares, setExemplares] = useState<ExemplarComLivro[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscou, setBuscou] = useState(false);
  const [generoAtivo, setGeneroAtivo] = useState("Todos");

  const {
    adicionarAoCarrinho,
    totalItens,
    itens = [],
  } = useContext<any>(CarrinhoContext);

  const carregarExemplares = async (termo = "") => {
    setCarregando(true);
    setBuscou(true);

    try {
      const response = await api.get(
        `/livro/exemplares/disponiveis?busca=${encodeURIComponent(termo)}`,
      );
      setExemplares(response.data);
    } catch (error) {
      console.error("Erro ao buscar exemplares", error);
      setExemplares([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarExemplares();
  }, []);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    carregarExemplares(busca);
  };

  const estaNoCarrinho = (exemplarId: number) => {
    return itens.some((item: any) => item.exemplarId === exemplarId);
  };

  const isDisponivel = (status: string) => {
    const s = status ? status.toLowerCase() : "";
    return s === "disponivel" || s === "disponível";
  };

  const generos = ["Todos", "Ficção", "História", "Fantasia", "Ciência", "Romance", "Técnico"];

  const exemplaresFiltrados = exemplares.filter((ex) => {
    if (generoAtivo === "Todos") return true;
    return ex.livro?.categoria?.toLowerCase().includes(generoAtivo.toLowerCase());
  });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MenuLateral />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen w-full">
        <TopNavBar showSearch={false} />

        <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* Header & Quick Actions */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-6">
            <div>
              <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
                Buscar & Emprestar Livros
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">
                Explore os exemplares disponíveis no acervo e adicione à sua sacola de empréstimos.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant flex items-center gap-3 shadow-soft">
                <span className="material-symbols-outlined text-primary text-2xl">
                  shopping_bag
                </span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Sacola
                  </span>
                  <span className="text-body-md font-bold text-on-surface leading-none">
                    {totalItens} {totalItens === 1 ? "Livro" : "Livros"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-soft">
            <form onSubmit={handleBuscar} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  type="text"
                  className="w-full h-12 pl-12 pr-4 bg-surface-container-low border border-outline-variant rounded-full text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all placeholder:text-outline"
                  placeholder="Buscar por título, autor ou ISBN..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={carregando}
                className="h-12 px-6 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-full flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>{carregando ? "Buscando..." : "Pesquisar"}</span>
              </button>
            </form>

            {/* Quick Genre Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-hide">
              {generos.map((gen) => (
                <button
                  key={gen}
                  onClick={() => setGeneroAtivo(gen)}
                  className={`shrink-0 px-4 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                    generoAtivo === gen
                      ? "bg-primary text-on-primary font-bold shadow-xs"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant"
                  }`}
                >
                  {gen}
                </button>
              ))}
            </div>
          </section>

          {/* Loading */}
          {carregando && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">
                progress_activity
              </span>
              <p className="font-body-md">Consultando exemplares disponíveis...</p>
            </div>
          )}

          {/* Empty state */}
          {buscou && exemplaresFiltrados.length === 0 && !carregando && (
            <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-soft">
              <span className="material-symbols-outlined text-5xl text-outline mb-2">
                search_off
              </span>
              <p className="font-body-md text-on-surface-variant">
                Nenhum exemplar foi encontrado para os critérios selecionados.
              </p>
            </div>
          )}

          {/* Exemplares Grid (Cards idênticos a lista_de_desejos.html) */}
          {exemplaresFiltrados.length > 0 && !carregando && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {exemplaresFiltrados.map((exemplar) => {
                const selecionado = estaNoCarrinho(exemplar.id);
                const disponivel = isDisponivel(exemplar.status);

                return (
                  <article
                    key={exemplar.id}
                    className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-soft overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 group"
                  >
                    {/* Cover Area */}
                    <div className="relative aspect-[3/4] w-full bg-surface-container-low overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={
                          exemplar.livro?.capa ||
                          (exemplar.livro?.isbn
                            ? `https://covers.openlibrary.org/b/isbn/${exemplar.livro.isbn}-M.jpg`
                            : "https://via.placeholder.com/200x300?text=Livro")
                        }
                        alt={exemplar.livro?.titulo || "Capa do livro"}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-xs"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150x220?text=Sem+Capa";
                        }}
                      />
                      {/* Status Badge */}
                      <div
                        className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-label-md font-bold flex items-center gap-1 shadow-xs ${
                          disponivel
                            ? "bg-emerald-100/90 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100/90 text-amber-800 border border-amber-300"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {disponivel ? "check_circle" : "schedule"}
                        </span>
                        <span>{exemplar.status}</span>
                      </div>

                      <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-xs text-inverse-on-surface px-2 py-0.5 rounded font-label-md text-[10px]">
                        Exemplar #{exemplar.id}
                      </div>
                    </div>

                    {/* Info & Action */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-body-md font-bold text-on-surface line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                        {exemplar.livro?.titulo || `Livro #${exemplar.livroId}`}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 truncate">
                        {exemplar.livro?.autor || "Autor desconhecido"}
                      </p>

                      <div className="mt-auto">
                        {selecionado ? (
                          <button
                            disabled
                            className="w-full bg-secondary-container text-on-secondary-container font-label-md text-label-md py-2.5 px-3 rounded-lg flex justify-center items-center gap-2 cursor-default font-bold shadow-xs"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              check
                            </span>
                            <span>Na Sacola</span>
                          </button>
                        ) : !disponivel ? (
                          <button
                            disabled
                            className="w-full bg-surface-container text-outline font-label-md text-label-md py-2.5 px-3 rounded-lg flex justify-center items-center gap-2 cursor-not-allowed border border-outline-variant"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              block
                            </span>
                            <span>Indisponível</span>
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              adicionarAoCarrinho({
                                exemplarId: exemplar.id,
                                titulo: exemplar.livro?.titulo || `Exemplar #${exemplar.id}`,
                                autor: exemplar.livro?.autor || undefined,
                              })
                            }
                            className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-2.5 px-3 rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer shadow-xs"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              shopping_bag
                            </span>
                            <span>Adicionar à Sacola</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

