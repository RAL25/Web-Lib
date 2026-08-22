import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarrinhoContext } from "../contexts/CarrinhoContext";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";

export default function Carrinho() {
  const { itens, removerDoCarrinho, limparCarrinho } =
    useContext(CarrinhoContext);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  const finalizarEmprestimo = async () => {
    if (itens.length === 0) return;

    setErro("");
    setMensagem("");
    setEnviando(true);

    try {
      const id_exemplares = itens.map((item) => item.exemplarId);

      await api.post("/emprestimo/realizar", {
        id_exemplares,
      });

      setMensagem("Empréstimo realizado com sucesso! Seus livros já estão reservados.");
      limparCarrinho();
    } catch (error: any) {
      const msgErro =
        error.response?.data?.erro || "Erro ao realizar empréstimo.";
      setErro(msgErro);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MenuLateral />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen w-full">
        <TopNavBar showSearch={false} />

        <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant pb-6">
            <div>
              <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
                Sacola de Empréstimo
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">
                Revise os exemplares selecionados antes de confirmar a retirada.
              </p>
            </div>

            {itens.length > 0 && (
              <button
                onClick={limparCarrinho}
                className="flex items-center gap-2 text-error hover:bg-error-container/40 px-3.5 py-2 rounded-lg font-label-md text-label-md transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                <span>Limpar Sacola</span>
              </button>
            )}
          </div>

          {/* Success / Error alerts */}
          {mensagem && (
            <div className="p-4 bg-secondary-container/60 border border-secondary/40 rounded-xl text-on-secondary-container flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-secondary">
                  check_circle
                </span>
                <span className="font-body-md font-medium">{mensagem}</span>
              </div>
              <button
                onClick={() => navigate("/meu-emprestimo")}
                className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md shrink-0 hover:bg-primary-container transition-colors cursor-pointer"
              >
                Ver Meus Empréstimos
              </button>
            </div>
          )}

          {erro && (
            <div className="p-4 bg-error-container/50 border border-error/30 rounded-xl text-error flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl">error</span>
              <span className="font-body-md">{erro}</span>
            </div>
          )}

          {/* Empty cart state */}
          {itens.length === 0 && !mensagem ? (
            <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-soft flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-outline mb-4">
                <span className="material-symbols-outlined text-4xl">shopping_bag</span>
              </div>
              <h2 className="font-headline-md font-bold text-on-surface mb-2">
                Sua sacola está vazia
              </h2>
              <p className="font-body-md text-on-surface-variant max-w-md mb-6">
                Explore nosso catálogo para encontrar títulos interessantes e adicioná-los aos seus empréstimos.
              </p>
              <Link
                to="/realizar-emprestimo"
                className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Explorar Acervo</span>
              </Link>
            </div>
          ) : null}

          {/* Cart Content (2 Columns) */}
          {itens.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Items List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft">
                  <h2 className="font-body-lg font-bold text-on-surface mb-4">
                    Itens Selecionados ({itens.length})
                  </h2>

                  <div className="divide-y divide-outline-variant">
                    {itens.map((item) => (
                      <div
                        key={item.exemplarId}
                        className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-16 bg-surface-container rounded-lg border border-outline-variant flex items-center justify-center text-primary shrink-0 shadow-xs">
                            <span className="material-symbols-outlined text-2xl">book</span>
                          </div>
                          <div>
                            <h3 className="font-body-md font-bold text-on-surface">
                              {item.titulo || `Exemplar #${item.exemplarId}`}
                            </h3>
                            {item.autor && (
                              <p className="font-body-sm text-body-sm text-on-surface-variant">
                                {item.autor}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-primary-container/10 text-primary px-2 py-0.5 rounded-full">
                                Exemplar #{item.exemplarId}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                <span className="material-symbols-outlined text-[12px]">check_circle</span>
                                Pronto para retirada
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removerDoCarrinho(item.exemplarId)}
                          className="text-on-surface-variant hover:text-error hover:bg-error-container/30 p-2 rounded-lg transition-colors cursor-pointer self-end sm:self-center"
                          title="Remover da sacola"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary / Confirmation Box */}
              <div className="lg:col-span-4 space-y-4 sticky top-24">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft space-y-5">
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Resumo do Pedido
                  </h2>

                  <div className="space-y-3 font-body-sm text-body-sm border-b border-outline-variant pb-4">
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Total de Livros:</span>
                      <span className="font-bold text-on-surface">{itens.length}</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Prazo de Devolução:</span>
                      <span className="font-bold text-primary">14 dias</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Local de Retirada:</span>
                      <span className="font-medium text-on-surface text-right">
                        Biblioteca Central
                      </span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-3.5 rounded-xl text-xs text-on-surface-variant space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-primary">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      <span>Informações Importantes</span>
                    </div>
                    <p className="leading-relaxed">
                      Apresente seu documento ou CPF no balcão de atendimento para retirar seus exemplares.
                    </p>
                  </div>

                  <button
                    onClick={finalizarEmprestimo}
                    disabled={enviando}
                    className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      check_circle
                    </span>
                    <span>
                      {enviando ? "Processando..." : "Confirmar Empréstimo"}
                    </span>
                  </button>

                  <p className="text-center text-[11px] text-outline">
                    Ao confirmar, você concorda com as diretrizes de empréstimo da Web-Lib.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

