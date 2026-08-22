import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setMensagemSucesso("");
    setCarregando(true);

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
          "Cadastro realizado com sucesso! Você já pode fazer login.",
      );
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.erro ||
        error.response?.data?.error ||
        "Erro ao realizar o cadastro.";

      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background soft glow decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

      <div
        className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-lg border border-slate-200 relative z-10 space-y-6"
        style={{ width: "100%", maxWidth: "440px", minWidth: "300px" }}
      >
        {/* Brand Header */}
        <div className="w-full text-center space-y-2" style={{ width: "100%" }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-800 text-white shadow-md mb-2">
            <span className="material-symbols-outlined text-3xl">menu_book</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Crie sua conta
          </h1>
          <p className="text-sm text-slate-600">
            Junte-se à Web-Lib e aproveite o melhor acervo de livros.
          </p>
        </div>

        {/* Feedback Alerts */}
        {erro && (
          <div
            className="w-full p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2.5"
            style={{ width: "100%" }}
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
            <span>{erro}</span>
          </div>
        )}

        {mensagemSucesso && (
          <div
            className="w-full p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-2.5"
            style={{ width: "100%" }}
          >
            <span className="material-symbols-outlined text-[20px] text-emerald-600 shrink-0">
              check_circle
            </span>
            <span>{mensagemSucesso}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleCadastro} className="w-full space-y-4" style={{ width: "100%" }}>
          <div className="space-y-1.5" style={{ width: "100%" }}>
            <label htmlFor="nome" className="block text-sm font-medium text-slate-900">
              Nome Completo
            </label>
            <div className="relative w-full" style={{ width: "100%" }}>
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                person
              </span>
              <input
                type="text"
                id="nome"
                className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:border-teal-700 focus:ring-2 focus:ring-teal-200 outline-none transition-all placeholder:text-slate-400"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={{ width: "100%" }}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5" style={{ width: "100%" }}>
            <label htmlFor="email" className="block text-sm font-medium text-slate-900">
              E-mail
            </label>
            <div className="relative w-full" style={{ width: "100%" }}>
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                mail
              </span>
              <input
                type="email"
                id="email"
                className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:border-teal-700 focus:ring-2 focus:ring-teal-200 outline-none transition-all placeholder:text-slate-400"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5" style={{ width: "100%" }}>
            <label htmlFor="senha" className="block text-sm font-medium text-slate-900">
              Senha
            </label>
            <div className="relative w-full" style={{ width: "100%" }}>
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                lock
              </span>
              <input
                type="password"
                id="senha"
                className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:border-teal-700 focus:ring-2 focus:ring-teal-200 outline-none transition-all placeholder:text-slate-400"
                placeholder="Crie uma senha segura"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ width: "100%" }}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ width: "100%" }}>
            <div className="space-y-1.5" style={{ width: "100%" }}>
              <label htmlFor="cpf" className="block text-sm font-medium text-slate-900">
                CPF
              </label>
              <div className="relative w-full" style={{ width: "100%" }}>
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                  badge
                </span>
                <input
                  type="text"
                  id="cpf"
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:border-teal-700 focus:ring-2 focus:ring-teal-200 outline-none transition-all placeholder:text-slate-400"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  maxLength={14}
                  style={{ width: "100%" }}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5" style={{ width: "100%" }}>
              <label htmlFor="telefone" className="block text-sm font-medium text-slate-900">
                Telefone
              </label>
              <div className="relative w-full" style={{ width: "100%" }}>
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                  call
                </span>
                <input
                  type="tel"
                  id="telefone"
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:border-teal-700 focus:ring-2 focus:ring-teal-200 outline-none transition-all placeholder:text-slate-400"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  style={{ width: "100%" }}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full h-12 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50 cursor-pointer pt-1"
            style={{ width: "100%" }}
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>{carregando ? "Cadastrando..." : "Criar Conta"}</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="w-full text-center pt-2 border-t border-slate-200 text-sm text-slate-600">
          <span>Já possui uma conta? </span>
          <Link
            to="/login"
            className="font-bold text-teal-800 hover:underline ml-1"
          >
            Faça login aqui
          </Link>
        </div>
      </div>
    </div>
  );
}

