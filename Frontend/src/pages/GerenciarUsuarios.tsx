import { useState, useEffect } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import { Link } from "react-router-dom";

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const handleDelete = async (idUsuario: string) => {
    try {
      await api.delete(`/usuario/deletar/${idUsuario}`);
      const listaAtualizada = usuarios.filter(
        (usuario) => usuario.id !== idUsuario,
      );
      setUsuarios(listaAtualizada);
    } catch (erro) {
      alert(`Erro ao deletar o usuário: ${erro}`);
    }
  };

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
      <MenuLateral />
      <Link to={"/cadastrar-usuario"}>
        <button>Cadastrar Novo Usuário</button>
      </Link>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {/* <Link to={`/editar-usuario/${user.id}`}>
                  <button>Editar</button>
                </Link> */}

                <button onClick={() => handleDelete(user.id)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
