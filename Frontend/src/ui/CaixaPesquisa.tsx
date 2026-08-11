import { useState } from "react";

interface CaixaPesquisaProps {
  onSearch: (termo: string) => void;
  placeholder?: string;
}

export default function CaixaPesquisa({
  onSearch,
  placeholder = "Pesquisar...",
}: CaixaPesquisaProps) {
  const [termo, setTermo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(termo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder={placeholder}
        required
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
