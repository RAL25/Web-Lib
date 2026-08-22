import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { CarrinhoContext } from "../contexts/CarrinhoContext";
import { AuthContext } from "../contexts/AuthContext";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";
import ListaAvaliacoes from "../components/avaliacao/ListaAvaliacoes";
import FormularioAvaliacao from "../components/avaliacao/FormularioAvaliacao";

interface Exemplar {
  id: number;
  livroId: number;
  status: string;
}

interface LivroDetalhes {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  isbn: string;
  categoria: string;
  descricao?: string;
  capa?: string;
  mediaAvaliacoes?: number;
  ano?: number | string;
  paginas?: number | string;
}

export default function ExemplaresLivro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [exemplares, setExemplares] = useState<Exemplar[]>([]);
  const [livro, setLivro] = useState<LivroDetalhes | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [gatilhoAvaliacoes, setGatilhoAvaliacoes] = useState(0);

  const { adicionarAoCarrinho, itens = [] } = useContext<any>(CarrinhoContext);
  const { role } = useContext(AuthContext);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      const [respExemplares, respLivro] = await Promise.allSettled([
        api.get(`/livro/exemplar/${id}`),
        api.get(`/livro/${id}`),
      ]);

      if (respExemplares.status === "fulfilled") {
        setExemplares(respExemplares.value.data);
      }
      if (respLivro.status === "fulfilled") {
        setLivro(respLivro.value.data);
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.erro || "Erro ao buscar dados do livro.";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (id) {
      carregarDados();
    }
  }, [id]);

  const estaNoCarrinho = (exemplarId: number) => {
    return itens.some((item: any) => item.exemplarId === exemplarId);
  };

  const disponiveis = exemplares.filter(
    (item) =>
      item.status.toLowerCase() === "disponivel" ||
      item.status.toLowerCase() === "disponível",
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MenuLateral />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen w-full">
        <TopNavBar showSearch={false} />

        <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Voltar ao catálogo</span>
          </button>

          {carregando && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">
                progress_activity
              </span>
              <p className="font-body-md">Carregando detalhes do livro...</p>
            </div>
          )}

          {erro && (
            <div className="p-4 bg-error-container/40 border border-error/30 rounded-xl text-error flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              <span>{erro}</span>
            </div>
          )}

          {!carregando && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Book details, metadata, synopsis, copies, reviews */}
              <div className="lg:col-span-8 space-y-6">
                {/* Main Card */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-soft">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Cover */}
                    <div className="w-44 shrink-0 mx-auto sm:mx-0">
                      <div className="w-full aspect-[2/3] rounded-xl overflow-hidden shadow-md border border-outline-variant relative">
                        <img
                          src={
                            livro?.capa ||
                            (livro?.isbn
                              ? `https://covers.openlibrary.org/b/isbn/${livro.isbn}-M.jpg`
                              : "https://via.placeholder.com/200x300?text=Sem+Capa")
                          }
                          alt={livro?.titulo || "Capa do Livro"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/200x300?text=Sem+Capa";
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-label-md text-[11px] shadow-sm">
                          {disponiveis.length > 0 ? "Disponível" : "Indisponível"}
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="bg-surface-container text-on-surface-variant px-2.5 py-1 rounded text-label-md font-label-md uppercase tracking-wider">
                          {livro?.categoria || "Acervo Geral"}
                        </span>
                        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-2 mb-1">
                          {livro?.titulo || `Livro #${id}`}
                        </h1>
                        <h2 className="font-body-lg text-body-lg text-on-surface-variant">
                          por <span className="font-bold text-primary">{livro?.autor || "Autor não informado"}</span>
                        </h2>
                      </div>

                      {/* Details pills */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-surface-container-low border border-outline-variant rounded-xl mt-4">
                        <div>
                          <p className="font-label-md text-[11px] text-outline uppercase">ISBN</p>
                          <p className="font-body-sm text-body-sm font-medium text-on-surface truncate">
                            {livro?.isbn || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="font-label-md text-[11px] text-outline uppercase">Editora</p>
                          <p className="font-body-sm text-body-sm font-medium text-on-surface truncate">
                            {livro?.editora || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="font-label-md text-[11px] text-outline uppercase">Ano</p>
                          <p className="font-body-sm text-body-sm font-medium text-on-surface">
                            {livro?.ano || "2023"}
                          </p>
                        </div>
                        <div>
                          <p className="font-label-md text-[11px] text-outline uppercase">Páginas</p>
                          <p className="font-body-sm text-body-sm font-medium text-on-surface">
                            {livro?.paginas || "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {livro?.descricao && (
                    <div className="mt-6 pt-6 border-t border-outline-variant">
                      <h3 className="font-body-md font-bold text-on-surface mb-2">Sinopse</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {livro.descricao}
                      </p>
                    </div>
                  )}
                </div>

                {/* Copies list */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-soft">
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-4">
                    Exemplares Físicos ({exemplares.length})
                  </h3>

                  {exemplares.length === 0 ? (
                    <p className="text-body-sm text-on-surface-variant italic">
                      Nenhum exemplar cadastrado para este título.
                    </p>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-outline-variant">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-surface-container-low border-b border-outline-variant">
                          <tr>
                            <th className="p-3 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                              Identificador
                            </th>
                            <th className="p-3 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                              Status
                            </th>
                            <th className="p-3 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">
                              Ação
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant font-body-sm">
                          {exemplares.map((ex) => {
                            const disp =
                              ex.status.toLowerCase() === "disponivel" ||
                              ex.status.toLowerCase() === "disponível";
                            const selecionado = estaNoCarrinho(ex.id);

                            return (
                              <tr key={ex.id} className="hover:bg-surface-container-low/50">
                                <td className="p-3 font-medium text-on-surface">
                                  Exemplar #{ex.id}
                                </td>
                                <td className="p-3">
                                  <span
                                    className={`px-2.5 py-0.5 rounded-full text-label-md font-bold ${
                                      disp
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-amber-100 text-amber-800"
                                    }`}
                                  >
                                    {ex.status}
                                  </span>
                                </td>
                                <td className="p-3 text-right">
                                  {role === "CLIENTE" && (
                                    <>
                                      {selecionado ? (
                                        <button
                                          disabled
                                          className="px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-lg font-label-md text-xs font-bold"
                                        >
                                          ✓ Na Sacola
                                        </button>
                                      ) : disp ? (
                                        <button
                                          onClick={() =>
                                            adicionarAoCarrinho({
                                              exemplarId: ex.id,
                                              titulo: livro?.titulo || `Exemplar #${ex.id}`,
                                              autor: livro?.autor || undefined,
                                            })
                                          }
                                          className="px-3 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-xs transition-colors cursor-pointer shadow-xs"
                                        >
                                          + Adicionar à Sacola
                                        </button>
                                      ) : (
                                        <span className="text-xs text-outline italic">
                                          Indisponível
                                        </span>
                                      )}
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Reviews Section */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-soft">
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-4">
                    Avaliações dos Leitores
                  </h3>

                  <ListaAvaliacoes
                    livroId={Number(id)}
                    recarregarGatilho={gatilhoAvaliacoes}
                  />

                  <FormularioAvaliacao
                    livroId={Number(id)}
                    onAvaliacaoSalva={() => {
                      setGatilhoAvaliacoes((prev) => prev + 1);
                      carregarDados();
                    }}
                  />
                </div>
              </div>

              {/* Right Column: Actions / Stats Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft space-y-5 sticky top-24">
                  {/* Availability card */}
                  <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-4xl text-primary mb-2">
                      inventory_2
                    </span>
                    <p className="font-headline-lg text-headline-lg font-bold text-on-surface">
                      {disponiveis.length}
                    </p>
                    <p className="font-label-md text-label-md text-outline uppercase tracking-wider mt-1">
                      Exemplares Disponíveis
                    </p>
                  </div>

                  {/* Rating score */}
                  <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1.5 text-[#F59E0B] mb-1">
                      <span className="font-headline-lg text-headline-lg font-bold text-on-surface mr-1">
                        {livro?.mediaAvaliacoes
                          ? livro.mediaAvaliacoes.toFixed(1)
                          : "0.0"}
                      </span>
                      <span className="material-symbols-outlined fill text-2xl">star</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline">Avaliação dos Leitores</p>
                  </div>

                  {/* Quick Add First Available */}
                  {role === "CLIENTE" && disponiveis.length > 0 && (
                    <button
                      onClick={() => {
                        const ex = disponiveis[0];
                        adicionarAoCarrinho({
                          exemplarId: ex.id,
                          titulo: livro?.titulo || `Exemplar #${ex.id}`,
                          autor: livro?.autor || undefined,
                        });
                      }}
                      className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                      <span>Adicionar 1º Disponível</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

