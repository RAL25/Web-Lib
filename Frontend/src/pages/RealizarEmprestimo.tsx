import { useState, useContext } from "react";
import { api } from "../services/api";
import { CarrinhoContext } from "../contexts/CarrinhoContext";
import MenuLateral from "../components/common/MenuLateral";

interface ExemplarComLivro {
  id: number;
  livroId: number;
  status: string;
  livro: {
    id: number;
    titulo: string;
    autor: string | null;
  };
}

export default function RealizarEmprestimo() {
  const [busca, setBusca] = useState("");
  const [exemplares, setExemplares] = useState<ExemplarComLivro[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscou, setBuscou] = useState(false);

  const { adicionarAoCarrinho, totalItens } = useContext(CarrinhoContext);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setBuscou(true);

    try {
      const response = await api.get(
        `/livro/exemplares/disponiveis?busca=${busca}`,
      );
      setExemplares(response.data);
    } catch (error) {
      console.error("Erro ao buscar exemplares", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      <h1>Buscar Exemplares Disponíveis</h1>
      <p>
        Itens na Sacola: <strong>{totalItens}</strong>
      </p>
      <MenuLateral />

      <form onSubmit={handleBuscar}>
        <input
          type="text"
          placeholder="Digite o título do livro ou autor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button type="submit" disabled={carregando}>
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      <br />

      {buscou && exemplares.length === 0 && !carregando && (
        <p>Nenhum exemplar disponível foi encontrado para esta busca.</p>
      )}

      {exemplares.length > 0 && (
        <table
          border={1}
          cellPadding={8}
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Código do Exemplar</th>
              <th>Título do Livro</th>
              <th>Autor</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {exemplares.map((exemplar) => (
              <tr key={exemplar.id}>
                <td>Exemplar #{exemplar.id}</td>
                <td>{exemplar.livro.titulo}</td>
                <td>{exemplar.livro.autor || "Não informado"}</td>
                <td>
                  <button
                    onClick={() =>
                      adicionarAoCarrinho({
                        exemplarId: exemplar.id,
                        titulo: `${exemplar.livro.titulo} (Exemplar #${exemplar.id})`,
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
