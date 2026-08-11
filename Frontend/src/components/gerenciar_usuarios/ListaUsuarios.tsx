interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface ListaUsuariosProps {
  usuarios: Usuario[];
}

export default function ListaUsuarios({ usuarios }: ListaUsuariosProps) {
  return (
    <table border={1} cellPadding={5}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nome}</td>
            <td>{user.email}</td>
            <td>
              <button>Editar</button>
              <button>Bloquear</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
