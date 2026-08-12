import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";

export default function MeuEmprestimo() {
  const [emprestimos, setEmprestimos] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState("");

  const carregarEmprestimos = async () => {
    try {
      const response = await api.get("/emprestimo/ativos");
      setEmprestimos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarEmprestimos();
  }, []);

  const renovar = async (id: number) => {
    try {
      await api.put(`/emprestimo/renovar/${id}`);
      setMensagem("Renovação realizada com sucesso!");
      carregarEmprestimos();
    } catch (error: any) {
      setMensagem(error.response?.data?.erro || "Erro ao renovar.");
    }
  };

  return (
    <div>
      <h1>Meus Empréstimos Ativos</h1>
      {mensagem && <p>{mensagem}</p>}

      <MenuLateral />

      {emprestimos.length === 0 ? (
        <p>Você não possui livros emprestados no momento.</p>
      ) : (
        <ul>
          {emprestimos.map((emp) => (
            <li key={emp.id}>
              {emp.livro.titulo} - Devolver até:{" "}
              {new Date(emp.dataDevolucao).toLocaleDateString()}
              <button onClick={() => renovar(emp.id)}>Renovar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
