import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import LogoutButton from "./LogoutButton";

export default function MenuLateral() {
  const { role } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "active" : "";

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">📚 Biblioteca</div>

        <ul className="sidebar-menu">
          <li>
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/perfil" className={isActive("/perfil")}>
              Meu Perfil
            </Link>
          </li>

          {role === "CLIENTE" && (
            <>
              <div className="sidebar-section-title">Área do Leitor</div>
              <li>
                <Link
                  to="/realizar-emprestimo"
                  className={isActive("/realizar-emprestimo")}
                >
                  Buscar Livros
                </Link>
              </li>
              <li>
                <Link
                  to="/meu-emprestimo"
                  className={isActive("/meu-emprestimo")}
                >
                  Meus Empréstimos
                </Link>
              </li>
              <li>
                <Link to="/historico" className={isActive("/historico")}>
                  Histórico
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className={isActive("/carrinho")}>
                  Carrinho
                </Link>
              </li>
            </>
          )}

          {role === "ADMINISTRADOR" && (
            <>
              <hr className="sidebar-divider" />
              <div className="sidebar-section-title">Painel de Controle</div>
              <li>
                <Link to="/dashboard" className={isActive("/dashboard")}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/gerenciar-livros"
                  className={isActive("/gerenciar-livros")}
                >
                  Gerenciar Livros
                </Link>
              </li>
              <li>
                <Link
                  to="/gerenciar-usuarios"
                  className={isActive("/gerenciar-usuarios")}
                >
                  Gerenciar Usuários
                </Link>
              </li>
              <li>
                <Link to="/configuracao" className={isActive("/configuracao")}>
                  Configurações
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div>
        <LogoutButton />
      </div>
    </aside>
  );
}
