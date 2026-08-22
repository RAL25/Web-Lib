import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface RotaPrivadaProps {
  children: ReactNode;
  rolesPermitidas?: ("ADMINISTRADOR" | "CLIENTE")[];
}

export function RotaPrivada({ children, rolesPermitidas }: RotaPrivadaProps) {
  const { token, role, carregando } = useContext(AuthContext);

  // 0. Enquanto estiver lendo o localStorage, impede redirecionamentos prematuros
  if (carregando) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        Carregando...
      </div>
    );
  }

  // 1. Se não tem token, redireciona para Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Se a rota exige um perfil específico e o usuário não possui -> Redireciona para Home
  if (rolesPermitidas && role && !rolesPermitidas.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // 3. Tudo certo! Renderiza a página solicitada
  return children;
}
