import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";

export default function EditarUsuario() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [role, setRole] = useState<string>("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    telefone: "",
    salario: "",
  });

  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // Busca os dados atuais do usuário ao carregar a tela
  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        setCarregando(true);
        const response = await api.get(`/usuario/${id}`);
        const user = response.data;

        // Identifica o perfil (role) do usuário
        const userRole =
          user.role ||
          (user.cliente
            ? "Cliente"
            : user.funcionario
              ? "Funcionario"
              : "Admin");

        setRole(userRole);

        // Preenche o formulário com todas as informações vindas do backend
        setFormData({
          nome: user.nome || "",
          email: user.email || "",
          senha: "", // Não mostra a senha por segurança
          cpf: user.cliente?.cpf || "",
          telefone: user.cliente?.telefone || "",
          salario: user.funcionario?.salario
            ? String(user.funcionario.salario)
            : "",
        });
      } catch (err: any) {
        setErro("Erro ao carregar dados do usuário.");
      } finally {
        setCarregando(false);
      }
    };

    if (id) buscarUsuario();
  }, [id]);

  // Atualiza os campos do estado de forma dinâmica usando e.target.name
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setErro("");

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

      await api.put(`/usuario/alterar/${id}`, payload);
      setMensagem("Usuário atualizado com sucesso!");

      setTimeout(() => navigate("/gerenciar-usuarios"), 2000);
    } catch (err: any) {
      setErro(err.response?.data?.erro || "Erro ao atualizar usuário.");
    }
  };

  if (carregando) return <p>Carregando dados do usuário...</p>;

  return (
    <div>
      <Link to="/gerenciar-usuarios">← Voltar</Link>
      <h1>Editar Usuário #{id}</h1>
      <MenuLateral />

      {mensagem && (
        <p style={{ color: "green", fontWeight: "bold" }}>{mensagem}</p>
      )}
      {erro && <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          <strong>Perfil Atual:</strong> {role}
        </p>

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
            type="text"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Digite a nova senha"
            required
          />
        </div>

        <br />

        {/* Campos Específicos para Cliente */}
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

        {/* Campos Específicos para Funcionário */}
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

        {/* Seleção de Role caso seja um usuário Administrador */}
        {role === "Admin" && (
          <>
            <div>
              <label>Alterar Role: </label>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="Funcionario">Funcionario</option>
                <option value="Cliente">Cliente</option>
              </select>
            </div>
            <br />
          </>
        )}

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
