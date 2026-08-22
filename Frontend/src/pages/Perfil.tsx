import { useState, useEffect, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";
import MinhasAvaliacoes from "../components/avaliacao/MinhasAvaliacoes";

export default function Perfil() {
  const { setUsuario } = useContext(AuthContext);
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    role: "",
  });
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        setCarregando(true);
        const response = await api.get("/usuario/perfil");
        setDados({
          nome: response.data.nome || "",
          email: response.data.email || "",
          cpf: response.data.cpf || "",
          telefone: response.data.telefone || "",
          role: response.data.role || "",
        });
      } catch (error: any) {
        console.error("Erro ao carregar perfil:", error);
        setErro("Erro ao carregar dados do perfil.");
      } finally {
        setCarregando(false);
      }
    };
    carregarPerfil();
  }, []);

  const salvarAlteracoes = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setErro("");
    setSalvando(true);

    try {
      const payload: any = {
        nome: dados.nome,
        telefone: dados.telefone,
        cpf: dados.cpf,
      };
      if (senha.trim() !== "") {
        payload.senha = senha;
      }

      const response = await api.put("/usuario/alterar", payload);
      setMensagem("Perfil atualizado com sucesso!");
      setSenha("");
      if (response.data) {
        setUsuario((prev: any) => ({ ...prev, ...payload }));
      }
    } catch (error: any) {
      setErro(
        error.response?.data?.erro ||
          error.response?.data?.error ||
          "Erro ao atualizar perfil.",
      );
    } finally {
      setSalvando(false);
    }
  };

  const initials = dados.nome
    ? dados.nome
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "US";

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MenuLateral />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen w-full">
        <TopNavBar showSearch={false} />

        <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-8">
          {/* User Header Bento (Idêntico ao meu_perfil.html) */}
          <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 md:p-8 shadow-soft relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container/10 to-transparent pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary-container text-on-primary-container text-2xl sm:text-3xl font-bold flex items-center justify-center border-4 border-surface-container-lowest shadow-md shrink-0">
                {initials}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  {dados.nome || "Usuário"}
                </h1>
                <p className="font-body-md text-primary font-medium mt-1">
                  {dados.role === "ADMINISTRADOR"
                    ? "Administrador do Sistema"
                    : "Leitor Cadastrado"}
                </p>

                <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-container/10 text-primary font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Conta Ativa
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[16px]">email</span>
                    {dados.email}
                  </span>
                </div>
              </div>
            </div>
          </section>

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

          {/* Edit Profile Form */}
          <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 md:p-8 shadow-soft space-y-6">
            <div className="border-b border-outline-variant pb-4">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">manage_accounts</span>
                Dados Cadastrais
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Atualize suas informações pessoais e credenciais de acesso.
              </p>
            </div>

            {carregando ? (
              <div className="py-8 text-center text-body-sm text-on-surface-variant animate-pulse">
                Carregando perfil...
              </div>
            ) : (
              <form onSubmit={salvarAlteracoes} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="space-y-1.5">
                    <label htmlFor="nome" className="font-label-md text-label-md text-on-surface">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="nome"
                      className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      value={dados.nome}
                      onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                      required
                    />
                  </div>

                  {/* Email (Disabled) */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="font-label-md text-label-md text-on-surface">
                      E-mail <span className="text-outline text-xs font-normal">(Identificador Único)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full h-11 px-4 bg-surface-container border border-outline-variant rounded-xl font-body-sm text-body-sm text-outline cursor-not-allowed outline-none"
                      value={dados.email}
                      disabled
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
                      className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      value={dados.cpf}
                      onChange={(e) => setDados({ ...dados, cpf: e.target.value })}
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
                      className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      value={dados.telefone}
                      onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
                    />
                  </div>

                  {/* Senha */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="senha" className="font-label-md text-label-md text-on-surface">
                      Nova Senha <span className="text-outline text-xs font-normal">(Deixe em branco para manter a atual)</span>
                    </label>
                    <input
                      type="password"
                      id="senha"
                      className="w-full h-11 px-4 bg-surface-container-low border border-outline-variant rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                      placeholder="••••••••"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-outline-variant">
                  <button
                    type="submit"
                    disabled={salvando}
                    className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    <span>{salvando ? "Salvando..." : "Salvar Alterações"}</span>
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* Minhas Avaliações Component */}
          <MinhasAvaliacoes />
        </main>
      </div>
    </div>
  );
}

