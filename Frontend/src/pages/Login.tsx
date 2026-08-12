import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { api } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

// Define o formato esperado dentro do payload do JWT
interface TokenPayload {
  id: number;
  nome: string;
  role: string;
  exp: number;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // Efeito para limpar o erro automaticamente após 5 segundos
  useEffect(() => {
    if (!erro) return;

    // Define o tempo de exibição em milissegundos (5000ms = 5 segundos)
    const timer = setTimeout(() => {
      setErro("");
    }, 5000);

    // Função de limpeza para evitar vazamento de memória se o componente for desmontado
    return () => clearTimeout(timer);
  }, [erro]);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await api.post("/login", { email, senha });
      const { token } = response.data;

      // Decodifica o payload contido no JWT para ler o campo 'role'
      const payload = jwtDecode<TokenPayload>(token);

      // Atualiza o contexto global com o token e a role extraída
      login(token, payload.role);

      // Redireciona o usuário para a Home após o sucesso
      navigate("/");
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.erro ||
        error.response?.data?.error ||
        "Erro ao fazer login. Verifique suas credenciais.";

      setErro(mensagemErro);
    }
  };

  return (
    <div>
      <h1>Login - Biblioteca</h1>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="senha">Senha: </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Entrar</button>
      </form>

      <br />
      <Link to="/cadastro">Ainda não tem conta? Cadastre-se aqui.</Link>
    </div>
  );
}
