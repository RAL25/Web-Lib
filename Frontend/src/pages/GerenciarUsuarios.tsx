import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/GerenciarUsuarios.css";

interface UsuarioItem {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  bloqueado: boolean;
  role: "ADMINISTRADOR" | "CLIENTE";
}

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioItem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroRole, setFiltroRole] = useState<string>("TODOS");
  const [searchParams] = useSearchParams();
  const [filtroTexto, setFiltroTexto] = useState(searchParams.get("busca") || "");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const listarUsuarios = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/usuario");
      setUsuarios(response.data);
    } catch (error: any) {
      console.error("Erro ao carregar usuários:", error);
      setErro("Erro ao carregar lista de usuários.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  const termoBusca = searchParams.get("busca");
  useEffect(() => {
    if (termoBusca) {
      setFiltroTexto(termoBusca);
    }
  }, [termoBusca]);

  const handleDelete = async (idUsuario: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) {
      return;
    }

    setMensagem("");
    setErro("");

    try {
      await api.delete(`/usuario/deletar/${idUsuario}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== idUsuario));
      setMensagem("Usuário removido com sucesso!");
    } catch (err: any) {
      setErro(
        err.response?.data?.erro ||
          err.response?.data?.error ||
          "Erro ao deletar o usuário.",
      );
    }
  };

  const handleToggleBloqueio = async (usuario: UsuarioItem) => {
    setMensagem("");
    setErro("");

    try {
      const response = await api.put(`/usuario/bloquear/${usuario.id}`, {
        bloqueado: !usuario.bloqueado,
      });

      const usuarioAtualizado = response.data.usuario;
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuario.id ? usuarioAtualizado : u)),
      );

      setMensagem(
        usuarioAtualizado.bloqueado
          ? `Usuário ${usuario.nome} foi bloqueado.`
          : `Usuário ${usuario.nome} foi desbloqueado.`,
      );
    } catch (err: any) {
      setErro(
        err.response?.data?.erro ||
          err.response?.data?.error ||
          "Erro ao alterar status de bloqueio.",
      );
    }
  };

  const usuariosFiltrados = usuarios.filter((user) => {
    // Filtro por Role
    if (filtroRole !== "TODOS" && user.role !== filtroRole) {
      return false;
    }

    // Filtro por Texto
    if (!filtroTexto.trim()) return true;
    const f = filtroTexto.toLowerCase().trim();
    return (
      user.nome?.toLowerCase().includes(f) ||
      user.email?.toLowerCase().includes(f) ||
      user.cpf?.includes(f) ||
      user.telefone?.includes(f) ||
      user.id?.toLowerCase().includes(f)
    );
  });

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="page-header header-with-actions">
          <div>
            <h1>Gerenciar Usuários</h1>
            <p className="page-subtitle">
              Administre os leitores e administradores do sistema
            </p>
          </div>
          <Link to="/cadastrar-usuario" className="btn-primary btn-add">
            + Cadastrar Novo Usuário
          </Link>
        </header>

        {mensagem && <div className="alert-success">{mensagem}</div>}
        {erro && <div className="alert-error">{erro}</div>}

        {/* Filtros e Busca */}
        <section className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar por nome, e-mail, CPF ou ID..."
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="role-filter-group">
            <button
              type="button"
              className={`filter-tab ${filtroRole === "TODOS" ? "active" : ""}`}
              onClick={() => setFiltroRole("TODOS")}
            >
              Todos ({usuarios.length})
            </button>
            <button
              type="button"
              className={`filter-tab ${filtroRole === "ADMINISTRADOR" ? "active" : ""}`}
              onClick={() => setFiltroRole("ADMINISTRADOR")}
            >
              Administradores (
              {usuarios.filter((u) => u.role === "ADMINISTRADOR").length})
            </button>
            <button
              type="button"
              className={`filter-tab ${filtroRole === "CLIENTE" ? "active" : ""}`}
              onClick={() => setFiltroRole("CLIENTE")}
            >
              Leitores / Clientes (
              {usuarios.filter((u) => u.role === "CLIENTE").length})
            </button>
          </div>
        </section>

        <section className="users-card">
          {carregando ? (
            <p className="empty-message">Carregando usuários...</p>
          ) : usuariosFiltrados.length === 0 ? (
            <p className="empty-message">
              {usuarios.length === 0
                ? "Nenhum usuário cadastrado."
                : `Nenhum usuário encontrado para os filtros selecionados.`}
            </p>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Perfil</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((user) => (
                    <tr key={user.id}>
                      <td className="title-cell">
                        <strong>{user.nome}</strong>
                        <div className="user-id-sub">{user.id}</div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.cpf || "-"}</td>
                      <td>{user.telefone || "-"}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.role === "ADMINISTRADOR"
                              ? "badge-role-admin"
                              : "badge-role-cliente"
                          }`}
                        >
                          {user.role === "ADMINISTRADOR"
                            ? "Administrador"
                            : "Cliente"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            user.bloqueado
                              ? "badge-status-bloqueado"
                              : "badge-status-ativo"
                          }`}
                        >
                          {user.bloqueado ? "Bloqueado" : "Ativo"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="actions-cell">
                          <Link
                            to={`/editar-usuario/${user.id}`}
                            className="btn-outline-small"
                          >
                            Editar
                          </Link>

                          <button
                            className={
                              user.bloqueado
                                ? "btn-warning-small"
                                : "btn-secondary-small"
                            }
                            onClick={() => handleToggleBloqueio(user)}
                            title={
                              user.bloqueado
                                ? "Desbloquear acesso do usuário"
                                : "Bloquear acesso do usuário"
                            }
                          >
                            {user.bloqueado ? "Desbloquear" : "Bloquear"}
                          </button>

                          <button
                            className="btn-danger-outline-small"
                            onClick={() => handleDelete(user.id)}
                          >
                            Apagar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
