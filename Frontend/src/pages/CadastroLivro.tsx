import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import MenuLateral from "../components/common/MenuLateral";
import TopNavBar from "../components/common/TopNavBar";

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
  const [cadastrando, setCadastrando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

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
        const olRes = await fetch(
          `https://openlibrary.org/isbn/${cleanIsbn}.json`,
        );
        if (olRes.ok) {
          const olData = await olRes.json();
          setPreview({
            isbn: cleanIsbn,
            titulo: olData.title || "Título Desconhecido",
            autor: "Autor Desconhecido",
            editora: olData.publishers
              ? olData.publishers.join(", ")
              : "Editora não informada",
            categoria: "Geral",
            capa: `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`,
            descricao:
              typeof olData.description === "string"
                ? olData.description
                : "",
          });
        } else {
          setErro(
            "Nenhum metadado encontrado para este ISBN. Verifique o código e tente novamente.",
          );
          setPreview(null);
        }
      }
    } catch (err) {
      setErro(
        "Erro ao consultar serviço de livros. Você ainda pode tentar cadastrar diretamente.",
      );
    } finally {
      setBuscandoIsbn(false);
    }
  };

  const handleCadastrarLivro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setCadastrando(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setErro("Acesso negado. Você precisa estar logado para cadastrar livros.");
      setCadastrando(false);
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
    } finally {
      setCadastrando(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MenuLateral />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen w-full">
        <TopNavBar showSearch={false} />

        <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">
          {/* Back button */}
          <Link
            to="/gerenciar-livros"
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Voltar ao Acervo</span>
          </Link>

          {/* Header */}
          <div className="border-b border-outline-variant pb-6">
            <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">
              Cadastrar Novo Livro
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              Informe o ISBN para busca automática de metadados e defina a quantidade de exemplares iniciais.
            </p>
          </div>

          {/* Alerts */}
          {erro && (
            <div className="p-4 bg-error-container/50 border border-error/30 rounded-xl text-error flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl">error</span>
              <span className="font-body-md">{erro}</span>
            </div>
          )}

          {sucesso && (
            <div className="p-4 bg-secondary-container/60 border border-secondary/40 rounded-xl text-on-secondary-container flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-secondary">
                  check_circle
                </span>
                <span className="font-body-md font-medium">{sucesso}</span>
              </div>
              <button
                onClick={() => navigate("/gerenciar-livros")}
                className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-xs font-bold shrink-0 hover:bg-primary-container transition-colors cursor-pointer"
              >
                Ver no Acervo
              </button>
            </div>
          )}

          {/* Registration Form Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-soft space-y-6">
            <form onSubmit={handleCadastrarLivro} className="space-y-6">
              {/* ISBN Input with Auto-Fill Action */}
              <div className="space-y-2">
                <label
                  htmlFor="isbn"
                  className="font-label-md text-label-md text-on-surface flex items-center justify-between"
                >
                  <span>Código ISBN (10 ou 13 dígitos)</span>
                  <span className="text-xs text-outline font-normal">Ex: 9788535914849</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="isbn"
                    placeholder="Digite o código ISBN..."
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    className="flex-1 h-12 px-4 bg-surface-container-low border border-outline-variant rounded-xl text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all placeholder:text-outline"
                    required
                  />
                  <button
                    type="button"
                    onClick={buscarDadosIsbn}
                    disabled={buscandoIsbn}
                    className="h-12 px-5 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-primary font-label-md text-label-md rounded-xl flex items-center gap-2 transition-all cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    <span className={`material-symbols-outlined text-[20px] ${buscandoIsbn ? "animate-spin" : ""}`}>
                      {buscandoIsbn ? "progress_activity" : "travel_explore"}
                    </span>
                    <span>{buscandoIsbn ? "Consultando..." : "Buscar ISBN"}</span>
                  </button>
                </div>
              </div>

              {/* Book Preview Card when found */}
              {preview && (
                <div className="p-5 bg-surface-container-low border border-primary/20 rounded-2xl flex flex-col sm:flex-row gap-5 shadow-xs">
                  <div className="w-24 aspect-[2/3] rounded-lg overflow-hidden bg-surface-container border border-outline-variant shrink-0 shadow-sm mx-auto sm:mx-0">
                    <img
                      src={preview.capa}
                      alt={preview.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      Metadados Validados
                    </span>
                    <h3 className="font-headline-md text-body-lg font-bold text-on-surface">
                      {preview.titulo}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      por <span className="font-semibold text-primary">{preview.autor}</span>
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2 text-xs text-outline">
                      <span><strong>Editora:</strong> {preview.editora}</span>
                      <span>•</span>
                      <span><strong>Categoria:</strong> {preview.categoria}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Initial Copies Counter */}
              <div className="space-y-2">
                <label
                  htmlFor="quantidade"
                  className="font-label-md text-label-md text-on-surface"
                >
                  Quantidade Inicial de Exemplares Físicos
                </label>
                <input
                  type="number"
                  id="quantidade"
                  min="1"
                  max="100"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  className="w-full sm:w-48 h-12 px-4 bg-surface-container-low border border-outline-variant rounded-xl text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                  required
                />
                <p className="text-xs text-on-surface-variant">
                  O sistema gerará automaticamente os códigos de barras e registros de cada exemplar.
                </p>
              </div>

              {/* Form Submit */}
              <div className="pt-4 border-t border-outline-variant flex justify-end">
                <button
                  type="submit"
                  disabled={cadastrando}
                  className="h-12 px-8 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-xl flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  <span>{cadastrando ? "Cadastrando Livro..." : "Salvar no Acervo"}</span>
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

