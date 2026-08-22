import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export interface FluxoMes {
  mes: string;
  emprestimos: number;
  devolucoes: number;
}

export interface TopLivro {
  id: number;
  titulo: string;
  autor?: string;
  totalEmprestimos: number;
}

export interface ChartsData {
  fluxoMensal: FluxoMes[];
  topLivros: TopLivro[];
}

interface DashboardChartsProps {
  data: ChartsData;
}

export default function DashboardCharts({ data }: DashboardChartsProps) {
  // Truncar títulos longos para o gráfico horizontal
  const topLivrosFormatados = data.topLivros.map((item, index) => ({
    ...item,
    ranking: `#${index + 1}`,
    tituloAbreviado:
      item.titulo.length > 20 ? `${item.titulo.slice(0, 18)}...` : item.titulo,
  }));

  return (
    <div className="dashboard-column">
      {/* 1. Fluxo Mensal (Empréstimos vs Devoluções) */}
      <div className="chart-card">
        <div className="chart-header">
          <h2 className="chart-title">
            <span>📈</span> Fluxo Mensal (Últimos 6 Meses)
          </h2>
          <span className="sub-badge">Comparativo</span>
        </div>

        <div className="chart-wrapper">
          {data.fluxoMensal.length === 0 ? (
            <p className="empty-state">Sem dados de movimentação no período.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.fluxoMensal}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="mes"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
                />
                <Bar
                  dataKey="emprestimos"
                  name="Empréstimos"
                  fill="#024935"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="devolucoes"
                  name="Devoluções"
                  fill="#0284c7"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 2. Top 5 Livros Mais Populares */}
      <div className="chart-card">
        <div className="chart-header">
          <h2 className="chart-title">
            <span>🏆</span> Top 5 Livros Mais Populares
          </h2>
          <span className="sub-badge">Mais Emprestados</span>
        </div>

        <div className="chart-wrapper">
          {topLivrosFormatados.length === 0 ? (
            <p className="empty-state">Nenhum dado de empréstimo disponível.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={topLivrosFormatados}
                margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <YAxis
                  type="category"
                  dataKey="tituloAbreviado"
                  width={110}
                  tick={{ fill: "#0f172a", fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <Tooltip
                  formatter={(value: any) => [
                    `${value} empréstimo(s)`,
                    "Total de Empréstimos",
                  ]}
                  labelFormatter={(_label: any, payload: any) => {
                    if (payload && payload.length > 0) {
                      const item = payload[0].payload;
                      return `${item.ranking} ${item.titulo} (${item.autor || "Desconhecido"})`;
                    }
                    return "";
                  }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="totalEmprestimos"
                  name="Empréstimos"
                  fill="#059669"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
