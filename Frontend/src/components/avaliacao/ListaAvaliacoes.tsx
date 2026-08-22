import { useState, useEffect } from "react";
import { api } from "../../services/api";
import "./Avaliacao.css";

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
    return <p style={{ fontSize: "13px", color: "#64748b" }}>Carregando avaliações...</p>;
  }

  if (erro) {
    return <p style={{ fontSize: "13px", color: "#dc2626" }}>{erro}</p>;
  }

  if (avaliacoes.length === 0) {
    return (
      <p style={{ fontSize: "13px", color: "#64748b", fontStyle: "italic", margin: "12px 0" }}>
        Nenhuma avaliação deixada para este livro ainda. Seja o primeiro a avaliar!
      </p>
    );
  }

  return (
    <div className="avaliacoes-list">
      {avaliacoes.map((av) => {
        const dataFormatada = new Date(av.criadoEm).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        return (
          <div key={av.id} className="avaliacao-item">
            <div className="avaliacao-item-header">
              <span className="avaliacao-author">
                {av.usuario?.nome || "Leitor Anônimo"}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="star-rating-display">
                  {"★".repeat(Math.min(5, Math.max(0, av.nota)))}
                  {"☆".repeat(Math.max(0, 5 - av.nota))}
                </span>
                <span className="avaliacao-date">{dataFormatada}</span>
              </div>
            </div>
            {av.comentario && (
              <div className="avaliacao-comment">
                "{av.comentario}"
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
