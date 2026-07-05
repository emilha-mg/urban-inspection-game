# Vistoria Urbana 🔎

Jogo desenvolvido para a **Atividade #09**, com foco na prática de manipulação do DOM com JavaScript.

## Autora

**Emilha de Souza**

---

## Mecânica escolhida e tema do jogo

A mecânica escolhida foi **“Encontre o Diferente”**.

O tema do jogo é **vistoria urbana**, com situações inspiradas em irregularidades que podem ser observadas em uma cidade, como lote com mato alto, descarte irregular de lixo, calçada obstruída, obra irregular, imóvel sem manutenção, entre outras.

O jogador assume o papel de um fiscal e precisa encontrar, em cada rodada, o elemento que representa uma irregularidade urbana.

---

## Briefing do cliente

O público-alvo escolhido foi:

**Pessoa idosa**

Essa escolha influenciou nas decisões de design do jogo. Por isso, a interface foi pensada com:

* textos simples;
* fonte maior;
* botões grandes;
* bom contraste;
* tempo suficiente para leitura;
* mensagens temporárias de orientação;
* grade com 3 colunas para melhor adaptação em telas de celular;
* recursos de ajuda, como a Lupa de Fiscalização e o botão Mais tempo.

A ideia foi criar um jogo acessível, com ritmo moderado e instruções claras, evitando uma experiência visualmente confusa e que exigisse agilidade do jogador.

---

## Regras do jogo

O jogo possui **15 rodadas**.

Em cada rodada, aparece uma grade com vários elementos iguais e apenas um elemento diferente. O elemento diferente representa uma irregularidade urbana que deve ser encontrada pelo jogador.

Antes da grade, o jogo apresenta uma orientação, como:

> Encontre o lote com mato alto que precisa de limpeza.

O jogador deve observar a grade e clicar no item que corresponde à irregularidade indicada.

---

## Pontuação

O jogador inicia com **25 pontos**.

A pontuação funciona da seguinte forma:

| Ação                        |  Pontuação |
| --------------------------- | ---------: |
| Acerto                      | +10 pontos |
| Erro                        |  -5 pontos |
| Acerto rápido               |  +5 pontos |
| Fim do tempo                | -10 pontos |
| Uso da Lupa de Fiscalização |  -3 pontos |
| Uso do botão Mais tempo     | -10 pontos |

O bônus por acerto rápido é concedido quando o jogador encontra a irregularidade nos primeiros **10 segundos** da rodada.

A pontuação mínima é **0**. Se a pontuação chegar a zero após erro ou penalidade, o jogo é encerrado.

---

## Tempo

Cada rodada tem a duração padrão de **20 segundos**.

O tempo é exibido em destaque na tela. Quando começa a acabar, o indicador muda de cor para chamar a atenção do jogador.

Se o tempo acabar, o jogador perde **10 pontos**.

Caso ainda tenha pontuação suficiente para continuar, a mesma rodada é repetida. Caso contrário, o jogo termina.

---

## Curva de dificuldade

A dificuldade aumenta de forma gradual, conforme o avanço das rodadas.

| Rodadas |   Nível | Formato da grade     |
| ------- | ------: | -------------------- |
| 1 a 5   | Nível 1 | 3 colunas × 3 linhas |
| 6 a 10  | Nível 2 | 3 colunas × 4 linhas |
| 11 a 15 | Nível 3 | 3 colunas × 5 linhas |

A grade foi configurada para crescer no sentido vertical, mantendo sempre **3 colunas**. Essa decisão foi tomada pensando na jogabilidade em telas menores, especialmente celulares.

---

## Diferencial do jogo

O diferencial criado foi a mecânica **Lupa de Fiscalização**.

A Lupa de Fiscalização funciona como uma dica. O jogador pode usá-la uma vez por rodada. Ao clicar no botão, o jogo destaca temporariamente o elemento correto por **3 segundos**.

O uso da lupa custa **3 pontos**. Caso o jogador não tenha pontuação suficiente ou já tenha usado a lupa naquela rodada, o botão fica visualmente indisponível e o jogo exibe uma mensagem informando o motivo.

Além da Lupa de Fiscalização, o jogo possui um botão de Mais tempo, que permite ao jogador comprar mais **10 segundos** durante a rodada.

Esse recurso:

* custa 10 pontos;
* só pode ser usado uma vez por rodada;
* só funciona se o jogador tiver saldo suficiente.

Também foram implementadas mensagens de acerto, erro e fim do tempo que aparecem temporariamente na tela. Quando a mensagem é importante, a grade é ocultada por alguns segundos e o contador é pausado, para que o jogador consiga ler a mensagem sem perder tempo da rodada.

O jogo possui ranking com `localStorage`. Ao final da partida, a pontuação do jogador é salva no navegador e o ranking exibe os melhores resultados registrados localmente.

---

## Como jogar

1. Digite o nome do jogador.
2. Clique em **Jogar**.
3. Leia a missão do fiscal.
4. Observe a grade.
5. Clique no elemento que representa a irregularidade solicitada.
6. Use a **Lupa de Fiscalização** se precisar de ajuda.
7. Use **Mais tempo** se precisar de segundos extras.
8. Avance pelas 15 rodadas.
9. Ao final, confira sua pontuação e o ranking.

---

## Como executar

### Opção 1 — Abrir localmente

Em um navegador baixe ou clone o repositório e abra o arquivo:

```text
index.html
```

### Opção 2 — Pelo GitHub Pages

Acesse o projeto publicado em:

```text
https://emilha-mg.github.io/urban-inspection-game/
```
---

## Estrutura de arquivos

```text
urban-inspection-game/
├── index.html
├── README.md
├── LICENSE
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── images/
```
---

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript puro
* DOM
* localStorage
* Git e GitHub

Não foram utilizados frameworks ou bibliotecas externas.

---

## Funções principais do código

Algumas funções importantes do projeto são:

### `prepararRodada()`

Organiza uma nova rodada, define o nível, reinicia o tempo, escolhe a situação de vistoria e gera a grade.

### `verificarClique()`

Identifica se o jogador clicou na irregularidade correta ou em um item regular.

### `tratarAcerto()`

Aplica a pontuação do acerto, verifica bônus por rapidez e avança para a próxima rodada.

### `tratarErro()`

Desconta pontos, exibe orientação e mantém o jogador na mesma rodada.

### `usarLupa()`

Destaca temporariamente a irregularidade correta, descontando pontos do jogador.

### `comprarMaisTempo()`

Adiciona 10 segundos ao tempo da rodada, descontando 10 pontos.

---

## Reflexão obrigatória

### 1. Qual foi o bug mais chato e como resolveu?

Durante o desenvolvimento, um dos problemas encontrados foi o controle do tempo e das mensagens temporárias. O contador precisava parar enquanto uma mensagem importante era exibida, para que o jogador não perdesse segundos enquanto lia a orientação. A solução foi criar uma função específica para mensagens com pausa. Essa função para o contador, oculta temporariamente a grade, exibe a mensagem e depois retoma o jogo. Também foi necessário ajustar a grade para que ela crescesse verticalmente e não para os lados, porque em telas de celular o layout ficava apertado.

### 2. Por que escolheu essa fórmula de pontuação?

Escolhi uma fórmula equilibrada. O acerto soma 10 pontos, o erro desconta 5 pontos, e o acerto rápido dá bônus de 5 pontos. Assim, o jogador é recompensado por observar corretamente, mas não é punido de forma exagerada por errar. A Lupa e o botão Mais tempo têm custo porque são recursos de ajuda. Isso faz com que o jogador precise decidir se compensa gastar pontos para continuar com mais segurança.

### 3. Como o briefing do cliente mudou suas decisões?

Como o público-alvo escolhido foi pessoa idosa, evitei uma interface rápida demais ou com muitos elementos pequenos. Por isso, escolhi botões grandes, fonte maior, cores com bom contraste, mensagens explicativas e uma grade com apenas 3 colunas. Também fiz as mensagens principais aparecerem com pausa, para permitir leitura mais tranquila.

### 4. Se tivesse mais uma semana, o que mudaria?

Se tivesse mais uma semana, eu melhoraria a parte visual do jogo, substituindo alguns emojis por ícones próprios ou imagens simples, mantendo a acessibilidade. Também poderia adicionar sons leves para acerto e erro, uma tela inicial com explicação visual das regras e uma opção de escolher o nível de dificuldade.

---

## Declaração de uso de IA

Usei IA como apoio para organização das regras definidas, revisão da estrutura do código e escrita do README. A IA foi utilizada para auxiliar nas adaptações ao público-alvo e às regras definidas durante o desenvolvimento.

---

## Bônus implementados

### 1. Mecânica original

Foi implementada a **Lupa de Fiscalização**, que destaca temporariamente a irregularidade correta.

### 2. Responsividade

O jogo foi desenvolvido para funcionar em telas menores, com grade de 3 colunas, botões grandes e layout adaptável para celular.

---

## Licença

Este projeto está licenciado sob a licença MIT.

Consulte o arquivo `LICENSE` para mais detalhes.