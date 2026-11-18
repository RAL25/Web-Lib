interface DadosRenovacao {
  dataPrazo: Date;
  dataAtual: Date;
  renovacoesDisponiveis: number;
  prazoPadraoDias: number;
}

interface ResultadoRenovacao {
  permitido: boolean;
  motivo?: string;
}

export function validarRenovacao({
  dataPrazo,
  dataAtual,
  renovacoesDisponiveis,
  prazoPadraoDias,
}: DadosRenovacao): ResultadoRenovacao {
  if (dataAtual > dataPrazo) {
    return {
      permitido: false,
      motivo: "Não é possível renovar um empréstimo em atraso.",
    };
  }

  if (renovacoesDisponiveis <= 0) {
    return {
      permitido: false,
      motivo: "Limite de renovações esgotado.",
    };
  }

  const diferencaMs = dataPrazo.getTime() - dataAtual.getTime();

  const diasRestantes = diferencaMs / (1000 * 60 * 60 * 24);

  const diasPassados = prazoPadraoDias - diasRestantes;

  if (diasPassados < 3) {
    return {
      permitido: false,
      motivo: "É necessário aguardar pelo menos 3 dias para renovar.",
    };
  }

  return {
    permitido: true,
  };
}
