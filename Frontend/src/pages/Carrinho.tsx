import { useContext, useState } from "react";
import { CarrinhoContext } from "../contexts/CarrinhoContext";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/Carrinho.css";

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
      const id_exemplares = itens.map((item) => item.exemplarId);

      await api.post("/emprestimo/realizar", {
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
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="page-header">
          <h1>Carrinho de Empréstimo</h1>
        </header>

        {mensagem && <div className="alert-success">{mensagem}</div>}
        {erro && <div className="alert-error">{erro}</div>}

        <section className="cart-card">
          {itens.length === 0 ? (
            <div className="empty-cart">
              <p>O carrinho está vazio.</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Código do Exemplar</th>
                      <th>Livro / Informação</th>
                      <th style={{ textAlign: "right" }}>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itens.map((item) => (
                      <tr key={item.exemplarId}>
                        <td className="code-cell">
                          Exemplar #{item.exemplarId}
                        </td>
                        <td className="title-cell">
                          {item.titulo || "Título não informado"}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="btn-danger-outline"
                            onClick={() => removerDoCarrinho(item.exemplarId)}
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="cart-footer">
                <button
                  className="btn-primary"
                  onClick={finalizarEmprestimo}
                  disabled={enviando}
                >
                  {enviando ? "Processando..." : "Confirmar Empréstimo"}
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
