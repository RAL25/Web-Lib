export interface KpiData {
  totalTitulos: number;
  totalExemplares: number;
  emprestimosAtivos: number;
  devolucoesAtrasadas: number;
  totalUsuarios: {
    total: number;
    clientes: number;
    funcionarios?: number;
    admins: number;
  };
  usuariosPenalizados: number;
}

interface KpiCardsProps {
  data: KpiData;
}

export default function KpiCards({ data }: KpiCardsProps) {
  return (
    <div className="kpi-grid">
      {/* 1. Total do Acervo */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Total do Acervo</span>
          <span className="kpi-icon">📚</span>
        </div>
        <div className="kpi-body">
          <div className="kpi-value">{data.totalTitulos}</div>
          <div className="kpi-description">
            {data.totalTitulos === 1 ? "Título" : "Títulos"} (
            <strong>{data.totalExemplares}</strong>{" "}
            {data.totalExemplares === 1 ? "exemplar" : "exemplares"} no total)
          </div>
        </div>
      </div>

      {/* 2. Empréstimos Ativos */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Empréstimos Ativos</span>
          <span className="kpi-icon">🔄</span>
        </div>
        <div className="kpi-body">
          <div className="kpi-value">{data.emprestimosAtivos}</div>
          <div className="kpi-description">
            {data.emprestimosAtivos === 1
              ? "Livro atualmente emprestado"
              : "Livros atualmente emprestados"}
          </div>
        </div>
      </div>

      {/* 3. Devoluções em Atraso (Destaque visual com --danger) */}
      <div
        className={`kpi-card ${data.devolucoesAtrasadas > 0 ? "kpi-danger" : ""}`}
      >
        <div className="kpi-header">
          <span className="kpi-title">Devoluções em Atraso</span>
          <span className="kpi-icon">⚠️</span>
        </div>
        <div className="kpi-body">
          <div className="kpi-value">{data.devolucoesAtrasadas}</div>
          <div className="kpi-description">
            {data.devolucoesAtrasadas > 0 ? (
              <span style={{ color: "var(--danger)", fontWeight: 600 }}>
                {data.devolucoesAtrasadas === 1
                  ? "Requer atenção imediata"
                  : "Requerem atenção imediata"}
              </span>
            ) : (
              "Nenhum atraso registrado"
            )}
          </div>
        </div>
      </div>

      {/* 4. Total de Usuários (Com Sub-badges por perfil) */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Total de Usuários</span>
          <span className="kpi-icon">👥</span>
        </div>
        <div className="kpi-body">
          <div className="kpi-value">{data.totalUsuarios.total}</div>
          <div className="kpi-badges">
            <span className="sub-badge sub-badge-client">
              {data.totalUsuarios.clientes} Leitores
            </span>
            <span className="sub-badge sub-badge-admin">
              {data.totalUsuarios.admins} Admins
            </span>
          </div>
        </div>
      </div>

      {/* 5. Usuários Penalizados / Bloqueados */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Bloqueados</span>
          <span className="kpi-icon">🚫</span>
        </div>
        <div className="kpi-body">
          <div className="kpi-value">{data.usuariosPenalizados}</div>
          <div className="kpi-description">
            {data.usuariosPenalizados === 1
              ? "Usuário com conta bloqueada"
              : "Usuários com conta bloqueada"}
          </div>
        </div>
      </div>
    </div>
  );
}
