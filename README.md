# Desafio-desenvolvedor-target
## 1 - Observe o trecho de código:
```sh
int INDICE = 12, SOMA = 0, K = 1;
enquanto K < INDICE faça
{ K = K + 1; SOMA = SOMA + K;}
imprimir(SOMA);
```
Ao final do processamento, qual será o valor da variável SOMA? **77**

## 2 - Descubra a lógica e complete o próximo elemento:

a) 1, 3, 5, 7, ___ = **9**

b) 2, 4, 8, 16, 32, 64, ____ = **128**

c) 0, 1, 4, 9, 16, 25, 36, ____ = **49**

d) 4, 16, 36, 64, ____ = **100**

e) 1, 1, 2, 3, 5, 8, __ = **13**

f) 2,10, 12, 16, 17, 18, 19, __ = **200**

## 3 - Dado um vetor que guarda o valor de faturamento diário de uma distribuidora de todos os dias de um ano, faça um programa, na linguagem que desejar, que calcule e retorne:

- O menor valor de faturamento ocorrido em um dia do ano;
- O maior valor de faturamento ocorrido em um dia do ano;
- Número de dias no ano em que o valor de faturamento diário foi superior à média anual.

a) Considerar o vetor já carregado com as informações de valor de faturamento.

b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média.

c) Utilize o algoritmo mais veloz que puder definir.

```js
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
```
## 4- Banco de dados

Uma empresa solicitou a você um aplicativo para manutenção de um cadastro de clientes. Após a reunião de definição dos requisitos, as conclusões foram as seguintes:

- Um cliente pode ter um número ilimitado de telefones;
- Cada telefone de cliente tem um tipo, por exemplo: comercial, residencial, celular, etc. O sistema deve permitir cadastrar novos tipos de telefone;
- A princípio, é necessário saber apenas em qual estado brasileiro cada cliente se encontra. O sistema deve permitir cadastrar novos estados;

Você ficou responsável pela parte da estrutura de banco de dados que será usada pelo aplicativo. Assim sendo:

- Proponha um modelo lógico para o banco de dados que vai atender a aplicação. Desenhe as tabelas necessárias, os campos de cada uma e marque com setas os relacionamentos existentes entre as tabelas;
- Aponte os campos que são chave primária (PK) e chave estrangeira (FK);
- Faça uma busca utilizando comando SQL que traga o código, a razão social e o(s) telefone(s) de todos os clientes do estado de São Paulo (código “SP”);

**Modelo Lógico**

Tabela `clientes`
* `id` :  (PK) - Chave primária
*  razao_social` : Razão social do cliente
* `id_estado` : (FK) - Chave estrangeira para tabela estados

Tabela `telefones`
* `id` :  (PK) - Chave primária
* `numero`:  Número de telefone
* `id_cliente` : (FK) - Chave estrangeira para tabela clientes
* `id_tipo_telefone`: (FK) - Chave estrangeira para tabela tipo_telefone

Tabela `tipo_telefone`
* `id` :  (PK) - Chave primária
* `descricao`: Descrição do tipo de telefone (Ex: residencial, comercial, celular)

Tabela `estados`
* `id` :  (PK) - Chave primária
* `sigla`: UF do estado (Ex: RJ, MS, SP)
* `nome`: Nome do estado (Ex: Rio de Janeiro)


**Diagrama do modelo lógico**
```txt
estados        clientes       telefones             tipo_telefone
--------       ---------      ---------             -------------
id        <--  id_estado       id_tipo_telefone  -->    id
sigla          id          <-- id_cliente               descricao
nome           razao_social    id                             
                               numero
```
**Consulta retornando o código, a razão social e o(s) telefone(s) de todos os clientes do estado de São Paulo (código “SP”)**

```sql
SELECT 
    c.id,
    c.razao_social,
    t.numero
FROM 
    clientes c
JOIN 
    estados e ON c.id_estado = e.id
LEFT JOIN 
    telefones t ON c.id = t.id_cliente
WHERE 
    e.sigla = 'SP';
```

## 5 - Dois veículos, um carro e um caminhão, saem respectivamente de cidades opostas pela mesma rodovia. O carro, de Ribeirão Preto em direção a Barretos, a uma velocidade constante de 90 km/h, e o caminhão, de Barretos em direção a Ribeirão Preto, a uma velocidade constante de 80 km/h. Quando eles se cruzarem no percurso, qual estará mais próximo da cidade de Ribeirão Preto?

a) Considerar a distância de 125km entre a cidade de Ribeirão Preto <-> Barretos.

b) Considerar 3 pedágios como obstáculo e que o carro leva 5 minutos a mais para passar em cada um deles, pois ele não possui dispositivo de cobrança de pedágio.

c)Explique como chegou no resultado.

**Explicação**

* Tempo de encontro do caminhão e carro: 125/90+80 = 0,73 (44 minutos)
* Distancia do carro: 90 x 0.735 = 66km
* Distancia do caminhão: 80 x 0.735 = 59km
* Acrescimo de tempo dos 3 pedagios: 15min = 0,25horas
* Distancia do caminhao com o tempo de parada do pedagio = 80×0,25=20km

**Conclusão:**
O caminhão percorre 20 km a mais enquanto o carro perde tempo nos pedágios. Isso muda o ponto de encontro para mais perto de Barretos.
O caminhão está mais próximo de Ribeirão Preto no momento do encontro.