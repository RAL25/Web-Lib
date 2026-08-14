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

  const {
    adicionarAoCarrinho,
    totalItens,
    itens = [],
  } = useContext<any>(CarrinhoContext);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setBuscou(true);

    try {
      // Alterado para buscar todos os exemplares (não apenas os disponíveis)
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

  // Verifica se o exemplar já está no carrinho
  const estaNoCarrinho = (exemplarId: number) => {
    return itens.some((item: any) => item.exemplarId === exemplarId);
  };

  // Normaliza e checa se o exemplar está com status disponível
  const isDisponivel = (status: string) => {
    const s = status ? status.toLowerCase() : "";
    return s === "disponivel" || s === "disponível";
  };

  // Retorna estilos customizados de badge conforme o status do exemplar
  const getBadgeStyle = (status: string) => {
    const s = status ? status.toLowerCase() : "";

    if (s === "disponivel" || s === "disponível") {
      return { backgroundColor: "#dcfce7", color: "#15803d" }; // Verde
    }
    if (s === "emprestado") {
      return { backgroundColor: "#ffedd5", color: "#c2410c" }; // Laranja
    }
    // Estilo padrão para futuros status (Manutenção, Perdido, Reservado, etc.)
    return { backgroundColor: "#f3f4f6", color: "#374151" }; // Cinza
  };

  return (
    <div>
      <h1>Consultar e Emprestar Exemplares</h1>
      <MenuLateral />
      <p>
        Itens no Carrinho: <strong>{totalItens}</strong>
      </p>

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
        <p>Nenhum exemplar foi encontrado para esta busca.</p>
      )}

      {exemplares.length > 0 && (
        <table
          border={1}
          cellPadding={8}
          style={{ borderCollapse: "collapse", width: "75%" }}
        >
          <thead>
            <tr>
              <th>Código do Exemplar</th>
              <th>Título do Livro</th>
              <th>Autor</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {exemplares.map((exemplar) => {
              const selecionado = estaNoCarrinho(exemplar.id);
              const disponivel = isDisponivel(exemplar.status);

              // Lógica de estado do botão de Ação
              let textoBotao = "Adicionar ao carrinho";
              let desabilitado = false;
              let estiloBotao: React.CSSProperties = { cursor: "pointer" };

              if (!disponivel) {
                textoBotao = "Indisponível";
                desabilitado = true;
                estiloBotao = { cursor: "not-allowed", opacity: 0.6 };
              } else if (selecionado) {
                textoBotao = "✓ Selecionado";
                desabilitado = true;
                estiloBotao = {
                  backgroundColor: "#22c55e",
                  color: "#ffffff",
                  cursor: "not-allowed",
                };
              }

              return (
                <tr key={exemplar.id}>
                  <td>Exemplar #{exemplar.id}</td>
                  <td>{exemplar.livro.titulo}</td>
                  <td>{exemplar.livro.autor || "Não informado"}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        ...getBadgeStyle(exemplar.status),
                      }}
                    >
                      {exemplar.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        adicionarAoCarrinho({
                          exemplarId: exemplar.id,
                          titulo: `${exemplar.livro.titulo} (Exemplar #${exemplar.id})`,
                        })
                      }
                      disabled={desabilitado}
                      style={estiloBotao}
                    >
                      {textoBotao}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
