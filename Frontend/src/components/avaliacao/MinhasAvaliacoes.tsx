import { useState, useEffect } from "react";
import { api } from "../../services/api";
import "./Avaliacao.css";

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

  return (
    <section className="profile-card" style={{ marginTop: "24px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
        ⭐ Minhas Avaliações e Resenhas
      </h3>

      {mensagem && <div className="alert-success">{mensagem}</div>}
      {erro && <div className="alert-error">{erro}</div>}

      {carregando && <p style={{ color: "#64748b" }}>Carregando suas avaliações...</p>}

      {!carregando && avaliacoes.length === 0 && (
        <p style={{ color: "#64748b", fontStyle: "italic" }}>
          Você ainda não avaliou nenhum livro no acervo.
        </p>
      )}

      {!carregando && avaliacoes.length > 0 && (
        <div className="minhas-avaliacoes-grid">
          {avaliacoes.map((av) => {
            const dataFormatada = new Date(av.criadoEm).toLocaleDateString("pt-BR");

            return (
              <div key={av.id} className="minha-avaliacao-card">
                <img
                  src={
                    av.livro.capa ||
                    `https://covers.openlibrary.org/b/isbn/${av.livro.isbn}-M.jpg`
                  }
                  alt={av.livro.titulo}
                  className="minha-avaliacao-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/60x90?text=Capa";
                  }}
                />
                <div className="minha-avaliacao-details">
                  <div className="minha-avaliacao-title">{av.livro.titulo}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>{av.livro.autor}</div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "4px 0" }}>
                    <span className="star-rating-display" style={{ fontSize: "14px" }}>
                      {"★".repeat(Math.min(5, Math.max(0, av.nota)))}
                      {"☆".repeat(Math.max(0, 5 - av.nota))}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>
                      {av.nota}/5
                    </span>
                    <span style={{ fontSize: "11px", color: "#94a3b8", marginLeft: "auto" }}>
                      {dataFormatada}
                    </span>
                  </div>

                  {av.comentario && (
                    <p style={{ fontSize: "12px", color: "#334155", fontStyle: "italic", margin: "4px 0" }}>
                      "{av.comentario}"
                    </p>
                  )}

                  <div style={{ marginTop: "auto", textAlign: "right" }}>
                    <button
                      onClick={() => handleExcluir(av.id)}
                      className="btn-danger"
                      style={{
                        padding: "4px 8px",
                        fontSize: "11px",
                        backgroundColor: "#fee2e2",
                        color: "#991b1b",
                        border: "1px solid #fecaca",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Excluir
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
