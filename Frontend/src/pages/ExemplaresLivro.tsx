import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { CarrinhoContext } from "../contexts/CarrinhoContext";

interface Exemplar {
  id: number;
  livroId: number;
  status: string; // "Disponivel" | "Emprestado"
}

export default function ExemplaresLivro() {
  const { id } = useParams<{ id: string }>(); // ID do livro recebido via URL
  const navigate = useNavigate();

  const [exemplares, setExemplares] = useState<Exemplar[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const { adicionarAoCarrinho } = useContext(CarrinhoContext);

  useEffect(() => {
    const carregarExemplares = async () => {
      try {
        setCarregando(true);
        // Chamada para a rota que retorna a lista de exemplares do livro
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

  // Filtra no frontend apenas os exemplares prontos para empréstimo
  const disponiveis = exemplares.filter((item) => item.status === "Disponivel");

  if (carregando) return <p>Carregando exemplares...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Voltar</button>

      <h1>Exemplares Disponíveis para Empréstimo</h1>

      {disponiveis.length === 0 ? (
        <p>No momento não há exemplares disponíveis para este livro.</p>
      ) : (
        <table
          border={1}
          cellPadding={8}
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Código do Exemplar</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {disponiveis.map((exemplar) => (
              <tr key={exemplar.id}>
                <td>Exemplar #{exemplar.id}</td>
                <td>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {exemplar.status}
                  </span>
                </td>
                <td>
                  <button
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
      )}
    </div>
  );
}
