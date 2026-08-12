import { useState, useEffect } from "react";
import { api } from "../../services/api"; // Importa a configuração do axios
import { Link } from "react-router-dom";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
}

export default function CatalogoLivros() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const token = localStorage.getItem("token");
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    const buscarLivros = async () => {
      try {
        // O Axios faz o GET e já traz os dados dentro de "response.data"
        const response = await api.get("/livro");
        setLivros(response.data);
      } catch (error: any) {
        // O Axios encapsula o erro do backend dentro de error.response?.data
        const mensagemErro =
          error.response?.data?.erro ||
          "Falha ao buscar os livros no servidor.";
        setErro(mensagemErro);
      } finally {
        setCarregando(false);
      }
    };

    buscarLivros();
  }, []);

  if (carregando) return <p>Carregando acervo de livros...</p>;
  if (erro) return <p style={{ color: "red" }}>Erro: {erro}</p>;

  return (
    <div>
      {livros.length === 0 ? (
        <p>Nenhum livro cadastrado no momento.</p>
      ) : (
        <ul>
          {livros.map((livro) => (
            <li key={livro.id}>
              <strong>Título:</strong> {livro.titulo} <br />
              <strong>Autor:</strong> {livro.autor} <br />
              {token && (
                <Link to={`/realizar-emprestimo?livroId=${livro.id}`}>
                  {" "}
                  <button>Solicitar Empréstimo</button>
                  {/* (Solicitar Empréstimo) */}
                </Link>
              )}
              {/* Espaço reservado para futuros botões, como "Solicitar Empréstimo" ou "Ver Detalhes" */}
              {/* <button disabled>Ver Detalhes</button> */}
              <br />
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// interface Livro {
//   id: number;
//   titulo: string;
//   autor: string;
// }

// interface CatalogoLivrosProps {
//   livros: Livro[];
// }

// export default function CatalogoLivros({ livros }: CatalogoLivrosProps) {
//   if (livros.length === 0) return <p>Nenhum livro disponível no momento.</p>;

//   return (
//     <ul>
//       {livros.map((livro) => (
//         <li key={livro.id}>
//           <strong>{livro.titulo}</strong> - {livro.autor}
//         </li>
//       ))}
//     </ul>
//   );
// }
