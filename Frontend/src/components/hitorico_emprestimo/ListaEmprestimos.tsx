interface HistoricoItem {
  id: number;
  dataEmprestimo: string;
  status: string;
  livro: { titulo: string };
}

interface ListaEmprestimosProps {
  historico: HistoricoItem[];
}

export default function ListaEmprestimos({ historico }: ListaEmprestimosProps) {
  if (historico.length === 0)
    return <p>Seu histórico de leitura está vazio.</p>;

  return (
    <table border={1} cellPadding={5}>
      <thead>
        <tr>
          <th>Livro</th>
          <th>Data Retirada</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {historico.map((item) => (
          <tr key={item.id}>
            <td>{item.livro.titulo}</td>
            <td>{new Date(item.dataEmprestimo).toLocaleDateString()}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
