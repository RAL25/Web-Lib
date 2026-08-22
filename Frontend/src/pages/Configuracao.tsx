import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";

interface ConfiguracaoState {
  limite_global: number;
  limite_por_titulo: number;
  prazo_padrao_dias: number;
  dias_penalidade: number;
}

export default function Configuracao() {
  const [configs, setConfigs] = useState<ConfiguracaoState>({
    limite_global: 5,
    limite_por_titulo: 2,
    prazo_padrao_dias: 7,
    dias_penalidade: 3,
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregarConfigs = async () => {
      try {
        setCarregando(true);
        const response = await api.get("/configuracao");

        const dados = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        if (dados) {
          setConfigs({
            limite_global: dados.limite_global ?? 5,
            limite_por_titulo: dados.limite_por_titulo ?? 2,
            prazo_padrao_dias: dados.prazo_padrao_dias ?? 7,
            dias_penalidade: dados.dias_penalidade ?? 3,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
        setErro("Erro ao carregar configurações do sistema.");
      } finally {
        setCarregando(false);
      }
    };

    carregarConfigs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfigs({
      ...configs,
      [e.target.name]: Number(e.target.value),
    });
  };

  const salvarConfigs = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setErro("");
    setSalvando(true);

    try {
      const response = await api.put("/configuracao", configs);
      setMensagem(
        response.data.message || "Configurações atualizadas com sucesso!",
      );
    } catch (error: any) {
      setErro(error.response?.data?.error || "Erro ao salvar configurações.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MenuLateral />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen w-full">
        <TopNavBar showSearch={false} />

        <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="border-b border-outline-variant pb-6">
            <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
              Configurações Globais
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              Defina as regras de negócio, prazos de devolução e políticas de penalidade da biblioteca.
            </p>
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
          {carregando ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">
                progress_activity
              </span>
              <p className="font-body-md">Carregando parâmetros globais...</p>
            </div>
          ) : (
            <form onSubmit={salvarConfigs} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Limite Global */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">
                        inventory
                      </span>
                    </div>
                    <div>
                      <h3 className="font-body-md font-bold text-on-surface">
                        Limite Global de Livros
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        Máximo de livros simultâneos por leitor
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <input
                      type="number"
                      id="limite_global"
                      name="limite_global"
                      className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant rounded-xl text-body-md font-bold text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      value={configs.limite_global}
                      onChange={handleChange}
                      min={1}
                      max={50}
                      required
                    />
                    <span className="text-[11px] text-outline">
                      Padrão recomendado: 5 livros
                    </span>
                  </div>
                </div>

                {/* 2. Limite por Título */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">
                        content_copy
                      </span>
                    </div>
                    <div>
                      <h3 className="font-body-md font-bold text-on-surface">
                        Limite de Cópias por Título
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        Máximo de exemplares da mesma obra
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <input
                      type="number"
                      id="limite_por_titulo"
                      name="limite_por_titulo"
                      className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant rounded-xl text-body-md font-bold text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      value={configs.limite_por_titulo}
                      onChange={handleChange}
                      min={1}
                      max={10}
                      required
                    />
                    <span className="text-[11px] text-outline">
                      Evita que um único leitor retenha todo o acervo de um título
                    </span>
                  </div>
                </div>

                {/* 3. Prazo Padrão */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">
                        calendar_month
                      </span>
                    </div>
                    <div>
                      <h3 className="font-body-md font-bold text-on-surface">
                        Prazo Padrão do Empréstimo
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        Duração inicial do empréstimo em dias
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="relative">
                      <input
                        type="number"
                        id="prazo_padrao_dias"
                        name="prazo_padrao_dias"
                        className="w-full h-12 pl-4 pr-16 bg-surface-container-low border border-outline-variant rounded-xl text-body-md font-bold text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                        value={configs.prazo_padrao_dias}
                        onChange={handleChange}
                        min={1}
                        max={90}
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-body-sm font-semibold text-outline">
                        dias
                      </span>
                    </div>
                    <span className="text-[11px] text-outline">
                      Prazos convencionais: 7 a 14 dias
                    </span>
                  </div>
                </div>

                {/* 4. Dias de Penalidade */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-soft space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-error-container text-error flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">
                        gavel
                      </span>
                    </div>
                    <div>
                      <h3 className="font-body-md font-bold text-on-surface">
                        Penalidade por Dia de Atraso
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        Dias de bloqueio acumulados a cada atraso
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="relative">
                      <input
                        type="number"
                        id="dias_penalidade"
                        name="dias_penalidade"
                        className="w-full h-12 pl-4 pr-16 bg-surface-container-low border border-outline-variant rounded-xl text-body-md font-bold text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                        value={configs.dias_penalidade}
                        onChange={handleChange}
                        min={0}
                        max={30}
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-body-sm font-semibold text-outline">
                        dias
                      </span>
                    </div>
                    <span className="text-[11px] text-outline">
                      Define a suspensão temporária do direito a novos empréstimos
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={salvando}
                  className="h-12 px-8 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-xl flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  <span>{salvando ? "Salvando..." : "Salvar Configurações"}</span>
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

