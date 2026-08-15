import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";

interface ItemHistorico {
  id: number;
  exemplarId: number;
  titulo: string;
  autor: string | null;
  data_emprestimo: string;
  data_devolucao: string;
}

export default function Historico() {
  const [historico, setHistorico] = useState<ItemHistorico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        setCarregando(true);
        // Rota correta conforme router e controller
        const response = await api.get("/emprestimo/historico_emprestimo");
        setHistorico(response.data);
      } catch (error) {
        console.error("Erro ao carregar histórico", error);
        setErro("Erro ao carregar histórico de leitura.");
      } finally {
        setCarregando(false);
      }
    };

    carregarHistorico();
  }, []);

  if (carregando) return <p>Carregando histórico...</p>;

  return (
    <div>
      <h1>Histórico de Leitura</h1>
      <MenuLateral />

      {erro && <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p>}

      {historico.length === 0 ? (
        <p>
          Nenhum empréstimo devolvido/finalizado encontrado no seu histórico.
        </p>
      ) : (
        <table
          border={1}
          cellPadding={8}
          style={{
            borderCollapse: "collapse",
            width: "80%",
            marginTop: "16px",
          }}
        >
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Data do Empréstimo</th>
              <th>Data da Devolução</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((item) => (
              <tr key={item.id}>
                <td>{item.titulo}</td>
                <td>{item.autor || "Não informado"}</td>
                <td>
                  {new Date(item.data_emprestimo).toLocaleDateString("pt-BR")}
                </td>
                <td>
                  {new Date(item.data_devolucao).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
