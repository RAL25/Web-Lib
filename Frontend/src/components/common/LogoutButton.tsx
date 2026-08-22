import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-all rounded-lg font-label-md text-label-md group cursor-pointer text-left"
    >
      <span className="material-symbols-outlined group-hover:text-error transition-colors">
        logout
      </span>
      <span className="font-label-md text-label-md">Sair</span>
    </button>
  );
}

