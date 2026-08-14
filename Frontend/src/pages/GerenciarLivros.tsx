import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import ListaLivros from "../components/gerenciar_livros/ListaLivros";

export default function GerenciarLivros() {
  const [livros, setLivros] = useState<any[]>([]);

  const carregarLivros = async () => {
    try {
      const response = await api.get("/livro");
      setLivros(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  const deletarLivro = async (id: number) => {
    if (window.confirm("Certeza que deseja deletar este livro?")) {
      try {
        await api.delete(`/livro/${id}`);
        carregarLivros(); // Recarrega a lista
      } catch (error) {
        alert("Erro ao deletar livro.");
      }
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Acervo</h1>
      <MenuLateral />
      <Link to="/cadastrar-livro">
        <button>+ Novo Livro</button>
      </Link>
      <ListaLivros onExcluir={deletarLivro} livros={livros} />
    </div>
  );
}
