interface LivroFiltrado {
  id: number;
  titulo: string;
  autor: string;
  quantidadeDisponivel: number;
}

interface ListaLivrosFiltroProps {
  livros: LivroFiltrado[];
  onSolicitar: (livroId: number) => void;
}

export default function ListaLivrosFiltro({
  livros,
  onSolicitar,
}: ListaLivrosFiltroProps) {
  if (livros.length === 0) return <p>Faça uma busca para encontrar livros.</p>;

  return (
    <ul>
      {livros.map((livro) => (
        <li key={livro.id}>
          {livro.titulo} - {livro.autor} (Disponíveis:{" "}
          {livro.quantidadeDisponivel})
          <button
            onClick={() => onSolicitar(livro.id)}
            disabled={livro.quantidadeDisponivel <= 0}
          >
            Pegar Emprestado
          </button>
        </li>
      ))}
    </ul>
  );
}
