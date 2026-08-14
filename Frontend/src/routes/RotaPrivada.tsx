import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface RotaPrivadaProps {
  children: ReactNode;
  rolesPermitidas?: string[];
}

export function RotaPrivada({ children, rolesPermitidas }: RotaPrivadaProps) {
  const { token, role, carregando } = useContext(AuthContext); // <-- 1. Importa carregando

  // 0. Enquanto estiver lendo o localStorage, impede a execução dos redirecionamentos
  if (carregando) {
    return <div>Carregando...</div>; // Pode substituir por um Spinner ou componente de Loading
  }

  // 1. Se não tem token (e já terminou de carregar), vai pro Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Se a rota exige um perfil específico e o usuário não possui -> Vai pra Home
  if (rolesPermitidas && role && !rolesPermitidas.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // 3. Tudo certo! Renderiza a página solicitada
  return children;
}
