import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";

interface ItemHistorico {
  id: number;
  exemplarId: number;
  titulo: string;
  autor: string | null;
  data_emprestimo: string;
  data_devolucao: string;
  capa?: string;
  isbn?: string;
  categoria?: string;
}

export default function Historico() {
  const [historico, setHistorico] = useState<ItemHistorico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroPeriodo, setFiltroPeriodo] = useState("todos");

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        setCarregando(true);
        const response = await api.get("/emprestimo/historico_emprestimo");
        setHistorico(response.data);
      } catch (error) {
        console.error("Erro ao carregar histórico", error);
        setErro("Erro ao carregar histórico de leitura.");
      } finally {
        setCarregando(false);
      }
    };

    carregarHistorico();
  }, []);

  const historicoFiltrado = historico.filter((item) => {
    const termo = busca.toLowerCase();
    const matchBusca =
      item.titulo?.toLowerCase().includes(termo) ||
      item.autor?.toLowerCase().includes(termo) ||
      String(item.exemplarId).includes(termo);

    if (!matchBusca) return false;

    if (filtroPeriodo === "todos") return true;

    const dataDev = new Date(item.data_devolucao || item.data_emprestimo);
    const agora = new Date();
    const diffDias = (agora.getTime() - dataDev.getTime()) / (1000 * 3600 * 24);

    if (filtroPeriodo === "30d") return diffDias <= 30;
    if (filtroPeriodo === "90d") return diffDias <= 90;
    if (filtroPeriodo === "ano") return diffDias <= 365;

    return true;
  });

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
                Histórico Completo
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">
                Consulte todos os seus empréstimos e devoluções anteriores.
              </p>
            </div>

            <div className="bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant flex items-center gap-3 shadow-soft">
              <span className="material-symbols-outlined text-primary text-2xl">
                history_edu
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Total Lidos
                </span>
                <span className="text-body-md font-bold text-on-surface leading-none">
                  {historico.length} {historico.length === 1 ? "Livro" : "Livros"}
                </span>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-soft flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por título ou autor no histórico..."
                className="w-full h-11 pl-12 pr-4 rounded-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none text-body-sm text-on-surface transition-all placeholder:text-outline"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <select
                value={filtroPeriodo}
                onChange={(e) => setFiltroPeriodo(e.target.value)}
                className="h-11 px-4 rounded-xl border border-outline-variant bg-surface-container-low text-body-sm text-on-surface focus:border-primary outline-none transition-all cursor-pointer"
              >
                <option value="todos">Todos os Períodos</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 3 meses</option>
                <option value="ano">Este ano</option>
              </select>
            </div>
          </div>

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
              <p className="font-body-md">Carregando histórico de devoluções...</p>
            </div>
          )}

          {/* Empty State */}
          {!carregando && historico.length === 0 && (
            <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-soft flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-outline mb-4">
                <span className="material-symbols-outlined text-4xl">history</span>
              </div>
              <h2 className="font-headline-md font-bold text-on-surface mb-2">
                Nenhum histórico disponível
              </h2>
              <p className="font-body-md text-on-surface-variant max-w-md mb-6">
                Você ainda não concluiu nenhum empréstimo. Ao devolver seus livros, eles aparecerão aqui para consulta.
              </p>
              <Link
                to="/realizar-emprestimo"
                className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Explorar Livros</span>
              </Link>
            </div>
          )}

          {/* Data Table */}
          {!carregando && historico.length > 0 && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F1F5F9] border-b border-outline-variant">
                    <tr>
                      <th className="py-3.5 px-5 font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        Livro
                      </th>
                      <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        Data de Empréstimo
                      </th>
                      <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        Data de Devolução
                      </th>
                      <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider text-center">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant bg-surface-container-lowest font-body-sm text-body-sm">
                    {historicoFiltrado.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-outline italic">
                          Nenhum registro encontrado para a busca especificada.
                        </td>
                      </tr>
                    ) : (
                      historicoFiltrado.map((item) => {
                        const dataEmprestimo = new Date(
                          item.data_emprestimo,
                        ).toLocaleDateString("pt-BR");
                        const dataDevolucao = new Date(
                          item.data_devolucao,
                        ).toLocaleDateString("pt-BR");

                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-primary/5 transition-colors group"
                          >
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-14 bg-surface-container rounded border border-outline-variant flex items-center justify-center text-primary shrink-0 shadow-xs">
                                  <span className="material-symbols-outlined text-[20px]">
                                    menu_book
                                  </span>
                                </div>
                                <div className="min-w-0">
                                  <p className="font-body-md font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                                    {item.titulo}
                                  </p>
                                  <p className="font-body-sm text-xs text-on-surface-variant truncate">
                                    {item.autor || "Autor não informado"} • Exemplar #{item.exemplarId}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-on-surface-variant font-medium">
                              {dataEmprestimo}
                            </td>
                            <td className="py-4 px-4 text-on-surface-variant font-medium">
                              {dataDevolucao}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-md font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <span className="material-symbols-outlined text-[14px]">
                                  check_circle
                                </span>
                                Devolvido
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-5 py-3 border-t border-outline-variant bg-surface-container-low/50 flex items-center justify-between text-xs text-on-surface-variant">
                <span>
                  Exibindo <strong>{historicoFiltrado.length}</strong> de{" "}
                  <strong>{historico.length}</strong> registros
                </span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

