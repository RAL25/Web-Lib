import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/CadastrarUsuario.css";

export default function CadastrarUsuario() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"ADMINISTRADOR" | "CLIENTE">("CLIENTE");
  const [bloqueado, setBloqueado] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    telefone: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setErro("");
    setEnviando(true);

    try {
      const payload = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        cpf: formData.cpf,
        telefone: formData.telefone,
        role: role,
        bloqueado: bloqueado,
      };

      const response = await api.post("/usuario/adicionar_usuario", payload);
      setMensagem(
        response.data?.mensagem || "Usuário cadastrado com sucesso!",
      );

      setTimeout(() => navigate("/gerenciar-usuarios"), 1500);
    } catch (err: any) {
      setErro(
        err.response?.data?.erro ||
          err.response?.data?.error ||
          "Erro ao cadastrar usuário.",
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <div className="header-actions">
          <Link to="/gerenciar-usuarios" className="btn-outline btn-back">
            ← Voltar para Gerenciar Usuários
          </Link>
        </div>

        <header className="page-header">
          <h1>Cadastrar Novo Usuário</h1>
        </header>

        {mensagem && <div className="alert-success">{mensagem}</div>}
        {erro && <div className="alert-error">{erro}</div>}

        <section className="form-card">
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="form-group">
              <label htmlFor="role">Perfil de Acesso</label>
              <select
                id="role"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "ADMINISTRADOR" | "CLIENTE")
                }
                className="form-control"
              >
                <option value="CLIENTE">Cliente / Leitor</option>
                <option value="ADMINISTRADOR">Administrador</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Ex: João da Silva"
                className="form-control"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="exemplo@email.com"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite a senha de acesso"
                className="form-control"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                className="form-control"
                value={formData.cpf}
                onChange={handleChange}
                maxLength={14}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(00) 00000-0000"
                className="form-control"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="bloqueado"
                  checked={bloqueado}
                  onChange={(e) => setBloqueado(e.target.checked)}
                />
                <span>Conta bloqueada (impede empréstimos e logins)</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={enviando}>
                {enviando ? "Cadastrando..." : "Cadastrar Usuário"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
