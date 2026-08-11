import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import CadastroLivro from "../pages/CadastroLivro";
import Perfil from "../pages/Perfil";
import { RotaPrivada } from "./RotaPrivada";
// Importe Perfil e outras telas futuramente...

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

      {/* Rota Protegida: Somente Admin e Funcionário */}
      <Route
        path="/cadastrar_livro"
        element={
          <RotaPrivada rolesPermitidas={["Administrador", "Funcionario"]}>
            <CadastroLivro />
          </RotaPrivada>
        }
      />
    </Routes>
  );
}
