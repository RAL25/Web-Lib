import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Perfil from "../pages/Perfil";
import { RotaPrivada } from "./RotaPrivada";
import RealizarEmprestimo from "../pages/RealizarEmprestimo";
import MeuEmprestimo from "../pages/MeuEmprestimo";
import Historico from "../pages/Historico";
import GerenciarLivros from "../pages/GerenciarLivros";
import GerenciarUsuarios from "../pages/GerenciarUsuarios";
import DashboardAdmin from "../pages/DashboardAdmin";
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

      {/* Rota Privada: Qualquer usuário autenticado */}
      <Route
        path="/perfil"
        element={
          <RotaPrivada>
            <Perfil />
          </RotaPrivada>
        }
      />

      {/* Rotas Protegidas: Perfil CLIENTE */}
      <Route
        path="/realizar-emprestimo"
        element={
          <RotaPrivada rolesPermitidas={["CLIENTE"]}>
            <RealizarEmprestimo />
          </RotaPrivada>
        }
      />

      <Route
        path="/carrinho"
        element={
          <RotaPrivada rolesPermitidas={["CLIENTE"]}>
            <Carrinho />
          </RotaPrivada>
        }
      />

      <Route
        path="/exemplares-livro/:id"
        element={
          <RotaPrivada rolesPermitidas={["CLIENTE"]}>
            <ExemplaresLivro />
          </RotaPrivada>
        }
      />

      <Route
        path="/meu-emprestimo"
        element={
          <RotaPrivada rolesPermitidas={["CLIENTE"]}>
            <MeuEmprestimo />
          </RotaPrivada>
        }
      />

      <Route
        path="/historico"
        element={
          <RotaPrivada rolesPermitidas={["CLIENTE"]}>
            <Historico />
          </RotaPrivada>
        }
      />

      {/* Rotas Protegidas: Perfil ADMINISTRADOR */}
      <Route
        path="/dashboard"
        element={
          <RotaPrivada rolesPermitidas={["ADMINISTRADOR"]}>
            <DashboardAdmin />
          </RotaPrivada>
        }
      />

      <Route
        path="/gerenciar-livros"
        element={
          <RotaPrivada rolesPermitidas={["ADMINISTRADOR"]}>
            <GerenciarLivros />
          </RotaPrivada>
        }
      />

      <Route
        path="/cadastrar-livro"
        element={
          <RotaPrivada rolesPermitidas={["ADMINISTRADOR"]}>
            <CadastroLivro />
          </RotaPrivada>
        }
      />

      <Route
        path="/configuracao"
        element={
          <RotaPrivada rolesPermitidas={["ADMINISTRADOR"]}>
            <Configuracao />
          </RotaPrivada>
        }
      />

      <Route
        path="/gerenciar-usuarios"
        element={
          <RotaPrivada rolesPermitidas={["ADMINISTRADOR"]}>
            <GerenciarUsuarios />
          </RotaPrivada>
        }
      />

      <Route
        path="/cadastrar-usuario"
        element={
          <RotaPrivada rolesPermitidas={["ADMINISTRADOR"]}>
            <CadastrarUsuario />
          </RotaPrivada>
        }
      />

      <Route
        path="/editar-usuario/:id"
        element={
          <RotaPrivada rolesPermitidas={["ADMINISTRADOR"]}>
            <EditarUsuario />
          </RotaPrivada>
        }
      />
    </Routes>
  );
}
