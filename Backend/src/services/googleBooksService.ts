import "dotenv/config";

export interface GoogleBookData {
  isbn: string;
  titulo: string;
  autor: string;
  editora: string;
  categoria: string;
  capa: string;
  descricao?: string;
}

// Cache em memória para evitar chamadas redundantes e respeitar limites de requisições
const cacheLivros = new Map<string, GoogleBookData>();

/**
 * Normaliza o ISBN removendo traços, espaços e caracteres não numéricos/X.
 */
export function normalizarIsbn(isbn: string): string {
  if (!isbn) return "";
  return isbn.replace(/[^0-9X]/gi, "").trim();
}

/**
 * Busca os metadados de um livro através do ISBN consumindo a Google Books API,
 * com fallback integrado caso a API do Google atinja limites de quota ou esteja temporariamente instável.
 */
export async function buscarLivroPorIsbn(
  isbn: string,
): Promise<GoogleBookData | null> {
  const isbnLimpo = normalizarIsbn(isbn);
  if (!isbnLimpo) {
    return null;
  }

  // Verifica no cache primeiro
  if (cacheLivros.has(isbnLimpo)) {
    return cacheLivros.get(isbnLimpo)!;
  }

  // 1. Chamada primária à Google Books API
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const urlGoogle = apiKey
      ? `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnLimpo}&key=${apiKey}`
      : `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnLimpo}`;

    const response = await fetch(urlGoogle, {
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        const volumeInfo = item.volumeInfo || {};

        const capaRaw =
          volumeInfo.imageLinks?.thumbnail ||
          volumeInfo.imageLinks?.smallThumbnail ||
          "";
        const capaHttps = capaRaw.replace(/^http:\/\//i, "https://");

        const livroData: GoogleBookData = {
          isbn: isbnLimpo,
          titulo: volumeInfo.title || "Título Desconhecido",
          autor:
            volumeInfo.authors && volumeInfo.authors.length > 0
              ? volumeInfo.authors.join(", ")
              : "Autor Desconhecido",
          editora: volumeInfo.publisher || "Editora não informada",
          categoria:
            volumeInfo.categories && volumeInfo.categories.length > 0
              ? volumeInfo.categories.join(", ")
              : "Geral",
          capa:
            capaHttps ||
            `https://covers.openlibrary.org/b/isbn/${isbnLimpo}-M.jpg`,
          descricao: volumeInfo.description || "",
        };

        cacheLivros.set(isbnLimpo, livroData);
        return livroData;
      }
    }
  } catch (error) {
    console.warn(
      `[GoogleBooksService] Erro ao consultar Google Books para ISBN ${isbnLimpo}:`,
      error,
    );
  }

  // 2. Fallback: BrasilAPI (foco em livros publicados no Brasil / ISBNs nacionais)
  try {
    const responseBrasil = await fetch(
      `https://brasilapi.com.br/api/isbn/v1/${isbnLimpo}`,
    );
    if (responseBrasil.ok) {
      const bData = await responseBrasil.json();
      const livroData: GoogleBookData = {
        isbn: isbnLimpo,
        titulo: bData.title || "Título Desconhecido",
        autor:
          Array.isArray(bData.authors) && bData.authors.length > 0
            ? bData.authors.join(", ")
            : "Autor Desconhecido",
        editora: bData.publisher || "Editora não informada",
        categoria:
          Array.isArray(bData.subjects) && bData.subjects.length > 0
            ? bData.subjects.join(", ")
            : "Geral",
        capa:
          bData.cover_url ||
          `https://covers.openlibrary.org/b/isbn/${isbnLimpo}-M.jpg`,
        descricao: bData.synopsis || "",
      };

      cacheLivros.set(isbnLimpo, livroData);
      return livroData;
    }
  } catch (err) {
    // Silently continue to OpenLibrary fallback
  }

  // 3. Fallback: OpenLibrary
  try {
    const responseOL = await fetch(
      `https://openlibrary.org/isbn/${isbnLimpo}.json`,
    );
    if (responseOL.ok) {
      const olData = await responseOL.json();
      const livroData: GoogleBookData = {
        isbn: isbnLimpo,
        titulo: olData.title || "Título Desconhecido",
        autor: "Autor Desconhecido",
        editora:
          Array.isArray(olData.publishers) && olData.publishers.length > 0
            ? olData.publishers.join(", ")
            : "Editora não informada",
        categoria: "Geral",
        capa: `https://covers.openlibrary.org/b/isbn/${isbnLimpo}-M.jpg`,
        descricao:
          typeof olData.description === "string"
            ? olData.description
            : olData.description?.value || "",
      };

      cacheLivros.set(isbnLimpo, livroData);
      return livroData;
    }
  } catch (err) {
    // Continue
  }

  return null;
}
