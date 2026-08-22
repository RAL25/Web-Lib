import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/EditarUsuario.css";

export default function EditarUsuario() {
  const { id } = useParams<{ id: string }>();
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

  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        setCarregando(true);
        const response = await api.get(`/usuario/${id}`);
        const user = response.data;

        setRole(user.role || "CLIENTE");
        setBloqueado(Boolean(user.bloqueado));

        setFormData({
          nome: user.nome || "",
          email: user.email || "",
          senha: "",
          cpf: user.cpf || "",
          telefone: user.telefone || "",
        });
      } catch (err: any) {
        console.error("Erro ao buscar usuário:", err);
        setErro("Erro ao carregar dados do usuário.");
      } finally {
        setCarregando(false);
      }
    };

    if (id) buscarUsuario();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setErro("");
    setSalvando(true);

    try {
      const payload: any = {
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        telefone: formData.telefone,
        role: role,
        bloqueado: bloqueado,
      };

      if (formData.senha.trim() !== "") {
        payload.senha = formData.senha;
      }

      await api.put(`/usuario/alterar/${id}`, payload);
      setMensagem("Usuário atualizado com sucesso!");

      setTimeout(() => navigate("/gerenciar-usuarios"), 1500);
    } catch (err: any) {
      setErro(
        err.response?.data?.erro ||
          err.response?.data?.error ||
          "Erro ao atualizar usuário.",
      );
    } finally {
      setSalvando(false);
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
          <h1>Editar Usuário</h1>
          <p className="page-subtitle">ID: {id}</p>
        </header>

        {mensagem && <div className="alert-success">{mensagem}</div>}
        {erro && <div className="alert-error">{erro}</div>}

        <section className="form-card">
          {carregando ? (
            <p className="status-message">Carregando dados do usuário...</p>
          ) : (
            <form onSubmit={handleSubmit} className="custom-form">
              <div className="form-group">
                <label htmlFor="role">Perfil de Acesso</label>
                <select
                  id="role"
                  name="role"
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
                  className="form-control"
                  value={formData.email}
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
                  className="form-control"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="senha">
                  Nova Senha{" "}
                  <span className="label-hint">
                    (Deixe em branco se não desejar alterar)
                  </span>
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  className="form-control"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Digite a nova senha"
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
                  <span>Conta bloqueada (impede novos empréstimos e login)</span>
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={salvando}
                >
                  {salvando ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
