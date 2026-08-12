import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import LogoutButton from "./LogoutButton";

export default function MenuLateral() {
  const { role } = useContext(AuthContext);

  return (
    <nav
      style={{
        borderRight: "1px solid #ccc",
        padding: "10px",
        width: "200px",
        float: "left",
        minHeight: "100vh",
      }}
    >
      <h3>Menu</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {/* Opções comuns a qualquer usuário logado */}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/perfil">Meu Perfil</Link>
        </li>

        {/* Opções exclusivas para Clientes */}
        {role === "Cliente" && (
          <>
            <li>
              <Link to="/realizar-emprestimo">Buscar Livros</Link>
            </li>
            <li>
              <Link to="/meu-emprestimo">Meus Empréstimos</Link>
            </li>
            <li>
              <Link to="/historico">Histórico</Link>
            </li>
            <li>
              <Link to="/carrinho">Carrinho</Link>
            </li>
          </>
        )}

        {/* Opções exclusivas para Administradores e Funcionários */}
        {(role === "Admin" || role === "Funcionario") && (
          <>
            <hr />
            <h4>Painel de Controle</h4>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/gerenciar-livros">Gerenciar Livros</Link>
            </li>
            <li>
              <Link to="/gerenciar-usuarios">Gerenciar Usuários</Link>
            </li>
            <li>
              <Link to="/configuracao">Configurações</Link>
            </li>
          </>
        )}
      </ul>

      <br />
      <LogoutButton />
    </nav>
  );
}
