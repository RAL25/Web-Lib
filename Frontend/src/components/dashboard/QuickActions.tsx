import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function QuickActions() {
  const [tipoBusca, setTipoBusca] = useState<"cpf" | "exemplar">("cpf");
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    const termo = termoBusca.trim();
    if (!termo) return;

    if (tipoBusca === "cpf") {
      // Redireciona para gerenciamento de usuários com o filtro
      navigate(`/gerenciar-usuarios?busca=${encodeURIComponent(termo)}`);
    } else {
      // Se for numérico direto, pode direcionar para a página de exemplares ou gerenciamento
      if (/^\d+$/.test(termo)) {
        navigate(`/exemplares-livro/${termo}`);
      } else {
        navigate(`/gerenciar-livros?busca=${encodeURIComponent(termo)}`);
      }
    }
  };

  return (
    <div className="quick-actions-card">
      <div className="quick-actions-top">
        {/* Botões de Atalho */}
        <div className="quick-actions-buttons">
          <Link to="/cadastrar-livro" className="btn-action btn-action-primary">
            <span>+</span> Novo Livro
          </Link>
          <Link
            to="/cadastrar-usuario"
            className="btn-action btn-action-secondary"
          >
            <span>+</span> Novo Usuário
          </Link>
          <Link to="/configuracao" className="btn-action btn-action-secondary">
            <span>⚙️</span> Configurações
          </Link>
        </div>

        {/* Input de Busca Rápida Universal */}
        <form onSubmit={handleBuscar} className="search-box-universal">
          <select
            value={tipoBusca}
            onChange={(e) =>
              setTipoBusca(e.target.value as "cpf" | "exemplar")
            }
            className="search-type-select"
            aria-label="Tipo de busca rápida"
          >
            <option value="cpf">CPF do Cliente</option>
            <option value="exemplar">Cód. Exemplar / Livro</option>
          </select>

          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder={
                tipoBusca === "cpf"
                  ? "Digite o CPF (ex: 12345678901)..."
                  : "Digite o ID do exemplar ou título..."
              }
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-search">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}
