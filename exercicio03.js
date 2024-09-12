
let faturamentos = [200, 100, 100,0, 0, 300, 500, 500.19];

// O maior valor de faturamento ocorrido em um dia do ano;
const maiorFaturamento = (faturamentos) => Math.max.apply(null,[...new Set(faturamentos.filter((faturamento) => faturamento > 0))])

// O menor valor de faturamento ocorrido em um dia do ano;
const menorFaturamento = (faturamentos) => Math.min.apply(null,[...new Set(faturamentos.filter((faturamento) => faturamento > 0))])

// Número de dias no ano em que o valor de faturamento diário foi superior à média anual
const diasAcimaDaMedia = (faturamentos) => {
  const { soma, contador } = faturamentos.reduce(
    (acumulador, faturamento) => {
      if (faturamento > 0) {
        acumulador.soma += faturamento;
        acumulador.contador += 1;
      }
      return acumulador;
    },
    { soma: 0, contador: 0 },
  );
  const media = contador > 0 ? soma / contador : 0;
  const diasAcima = faturamentos.reduce((dias, faturamento) => {
    if (faturamento > media) {
      dias += 1;
    }
    return dias;
  }, 0);
  return diasAcima;
};

function Faturamentos(menorFaturamentoAnual,maiorFaturamentoAnual,numeroDiasValorAcimaDaMediaAnual){
  this.menorFaturamentoAnual = menorFaturamentoAnual;
  this.maiorFaturamentoAnual = maiorFaturamentoAnual;
  this.numeroDiasValorAcimaDaMediaAnual = numeroDiasValorAcimaDaMediaAnual
}

console.table(new Faturamentos(menorFaturamento(faturamentos), maiorFaturamento(faturamentos), diasAcimaDaMedia(faturamentos)))
