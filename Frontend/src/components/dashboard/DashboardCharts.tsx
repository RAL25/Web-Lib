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
  const topLivrosFormatados = data.topLivros.map((item, index) => ({
    ...item,
    ranking: `#${index + 1}`,
    tituloAbreviado:
      item.titulo.length > 22 ? `${item.titulo.slice(0, 20)}...` : item.titulo,
  }));

  return (
    <div className="space-y-6">
      {/* 1. Fluxo Mensal (Empréstimos vs Devoluções) */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-outline-variant pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              trending_up
            </span>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              Fluxo Mensal
            </h2>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider bg-surface-container-low px-2.5 py-1 rounded-full text-on-surface-variant">
            Últimos 6 Meses
          </span>
        </div>

        <div className="h-72 w-full">
          {data.fluxoMensal.length === 0 ? (
            <div className="h-full flex items-center justify-center text-outline text-body-sm italic">
              Sem dados de movimentação no período.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.fluxoMensal}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
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
                    border: "1px solid #bdc9c6",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
                />
                <Bar
                  dataKey="emprestimos"
                  name="Empréstimos"
                  fill="#005c55"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="devolucoes"
                  name="Devoluções"
                  fill="#0284c7"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 2. Top 5 Livros Mais Populares */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-outline-variant pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F59E0B] text-[22px]">
              emoji_events
            </span>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              Top 5 Livros Mais Populares
            </h2>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider bg-surface-container-low px-2.5 py-1 rounded-full text-on-surface-variant">
            Mais Emprestados
          </span>
        </div>

        <div className="h-72 w-full">
          {topLivrosFormatados.length === 0 ? (
            <div className="h-full flex items-center justify-center text-outline text-body-sm italic">
              Nenhum dado de empréstimo disponível.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={topLivrosFormatados}
                margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <YAxis
                  type="category"
                  dataKey="tituloAbreviado"
                  width={120}
                  tick={{ fill: "#191c1e", fontSize: 12, fontWeight: 500 }}
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
                    border: "1px solid #bdc9c6",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="totalEmprestimos"
                  name="Empréstimos"
                  fill="#059669"
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

