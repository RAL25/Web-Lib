import { Link } from "react-router-dom";

export interface LivroAdmin {
  id: number;
  isbn: string;
  mediaAvaliacoes?: number;
  titulo: string;
  autor: string;
  editora?: string;
  categoria?: string;
  capa?: string;
  exemplares?: any[];
}

interface ListaLivrosProps {
  livros: LivroAdmin[];
  onExcluir: (id: number) => void;
}

export default function ListaLivros({ livros, onExcluir }: ListaLivrosProps) {
  if (livros.length === 0) {
    return (
      <div className="p-12 text-center text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
        <span className="material-symbols-outlined text-4xl text-outline mb-2">
          search_off
        </span>
        <p className="font-body-md">Nenhum livro cadastrado ou encontrado com este filtro.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F1F5F9] border-b border-outline-variant">
            <tr>
              <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">
                Livro / Autor
              </th>
              <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">
                ISBN
              </th>
              <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">
                Categoria / Editora
              </th>
              <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider text-center">
                Avaliação
              </th>
              <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider text-center">
                Exemplares
              </th>
              <th className="py-3.5 px-4 font-label-md text-label-md text-on-surface uppercase tracking-wider text-right">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant bg-surface-container-lowest font-body-sm text-body-sm">
            {livros.map((livro) => {
              const nota = livro.mediaAvaliacoes ?? 0;
              const totalExemplares = livro.exemplares?.length ?? 0;

              return (
                <tr key={livro.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-14 bg-surface-container rounded border border-outline-variant flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                        <img
                          src={
                            livro.capa ||
                            (livro.isbn
                              ? `https://covers.openlibrary.org/b/isbn/${livro.isbn}-M.jpg`
                              : "https://via.placeholder.com/60x90?text=Capa")
                          }
                          alt={livro.titulo}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/60x90?text=Capa";
                          }}
                        />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <Link
                          to={`/exemplares-livro/${livro.id}`}
                          className="font-body-md font-semibold text-on-surface hover:text-primary transition-colors truncate block"
                          title="Ver detalhes do livro"
                        >
                          {livro.titulo}
                        </Link>
                        <p className="font-body-sm text-xs text-on-surface-variant truncate">
                          {livro.autor || "Autor não informado"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-xs bg-surface-container-low border border-outline-variant px-2 py-0.5 rounded text-on-surface">
                      {livro.isbn}
                    </code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block text-[11px] font-bold text-primary bg-primary-container/15 px-2.5 py-0.5 rounded-full mb-1">
                      {livro.categoria || "Geral"}
                    </span>
                    <p className="text-xs text-on-surface-variant truncate">
                      {livro.editora || "Editora não informada"}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-1 text-[#F59E0B]">
                      <span className="material-symbols-outlined text-[16px] fill">
                        star
                      </span>
                      <span className="text-xs font-bold text-on-surface">
                        {nota > 0 ? nota.toFixed(1) : "—"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Link
                      to={`/exemplares-livro/${livro.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface transition-colors"
                      title="Gerenciar exemplares físicos"
                    >
                      <span className="material-symbols-outlined text-[14px]">inventory_2</span>
                      <span>{totalExemplares} ex.</span>
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onExcluir(livro.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-error-container/40 text-error hover:bg-error hover:text-on-error transition-colors cursor-pointer"
                      title="Excluir livro e exemplares"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                      <span>Excluir</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-outline-variant bg-surface-container-low/40 flex items-center justify-between text-xs text-on-surface-variant">
        <span>
          Total de títulos listados: <strong>{livros.length}</strong>
        </span>
      </div>
    </div>
  );
}

