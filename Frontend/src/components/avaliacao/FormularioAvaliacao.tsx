import { useState } from "react";
import { api } from "../../services/api";

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
      setErro("Você precisa estar autenticado para avaliar este livro.");
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
      setComentario("");
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
    <div className="p-md bg-surface-container rounded-xl border border-outline-variant mt-4">
      <h5 className="font-body-lg text-body-lg font-bold text-on-surface mb-sm">
        Deixe sua avaliação
      </h5>

      {mensagem && (
        <div className="p-3 mb-3 bg-secondary-container/50 border border-secondary/30 text-on-secondary-container rounded-lg text-body-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{mensagem}</span>
        </div>
      )}
      {erro && (
        <div className="p-3 mb-3 bg-error-container/50 border border-error/30 text-error rounded-lg text-body-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{erro}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-md">
        <div>
          <label className="font-label-md text-label-md text-on-surface-variant mb-1.5 block">
            Sua Nota
          </label>
          <div className="flex items-center gap-1 cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = (hoverNota || nota) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNota(star)}
                  onMouseEnter={() => setHoverNota(star)}
                  onMouseLeave={() => setHoverNota(0)}
                  className="text-outline-variant hover:text-[#F59E0B] transition-colors p-0.5 cursor-pointer bg-transparent border-0"
                  aria-label={`Nota ${star}`}
                >
                  <span
                    className={`material-symbols-outlined text-2xl ${
                      isActive ? "text-[#F59E0B] fill" : "text-outline-variant"
                    }`}
                  >
                    star
                  </span>
                </button>
              );
            })}
            <span className="font-label-md text-label-md text-[#F59E0B] ml-2 font-bold">
              {hoverNota || nota} de 5
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="comentario"
            className="font-label-md text-label-md text-on-surface-variant mb-1.5 block"
          >
            Comentário (opcional)
          </label>
          <textarea
            id="comentario"
            rows={3}
            className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest p-sm font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all placeholder:text-outline"
            placeholder="Escreva sua experiência de leitura com esta obra..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={salvando}
            className="bg-primary text-on-primary font-label-md text-label-md py-2.5 px-5 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
          >
            {salvando ? "Enviando..." : "Enviar Avaliação"}
          </button>
        </div>
      </form>
    </div>
  );
}

