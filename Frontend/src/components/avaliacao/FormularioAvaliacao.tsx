import { useState } from "react";
import { api } from "../../services/api";
import "./Avaliacao.css";

interface FormularioAvaliacaoProps {
  livroId: number;
  onAvaliacaoSalva?: () => void;
  notaInicial?: number;
  comentarioInicial?: string;
}

export default function FormularioAvaliacao({
  livroId,
  onAvaliacaoSalva,
  notaInicial = 5,
  comentarioInicial = "",
}: FormularioAvaliacaoProps) {
  const [nota, setNota] = useState<number>(notaInicial);
  const [hoverNota, setHoverNota] = useState<number>(0);
  const [comentario, setComentario] = useState<string>(comentarioInicial);
  const [salvando, setSalvando] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>("");
  const [erro, setErro] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setErro("");

    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Você precisa estar logado para avaliar este livro.");
      return;
    }

    try {
      setSalvando(true);
      await api.post(`/livro/${livroId}/avaliacoes`, {
        livroId,
        nota,
        comentario: comentario.trim() || undefined,
      });

      setMensagem("Avaliação salva com sucesso!");
      if (onAvaliacaoSalva) {
        onAvaliacaoSalva();
      }
    } catch (error: any) {
      setErro(
        error.response?.data?.erro ||
          error.response?.data?.error ||
          "Erro ao salvar avaliação.",
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="avaliacao-form-card">
      <h4>Deixe sua avaliação</h4>

      {mensagem && <div className="alert-success" style={{ marginBottom: "10px" }}>{mensagem}</div>}
      {erro && <div className="alert-error" style={{ marginBottom: "10px" }}>{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#475569" }}>
            Sua Nota (1 a 5 estrelas):
          </label>
          <div className="stars-selector">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${
                  (hoverNota || nota) >= star ? "active" : ""
                }`}
                onClick={() => setNota(star)}
                onMouseEnter={() => setHoverNota(star)}
                onMouseLeave={() => setHoverNota(0)}
                aria-label={`Avaliar com ${star} estrela(s)`}
              >
                ★
              </button>
            ))}
            <span style={{ fontSize: "13px", fontWeight: 600, alignSelf: "center", marginLeft: "6px", color: "#f59e0b" }}>
              {hoverNota || nota} / 5
            </span>
          </div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="comentario"
            style={{ fontSize: "13px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}
          >
            Seu Comentário / Resenha (Opcional):
          </label>
          <textarea
            id="comentario"
            className="avaliacao-form-textarea"
            placeholder="O que você achou deste livro? Conte sua experiência..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={salvando}
          style={{ fontSize: "13px", padding: "8px 16px" }}
        >
          {salvando ? "Enviando..." : "Enviar Avaliação"}
        </button>
      </form>
    </div>
  );
}
