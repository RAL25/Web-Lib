import { useState } from "react";
import { api } from "../services/api";

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

    // Recupera o token salvo no momento do login
    const token = localStorage.getItem("token");

    if (!token) {
      setErro(
        "Acesso negado. Você precisa estar logado para cadastrar livros.",
      );
      return;
    }

    try {
      // Faz a requisição enviando o token no cabeçalho (Header)
      const response = await api.post("/livro", {
        titulo,
        autor,
        quantidade: Number(quantidade),
      });

      setSucesso(
        response.data.message || "Livro e exemplares cadastrados com sucesso!",
      );

      // Limpa o formulário
      setTitulo("");
      setAutor("");
      setQuantidade("");
    } catch (error: any) {
      // Captura erros do backend (ex: erro 403 de acesso negado pelo middleware)
      const mensagemErro =
        error.response?.data?.erro ||
        error.response?.data?.error ||
        "Erro ao cadastrar o livro.";

      setErro(mensagemErro);
    }
  };

  return (
    <div>
      <h1>Cadastrar Novo Livro</h1>
      <p>
        <em>Acesso restrito a Funcionários e Administradores</em>
      </p>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}

      <form onSubmit={handleCadastrarLivro}>
        <div>
          <label htmlFor="titulo">Título do Livro: </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="autor">Autor: </label>
          <input
            type="text"
            id="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="quantidade">Quantidade de Exemplares: </label>
          <input
            type="number"
            id="quantidade"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Salvar Livro</button>
      </form>
    </div>
  );
}
