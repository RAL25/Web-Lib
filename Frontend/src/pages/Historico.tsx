import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/Historico.css";

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

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="page-header">
          <h1>Histórico de Leitura</h1>
        </header>

        {erro && <div className="alert-error">{erro}</div>}

        <section className="history-card">
          {carregando ? (
            <p className="status-message">Carregando histórico...</p>
          ) : historico.length === 0 ? (
            <p className="empty-message">
              Nenhum empréstimo devolvido/finalizado encontrado no seu
              histórico.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
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
                      <td className="title-cell">{item.titulo}</td>
                      <td>{item.autor || "Não informado"}</td>
                      <td>
                        {new Date(item.data_emprestimo).toLocaleDateString(
                          "pt-BR",
                        )}
                      </td>
                      <td>
                        {new Date(item.data_devolucao).toLocaleDateString(
                          "pt-BR",
                        )}
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
