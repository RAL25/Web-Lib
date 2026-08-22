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
      <p style={{ color: "#64748b", textAlign: "center", padding: "20px" }}>
        Nenhum livro cadastrado ou encontrado com este filtro.
      </p>
    );
  }

  return (
    <div className="table-responsive">
      <table className="custom-table" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Capa</th>
            <th>Título / Autor</th>
            <th>ISBN</th>
            <th>Editora / Categoria</th>
            <th>Avaliação</th>
            <th>Exemplares</th>
            <th style={{ textAlign: "right" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => {
            const nota = livro.mediaAvaliacoes ?? 0;
            return (
              <tr key={livro.id}>
                <td style={{ width: "60px" }}>
                  <img
                    src={
                      livro.capa ||
                      `https://covers.openlibrary.org/b/isbn/${livro.isbn}-M.jpg`
                    }
                    alt={livro.titulo}
                    style={{
                      width: "42px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      backgroundColor: "#f1f5f9",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/42x60?text=Capa";
                    }}
                  />
                </td>
                <td>
                  <strong style={{ display: "block", color: "#0f172a" }}>
                    {livro.titulo}
                  </strong>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>
                    {livro.autor}
                  </span>
                </td>
                <td>
                  <code style={{ fontSize: "12px", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                    {livro.isbn}
                  </code>
                </td>
                <td>
                  <div style={{ fontSize: "13px", color: "#334155" }}>
                    {livro.editora || "Não informada"}
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "11px",
                      color: "#024935",
                      background: "#e6f4f0",
                      padding: "1px 6px",
                      borderRadius: "10px",
                      marginTop: "2px",
                    }}
                  >
                    {livro.categoria || "Geral"}
                  </span>
                </td>
                <td>
                  <span style={{ color: "#f59e0b", fontSize: "14px" }}>
                    {"★".repeat(Math.min(5, Math.max(0, Math.round(nota))))}
                    {"☆".repeat(Math.max(0, 5 - Math.round(nota)))}
                  </span>
                  <span style={{ fontSize: "12px", marginLeft: "4px", color: "#475569" }}>
                    {nota > 0 ? nota.toFixed(1) : "-"}
                  </span>
                </td>
                <td>
                  <span className="badge" style={{ backgroundColor: "#f1f5f9", color: "#334155" }}>
                    {livro.exemplares?.length ?? 0} exemplar(es)
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    onClick={() => onExcluir(livro.id)}
                    className="btn-danger"
                    style={{
                      backgroundColor: "#fee2e2",
                      color: "#991b1b",
                      border: "1px solid #fecaca",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "12px",
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
