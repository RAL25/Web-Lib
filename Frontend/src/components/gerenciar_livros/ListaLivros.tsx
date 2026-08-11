interface LivroAdmin {
  id: number;
  titulo: string;
  autor: string;
}

interface ListaLivrosProps {
  livros: LivroAdmin[];
  onExcluir: (id: number) => void;
}

export default function ListaLivros({ livros, onExcluir }: ListaLivrosProps) {
  return (
    <ul>
      {livros.map((livro) => (
        <li key={livro.id} style={{ marginBottom: "10px" }}>
          <strong>{livro.titulo}</strong> - {livro.autor}
          <button
            onClick={() => onExcluir(livro.id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
}
