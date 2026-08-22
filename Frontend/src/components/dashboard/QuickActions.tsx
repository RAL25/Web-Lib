import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function QuickActions() {
  const [tipoBusca, setTipoBusca] = useState<"cpf" | "exemplar">("cpf");
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    const termo = termoBusca.trim();
    if (!termo) return;

    if (tipoBusca === "cpf") {
      navigate(`/gerenciar-usuarios?busca=${encodeURIComponent(termo)}`);
    } else {
      if (/^\d+$/.test(termo)) {
        navigate(`/exemplares-livro/${termo}`);
      } else {
        navigate(`/gerenciar-livros?busca=${encodeURIComponent(termo)}`);
      }
    }
  };

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-soft">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Shortcut Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/cadastrar-livro"
            className="h-11 px-5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Novo Livro</span>
          </Link>
          <Link
            to="/cadastrar-usuario"
            className="h-11 px-5 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Novo Usuário</span>
          </Link>
          <Link
            to="/configuracao"
            className="h-11 px-4 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all cursor-pointer"
            title="Configurações do Sistema"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            <span>Configurações</span>
          </Link>
        </div>

        {/* Universal Fast Search Bar */}
        <form onSubmit={handleBuscar} className="flex-1 max-w-xl flex flex-col sm:flex-row gap-2">
          <div className="relative shrink-0">
            <select
              value={tipoBusca}
              onChange={(e) =>
                setTipoBusca(e.target.value as "cpf" | "exemplar")
              }
              className="h-11 pl-3 pr-8 rounded-xl sm:rounded-l-full sm:rounded-r-none bg-surface-container-low border border-outline-variant text-body-sm text-on-surface font-medium focus:border-primary outline-none transition-all cursor-pointer"
              aria-label="Tipo de busca rápida"
            >
              <option value="cpf">CPF do Leitor</option>
              <option value="exemplar">Cód. Exemplar / Livro</option>
            </select>
          </div>

          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder={
                tipoBusca === "cpf"
                  ? "Digite o CPF do cliente..."
                  : "Digite o ID ou título do livro..."
              }
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full h-11 pl-9 pr-3 rounded-xl sm:rounded-none bg-surface-container-low border border-outline-variant sm:border-x-0 text-body-sm text-on-surface focus:border-primary outline-none transition-all placeholder:text-outline"
            />
          </div>

          <button
            type="submit"
            className="h-11 px-5 rounded-xl sm:rounded-r-full sm:rounded-l-none bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span>Buscar</span>
          </button>
        </form>
      </div>
    </section>
  );
}

