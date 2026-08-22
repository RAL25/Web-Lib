import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { api } from "../services/api";
import { AuthContext, Usuario } from "../contexts/AuthContext";
import "../assets/styles/Login.css";

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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand">📚 Bookary</div>
          <h1>Acesse sua conta</h1>
          <p>Informe suas credenciais para entrar na biblioteca</p>
        </div>

        {erro && <div className="alert-error">{erro}</div>}

        <form onSubmit={handleLogin} className="auth-form">
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

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={carregando}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Ainda não tem conta? </span>
          <Link to="/cadastro" className="auth-link">
            Cadastre-se aqui
          </Link>
        </div>
      </div>
    </div>
  );
}
