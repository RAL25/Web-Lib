import { useState } from "react";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import "../assets/styles/CadastroLivro.css";

interface LivroPreview {
  isbn: string;
  titulo: string;
  autor: string;
  editora: string;
  categoria: string;
  capa: string;
  descricao?: string;
}

export default function CadastroLivro() {
  const [isbn, setIsbn] = useState("");
  const [quantidade, setQuantidade] = useState<number | string>(1);
  const [preview, setPreview] = useState<LivroPreview | null>(null);
  const [buscandoIsbn, setBuscandoIsbn] = useState(false);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const buscarDadosIsbn = async () => {
    if (!isbn.trim()) {
      setErro("Informe um número de ISBN para realizar a busca.");
      return;
    }

    setErro("");
    setSucesso("");
    setBuscandoIsbn(true);

    try {
      const cleanIsbn = isbn.replace(/[^0-9X]/gi, "").trim();
      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const info = data.items[0].volumeInfo || {};
        const thumb =
          info.imageLinks?.thumbnail ||
          info.imageLinks?.smallThumbnail ||
          `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`;

        setPreview({
          isbn: cleanIsbn,
          titulo: info.title || "Título Desconhecido",
          autor:
            info.authors && info.authors.length > 0
              ? info.authors.join(", ")
              : "Autor Desconhecido",
          editora: info.publisher || "Editora não informada",
          categoria:
            info.categories && info.categories.length > 0
              ? info.categories.join(", ")
              : "Geral",
          capa: thumb.replace(/^http:\/\//i, "https://"),
          descricao: info.description || "",
        });
      } else {
        // Fallback OpenLibrary
        const olRes = await fetch(`https://openlibrary.org/isbn/${cleanIsbn}.json`);
        if (olRes.ok) {
          const olData = await olRes.json();
          setPreview({
            isbn: cleanIsbn,
            titulo: olData.title || "Título Desconhecido",
            autor: "Autor Desconhecido",
            editora: olData.publishers ? olData.publishers.join(", ") : "Editora não informada",
            categoria: "Geral",
            capa: `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`,
            descricao: typeof olData.description === "string" ? olData.description : "",
          });
        } else {
          setErro("Nenhum metadado encontrado para este ISBN. Verifique o código e tente novamente.");
          setPreview(null);
        }
      }
    } catch (err) {
      setErro("Erro ao consultar serviço de livros. Você ainda pode tentar cadastrar diretamente.");
    } finally {
      setBuscandoIsbn(false);
    }
  };

  const handleCadastrarLivro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    const token = localStorage.getItem("token");

    if (!token) {
      setErro(
        "Acesso negado. Você precisa estar logado para cadastrar livros.",
      );
      return;
    }

    try {
      const response = await api.post("/livro", {
        isbn: isbn.trim(),
        quantidade: Number(quantidade) || 1,
      });

      setSucesso(
        response.data.message || "Livro e exemplares cadastrados com sucesso!",
      );

      setIsbn("");
      setQuantidade(1);
      setPreview(null);
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.erro ||
        error.response?.data?.error ||
        "Erro ao cadastrar o livro.";

      setErro(mensagemErro);
    }
  };

  return (
    <div className="app-container">
      <MenuLateral />

      <main className="main-content">
        <header className="page-header">
          <h1>Cadastrar Novo Livro</h1>
        </header>

        {erro && <div className="alert-error">{erro}</div>}
        {sucesso && <div className="alert-success">{sucesso}</div>}

        <section className="form-card">
          <form onSubmit={handleCadastrarLivro} className="custom-form">
            <div className="form-group">
              <label htmlFor="isbn">Código ISBN (10 ou 13 dígitos)</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  id="isbn"
                  className="form-control"
                  placeholder="Ex: 9788535914849"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-outline"
                  onClick={buscarDadosIsbn}
                  disabled={buscandoIsbn}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {buscandoIsbn ? "Buscando..." : "🔍 Buscar ISBN"}
                </button>
              </div>
            </div>

            {preview && (
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "14px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                {preview.capa && (
                  <img
                    src={preview.capa}
                    alt={preview.titulo}
                    style={{
                      width: "80px",
                      height: "115px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "16px", color: "#0f172a" }}>
                    {preview.titulo}
                  </strong>
                  <span style={{ fontSize: "14px", color: "#475569" }}>
                    <strong>Autor:</strong> {preview.autor}
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>
                    <strong>Editora:</strong> {preview.editora} | <strong>Categoria:</strong>{" "}
                    {preview.categoria}
                  </span>
                  <span style={{ fontSize: "12px", color: "#16a34a", marginTop: "4px" }}>
                    ✓ Metadados validados na Google Books API
                  </span>
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="quantidade">Quantidade de Exemplares</label>
              <input
                type="number"
                id="quantidade"
                className="form-control"
                min="1"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Salvar Livro
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
