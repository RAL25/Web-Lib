// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import CatalogoLivros from "../components/home/CatalogoLivros";

export default function Home() {
  // const [livros, setLivros] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const carregarLivros = async () => {
  //     try {
  //       const response = await api.get("/livro");
  //       setLivros(response.data);
  //     } catch (error) {
  //       console.error("Erro ao carregar livros", error);
  //     }
  //   };
  //   carregarLivros();
  // }, []);

  return (
    <div>
      <h1>Bem-vindo à Biblioteca</h1>

      {!token ? (
        <nav>
          <Link to="/login">Fazer Login</Link> |{" "}
          <Link to="/cadastro">Cadastrar-se</Link>
        </nav>
      ) : (
        <nav>
          {/* <Link to="/perfil">Meu Perfil</Link> |{" "}
          <Link to="/meus-emprestimos">Meus Empréstimos</Link> */}
        </nav>
      )}

      <MenuLateral />

      <CatalogoLivros /*livros={livros}*/ />
      {/* <h2>Catálogo de Livros</h2>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            {livro.titulo} - {livro.autor}
            {token && (
              <Link to={`/realizar-emprestimo?livroId=${livro.id}`}>
                {" "}
                (Solicitar Empréstimo)
              </Link>
            )}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
