import { Link } from "react-router-dom";

export interface DevolucaoPendente {
  id: number;
  clienteId: number;
  clienteNome: string;
  clienteCpf: string;
  livroId: number;
  livroTitulo: string;
  exemplarId: number;
  dataPrazo: string;
  diasAtraso: number;
}

export interface Movimentacao {
  id: string;
  tipo: "Empréstimo" | "Devolução";
  usuarioNome: string;
  livroTitulo: string;
  data: string;
}

export interface LivroEstoque {
  id: number;
  titulo: string;
  autor: string;
  totalExemplares: number;
  disponiveis: number;
}

export interface MonitoringData {
  devolucoesPendentes: DevolucaoPendente[];
  ultimasMovimentacoes: Movimentacao[];
  estoqueZerado: LivroEstoque[];
  estoqueBaixo?: LivroEstoque[];
}

interface MonitoringSectionProps {
  data: MonitoringData;
}

export default function MonitoringSection({ data }: MonitoringSectionProps) {
  const formatarDataHora = (dataIso: string) => {
    try {
      const d = new Date(dataIso);
      return `${d.toLocaleDateString("pt-BR")} às ${d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    } catch {
      return dataIso;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Devoluções Pendentes (Urgentes) */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-outline-variant pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[22px]">
              notification_important
            </span>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              Devoluções Pendentes
            </h2>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-label-md font-bold ${
              data.devolucoesPendentes.length > 0
                ? "bg-error-container text-error"
                : "bg-surface-container text-outline"
            }`}
          >
            {data.devolucoesPendentes.length} pendente(s)
          </span>
        </div>

        {data.devolucoesPendentes.length === 0 ? (
          <div className="p-6 text-center text-body-sm text-on-surface-variant bg-surface-container-low rounded-xl">
            <span className="material-symbols-outlined text-3xl text-emerald-600 mb-1">
              verified
            </span>
            <p>Nenhum empréstimo atrasado no momento. Tudo em dia!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th className="p-2.5 font-label-md text-[11px] text-outline uppercase">
                    Cliente
                  </th>
                  <th className="p-2.5 font-label-md text-[11px] text-outline uppercase">
                    Livro
                  </th>
                  <th className="p-2.5 font-label-md text-[11px] text-outline uppercase text-right">
                    Atraso
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant font-body-sm text-xs">
                {data.devolucoesPendentes.map((item) => (
                  <tr key={item.id} className="hover:bg-error-container/10">
                    <td className="p-2.5 font-medium text-on-surface">
                      <div>{item.clienteNome}</div>
                      <div className="text-[10px] text-outline">
                        CPF: {item.clienteCpf}
                      </div>
                    </td>
                    <td className="p-2.5">
                      <div className="text-on-surface truncate max-w-[140px]">
                        {item.livroTitulo}
                      </div>
                      <div className="text-[10px] text-outline">
                        Exemplar #{item.exemplarId}
                      </div>
                    </td>
                    <td className="p-2.5 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full font-bold bg-error-container text-error">
                        +{item.diasAtraso}d
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 2. Últimas Movimentações */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-outline-variant pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              history
            </span>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              Últimas Movimentações
            </h2>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider bg-surface-container-low px-2.5 py-1 rounded-full text-on-surface-variant">
            Recentes
          </span>
        </div>

        {data.ultimasMovimentacoes.length === 0 ? (
          <p className="p-6 text-center text-body-sm text-outline italic">
            Nenhuma movimentação recente registrada.
          </p>
        ) : (
          <div className="divide-y divide-outline-variant">
            {data.ultimasMovimentacoes.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-start justify-between gap-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      item.tipo === "Empréstimo"
                        ? "bg-secondary-container text-on-secondary-container"
                        : "bg-primary-container/20 text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {item.tipo === "Empréstimo" ? "arrow_outward" : "arrow_downward"}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-body-sm text-xs font-bold text-on-surface">
                        {item.usuarioNome}
                      </span>
                      <span className="text-[10px] text-outline uppercase font-semibold">
                        ({item.tipo})
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant truncate">
                      {item.livroTitulo}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-outline shrink-0">
                  {formatarDataHora(item.data)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Aviso de Estoque Zerado */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-outline-variant pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600 text-[22px]">
              inventory
            </span>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              Estoque Zerado
            </h2>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-label-md font-bold ${
              data.estoqueZerado.length > 0
                ? "bg-amber-100 text-amber-800"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {data.estoqueZerado.length} esgotado(s)
          </span>
        </div>

        {data.estoqueZerado.length === 0 ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Todos os títulos possuem exemplares na estante!</span>
          </div>
        ) : (
          <div className="space-y-2">
            {data.estoqueZerado.map((livro) => (
              <div
                key={livro.id}
                className="p-3 bg-surface-container-low border border-outline-variant rounded-xl flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-body-sm text-xs font-bold text-on-surface truncate">
                    {livro.titulo}
                  </p>
                  <p className="text-[10px] text-on-surface-variant truncate">
                    {livro.autor}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <Link
                    to={`/exemplares-livro/${livro.id}`}
                    className="text-[11px] font-bold text-primary hover:underline"
                  >
                    Ver ({livro.totalExemplares} total)
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

