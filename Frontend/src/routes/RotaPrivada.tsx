import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface RotaPrivadaProps {
  children: ReactNode;
  rolesPermitidas?: string[]; // Ex: ["Admin", "Funcionario"]
}

export function RotaPrivada({ children, rolesPermitidas }: RotaPrivadaProps) {
  const { token, role } = useContext(AuthContext);

  // 1. Se não tem token, não está logado -> Vai pro Login
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
