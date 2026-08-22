import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";

interface ItemEmprestado {
  id: number;
  exemplarId: number;
  titulo: string;
  autor: string | null;
  data_emprestimo: string;
  data_prazo: string;
  renovacoes_disponiveis: number;
  atrasado: boolean;
  status_prazo: string;
  pode_renovar: boolean;
  motivo_bloqueio: string;
  capa?: string;
  isbn?: string;
}

export default function MeuEmprestimo() {
  const [emprestimos, setEmprestimos] = useState<ItemEmprestado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [processandoId, setProcessandoId] = useState<number | null>(null);

  const carregarEmprestimos = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/emprestimo/listar_itens");
      setEmprestimos(response.data);
    } catch (error) {
      console.error("Erro ao carregar empréstimos ativos:", error);
      setErro("Erro ao buscar seus empréstimos ativos.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarEmprestimos();
  }, []);

  const handleRenovar = async (idItem: number) => {
    setMensagem("");
    setErro("");
    setProcessandoId(idItem);

    try {
      await api.put(`/emprestimo/adiar/${idItem}`);
      setMensagem("Prazo de devolução estendido com sucesso!");
      carregarEmprestimos();
    } catch (error: any) {
      setErro(error.response?.data?.erro || "Erro ao renovar empréstimo.");
    } finally {
      setProcessandoId(null);
    }
  };

  const handleDevolver = async (idItem: number) => {
    setMensagem("");
    setErro("");
    setProcessandoId(idItem);

    try {
      await api.put(`/emprestimo/devolver/${idItem}`);
      setMensagem("Livro devolvido com sucesso! Obrigado pela pontualidade.");
      carregarEmprestimos();
    } catch (error: any) {
      setErro(error.response?.data?.erro || "Erro ao devolver livro.");
    } finally {
      setProcessandoId(null);
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
                Meus Empréstimos
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">
                Acompanhe o prazo de devolução dos seus livros e solicite renovações.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant flex items-center gap-3 shadow-soft">
                <span className="material-symbols-outlined text-primary text-2xl">
                  book
                </span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Em Mãos
                  </span>
                  <span className="text-body-md font-bold text-on-surface leading-none">
                    {emprestimos.length} {emprestimos.length === 1 ? "Livro" : "Livros"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Alerts */}
          {mensagem && (
            <div className="p-4 bg-secondary-container/60 border border-secondary/40 rounded-xl text-on-secondary-container flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-secondary">
                check_circle
              </span>
              <span className="font-body-md font-medium">{mensagem}</span>
            </div>
          )}

          {erro && (
            <div className="p-4 bg-error-container/50 border border-error/30 rounded-xl text-error flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl">error</span>
              <span className="font-body-md">{erro}</span>
            </div>
          )}

          {/* Loading */}
          {carregando && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">
                progress_activity
              </span>
              <p className="font-body-md">Carregando seus empréstimos...</p>
            </div>
          )}

          {/* Empty state */}
          {!carregando && emprestimos.length === 0 && (
            <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-soft flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-outline mb-4">
                <span className="material-symbols-outlined text-4xl">auto_stories</span>
              </div>
              <h2 className="font-headline-md font-bold text-on-surface mb-2">
                Nenhum empréstimo ativo
              </h2>
              <p className="font-body-md text-on-surface-variant max-w-md mb-6">
                Você não possui nenhum livro emprestado no momento. Aproveite para consultar nosso catálogo e escolher sua próxima leitura!
              </p>
              <Link
                to="/realizar-emprestimo"
                className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Buscar Livros</span>
              </Link>
            </div>
          )}

          {/* Active Loans Bento Grid (Idêntico ao layout de meus_emprestimos.html) */}
          {!carregando && emprestimos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emprestimos.map((item) => {
                const dataRetirada = new Date(item.data_emprestimo).toLocaleDateString("pt-BR");
                const dataPrazo = new Date(item.data_prazo).toLocaleDateString("pt-BR");

                return (
                  <div
                    key={item.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md"
                  >
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold text-outline uppercase tracking-wider bg-surface-container-low px-2 py-0.5 rounded">
                        Exemplar #{item.exemplarId}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-label-md font-bold flex items-center gap-1.5 shadow-xs ${
                          item.atrasado
                            ? "bg-error-container text-error border border-error/20"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {item.atrasado ? "warning" : "check_circle"}
                        </span>
                        <span>{item.atrasado ? "Atrasado" : "Em dia"}</span>
                      </span>
                    </div>

                    {/* Book Details */}
                    <div className="flex gap-4 mb-4">
                      <div className="w-16 h-24 bg-surface-container-low rounded-lg border border-outline-variant flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                        {item.capa ? (
                          <img
                            src={item.capa}
                            alt={item.titulo}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-3xl text-primary">
                            menu_book
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-body-md font-bold text-on-surface line-clamp-2 leading-tight">
                          {item.titulo}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 truncate">
                          {item.autor || "Autor não informado"}
                        </p>
                      </div>
                    </div>

                    {/* Dates & Renewal Info Grid */}
                    <div className="grid grid-cols-2 gap-2 p-3 bg-surface-container-low border border-outline-variant rounded-xl text-xs mb-5">
                      <div>
                        <p className="text-outline uppercase text-[10px] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">calendar_today</span>
                          Retirada
                        </p>
                        <p className="font-semibold text-on-surface mt-0.5">{dataRetirada}</p>
                      </div>

                      <div>
                        <p
                          className={`uppercase text-[10px] font-semibold flex items-center gap-1 ${
                            item.atrasado ? "text-error" : "text-primary"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[12px]">event_available</span>
                          Devolver até
                        </p>
                        <p
                          className={`font-bold mt-0.5 ${
                            item.atrasado ? "text-error" : "text-on-surface"
                          }`}
                        >
                          {dataPrazo}
                        </p>
                      </div>

                      <div className="col-span-2 pt-2 border-t border-outline-variant/60 flex items-center justify-between">
                        <span className="text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-outline">
                            autorenew
                          </span>
                          Renovações disponíveis:
                        </span>
                        <span className="font-bold text-primary px-2 py-0.5 bg-surface-container-lowest rounded-full border border-outline-variant">
                          {item.renovacoes_disponiveis}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 mt-auto">
                      <button
                        onClick={() => handleRenovar(item.id)}
                        disabled={!item.pode_renovar || processandoId === item.id}
                        className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
                        title={
                          item.motivo_bloqueio || "Estender prazo de devolução em 7 dias"
                        }
                      >
                        <span className="material-symbols-outlined text-[18px]">update</span>
                        <span>
                          {processandoId === item.id ? "Processando..." : "Renovar Empréstimo"}
                        </span>
                      </button>

                      {!item.pode_renovar && item.motivo_bloqueio && (
                        <p className="text-[11px] text-error text-center">
                          {item.motivo_bloqueio}
                        </p>
                      )}

                      <button
                        onClick={() => handleDevolver(item.id)}
                        disabled={processandoId === item.id}
                        className="w-full bg-surface-container hover:bg-error-container/40 text-on-surface-variant hover:text-error border border-outline-variant font-label-md text-label-md py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          assignment_return
                        </span>
                        <span>Devolver Agora</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

