import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";

export default function CadastrarUsuario() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"Cliente" | "Funcionario" | "Admin">(
    "Cliente",
  );
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    telefone: "",
    salario: "",
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
      const payload: any = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        role: role,
      };

      if (role === "Cliente") {
        payload.cpf = formData.cpf;
        payload.telefone = formData.telefone;
      } else if (role === "Funcionario") {
        payload.salario = Number(formData.salario);
      }

      const response = await api.post("/usuario/adicionar_usuario", payload);
      setMensagem(response.data || "Usuário cadastrado com sucesso!");

      setTimeout(() => navigate("/gerenciar-usuarios"), 2000);
    } catch (err: any) {
      setErro(err.response?.data?.erro || "Erro ao cadastrar usuário.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      <Link to="/gerenciar-usuarios">← Voltar para Gerenciar Usuários</Link>
      <h1>Cadastrar Novo Usuário</h1>
      <MenuLateral />

      {mensagem && (
        <p style={{ color: "green", fontWeight: "bold" }}>{mensagem}</p>
      )}
      {erro && <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Perfil (Role): </label>
          <select value={role} onChange={(e: any) => setRole(e.target.value)}>
            <option value="Cliente">Cliente</option>
            <option value="Funcionario">Funcionário</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>

        <br />

        <div>
          <label>Nome: </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>E-mail: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Senha: </label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        {/* Campos Dinâmicos para Cliente */}
        {role === "Cliente" && (
          <>
            <div>
              <label>CPF: </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                maxLength={11}
                required
              />
            </div>
            <br />
            <div>
              <label>Telefone: </label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>
            <br />
          </>
        )}

        {/* Campos Dinâmicos para Funcionário */}
        {role === "Funcionario" && (
          <>
            <div>
              <label>Salário (R$): </label>
              <input
                type="number"
                step="0.01"
                name="salario"
                value={formData.salario}
                onChange={handleChange}
                required
              />
            </div>
            <br />
          </>
        )}

        <button type="submit" disabled={enviando}>
          {enviando ? "Cadastrando..." : "Cadastrar Usuário"}
        </button>
      </form>
    </div>
  );
}
