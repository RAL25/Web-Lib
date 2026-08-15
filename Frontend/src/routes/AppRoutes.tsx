import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
// import CadastroLivro from "../pages/CadastroLivro";
import Perfil from "../pages/Perfil";
import { RotaPrivada } from "./RotaPrivada";
import RealizarEmprestimo from "../pages/RealizarEmprestimo";
import MeuEmprestimo from "../pages/MeuEmprestimo";
import Historico from "../pages/Historico";
import GerenciarLivros from "../pages/GerenciarLivros";
import Dashboard from "../pages/Dashboard";
import GerenciarUsuarios from "../pages/GerenciarUsuarios";
import Configuracao from "../pages/Configuracao";
import CadastroLivro from "../pages/CadastroLivro";
import Carrinho from "../pages/Carrinho";
import ExemplaresLivro from "../pages/ExemplaresLivro";
import CadastrarUsuario from "../pages/CadastrarUsuario";
import EditarUsuario from "../pages/EditarUsuario";

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rota Privada: Qualquer usuário logado */}
      <Route
        path="/perfil"
        element={
          <RotaPrivada>
            <Perfil />
          </RotaPrivada>
        }
      />

      <Route
        path="/realizar-emprestimo"
        element={
          <RotaPrivada>
            <RealizarEmprestimo />
          </RotaPrivada>
        }
      />

      <Route
        path="/carrinho"
        element={
          <RotaPrivada>
            <Carrinho />
          </RotaPrivada>
        }
      />

      <Route
        path="/exemplares-livro/:id"
        element={
          <RotaPrivada>
            <ExemplaresLivro />
          </RotaPrivada>
        }
      />

      <Route
        path="/meu-emprestimo"
        element={
          <RotaPrivada>
            <MeuEmprestimo />
          </RotaPrivada>
        }
      />

      <Route
        path="/historico"
        element={
          <RotaPrivada>
            <Historico />
          </RotaPrivada>
        }
      />

      {/* Rota Protegida: Somente Admin e Funcionário */}
      <Route
        path="/dashboard"
        element={
          <RotaPrivada rolesPermitidas={["Admin", "Funcionario"]}>
            <Dashboard />
          </RotaPrivada>
        }
      />

      <Route
        path="/gerenciar-livros"
        element={
          <RotaPrivada rolesPermitidas={["Admin", "Funcionario"]}>
            <GerenciarLivros />
          </RotaPrivada>
        }
      />

      <Route
        path="/cadastrar-livro"
        element={
          <RotaPrivada rolesPermitidas={["Admin", "Funcionario"]}>
            <CadastroLivro />
          </RotaPrivada>
        }
      />

      <Route
        path="/configuracao"
        element={
          <RotaPrivada rolesPermitidas={["Admin", "Funcionario"]}>
            <Configuracao />
          </RotaPrivada>
        }
      />

      {/* Só Admin */}
      <Route
        path="/gerenciar-usuarios"
        element={
          <RotaPrivada rolesPermitidas={["Admin"]}>
            <GerenciarUsuarios />
          </RotaPrivada>
        }
      />

      <Route
        path="/cadastrar-usuario"
        element={
          <RotaPrivada rolesPermitidas={["Admin"]}>
            <CadastrarUsuario />
          </RotaPrivada>
        }
      />

      <Route
        path="/editar-usuario/:id"
        element={
          <RotaPrivada rolesPermitidas={["Admin"]}>
            <EditarUsuario />
          </RotaPrivada>
        }
      />
    </Routes>
  );
}
