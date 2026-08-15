import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";

interface ItemEmprestado {
  id: number;
  exemplarId: number;
  titulo: string;
  autor: string | null;
  data_emprestimo: string;
  data_prazo: string;
  renovacoes_disponiveis: number;
  atrasado: boolean;
  status_prazo: string;
  pode_renovar: boolean; // Flag do backend
  motivo_bloqueio: string; // Explicação para o botão desabilitado
}

export default function MeuEmprestimo() {
  const [emprestimos, setEmprestimos] = useState<ItemEmprestado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const carregarEmprestimos = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/emprestimo/listar_itens");
      setEmprestimos(response.data);
    } catch (error) {
      console.error("Erro ao carregar empréstimos ativos:", error);
      setErro("Erro ao buscar seus empréstimos ativos.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarEmprestimos();
  }, []);

  const handleRenovar = async (idItem: number) => {
    setMensagem("");
    setErro("");

    try {
      await api.put(`/emprestimo/adiar/${idItem}`);
      setMensagem("Prazo de devolução estendido com sucesso!");
      carregarEmprestimos();
    } catch (error: any) {
      setErro(error.response?.data?.erro || "Erro ao renovar empréstimo.");
    }
  };

  const handleDevolver = async (idItem: number) => {
    setMensagem("");
    setErro("");

    try {
      await api.put(`/emprestimo/devolver/${idItem}`);
      setMensagem("Livro devolvido com sucesso!");
      carregarEmprestimos();
    } catch (error: any) {
      setErro(error.response?.data?.erro || "Erro ao devolver livro.");
    }
  };

  if (carregando) return <p>Carregando empréstimos ativos...</p>;

  return (
    <div>
      <h1>Meus Empréstimos Ativos</h1>
      <MenuLateral />

      {mensagem && (
        <p style={{ color: "green", fontWeight: "bold" }}>{mensagem}</p>
      )}
      {erro && <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p>}

      {emprestimos.length === 0 ? (
        <p>Você não possui livros empréstados no momento.</p>
      ) : (
        <table
          border={1}
          cellPadding={8}
          style={{
            borderCollapse: "collapse",
            width: "85%",
            marginTop: "16px",
          }}
        >
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Data Empréstimo</th>
              <th>Prazo de Devolução</th>
              <th>Status do Prazo</th>
              <th>Renovações Restantes</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {emprestimos.map((item) => (
              <tr key={item.id}>
                <td>{item.titulo}</td>
                <td>{item.autor || "Não informado"}</td>
                <td>
                  {new Date(item.data_emprestimo).toLocaleDateString("pt-BR")}
                </td>
                <td>{new Date(item.data_prazo).toLocaleDateString("pt-BR")}</td>
                <td>
                  <span
                    style={{
                      color: item.atrasado ? "#dc2626" : "#16a34a",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status_prazo}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  {item.renovacoes_disponiveis}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <button
                      onClick={() => handleRenovar(item.id)}
                      disabled={!item.pode_renovar}
                      style={{
                        cursor: item.pode_renovar ? "pointer" : "not-allowed",
                      }}
                      title={
                        item.motivo_bloqueio ||
                        "Renovar o livro por mais 7 dias"
                      }
                    >
                      Renovar
                    </button>
                    {!item.pode_renovar && (
                      <span style={{ fontSize: "11px", color: "#6b7280" }}>
                        {item.motivo_bloqueio}
                      </span>
                    )}
                    <button
                      onClick={() => handleDevolver(item.id)}
                      style={{ cursor: "pointer" }}
                    >
                      Devolver
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
