import { Link } from "react-router-dom";
import MenuLateral from "../components/common/MenuLateral";
import CatalogoLivros from "../components/home/CatalogoLivros";
import "../assets/styles/Home.css";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="header-bar">
          <h1>Bem-vindo à Biblioteca</h1>

          {!token && (
            <nav className="auth-nav">
              <Link to="/login">Fazer Login</Link>
              <Link to="/cadastro">Cadastrar-se</Link>
            </nav>
          )}
        </header>

        <CatalogoLivros />
      </main>
    </div>
  );
}
