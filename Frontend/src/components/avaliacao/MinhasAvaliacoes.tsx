import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface MinhaAvaliacaoItem {
  id: number;
  nota: number;
  comentario?: string | null;
  criadoEm: string;
  livro: {
    id: number;
    isbn: string;
    titulo: string;
    autor: string;
    capa?: string;
    editora?: string;
    categoria?: string;
  };
}

export default function MinhasAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<MinhaAvaliacaoItem[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");

  const carregarMinhasAvaliacoes = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/usuario/minhas-avaliacoes");
      setAvaliacoes(response.data);
    } catch (error: any) {
      console.error("Erro ao carregar minhas avaliações:", error);
      setErro("Erro ao buscar histórico de avaliações.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarMinhasAvaliacoes();
  }, []);

  const handleExcluir = async (id: number) => {
    if (window.confirm("Deseja realmente excluir sua avaliação?")) {
      try {
        await api.delete(`/avaliacao/${id}`);
        setMensagem("Avaliação excluída com sucesso!");
        carregarMinhasAvaliacoes();
      } catch (error: any) {
        setErro(
          error.response?.data?.erro || "Erro ao excluir avaliação.",
        );
      }
    }
  };

  const mediaGeral =
    avaliacoes.length > 0
      ? (
          avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) /
          avaliacoes.length
        ).toFixed(1)
      : "0.0";

  return (
    <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 md:p-8 shadow-soft space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-4">
        <div>
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" data-weight="fill">
              rate_review
            </span>
            Minhas Avaliações & Resenhas
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Gerencie suas notas e comentários sobre os livros que você já leu.
          </p>
        </div>

        {avaliacoes.length > 0 && (
          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant">
            <span className="material-symbols-outlined text-[#F59E0B] text-[20px] fill">
              star
            </span>
            <span className="text-body-sm font-bold text-on-surface">
              Média: {mediaGeral}
            </span>
          </div>
        )}
      </div>

      {mensagem && (
        <div className="p-3 bg-secondary-container/50 border border-secondary/30 text-on-secondary-container rounded-lg text-body-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{mensagem}</span>
        </div>
      )}

      {erro && (
        <div className="p-3 bg-error-container/50 border border-error/30 text-error rounded-lg text-body-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{erro}</span>
        </div>
      )}

      {carregando && (
        <div className="py-8 text-center text-body-sm text-on-surface-variant animate-pulse">
          Carregando suas avaliações...
        </div>
      )}

      {!carregando && avaliacoes.length === 0 && (
        <div className="p-8 text-center bg-surface-container-low rounded-xl text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl text-outline mb-2">
            reviews
          </span>
          <p className="font-body-sm text-body-sm italic">
            Você ainda não avaliou nenhum livro no acervo. Quando concluir uma leitura, deixe sua opinião!
          </p>
        </div>
      )}

      {!carregando && avaliacoes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {avaliacoes.map((av) => {
            const dataFormatada = new Date(av.criadoEm).toLocaleDateString(
              "pt-BR",
            );

            return (
              <div
                key={av.id}
                className="bg-surface-container-low border border-outline-variant rounded-xl p-4 flex gap-4 hover:shadow-xs transition-all"
              >
                {/* Book Thumbnail */}
                <div className="w-14 h-20 bg-surface-container-lowest rounded-lg border border-outline-variant flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                  <img
                    src={
                      av.livro?.capa ||
                      (av.livro?.isbn
                        ? `https://covers.openlibrary.org/b/isbn/${av.livro.isbn}-M.jpg`
                        : "https://via.placeholder.com/80x120?text=Capa")
                    }
                    alt={av.livro?.titulo || "Capa"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/80x120?text=Capa";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="font-body-md font-bold text-on-surface truncate">
                      {av.livro?.titulo || "Livro"}
                    </h4>
                    <p className="font-body-sm text-xs text-on-surface-variant truncate">
                      {av.livro?.autor || "Autor não informado"}
                    </p>

                    <div className="flex items-center gap-1 my-1.5 text-[#F59E0B]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`material-symbols-outlined text-[16px] ${
                            star <= av.nota ? "fill" : "text-outline-variant"
                          }`}
                        >
                          star
                        </span>
                      ))}
                      <span className="text-xs text-outline ml-2">
                        {dataFormatada}
                      </span>
                    </div>

                    {av.comentario && (
                      <p className="font-body-sm text-xs text-on-surface-variant italic line-clamp-2 leading-relaxed">
                        "{av.comentario}"
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleExcluir(av.id)}
                      className="text-error hover:bg-error-container/40 p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Excluir Avaliação"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        delete
                      </span>
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

