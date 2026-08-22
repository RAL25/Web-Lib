import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";

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
    <div className="flex min-h-screen w-full bg-background">
      <MenuLateral />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen w-full">
        <TopNavBar showSearch={false} />

        <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">
          {/* Back button */}
          <Link
            to="/gerenciar-usuarios"
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Voltar para Gerenciar Usuários</span>
          </Link>

          {/* Header */}
          <div className="border-b border-outline-variant pb-6">
            <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
              Editar Usuário
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              Atualize as informações cadastrais e permissões do usuário <span className="font-mono font-bold text-primary">#{id}</span>.
            </p>
          </div>

          {/* Alerts */}
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

          {/* Loading */}
          {carregando ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">
                progress_activity
              </span>
              <p className="font-body-md">Carregando dados do usuário...</p>
            </div>
          ) : (
            <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-soft">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Perfil / Role */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="role" className="font-label-md text-label-md text-on-surface">
                      Perfil de Acesso
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) =>
                        setRole(e.target.value as "ADMINISTRADOR" | "CLIENTE")
                      }
                      className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all cursor-pointer"
                    >
                      <option value="CLIENTE">Cliente / Leitor</option>
                      <option value="ADMINISTRADOR">Administrador do Sistema</option>
                    </select>
                  </div>

                  {/* Nome */}
                  <div className="space-y-1.5">
                    <label htmlFor="nome" className="font-label-md text-label-md text-on-surface">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* E-mail */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="font-label-md text-label-md text-on-surface">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* CPF */}
                  <div className="space-y-1.5">
                    <label htmlFor="cpf" className="font-label-md text-label-md text-on-surface">
                      CPF
                    </label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      value={formData.cpf}
                      onChange={handleChange}
                      maxLength={14}
                      required
                    />
                  </div>

                  {/* Telefone */}
                  <div className="space-y-1.5">
                    <label htmlFor="telefone" className="font-label-md text-label-md text-on-surface">
                      Telefone / Celular
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Nova Senha */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="senha" className="font-label-md text-label-md text-on-surface">
                      Nova Senha <span className="text-outline text-xs font-normal">(Deixe em branco se não desejar alterar)</span>
                    </label>
                    <input
                      type="password"
                      id="senha"
                      name="senha"
                      className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      value={formData.senha}
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Bloqueado toggle */}
                  <div className="sm:col-span-2 p-4 bg-surface-container-low border border-outline-variant rounded-xl">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="bloqueado"
                        checked={bloqueado}
                        onChange={(e) => setBloqueado(e.target.checked)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Conta bloqueada (impede novos empréstimos e login)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant flex justify-end">
                  <button
                    type="submit"
                    disabled={salvando}
                    className="h-12 px-8 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-xl flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">save</span>
                    <span>{salvando ? "Salvando..." : "Salvar Alterações"}</span>
                  </button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

