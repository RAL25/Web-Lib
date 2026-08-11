import { useState } from "react";
import { api } from "../services/api";

export default function RealizarEmprestimo() {
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState("");

  const buscarLivro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ajuste a rota de busca conforme seu backend
      const response = await api.get(`/livro?busca=${busca}`);
      setResultado(response.data);
    } catch (error: any) {
      setMensagem(error.response?.data?.erro || "Erro ao buscar livro.");
    }
  };

  const solicitarEmprestimo = async (livroId: number) => {
    try {
      const response = await api.post("/emprestimo", { livroId });
      setMensagem(
        response.data.mensagem || "Empréstimo realizado com sucesso!",
      );
    } catch (error: any) {
      setMensagem(
        error.response?.data?.erro ||
          "Erro ao realizar empréstimo. Verifique pendências.",
      );
    }
  };

  return (
    <div>
      <h1>Realizar Empréstimo</h1>
      {mensagem && (
        <p>
          <strong>{mensagem}</strong>
        </p>
      )}

      <form onSubmit={buscarLivro}>
        <input
          type="text"
          placeholder="Digite o título ou autor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>

      <ul>
        {resultado.map((livro) => (
          <li key={livro.id}>
            {livro.titulo} - {livro.autor} (Disponíveis:{" "}
            {livro.quantidadeDisponivel})
            <button onClick={() => solicitarEmprestimo(livro.id)}>
              Pegar Emprestado
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
