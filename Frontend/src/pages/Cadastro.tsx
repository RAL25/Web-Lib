import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";
import "../assets/styles/Cadastro.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setMensagemSucesso("");

    try {
      const response = await api.post("/usuario", {
        nome,
        email,
        senha,
        cpf,
        telefone,
      });

      const data = response.data;

      setNome("");
      setEmail("");
      setSenha("");
      setCpf("");
      setTelefone("");

      setMensagemSucesso(
        data.mensagem ||
          "Cadastro realizado com sucesso! Verifique seu e-mail.",
      );
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.erro ||
        error.response?.data?.error ||
        "Erro ao realizar o cadastro.";

      setErro(mensagemErro);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="auth-brand">📚 Bookary</div>
          <h1>Cadastro de Cliente</h1>
          <p>Preencha os dados abaixo para criar sua conta</p>
        </div>

        {erro && <div className="alert-error">{erro}</div>}
        {mensagemSucesso && (
          <div className="alert-success">{mensagemSucesso}</div>
        )}

        <form onSubmit={handleCadastro} className="auth-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              className="form-control"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              className="form-control"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                className="form-control"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                maxLength={14}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                className="form-control"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary btn-full">
            Cadastrar
          </button>
        </form>

        <div className="auth-footer">
          <span>Já tem uma conta? </span>
          <Link to="/login" className="auth-link">
            Faça login aqui
          </Link>
        </div>
      </div>
    </div>
  );
}
