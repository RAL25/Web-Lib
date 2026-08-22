import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { CarrinhoContext } from "../contexts/CarrinhoContext";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/ExemplaresLivro.css";

interface Exemplar {
  id: number;
  livroId: number;
  status: string;
}

export default function ExemplaresLivro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [exemplares, setExemplares] = useState<Exemplar[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const { adicionarAoCarrinho } = useContext(CarrinhoContext);

  useEffect(() => {
    const carregarExemplares = async () => {
      try {
        setCarregando(true);
        const response = await api.get(`/livro/exemplar/${id}`);
        setExemplares(response.data);
      } catch (error: any) {
        const msg =
          error.response?.data?.erro || "Erro ao buscar exemplares do livro.";
        setErro(msg);
      } finally {
        setCarregando(false);
      }
    };

    if (id) {
      carregarExemplares();
    }
  }, [id]);

  const disponiveis = exemplares.filter((item) => item.status === "Disponivel");

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <div className="header-actions">
          <button className="btn-outline btn-back" onClick={() => navigate(-1)}>
            ← Voltar
          </button>
        </div>

        <header className="page-header">
          <h1>Exemplares Disponíveis para Empréstimo</h1>
        </header>

        {carregando && (
          <p className="status-message">Carregando exemplares...</p>
        )}
        {erro && <div className="alert-error">{erro}</div>}

        {!carregando && !erro && (
          <section className="exemplares-card">
            {disponiveis.length === 0 ? (
              <p className="empty-message">
                No momento não há exemplares disponíveis para este livro.
              </p>
            ) : (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Código do Exemplar</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disponiveis.map((exemplar) => (
                      <tr key={exemplar.id}>
                        <td className="code-cell">Exemplar #{exemplar.id}</td>
                        <td>
                          <span className="badge badge-success">
                            {exemplar.status}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="btn-primary"
                            onClick={() =>
                              adicionarAoCarrinho({
                                exemplarId: exemplar.id,
                                titulo: `${exemplar.livroId} (Exemplar #${exemplar.id})`,
                              })
                            }
                          >
                            + Adicionar à Sacola
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
