import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api"; // Importando a configuração do Axios

export default function Cadastro() {
  // Estados para cada campo do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  // Estados para feedback visual
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setMensagemSucesso("");

    try {
      // O Axios envia os dados já como JSON e abstrai os headers
      const response = await api.post("/usuario", {
        nome,
        email,
        senha,
        cpf,
        telefone,
      });

      // Os dados retornados pelo backend ficam em response.data
      const data = response.data;

      // Limpa o formulário após o sucesso
      setNome("");
      setEmail("");
      setSenha("");
      setCpf("");
      setTelefone("");

      // Exibe a mensagem de sucesso
      setMensagemSucesso(
        data.mensagem ||
          "Cadastro realizado com sucesso! Verifique seu e-mail.",
      );
    } catch (error: any) {
      // O Axios joga erros de status HTTP direto para o catch
      const mensagemErro =
        error.response?.data?.erro ||
        error.response?.data?.error ||
        "Erro ao realizar o cadastro.";

      setErro(mensagemErro);
    }
  };

  return (
    <div>
      <h1>Cadastro de Cliente</h1>

      {/* Exibição de mensagens de erro ou sucesso */}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {mensagemSucesso && <p style={{ color: "green" }}>{mensagemSucesso}</p>}

      <form onSubmit={handleCadastro}>
        <div>
          <label htmlFor="nome">Nome Completo: </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="email">E-mail: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="senha">Senha: </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="cpf">CPF: </label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            maxLength={14}
          />
        </div>

        <br />

        <div>
          <label htmlFor="telefone">Telefone: </label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Cadastrar</button>
      </form>

      <br />
      <Link to={"/login"}>Já tem uma conta? Faça login aqui.</Link>
    </div>
  );
}
