import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";

export default function Configuracao() {
  const [configs, setConfigs] = useState({
    diasEmprestimo: 7,
    valorMulta: 2.5,
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const carregarConfigs = async () => {
      try {
        const response = await api.get("/configuracao");
        setConfigs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    carregarConfigs();
  }, []);

  const salvarConfigs = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/configuracao", configs);
      setMensagem("Configurações atualizadas!");
    } catch (error) {
      setMensagem("Erro ao salvar configurações.");
    }
  };

  return (
    <div>
      <h1>Configurações do Sistema</h1>
      {mensagem && <p>{mensagem}</p>}
      <MenuLateral />
      <form onSubmit={salvarConfigs}>
        <label>Prazo de Empréstimo (Dias): </label>
        <input
          type="number"
          value={configs.diasEmprestimo}
          onChange={(e) =>
            setConfigs({ ...configs, diasEmprestimo: Number(e.target.value) })
          }
        />
        <br />
        <label>Multa por Atraso (R$/dia): </label>
        <input
          type="number"
          step="0.01"
          value={configs.valorMulta}
          onChange={(e) =>
            setConfigs({ ...configs, valorMulta: Number(e.target.value) })
          }
        />
        <br />
        <button type="submit">Salvar Parâmetros</button>
      </form>
    </div>
  );
}
