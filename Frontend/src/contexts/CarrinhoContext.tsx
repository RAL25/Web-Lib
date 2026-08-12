import { createContext, useState, useEffect, type ReactNode } from "react";

export interface ItemCarrinho {
  exemplarId: number;
  titulo?: string;
  autor?: string;
}

interface CarrinhoContextData {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (item: ItemCarrinho) => void;
  removerDoCarrinho: (exemplarId: number) => void;
  limparCarrinho: () => void;
  totalItens: number;
}

export const CarrinhoContext = createContext<CarrinhoContextData>(
  {} as CarrinhoContextData,
);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    const salvos = localStorage.getItem("carrinho_biblioteca");
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho_biblioteca", JSON.stringify(itens));
  }, [itens]);

  const adicionarAoCarrinho = (novoItem: ItemCarrinho) => {
    // Evita adicionar o mesmo exemplar duas vezes na sacola
    if (itens.some((item) => item.exemplarId === novoItem.exemplarId)) {
      alert("Este exemplar já está na sua sacola!");
      return;
    }
    setItens((prev) => [...prev, novoItem]);
  };

  const removerDoCarrinho = (exemplarId: number) => {
    setItens((prev) => prev.filter((item) => item.exemplarId !== exemplarId));
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        totalItens: itens.length,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
