import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function Dashboard() {
  const [metricas, setMetricas] = useState({
    totalLivros: 0,
    emprestimosAtivos: 0,
    atrasados: 0,
  });

  useEffect(() => {
    // Exemplo de chamada para rota de métricas
    const carregarMetricas = async () => {
      try {
        const response = await api.get("/dashboard/metricas");
        setMetricas(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    carregarMetricas();
  }, []);

  return (
    <div>
      <h1>Painel Administrativo</h1>
      <ul>
        <li>Total de Livros no Acervo: {metricas.totalLivros}</li>
        <li>Empréstimos em Andamento: {metricas.emprestimosAtivos}</li>
        <li>Devoluções Atrasadas: {metricas.atrasados}</li>
      </ul>
    </div>
  );
}
