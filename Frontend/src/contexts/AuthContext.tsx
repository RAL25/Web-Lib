import { createContext, useState, useEffect, type ReactNode } from "react";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  bloqueado: boolean;
  role: "ADMINISTRADOR" | "CLIENTE";
}

interface AuthContextData {
  token: string | null;
  role: "ADMINISTRADOR" | "CLIENTE" | null;
  usuario: Usuario | null;
  carregando: boolean;
  login: (token: string, role: "ADMINISTRADOR" | "CLIENTE", usuario?: Usuario) => void;
  logout: () => void;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"ADMINISTRADOR" | "CLIENTE" | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);

  // Assim que a aplicação abre, verifica se já existe um token salvo
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") as "ADMINISTRADOR" | "CLIENTE" | null;
    const storedUser = localStorage.getItem("usuario");

    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole);
      if (storedUser) {
        try {
          setUsuario(JSON.parse(storedUser));
        } catch {
          setUsuario(null);
        }
      }
    }

    setCarregando(false);
  }, []);

  const login = (
    newToken: string,
    newRole: "ADMINISTRADOR" | "CLIENTE",
    user?: Usuario,
  ) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    if (user) {
      localStorage.setItem("usuario", JSON.stringify(user));
      setUsuario(user);
    }
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("usuario");
    setToken(null);
    setRole(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, usuario, carregando, login, logout, setUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
}
