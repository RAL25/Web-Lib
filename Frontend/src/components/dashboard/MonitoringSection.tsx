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
    <div className="dashboard-column">
      {/* 1. Devoluções Pendentes (Urgentes) */}
      <div className="monitoring-card">
        <div className="monitoring-header">
          <h2 className="monitoring-title">
            <span>🚨</span> Devoluções Pendentes (Urgentes)
          </h2>
          <span className="badge badge-danger">
            {data.devolucoesPendentes.length} pendente(s)
          </span>
        </div>

        {data.devolucoesPendentes.length === 0 ? (
          <p className="empty-state">
            Nenhum empréstimo atrasado no momento. Parabéns! 🎉
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="monitoring-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Livro</th>
                  <th>Dias de Atraso</th>
                </tr>
              </thead>
              <tbody>
                {data.devolucoesPendentes.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.clienteNome}</strong>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        CPF: {item.clienteCpf}
                      </div>
                    </td>
                    <td>
                      <span>{item.livroTitulo}</span>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        Exemplar #{item.exemplarId}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-danger">
                        {item.diasAtraso}{" "}
                        {item.diasAtraso === 1 ? "dia" : "dias"}
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
      <div className="monitoring-card">
        <div className="monitoring-header">
          <h2 className="monitoring-title">
            <span>🕒</span> Últimas Movimentações
          </h2>
          <span className="sub-badge">Recentes</span>
        </div>

        {data.ultimasMovimentacoes.length === 0 ? (
          <p className="empty-state">Nenhuma movimentação recente registrada.</p>
        ) : (
          <div className="activity-feed">
            {data.ultimasMovimentacoes.map((item) => (
              <div
                key={item.id}
                className={`activity-item ${
                  item.tipo === "Devolução" ? "activity-devolucao" : ""
                }`}
              >
                <div className="activity-main">
                  <div>
                    <span
                      className={`badge ${
                        item.tipo === "Empréstimo"
                          ? "badge-success"
                          : "sub-badge-client"
                      }`}
                      style={{ marginRight: "8px" }}
                    >
                      {item.tipo}
                    </span>
                    <span className="activity-user">{item.usuarioNome}</span>
                  </div>
                  <span className="activity-book">Livro: {item.livroTitulo}</span>
                </div>
                <div className="activity-time">{formatarDataHora(item.data)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Bloco de Estoque Zerado */}
      <div className="monitoring-card zero-stock-card">
        <div className="monitoring-header">
          <h2 className="monitoring-title" style={{ color: "var(--danger)" }}>
            <span>📦</span> Aviso de Estoque Zerado
          </h2>
          <span className="badge badge-danger">
            {data.estoqueZerado.length} esgotado(s)
          </span>
        </div>

        {data.estoqueZerado.length === 0 ? (
          <p className="empty-state">
            Todos os livros do acervo possuem exemplares disponíveis na estante! 👍
          </p>
        ) : (
          <div className="zero-stock-list">
            {data.estoqueZerado.map((livro) => (
              <div key={livro.id} className="zero-stock-item">
                <div>
                  <div className="zero-stock-title">{livro.titulo}</div>
                  <div className="zero-stock-author">{livro.autor}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    className="badge badge-danger"
                    style={{ marginBottom: "4px" }}
                  >
                    0 disponíveis
                  </span>
                  <div style={{ fontSize: "11px" }}>
                    <Link
                      to={`/exemplares-livro/${livro.id}`}
                      style={{ color: "var(--primary)", textDecoration: "underline" }}
                    >
                      Ver exemplares ({livro.totalExemplares} cadastrados)
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
