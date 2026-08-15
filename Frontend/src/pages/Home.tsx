// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import CatalogoLivros from "../components/home/CatalogoLivros";

export default function Home() {
  // const [livros, setLivros] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  return (
    <div>
      <h1>Bem-vindo à Biblioteca</h1>

      {!token ? (
        <nav>
          <Link to="/login">Fazer Login</Link> |{" "}
          <Link to="/cadastro">Cadastrar-se</Link>
        </nav>
      ) : (
        <nav></nav>
      )}

      <MenuLateral />

      <CatalogoLivros />
    </div>
  );
}
