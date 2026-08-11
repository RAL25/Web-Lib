import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function Historico() {
  const [historico, setHistorico] = useState<any[]>([]);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const response = await api.get("/emprestimo/historico");
        setHistorico(response.data);
      } catch (error) {
        console.error("Erro ao carregar histórico", error);
      }
    };
    carregarHistorico();
  }, []);

  return (
    <div>
      <h1>Histórico de Leitura</h1>
      <ul>
        {historico.map((item) => (
          <li key={item.id}>
            Livro: {item.livro.titulo} | Retirado:{" "}
            {new Date(item.dataEmprestimo).toLocaleDateString()} | Status:{" "}
            {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
