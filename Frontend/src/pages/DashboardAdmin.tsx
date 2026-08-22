import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";
import KpiCards, { type KpiData } from "../components/dashboard/KpiCards";
import QuickActions from "../components/dashboard/QuickActions";
import DashboardCharts, {
  type ChartsData,
} from "../components/dashboard/DashboardCharts";
import MonitoringSection, {
  type MonitoringData,
} from "../components/dashboard/MonitoringSection";

export default function DashboardAdmin() {
  const [kpis, setKpis] = useState<KpiData | null>(null);
  const [alertas, setAlertas] = useState<MonitoringData | null>(null);
  const [estatisticas, setEstatisticas] = useState<ChartsData | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarDadosDashboard = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);

      const [resKpis, resAlertas, resEstatisticas] = await Promise.all([
        api.get("/dashboard/kpis"),
        api.get("/dashboard/alertas"),
        api.get("/dashboard/estatisticas"),
      ]);

      setKpis(resKpis.data);
      setAlertas(resAlertas.data);
      setEstatisticas(resEstatisticas.data);
    } catch (err: any) {
      console.error("Erro ao carregar dados do dashboard:", err);
      const mensagem =
        err.response?.data?.erro ||
        err.response?.data?.message ||
        "Não foi possível carregar as informações do dashboard. Verifique sua conexão.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDadosDashboard();
  }, [carregarDadosDashboard]);

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
                Painel Administrativo
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">
                Visão geral, indicadores em tempo real e monitoramento do acervo da biblioteca.
              </p>
            </div>

            <button
              onClick={carregarDadosDashboard}
              className="flex items-center gap-2 text-primary hover:bg-primary-container/10 px-4 py-2 rounded-xl border border-primary/20 font-label-md text-label-md transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              <span>Atualizar Indicadores</span>
            </button>
          </div>

          {/* Error notification */}
          {erro && (
            <div className="p-4 bg-error-container/50 border border-error/30 rounded-xl text-error flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl">error</span>
                <span className="font-body-md">{erro}</span>
              </div>
              <button
                onClick={carregarDadosDashboard}
                className="bg-error text-on-error px-4 py-1.5 rounded-lg text-xs font-bold shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {/* Quick Actions & Universal Search */}
          <QuickActions />

          {/* Loading Skeletons */}
          {carregando && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-28 bg-surface-container-lowest border border-outline-variant rounded-2xl animate-pulse"
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 h-96 bg-surface-container-lowest border border-outline-variant rounded-2xl animate-pulse" />
                <div className="lg:col-span-5 h-96 bg-surface-container-lowest border border-outline-variant rounded-2xl animate-pulse" />
              </div>
            </div>
          )}

          {/* Main Dashboard Render */}
          {!carregando && kpis && alertas && estatisticas && (
            <>
              {/* KPI Cards */}
              <KpiCards data={kpis} />

              {/* 2-Column Grid: Charts (Left) & Monitoring (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <DashboardCharts data={estatisticas} />
                </div>
                <div className="lg:col-span-5 space-y-6">
                  <MonitoringSection data={alertas} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

