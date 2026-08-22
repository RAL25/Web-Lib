import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/Configuracao.css";

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

    try {
      const response = await api.put("/configuracao", configs);
      setMensagem(
        response.data.message || "Configurações atualizadas com sucesso!",
      );
    } catch (error: any) {
      setErro(error.response?.data?.error || "Erro ao salvar configurações.");
    }
  };

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="page-header">
          <h1>Configurações do Sistema</h1>
        </header>

        {mensagem && <div className="alert-success">{mensagem}</div>}
        {erro && <div className="alert-error">{erro}</div>}

        <section className="form-card">
          {carregando ? (
            <p className="status-message">Carregando configurações...</p>
          ) : (
            <form onSubmit={salvarConfigs} className="custom-form">
              <div className="form-group">
                <label htmlFor="limite_global">
                  Limite Global (máximo de livros por cliente)
                </label>
                <input
                  type="number"
                  id="limite_global"
                  name="limite_global"
                  className="form-control"
                  value={configs.limite_global}
                  onChange={handleChange}
                  min={1}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="limite_por_titulo">
                  Limite por Título (máximo de exemplares da mesma obra)
                </label>
                <input
                  type="number"
                  id="limite_por_titulo"
                  name="limite_por_titulo"
                  className="form-control"
                  value={configs.limite_por_titulo}
                  onChange={handleChange}
                  min={1}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prazo_padrao_dias">
                  Prazo Padrão do Empréstimo (Dias)
                </label>
                <input
                  type="number"
                  id="prazo_padrao_dias"
                  name="prazo_padrao_dias"
                  className="form-control"
                  value={configs.prazo_padrao_dias}
                  onChange={handleChange}
                  min={1}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dias_penalidade">
                  Dias de Penalidade por Atraso
                </label>
                <input
                  type="number"
                  id="dias_penalidade"
                  name="dias_penalidade"
                  className="form-control"
                  value={configs.dias_penalidade}
                  onChange={handleChange}
                  min={0}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Salvar Parâmetros
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
