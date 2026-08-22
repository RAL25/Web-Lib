import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import KpiCards, { type KpiData } from "../components/dashboard/KpiCards";
import QuickActions from "../components/dashboard/QuickActions";
import DashboardCharts, {
  type ChartsData,
} from "../components/dashboard/DashboardCharts";
import MonitoringSection, {
  type MonitoringData,
} from "../components/dashboard/MonitoringSection";
import "../assets/styles/DashboardAdmin.css";

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
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <div className="dashboard-container">
          {/* Header */}
          <header className="dashboard-header">
            <h1>Painel Administrativo</h1>
            <p className="dashboard-subtitle">
              Visão geral, indicadores em tempo real e monitoramento do acervo da biblioteca
            </p>
          </header>

          {/* Tratamento de Erro */}
          {erro && (
            <div className="alert-box alert-danger">
              <span>⚠️ {erro}</span>
              <button
                onClick={carregarDadosDashboard}
                className="btn-primary"
                style={{ padding: "6px 14px", fontSize: "12px" }}
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {/* Quick Actions & Universal Search */}
          <QuickActions />

          {/* Skeleton Screen quando estiver carregando */}
          {carregando && (
            <>
              <div className="kpi-grid">
                <div className="skeleton skeleton-card"></div>
                <div className="skeleton skeleton-card"></div>
                <div className="skeleton skeleton-card"></div>
                <div className="skeleton skeleton-card"></div>
                <div className="skeleton skeleton-card"></div>
              </div>
              <div className="dashboard-grid">
                <div className="skeleton skeleton-chart"></div>
                <div className="skeleton skeleton-chart"></div>
              </div>
            </>
          )}

          {/* Conteúdo Principal Renderizado */}
          {!carregando && kpis && alertas && estatisticas && (
            <>
              {/* Cards de Métricas */}
              <KpiCards data={kpis} />

              {/* Grid 2 colunas: Gráficos e Monitoramento */}
              <div className="dashboard-grid">
                <DashboardCharts data={estatisticas} />
                <MonitoringSection data={alertas} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
