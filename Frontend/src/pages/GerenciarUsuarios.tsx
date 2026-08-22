import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";

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
    if (!window.confirm("Tem certeza que deseja excluir este usuário permanentemente?")) {
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
    if (filtroRole !== "TODOS" && user.role !== filtroRole) {
      return false;
    }

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
    <div className="flex min-h-screen w-full bg-background">
      <MenuLateral />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen w-full">
        <TopNavBar showSearch={false} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant pb-6">
            <div>
              <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
                Gestão de Usuários
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">
                Administre os leitores e administradores cadastrados na plataforma.
              </p>
            </div>

            <Link
              to="/cadastrar-usuario"
              className="h-11 px-5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Cadastrar Novo Usuário</span>
            </Link>
          </div>

          {/* Feedback Alerts */}
          {mensagem && (
            <div className="p-4 bg-secondary-container/60 border border-secondary/40 rounded-xl text-on-secondary-container flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-secondary">
                check_circle
              </span>
              <span className="font-body-md font-medium">{mensagem}</span>
            </div>
          )}

          {erro && (
            <div className="p-4 bg-error-container/50 border border-error/30 rounded-xl text-error flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl">error</span>
              <span className="font-body-md">{erro}</span>
            </div>
          )}

          {/* Filters & Tabs Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-soft space-y-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar usuário por nome, e-mail, CPF ou ID..."
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
                className="w-full h-11 pl-12 pr-4 bg-surface-container-low border border-outline-variant rounded-full text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all placeholder:text-outline"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pt-1">
              <button
                onClick={() => setFiltroRole("TODOS")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filtroRole === "TODOS"
                    ? "bg-primary text-on-primary shadow-xs"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant"
                }`}
              >
                Todos ({usuarios.length})
              </button>
              <button
                onClick={() => setFiltroRole("CLIENTE")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filtroRole === "CLIENTE"
                    ? "bg-primary text-on-primary shadow-xs"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant"
                }`}
              >
                Leitores ({usuarios.filter((u) => u.role === "CLIENTE").length})
              </button>
              <button
                onClick={() => setFiltroRole("ADMINISTRADOR")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filtroRole === "ADMINISTRADOR"
                    ? "bg-primary text-on-primary shadow-xs"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant"
                }`}
              >
                Admins ({usuarios.filter((u) => u.role === "ADMINISTRADOR").length})
              </button>
            </div>
          </section>

          {/* Loading */}
          {carregando && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">
                progress_activity
              </span>
              <p className="font-body-md">Carregando usuários...</p>
            </div>
          )}

          {/* Users Table */}
          {!carregando && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F1F5F9] border-b border-outline-variant">
                    <tr>
                      <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        Usuário
                      </th>
                      <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        E-mail
                      </th>
                      <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">
                        CPF / Contato
                      </th>
                      <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider text-center">
                        Perfil
                      </th>
                      <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider text-center">
                        Status
                      </th>
                      <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider text-right">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant bg-surface-container-lowest font-body-sm text-body-sm">
                    {usuariosFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-outline italic">
                          Nenhum usuário encontrado com os filtros selecionados.
                        </td>
                      </tr>
                    ) : (
                      usuariosFiltrados.map((user) => {
                        const initials = user.nome
                          ? user.nome
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()
                          : "US";

                        return (
                          <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container text-xs font-bold flex items-center justify-center shrink-0">
                                  {initials}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-body-md font-semibold text-on-surface truncate">
                                    {user.nome}
                                  </p>
                                  <p className="text-[10px] text-outline truncate">
                                    ID: {user.id}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-on-surface-variant font-medium">
                              {user.email}
                            </td>
                            <td className="py-3.5 px-4 text-on-surface-variant">
                              <p className="font-mono text-xs">{user.cpf || "—"}</p>
                              <p className="text-[11px] text-outline">{user.telefone || "Sem telefone"}</p>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                  user.role === "ADMINISTRADOR"
                                    ? "bg-primary-container/20 text-primary"
                                    : "bg-secondary-container/60 text-on-secondary-container"
                                }`}
                              >
                                {user.role === "ADMINISTRADOR" ? "Admin" : "Leitor"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                  user.bloqueado
                                    ? "bg-error-container text-error"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                <span className="material-symbols-outlined text-[14px]">
                                  {user.bloqueado ? "lock" : "check_circle"}
                                </span>
                                <span>{user.bloqueado ? "Bloqueado" : "Ativo"}</span>
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Link
                                  to={`/editar-usuario/${user.id}`}
                                  className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                                  title="Editar Usuário"
                                >
                                  <span className="material-symbols-outlined text-[18px]">edit</span>
                                </Link>

                                <button
                                  onClick={() => handleToggleBloqueio(user)}
                                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                    user.bloqueado
                                      ? "text-emerald-700 hover:bg-emerald-100"
                                      : "text-amber-700 hover:bg-amber-100"
                                  }`}
                                  title={user.bloqueado ? "Desbloquear" : "Bloquear"}
                                >
                                  <span className="material-symbols-outlined text-[18px]">
                                    {user.bloqueado ? "lock_open" : "lock"}
                                  </span>
                                </button>

                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="p-1.5 rounded-lg text-error hover:bg-error-container/40 transition-colors cursor-pointer"
                                  title="Apagar Usuário"
                                >
                                  <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="px-5 py-3 border-t border-outline-variant bg-surface-container-low/40 flex items-center justify-between text-xs text-on-surface-variant">
                <span>
                  Exibindo <strong>{usuariosFiltrados.length}</strong> de{" "}
                  <strong>{usuarios.length}</strong> usuários cadastrados
                </span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}



