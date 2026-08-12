import { useContext, useState } from "react";
import { CarrinhoContext } from "../contexts/CarrinhoContext";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";

export default function Carrinho() {
  const { itens, removerDoCarrinho, limparCarrinho } =
    useContext(CarrinhoContext);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const finalizarEmprestimo = async () => {
    if (itens.length === 0) return;

    setErro("");
    setMensagem("");
    setEnviando(true);

    try {
      // Extrai apenas os números dos IDs dos exemplares [10, 22, 45]
      const id_exemplares = itens.map((item) => item.exemplarId);

      /*const response =*/ await api.post("/emprestimo/realizar", {
        id_exemplares,
      });

      setMensagem("Empréstimo realizado com sucesso!");
      limparCarrinho();
    } catch (error: any) {
      const msgErro =
        error.response?.data?.erro || "Erro ao realizar empréstimo.";
      setErro(msgErro);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      <h1>Minha Sacola de Empréstimos</h1>
      <MenuLateral />

      {mensagem && (
        <p style={{ color: "green", fontWeight: "bold" }}>{mensagem}</p>
      )}
      {erro && <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p>}

      {itens.length === 0 ? (
        <p>Sua sacola está vazia.</p>
      ) : (
        <>
          <table
            border={1}
            cellPadding={8}
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>Código do Exemplar</th>
                <th>Livro / Informação</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.exemplarId}>
                  <td>Exemplar #{item.exemplarId}</td>
                  <td>{item.titulo || "Título não informado"}</td>
                  <td>
                    <button onClick={() => removerDoCarrinho(item.exemplarId)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />

          <button onClick={finalizarEmprestimo} disabled={enviando}>
            {enviando ? "Processando..." : "Confirmar Empréstimo"}
          </button>
        </>
      )}
    </div>
  );
}
