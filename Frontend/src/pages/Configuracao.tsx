import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";

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

  // Busca as configurações atuais salvas no banco
  useEffect(() => {
    const carregarConfigs = async () => {
      try {
        setCarregando(true);
        const response = await api.get("/configuracao");

        // Como o controller utiliza 'findMany()', ele retorna um array com a lista
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

  if (carregando) return <p>Carregando configurações...</p>;

  return (
    <div>
      <h1>Configurações do Sistema</h1>
      <MenuLateral />

      {mensagem && (
        <p style={{ color: "green", fontWeight: "bold" }}>{mensagem}</p>
      )}
      {erro && <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p>}

      <form onSubmit={salvarConfigs}>
        <div>
          <label>Limite Global (máximo de livros por cliente): </label>
          <input
            type="number"
            name="limite_global"
            value={configs.limite_global}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <br />

        <div>
          <label>
            Limite por Título (máximo de exemplares da mesma obra):{" "}
          </label>
          <input
            type="number"
            name="limite_por_titulo"
            value={configs.limite_por_titulo}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <br />

        <div>
          <label>Prazo Padrão do Empréstimo (Dias): </label>
          <input
            type="number"
            name="prazo_padrao_dias"
            value={configs.prazo_padrao_dias}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <br />

        <div>
          <label>Dias de Penalidade por Atraso: </label>
          <input
            type="number"
            name="dias_penalidade"
            value={configs.dias_penalidade}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <br />

        <button type="submit">Salvar Parâmetros</button>
      </form>
    </div>
  );
}
