import { useState } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/CadastroLivro.css";

export default function CadastroLivro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [quantidade, setQuantidade] = useState<number | string>("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleCadastrarLivro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    const token = localStorage.getItem("token");

    if (!token) {
      setErro(
        "Acesso negado. Você precisa estar logado para cadastrar livros.",
      );
      return;
    }

    try {
      const response = await api.post("/livro", {
        titulo,
        autor,
        quantidade: Number(quantidade),
      });

      setSucesso(
        response.data.message || "Livro e exemplares cadastrados com sucesso!",
      );

      setTitulo("");
      setAutor("");
      setQuantidade("");
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.erro ||
        error.response?.data?.error ||
        "Erro ao cadastrar o livro.";

      setErro(mensagemErro);
    }
  };

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="page-header">
          <h1>Cadastrar Novo Livro</h1>
        </header>

        {erro && <div className="alert-error">{erro}</div>}
        {sucesso && <div className="alert-success">{sucesso}</div>}

        <section className="form-card">
          <form onSubmit={handleCadastrarLivro} className="custom-form">
            <div className="form-group">
              <label htmlFor="titulo">Título do Livro</label>
              <input
                type="text"
                id="titulo"
                className="form-control"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="autor">Autor</label>
              <input
                type="text"
                id="autor"
                className="form-control"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantidade">Quantidade de Exemplares</label>
              <input
                type="number"
                id="quantidade"
                className="form-control"
                min="1"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Salvar Livro
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
