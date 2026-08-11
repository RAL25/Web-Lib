import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    const listarUsuarios = async () => {
      try {
        const response = await api.get("/usuario");
        setUsuarios(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    listarUsuarios();
  }, []);

  return (
    <div>
      <h1>Gerenciar Usuários</h1>
      <button>Cadastrar Novo Usuário (Balcão)</button>
      <table border={1}>
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
    </div>
  );
}
