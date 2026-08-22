import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { api } from "../services/api";
import { AuthContext, type Usuario } from "../contexts/AuthContext";

interface TokenPayload {
  id: string;
  nome: string;
  role: "ADMINISTRADOR" | "CLIENTE";
  exp: number;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!erro) return;

    const timer = setTimeout(() => {
      setErro("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [erro]);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const response = await api.post("/login", { email, senha });
      const { token, usuario } = response.data;

      const payload = jwtDecode<TokenPayload>(token);
      login(token, payload.role, usuario as Usuario);

      if (payload.role === "ADMINISTRADOR") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.erro ||
        error.response?.data?.error ||
        "Erro ao fazer login. Verifique suas credenciais.";

      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background soft glow decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

      <div
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg border border-slate-200 relative z-10 space-y-6"
        style={{ width: "100%", maxWidth: "440px", minWidth: "300px" }}
      >
        {/* Brand Header */}
        <div className="w-full text-center space-y-2" style={{ width: "100%" }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-800 text-white shadow-md mb-2">
            <span className="material-symbols-outlined text-3xl">local_library</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Web-Lib
          </h1>
          <p className="text-sm text-slate-600">
            Acesse sua conta para gerenciar empréstimos e explorar o acervo.
          </p>
        </div>

        {/* Error Alert */}
        {erro && (
          <div
            className="w-full p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2.5"
            style={{ width: "100%" }}
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
            <span>{erro}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full space-y-4" style={{ width: "100%" }}>
          <div className="w-full space-y-1.5" style={{ width: "100%" }}>
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

          <div className="w-full space-y-1.5" style={{ width: "100%" }}>
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
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ width: "100%" }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full h-12 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50 cursor-pointer pt-1"
            style={{ width: "100%" }}
          >
            <span className="material-symbols-outlined text-[20px]">login</span>
            <span>{carregando ? "Entrando..." : "Entrar no Sistema"}</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="w-full text-center pt-2 border-t border-slate-200 text-sm text-slate-600">
          <span>Ainda não tem conta? </span>
          <Link
            to="/cadastro"
            className="font-bold text-teal-800 hover:underline ml-1"
          >
            Cadastre-se aqui
          </Link>
        </div>
      </div>
    </div>
  );
}

