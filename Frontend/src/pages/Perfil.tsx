import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import MinhasAvaliacoes from "../components/avaliacao/MinhasAvaliacoes";
import "../assets/styles/Perfil.css";

export default function Perfil() {
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

    try {
      const payload: any = {
        nome: dados.nome,
        telefone: dados.telefone,
        cpf: dados.cpf,
      };
      if (senha.trim() !== "") {
        payload.senha = senha;
      }

      await api.put("/usuario/alterar", payload);
      setMensagem("Perfil atualizado com sucesso!");
      setSenha("");
    } catch (error: any) {
      setErro(
        error.response?.data?.erro ||
          error.response?.data?.error ||
          "Erro ao atualizar perfil.",
      );
    }
  };

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="page-header">
          <h1>Meu Perfil</h1>
        </header>

        {mensagem && <div className="alert-success">{mensagem}</div>}
        {erro && <div className="alert-error">{erro}</div>}

        <section className="profile-card">
          {carregando ? (
            <p>Carregando perfil...</p>
          ) : (
            <form onSubmit={salvarAlteracoes}>
              <div className="form-group">
                <label>Perfil / Cargo</label>
                <div style={{ padding: "8px 0", fontWeight: 600, color: "var(--primary)" }}>
                  {dados.role === "ADMINISTRADOR" ? "Administrador" : "Cliente / Leitor"}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="nome">Nome Completo</label>
                <input
                  type="text"
                  id="nome"
                  className="form-control"
                  value={dados.nome}
                  onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  E-mail <span className="label-hint">(Não alterável)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={dados.email}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  className="form-control"
                  value={dados.cpf}
                  onChange={(e) => setDados({ ...dados, cpf: e.target.value })}
                  maxLength={14}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  className="form-control"
                  value={dados.telefone}
                  onChange={(e) =>
                    setDados({ ...dados, telefone: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="senha">
                  Nova Senha <span className="label-hint">(Deixe em branco para não alterar)</span>
                </label>
                <input
                  type="password"
                  id="senha"
                  className="form-control"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Salvar Alterações
                </button>
              </div>
            </form>
          )}
        </section>

        <MinhasAvaliacoes />
      </main>
    </div>
  );
}
