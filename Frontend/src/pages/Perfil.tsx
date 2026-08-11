import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function Perfil() {
  const [dados, setDados] = useState({ nome: "", email: "", telefone: "" });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const response = await api.get("/usuario/me");
        setDados({
          nome: response.data.nome,
          email: response.data.email,
          telefone: response.data.cliente?.telefone || "",
        });
      } catch (error) {
        console.error(error);
      }
    };
    carregarPerfil();
  }, []);

  const salvarAlteracoes = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/usuario/me", dados);
      setMensagem("Perfil atualizado com sucesso!");
    } catch (error: any) {
      setMensagem(error.response?.data?.erro || "Erro ao atualizar.");
    }
  };

  return (
    <div>
      <h1>Meu Perfil</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={salvarAlteracoes}>
        <label>Nome:</label>
        <input
          value={dados.nome}
          onChange={(e) => setDados({ ...dados, nome: e.target.value })}
        />
        <br />
        <label>E-mail:</label>
        <input type="email" value={dados.email} disabled />{" "}
        {/* Email geralmente não se edita tão fácil */}
        <br />
        <label>Telefone:</label>
        <input
          value={dados.telefone}
          onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
