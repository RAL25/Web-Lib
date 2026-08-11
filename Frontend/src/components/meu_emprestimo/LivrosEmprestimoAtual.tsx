interface Emprestimo {
  id: number;
  dataDevolucao: string;
  livro: { titulo: string };
}

interface LivrosEmprestimoAtualProps {
  emprestimos: Emprestimo[];
  onRenovar: (id: number) => void;
}

export default function LivrosEmprestimoAtual({
  emprestimos,
  onRenovar,
}: LivrosEmprestimoAtualProps) {
  if (emprestimos.length === 0)
    return <p>Você não possui empréstimos ativos.</p>;

  return (
    <ul>
      {emprestimos.map((emp) => (
        <li key={emp.id}>
          {emp.livro.titulo} - Devolver até:{" "}
          {new Date(emp.dataDevolucao).toLocaleDateString()}
          <button onClick={() => onRenovar(emp.id)}>Renovar Prazo</button>
        </li>
      ))}
    </ul>
  );
}
