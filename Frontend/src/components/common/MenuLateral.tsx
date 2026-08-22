import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";
import LogoutButton from "./LogoutButton";

export default function MenuLateral() {
  const { role, token } = useContext(AuthContext);
  const { totalItens } = useContext(CarrinhoContext);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const getItemClass = (path: string) =>
    isActive(path)
      ? "flex items-center gap-3 px-3 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg scale-95 transition-transform shadow-xs"
      : "flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all duration-200 rounded-lg";

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-3 left-4 z-50 p-2 rounded-lg bg-surface-container-lowest border border-outline-variant shadow-sm text-on-surface-variant hover:text-primary"
        aria-label="Abrir Menu"
      >
        <span className="material-symbols-outlined">
          {mobileMenuOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest border-r border-outline-variant shadow-soft p-md flex flex-col gap-sm z-40 overflow-y-auto transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="mb-md px-1 pt-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 group"
          >
            <span
              className="material-symbols-outlined text-primary text-2xl group-hover:scale-105 transition-transform"
              data-weight="fill"
            >
              auto_stories
            </span>
            <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
              Web-Lib
            </span>
          </Link>
          <p className="font-label-md text-label-md text-on-surface-variant mt-0.5 pl-8">
            Library System
          </p>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 flex flex-col gap-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={getItemClass("/")}
          >
            <span
              className={`material-symbols-outlined ${
                isActive("/") ? "fill" : ""
              }`}
            >
              home
            </span>
            <span className="font-label-md text-label-md">Home</span>
          </Link>

          {token && (
            <Link
              to="/perfil"
              onClick={() => setMobileMenuOpen(false)}
              className={getItemClass("/perfil")}
            >
              <span
                className={`material-symbols-outlined ${
                  isActive("/perfil") ? "fill" : ""
                }`}
              >
                person
              </span>
              <span className="font-label-md text-label-md">Meu Perfil</span>
            </Link>
          )}

          {/* Reader links (CLIENTE) */}
          {role === "CLIENTE" && (
            <>
              <div className="text-[11px] font-semibold text-outline uppercase tracking-wider px-3 pt-3 pb-1">
                Área do Leitor
              </div>

              <Link
                to="/realizar-emprestimo"
                onClick={() => setMobileMenuOpen(false)}
                className={getItemClass("/realizar-emprestimo")}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive("/realizar-emprestimo") ? "fill" : ""
                  }`}
                >
                  search
                </span>
                <span className="font-label-md text-label-md">Buscar Livros</span>
              </Link>

              <Link
                to="/carrinho"
                onClick={() => setMobileMenuOpen(false)}
                className={getItemClass("/carrinho")}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive("/carrinho") ? "fill" : ""
                  }`}
                >
                  shopping_bag
                </span>
                <span className="font-label-md text-label-md flex-1">Sacola</span>
                {totalItens > 0 && (
                  <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {totalItens}
                  </span>
                )}
              </Link>

              <Link
                to="/meu-emprestimo"
                onClick={() => setMobileMenuOpen(false)}
                className={getItemClass("/meu-emprestimo")}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive("/meu-emprestimo") ? "fill" : ""
                  }`}
                >
                  book
                </span>
                <span className="font-label-md text-label-md">
                  Meus Empréstimos
                </span>
              </Link>

              <Link
                to="/historico"
                onClick={() => setMobileMenuOpen(false)}
                className={getItemClass("/historico")}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive("/historico") ? "fill" : ""
                  }`}
                >
                  history
                </span>
                <span className="font-label-md text-label-md">Histórico</span>
              </Link>
            </>
          )}

          {/* Admin links (ADMINISTRADOR) */}
          {role === "ADMINISTRADOR" && (
            <>
              <div className="text-[11px] font-semibold text-outline uppercase tracking-wider px-3 pt-3 pb-1">
                Painel Admin
              </div>

              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={getItemClass("/dashboard")}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive("/dashboard") ? "fill" : ""
                  }`}
                >
                  dashboard
                </span>
                <span className="font-label-md text-label-md">Dashboard</span>
              </Link>

              <Link
                to="/gerenciar-livros"
                onClick={() => setMobileMenuOpen(false)}
                className={getItemClass("/gerenciar-livros")}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive("/gerenciar-livros") ? "fill" : ""
                  }`}
                >
                  auto_stories
                </span>
                <span className="font-label-md text-label-md">
                  Gestão de Acervo
                </span>
              </Link>

              <Link
                to="/gerenciar-usuarios"
                onClick={() => setMobileMenuOpen(false)}
                className={getItemClass("/gerenciar-usuarios")}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive("/gerenciar-usuarios") ? "fill" : ""
                  }`}
                >
                  group
                </span>
                <span className="font-label-md text-label-md">
                  Gestão de Usuários
                </span>
              </Link>

              <Link
                to="/configuracao"
                onClick={() => setMobileMenuOpen(false)}
                className={getItemClass("/configuracao")}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive("/configuracao") ? "fill" : ""
                  }`}
                >
                  settings
                </span>
                <span className="font-label-md text-label-md">
                  Configurações
                </span>
              </Link>
            </>
          )}

          {/* If not authenticated */}
          {!token && (
            <>
              <div className="text-[11px] font-semibold text-outline uppercase tracking-wider px-3 pt-3 pb-1">
                Acesso
              </div>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={getItemClass("/login")}
              >
                <span className="material-symbols-outlined">login</span>
                <span className="font-label-md text-label-md">Entrar</span>
              </Link>
              <Link
                to="/cadastro"
                onClick={() => setMobileMenuOpen(false)}
                className={getItemClass("/cadastro")}
              >
                <span className="material-symbols-outlined">person_add</span>
                <span className="font-label-md text-label-md">Cadastrar</span>
              </Link>
            </>
          )}
        </nav>

        {/* Footer logout / user summary */}
        <div className="mt-auto pt-sm border-t border-outline-variant">
          {token ? (
            <LogoutButton />
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 px-3 py-2 text-primary hover:bg-primary/10 transition-colors rounded-lg font-label-md text-label-md"
            >
              <span className="material-symbols-outlined">account_circle</span>
              <span>Fazer Login</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

