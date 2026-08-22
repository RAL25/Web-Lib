import { useState, useEffect } from "react";
import { api } from "../../services/api";

export interface AvaliacaoItem {
  id: number;
  nota: number;
  comentario?: string | null;
  criadoEm: string;
  usuario?: {
    id: string;
    nome: string;
  };
}

interface ListaAvaliacoesProps {
  livroId: number;
  recarregarGatilho?: number;
}

export default function ListaAvaliacoes({
  livroId,
  recarregarGatilho = 0,
}: ListaAvaliacoesProps) {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoItem[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    const buscarAvaliacoes = async () => {
      try {
        setCarregando(true);
        const response = await api.get(`/livro/${livroId}/avaliacoes`);
        setAvaliacoes(response.data);
      } catch (error: any) {
        console.error("Erro ao buscar avaliações:", error);
        setErro("Não foi possível carregar as avaliações deste livro.");
      } finally {
        setCarregando(false);
      }
    };

    if (livroId) {
      buscarAvaliacoes();
    }
  }, [livroId, recarregarGatilho]);

  if (carregando) {
    return (
      <div className="py-4 text-center text-body-sm text-on-surface-variant animate-pulse">
        Carregando avaliações...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-3 bg-error-container/30 border border-error/20 text-error rounded-lg text-body-sm">
        {erro}
      </div>
    );
  }

  if (avaliacoes.length === 0) {
    return (
      <div className="p-4 bg-surface-container-low rounded-lg text-center text-body-sm text-on-surface-variant italic">
        Nenhuma avaliação deixada para este livro ainda. Seja o primeiro a avaliar!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mb-6">
      {avaliacoes.map((av, idx) => {
        const dataFormatada = new Date(av.criadoEm).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        const nome = av.usuario?.nome || "Leitor";
        const initials = nome
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        const avatarColors = [
          "bg-primary-container text-on-primary-container",
          "bg-secondary-container text-on-secondary-container",
          "bg-amber-100 text-amber-800",
          "bg-indigo-100 text-indigo-800",
        ];
        const colorClass = avatarColors[idx % avatarColors.length];

        return (
          <div
            key={av.id}
            className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${colorClass} flex items-center justify-center font-bold text-xs shrink-0`}
                >
                  {initials}
                </div>
                <div>
                  <p className="font-body-md text-body-md font-semibold text-on-surface leading-tight">
                    {nome}
                  </p>
                  <p className="font-body-sm text-body-sm text-outline">
                    {dataFormatada}
                  </p>
                </div>
              </div>
              <div className="flex text-[#F59E0B]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`material-symbols-outlined text-[18px] ${
                      star <= av.nota ? "fill" : "text-outline-variant"
                    }`}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>
            {av.comentario && (
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                {av.comentario}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

