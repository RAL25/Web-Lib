import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/MeuEmprestimo.css";

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
  pode_renovar: boolean;
  motivo_bloqueio: string;
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

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="page-header">
          <h1>Meus Empréstimos Ativos</h1>
        </header>

        {mensagem && <div className="alert-success">{mensagem}</div>}
        {erro && <div className="alert-error">{erro}</div>}

        <section className="loans-card">
          {carregando ? (
            <p className="status-message">Carregando empréstimos ativos...</p>
          ) : emprestimos.length === 0 ? (
            <p className="empty-message">
              Você não possui livros empréstados no momento.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Data Empréstimo</th>
                    <th>Prazo de Devolução</th>
                    <th>Status do Prazo</th>
                    <th style={{ textAlign: "center" }}>Renovações</th>
                    <th style={{ textAlign: "right" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {emprestimos.map((item) => (
                    <tr key={item.id}>
                      <td className="title-cell">{item.titulo}</td>
                      <td>{item.autor || "Não informado"}</td>
                      <td>
                        {new Date(item.data_emprestimo).toLocaleDateString(
                          "pt-BR",
                        )}
                      </td>
                      <td>
                        {new Date(item.data_prazo).toLocaleDateString("pt-BR")}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            item.atrasado ? "badge-danger" : "badge-success"
                          }`}
                        >
                          {item.status_prazo}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <span className="renovacoes-pill">
                          {item.renovacoes_disponiveis}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="actions-cell">
                          <button
                            className="btn-primary btn-sm"
                            onClick={() => handleRenovar(item.id)}
                            disabled={!item.pode_renovar}
                            title={
                              item.motivo_bloqueio ||
                              "Renovar o livro por mais 7 dias"
                            }
                          >
                            Renovar
                          </button>
                          {!item.pode_renovar && (
                            <span className="block-reason">
                              {item.motivo_bloqueio}
                            </span>
                          )}
                          <button
                            className="btn-outline-danger btn-sm"
                            onClick={() => handleDevolver(item.id)}
                          >
                            Devolver
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
