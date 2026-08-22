import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";

interface TopNavBarProps {
  title?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
}

export default function TopNavBar({
  title,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar livros, autores ou ISBN...",
  showSearch = true,
}: TopNavBarProps) {
  const { usuario, token, role } = useContext(AuthContext);
  const { totalItens } = useContext(CarrinhoContext);
  const navigate = useNavigate();

  return (
    <header className="bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center w-full h-16 px-gutter sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        {title ? (
          <h2 className="text-headline-md font-headline-md text-on-surface font-semibold truncate hidden md:block">
            {title}
          </h2>
        ) : (
          <span className="md:hidden font-headline-md text-headline-md text-primary font-bold ml-12">
            Web-Lib
          </span>
        )}

        {showSearch && (
          <div className="relative w-full max-w-md hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchValue ?? ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-10 pl-10 pr-4 bg-surface-container-low border border-outline-variant rounded-full text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications (Mock) */}
        <button
          type="button"
          className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors rounded-full p-2 relative cursor-pointer"
          title="Notificações"
          onClick={() => {}}
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
        </button>

        {/* Bag/Cart for reader */}
        {role === "CLIENTE" && (
          <Link
            to="/carrinho"
            className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors rounded-full p-2 relative cursor-pointer"
            title="Sacola de Empréstimos"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {totalItens > 0 && (
              <span className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-primary text-on-primary text-[10px] font-bold rounded-full">
                {totalItens}
              </span>
            )}
          </Link>
        )}

        {/* User profile / Avatar */}
        {token ? (
          <button
            type="button"
            onClick={() => navigate("/perfil")}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-container-low transition-colors cursor-pointer"
            title={usuario?.nome ? `Perfil de ${usuario.nome}` : "Meu Perfil"}
          >
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-bold text-xs flex items-center justify-center shadow-xs border border-outline-variant">
              {usuario?.nome
                ? usuario.nome
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                : "US"}
            </div>
          </button>
        ) : (
          <Link
            to="/login"
            className="text-on-surface-variant hover:text-primary p-2 rounded-full cursor-pointer"
            title="Entrar"
          >
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </Link>
        )}
      </div>
    </header>
  );
}
