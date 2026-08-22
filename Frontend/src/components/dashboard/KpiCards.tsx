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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 1. Total do Acervo */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-soft flex flex-col justify-between hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Total de Títulos
          </span>
          <div className="w-10 h-10 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">library_books</span>
          </div>
        </div>
        <div>
          <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
            {data.totalTitulos}
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant mt-1">
            <strong>{data.totalExemplares}</strong> exemplares físicos
          </p>
        </div>
      </div>

      {/* 2. Empréstimos Ativos */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-soft flex flex-col justify-between hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Empréstimos Ativos
          </span>
          <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">sync_alt</span>
          </div>
        </div>
        <div>
          <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
            {data.emprestimosAtivos}
          </div>
          <p className="font-body-sm text-xs text-secondary font-medium mt-1">
            Livros em circulação
          </p>
        </div>
      </div>

      {/* 3. Devoluções em Atraso */}
      <div
        className={`bg-surface-container-lowest border rounded-2xl p-5 shadow-soft flex flex-col justify-between hover:shadow-md transition-all ${
          data.devolucoesAtrasadas > 0
            ? "border-error/40 bg-error-container/10"
            : "border-outline-variant"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Atrasos
          </span>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              data.devolucoesAtrasadas > 0
                ? "bg-error-container text-error"
                : "bg-surface-container text-outline"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
        </div>
        <div>
          <div
            className={`font-headline-lg text-headline-lg font-bold ${
              data.devolucoesAtrasadas > 0 ? "text-error" : "text-on-surface"
            }`}
          >
            {data.devolucoesAtrasadas}
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant mt-1">
            {data.devolucoesAtrasadas > 0 ? (
              <span className="text-error font-semibold">Atenção requerida</span>
            ) : (
              "Nenhum atraso"
            )}
          </p>
        </div>
      </div>

      {/* 4. Total de Usuários */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-soft flex flex-col justify-between hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Usuários
          </span>
          <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">group</span>
          </div>
        </div>
        <div>
          <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
            {data.totalUsuarios.total}
          </div>
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container">
              {data.totalUsuarios.clientes} Leitores
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-container/20 text-primary">
              {data.totalUsuarios.admins} Admins
            </span>
          </div>
        </div>
      </div>

      {/* 5. Bloqueados / Penalizados */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-soft flex flex-col justify-between hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Bloqueados
          </span>
          <div className="w-10 h-10 rounded-xl bg-surface-container text-error flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">block</span>
          </div>
        </div>
        <div>
          <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
            {data.usuariosPenalizados}
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant mt-1">
            Contas suspensas
          </p>
        </div>
      </div>
    </section>
  );
}

