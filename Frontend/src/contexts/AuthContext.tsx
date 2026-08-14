import { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextData {
  token: string | null;
  role: string | null;
  carregando: boolean; // <-- 1. Adicionado na interface
  login: (token: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true); // <-- 2. Estado inicial como TRUE

  // Assim que a aplicação abre, verifica se já existe um token salvo
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole);
    }

    setCarregando(false); // <-- 3. Finaliza o carregamento após ler o localStorage
  }, []);

  const login = (newToken: string, newRole: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
