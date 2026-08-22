import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";

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
              Cadastrar Novo Usuário
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              Adicione um novo leitor ou administrador preenchendo as informações cadastrais.
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

          {/* Form Card */}
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
                    placeholder="Ex: João da Silva"
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
                    placeholder="exemplo@email.com"
                    className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Senha */}
                <div className="space-y-1.5">
                  <label htmlFor="senha" className="font-label-md text-label-md text-on-surface">
                    Senha de Acesso
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="••••••••"
                    className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                    value={formData.senha}
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
                    placeholder="000.000.000-00"
                    className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                    value={formData.cpf}
                    onChange={handleChange}
                    maxLength={14}
                    required
                  />
                </div>

                {/* Telefone */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="telefone" className="font-label-md text-label-md text-on-surface">
                    Telefone / Celular
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    placeholder="(00) 00000-0000"
                    className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                    value={formData.telefone}
                    onChange={handleChange}
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
                  disabled={enviando}
                  className="h-12 px-8 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-xl flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                  <span>{enviando ? "Cadastrando..." : "Cadastrar Usuário"}</span>
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

