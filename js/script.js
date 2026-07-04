// Objeto criado para organização das configurações principais
const CONFIGURACAO_JOGO = {
    PONTUACAO_INICIAL: 25,
    TOTAL_RODADAS: 15,
    TEMPO_INICIAL: 20,
    PONTOS_ACERTO: 10,
    PONTOS_ERRO: 5,
    PONTOS_FIM_TEMPO: 10,
    PONTOS_DICA: 3,
    PONTOS_MAIS_TEMPO: 10,
    BONUS_ACERTO_RAPIDO: 5,
    TEMPO_BONUS: 10,
    TEMPO_EXTRA: 10,
    TEMPO_DESTAQUE_LUPA: 3000,
    TEMPO_AVISO_CURTO: 3000,
    TEMPO_AVISO_PAUSADO: 5000,
    CHAVE_RANKING: "rankingVistoriaUrbana"
};

// Objeto para guardar os elementos do HTML que serão manipulados pelo JavaScript
const elementos = {
    areaInicio: document.getElementById("areaInicio"),
    areaJogo: document.getElementById("areaJogo"),
    areaResultado: document.getElementById("areaResultado"),

    nomeJogador: document.getElementById("nomeJogador"),
    botaoJogar: document.getElementById("botaoJogar"),
    botaoJogarNovamente: document.getElementById("botaoJogarNovamente"),

    rodadaAtual: document.getElementById("rodadaAtual"),
    nivelAtual: document.getElementById("nivelAtual"),
    pontuacaoAtual: document.getElementById("pontuacaoAtual"),
    tempoAtual: document.getElementById("tempoAtual"),
    caixaTempo: document.getElementById("caixaTempo"),

    textoOrientacao: document.getElementById("textoOrientacao"),
    mensagemInicio: document.getElementById("mensagemInicio"),
    avisoJogo: document.getElementById("avisoJogo"),
    gridJogo: document.getElementById("gridJogo"),

    botaoLupa: document.getElementById("botaoLupa"),
    botaoMaisTempo: document.getElementById("botaoMaisTempo"),

    resumoResultado: document.getElementById("resumoResultado"),
    listaRanking: document.getElementById("listaRanking")
};

// Possíveis situações de irregularidades ligadas à fiscalização urbana 
const situacoesVistoria = [
    {
        correto: "🏡",
        irregular: "🌾",
        orientacao: "Encontre o lote com mato alto que precisa de limpeza."
    },
    {
        correto: "🚶",
        irregular: "🚧",
        orientacao: "Encontre a calçada obstruída que dificulta a passagem."
    },
    {
        correto: "🛣️",
        irregular: "🗑️",
        orientacao: "Encontre o ponto com descarte irregular de lixo."
    },
    {
        correto: "🏠",
        irregular: "🧱",
        orientacao: "Encontre a obra com indício de construção irregular."
    },
    {
        correto: "🛣️",
        irregular: "💧",
        orientacao: "Encontre o local com vazamento de água na rua."
    },
    {
        correto: "🏪",
        irregular: "📢",
        orientacao: "Encontre o estabelecimento com publicidade irregular."
    },
    {
        correto: "🏡",
        irregular: "🐍",
        orientacao: "Encontre o lote abandonado que pode oferecer risco à vizinhança."
    },
    {
        correto: "♿",
        irregular: "🚗",
        orientacao: "Encontre o veículo ocupando área de passagem."
    },
    {
        correto: "🏘️",
        irregular: "🔊",
        orientacao: "Encontre o ponto com perturbação sonora."
    },
    {
        correto: "🟩",
        irregular: "🔥",
        orientacao: "Encontre o ponto com indício de incêndio."
    },
    {
        correto: "🚧",
        irregular: "🧱",
        orientacao: "Encontre a obra sem sinalização adequada."
    },
    {
        correto: "🏠",
        irregular: "🏚️",
        orientacao: "Encontre o imóvel sem manutenção aparente."
    },
    {
        correto: "🕳️",
        irregular: "🍂",
        orientacao: "Encontre o bueiro obstruído por sujeira ou folhas."
    },
    {
        correto: "🟩",
        irregular: "🧱",
        orientacao: "Encontre o lote com material de construção depositado irregularmente."
    },
    {
        correto: "🏬",
        irregular: "🛒",
        orientacao: "Encontre a atividade comercial ocupando área pública indevidamente."
    }
];

// Objeto que controla o estado do jogo
let estadoJogo = {
    nomeJogador: "",
    rodada: 1,
    nivel: 1,
    pontuacao: CONFIGURACAO_JOGO.PONTUACAO_INICIAL,
    tempoRestante: CONFIGURACAO_JOGO.TEMPO_INICIAL,
    tempoDecorrido: 0,
    lupaUsada: false,
    tempoExtraUsado: false,
    situacaoAtual: null,
    posicaoIrregular: null,
    intervaloTempo: null,
    rodadaFinalizada: false,
    situacoesDaPartida: [],
    temporizadorAviso: null
};

// Função para validar o nome do jogador, pré-requisito para começar o jogo
function iniciarJogo() {
    const nomeDigitado = elementos.nomeJogador.value.trim();

    if (nomeDigitado === "") {
        mostrarAvisoInicio("Digite seu nome para começar a vistoria.");
        return;
    }

    estadoJogo = {
        nomeJogador: nomeDigitado,
        rodada: 1,
        nivel: 1,
        pontuacao: CONFIGURACAO_JOGO.PONTUACAO_INICIAL,
        tempoRestante: CONFIGURACAO_JOGO.TEMPO_INICIAL,
        tempoDecorrido: 0,
        lupaUsada: false,
        tempoExtraUsado: false,
        situacaoAtual: null,
        posicaoIrregular: null,
        intervaloTempo: null,
        rodadaFinalizada: false,
        situacoesDaPartida: embaralharSituacoes(),
        temporizadorAviso: null
    };

    elementos.areaInicio.classList.add("oculto");
    elementos.areaResultado.classList.add("oculto");
    elementos.areaJogo.classList.remove("oculto");

    prepararRodada();
}

// Função de preparação de cada rodada
function prepararRodada() {
    pararContador();

    const configuracaoNivel = obterConfiguracaoNivel();

    estadoJogo.nivel = configuracaoNivel.nivel;
    estadoJogo.tempoRestante = CONFIGURACAO_JOGO.TEMPO_INICIAL;
    estadoJogo.tempoDecorrido = 0;
    estadoJogo.lupaUsada = false;
    estadoJogo.tempoExtraUsado = false;
    estadoJogo.rodadaFinalizada = false;
    estadoJogo.situacaoAtual = estadoJogo.situacoesDaPartida[estadoJogo.rodada - 1];

    elementos.textoOrientacao.textContent = estadoJogo.situacaoAtual.orientacao;

    gerarGrid(configuracaoNivel);
    atualizarPainel();
    atualizarBotoesControle();
    iniciarContador();

    mostrarAvisoJogo("Nova missão: encontre a irregularidade indicada.", "aviso");
}

// Função para controlar o nível, visando a compatibilidade com celular foi definida 3 colunas fixas
// Assim os níveis maiores aumentam o número de linhas, não de colunas
function obterConfiguracaoNivel() {
    if (estadoJogo.rodada <= 5) {
        return {
            nivel: 1,
            linhas: 3,
            colunas: 3
        };
    }

    if (estadoJogo.rodada <= 10) {
        return {
            nivel: 2,
            linhas: 4,
            colunas: 3
        };
    }

    return {
        nivel: 3,
        linhas: 5,
        colunas: 3
    };
}

// Função para embaralhar as situações para cada partida
function embaralharSituacoes() {
    const copiaSituacoes = [...situacoesVistoria];

    for (let indice = copiaSituacoes.length - 1; indice > 0; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * (indice + 1));
        const situacaoTemporaria = copiaSituacoes[indice];

        copiaSituacoes[indice] = copiaSituacoes[indiceAleatorio];
        copiaSituacoes[indiceAleatorio] = situacaoTemporaria;
    }

    return copiaSituacoes;
}

// Função para gerar a grade do jogo
function gerarGrid(configuracaoNivel) {
    const totalCelulas = configuracaoNivel.linhas * configuracaoNivel.colunas;

    estadoJogo.posicaoIrregular = Math.floor(Math.random() * totalCelulas);

    elementos.gridJogo.replaceChildren();
    elementos.gridJogo.style.gridTemplateColumns = `repeat(${configuracaoNivel.colunas}, auto)`;

    for (let indice = 0; indice < totalCelulas; indice++) {
        const celula = document.createElement("button");
        const ehIrregular = indice === estadoJogo.posicaoIrregular;

        celula.type = "button";
        celula.classList.add("celula");
        celula.dataset.irregular = ehIrregular ? "true" : "false";
        celula.setAttribute("aria-label", "Item da vistoria urbana");

        if (ehIrregular) {
            celula.textContent = estadoJogo.situacaoAtual.irregular;
        } else {
            celula.textContent = estadoJogo.situacaoAtual.correto;
        }

        celula.addEventListener("click", verificarClique);
        elementos.gridJogo.appendChild(celula);
    }
}

// Função para verificar a opção selcionada no grid
function verificarClique(evento) {
    if (estadoJogo.rodadaFinalizada) {
        return;
    }

    const celulaClicada = evento.currentTarget;
    const acertou = celulaClicada.dataset.irregular === "true";

    if (acertou) {
        tratarAcerto();
    } else {
        tratarErro();
    }

    atualizarPainel();
    atualizarBotoesControle();
}

// Função ativada quando o jogador seleciona a irregularidade (acerto)
function tratarAcerto() {
    estadoJogo.rodadaFinalizada = true;
    estadoJogo.pontuacao += CONFIGURACAO_JOGO.PONTOS_ACERTO;

    pararContador();
    desativarCelulas();

    let mensagemAcerto = "";

    if (estadoJogo.tempoDecorrido <= CONFIGURACAO_JOGO.TEMPO_BONUS) {
        estadoJogo.pontuacao += CONFIGURACAO_JOGO.BONUS_ACERTO_RAPIDO;

        mensagemAcerto =
            "Bom trabalho! Você encontrou a irregularidade, ganhou 10 pontos pelo acerto e mais 5 pontos de bônus por rapidez.";
    } else {
        mensagemAcerto =
            "Bom trabalho! Você encontrou a irregularidade, ganhou 10 pontos e contribuiu para uma cidade mais limpa, segura e organizada.";
    }

    atualizarPainel();
    atualizarBotoesControle();

    mostrarAvisoComPausa(
        mensagemAcerto,
        "sucesso",
        CONFIGURACAO_JOGO.TEMPO_AVISO_PAUSADO,
        avancarRodada
    );
}

// Função ativada quando o jogador não seleciona a irregularidade (erro)
function tratarErro() {
    estadoJogo.pontuacao -= CONFIGURACAO_JOGO.PONTOS_ERRO;

    if (estadoJogo.pontuacao <= 0) {
        estadoJogo.pontuacao = 0;
        atualizarPainel();
        finalizarJogo("Fim da vistoria. Sua pontuação chegou a zero após um erro.");
        return;
    }

    atualizarPainel();
    atualizarBotoesControle();

    mostrarAvisoComPausa(
        `Você perdeu 5 pontos. Procure a irregularidade: ${estadoJogo.situacaoAtual.orientacao}`,
        "erro",
        CONFIGURACAO_JOGO.TEMPO_AVISO_PAUSADO
    );
}

// Função para avançar para a próxima rodada
function avancarRodada() {
    if (estadoJogo.rodada >= CONFIGURACAO_JOGO.TOTAL_RODADAS) {
        finalizarJogo("Parabéns! Você concluiu todas as vistorias.");
        return;
    }

    estadoJogo.rodada++;
    prepararRodada();
}

// Função para controlar o tempo de cada rodada
function iniciarContador() {
    pararContador();

    estadoJogo.intervaloTempo = setInterval(function () {
        estadoJogo.tempoRestante--;
        estadoJogo.tempoDecorrido++;

        atualizarPainel();

        if (estadoJogo.tempoRestante <= 0) {
            tratarFimDoTempo();
        }
    }, 1000);
}

// Função para controlar o tempo de cada rodada ao inicio de uma nova rodada
function pararContador() {
    if (estadoJogo.intervaloTempo !== null) {
        clearInterval(estadoJogo.intervaloTempo);
        estadoJogo.intervaloTempo = null;
    }
}

// Função para controlar o encerramento do tempo de cada rodada sem acertar a irregularidade
function tratarFimDoTempo() {
    pararContador();

    if (estadoJogo.rodadaFinalizada) {
        return;
    }

    estadoJogo.rodadaFinalizada = true;
    desativarCelulas();

    if (estadoJogo.pontuacao < CONFIGURACAO_JOGO.PONTOS_FIM_TEMPO) {
        estadoJogo.pontuacao = 0;
        atualizarPainel();
        finalizarJogo("Fim do tempo. Você não tinha pontos suficientes para continuar.");
        return;
    }

    estadoJogo.pontuacao -= CONFIGURACAO_JOGO.PONTOS_FIM_TEMPO;
    atualizarPainel();
    atualizarBotoesControle();

    mostrarAvisoComPausa(
        "Fim do tempo. Você perdeu 10 pontos e repetirá esta rodada.",
        "aviso",
        CONFIGURACAO_JOGO.TEMPO_AVISO_PAUSADO,
        prepararRodada
    );

    setTimeout(prepararRodada, 2300);
}

// Função para desconto da pontuação quando usado o recurso da lupa de fiscalização
function usarLupa() {
    if (estadoJogo.rodadaFinalizada) {
        mostrarAvisoJogo("A rodada já foi finalizada. Aguarde a próxima missão.", "aviso");
        return;
    }

    if (estadoJogo.lupaUsada) {
        mostrarAvisoJogo("A Lupa de Fiscalização já foi usada nesta rodada.", "aviso");
        return;
    }

    if (estadoJogo.pontuacao < CONFIGURACAO_JOGO.PONTOS_DICA) {
        mostrarAvisoJogo("Você não tem pontuação suficiente para usar a lupa.", "aviso");
        return;
    }

    estadoJogo.pontuacao -= CONFIGURACAO_JOGO.PONTOS_DICA;
    estadoJogo.lupaUsada = true;

    const celulaCorreta = elementos.gridJogo.querySelector('[data-irregular="true"]');

    if (celulaCorreta) {
        celulaCorreta.classList.add("destaque-lupa");

        setTimeout(function () {
            celulaCorreta.classList.remove("destaque-lupa");
        }, CONFIGURACAO_JOGO.TEMPO_DESTAQUE_LUPA);
    }

    atualizarPainel();
    atualizarBotoesControle();

    mostrarAvisoJogo(
        "Mais tempo acionado: você ganhou 10 segundos e perdeu 10 pontos.",
        "aviso",
        CONFIGURACAO_JOGO.TEMPO_AVISO_CURTO
    );
}

// Função para controlar apção de tempo adicional
function comprarMaisTempo() {
    if (estadoJogo.rodadaFinalizada) {
        mostrarAvisoJogo("A rodada já foi finalizada. Aguarde a próxima missão.", "aviso");
        return;
    }

    if (estadoJogo.tempoExtraUsado) {
        mostrarAvisoJogo("O recurso Mais tempo já foi usado nesta rodada.", "aviso");
        return;
    }

    if (estadoJogo.pontuacao < CONFIGURACAO_JOGO.PONTOS_MAIS_TEMPO) {
        mostrarAvisoJogo("Você não tem pontuação suficiente para comprar mais tempo.", "aviso");
        return;
    }

    estadoJogo.pontuacao -= CONFIGURACAO_JOGO.PONTOS_MAIS_TEMPO;
    estadoJogo.tempoRestante += CONFIGURACAO_JOGO.TEMPO_EXTRA;
    estadoJogo.tempoExtraUsado = true;

    atualizarPainel();
    atualizarBotoesControle();

    mostrarAvisoJogo("Você ganhou mais 10 segundos e perdeu 10 pontos.", "aviso");
}

// Função de ocultar o grid para exibição de mensagem temporária
function esconderGrid() {
    elementos.gridJogo.classList.add("oculto-temporario");
}

// Função para exibição do grid
function mostrarGrid() {
    elementos.gridJogo.classList.remove("oculto-temporario");
}

// Função para exibição da mensagem temporaria e pausar a rodada por alguns segundos durante a mensagem
function mostrarAvisoComPausa(texto, tipo, duracao, acaoDepois) {
    pararContador();
    esconderGrid();

    mostrarAvisoJogo(texto, tipo, duracao);

    setTimeout(function () {
        mostrarGrid();

        if (typeof acaoDepois === "function") {
            acaoDepois();
            return;
        }

        if (!estadoJogo.rodadaFinalizada) {
            iniciarContador();
        }
    }, duracao);
}

// Função para atualizar os dados do jogo
function atualizarPainel() {
    elementos.rodadaAtual.textContent = estadoJogo.rodada;
    elementos.nivelAtual.textContent = estadoJogo.nivel;
    elementos.pontuacaoAtual.textContent = estadoJogo.pontuacao;
    elementos.tempoAtual.textContent = estadoJogo.tempoRestante;

    atualizarVisualTempo();
}

// Função de alerta visual para avanço do tempo de cada rodada
function atualizarVisualTempo() {
    elementos.caixaTempo.classList.remove("atencao", "critico");

    if (estadoJogo.tempoRestante <= 5) {
        elementos.caixaTempo.classList.add("critico");
        return;
    }

    if (estadoJogo.tempoRestante <= 10) {
        elementos.caixaTempo.classList.add("atencao");
    }
}

// Função para atualização das disponibiliade dos botões
function atualizarBotoesControle() {
    atualizarEstadoBotaoControle(
        elementos.botaoLupa,
        estadoJogo.lupaUsada || estadoJogo.pontuacao < CONFIGURACAO_JOGO.PONTOS_DICA || estadoJogo.rodadaFinalizada
    );

    atualizarEstadoBotaoControle(
        elementos.botaoMaisTempo,
        estadoJogo.tempoExtraUsado || estadoJogo.pontuacao < CONFIGURACAO_JOGO.PONTOS_MAIS_TEMPO || estadoJogo.rodadaFinalizada
    );
}

// Função para atualizar os botões
function atualizarEstadoBotaoControle(botao, indisponivel) {
    if (indisponivel) {
        botao.classList.add("indisponivel");
        botao.setAttribute("aria-disabled", "true");
    } else {
        botao.classList.remove("indisponivel");
        botao.setAttribute("aria-disabled", "false");
    }
}

// Função para desativar as células quando a rodada termina para evitar cliques repetidos
function desativarCelulas() {
    const celulas = elementos.gridJogo.querySelectorAll(".celula");

    celulas.forEach(function (celula) {
        celula.disabled = true;
    });
}

// Função para mostrar os avisos ao longo das partidas
function mostrarAvisoJogo(texto, tipo = "aviso", duracao = CONFIGURACAO_JOGO.TEMPO_AVISO) {
    mostrarAviso(elementos.avisoJogo, texto, tipo, duracao);
}

// Função para mensagem temporária na tela inicial
function mostrarAvisoInicio(texto) {
    mostrarAviso(elementos.mensagemInicio, texto, "aviso", CONFIGURACAO_JOGO.TEMPO_AVISO);
}

// Função para organização da exibição dos avisos
function mostrarAviso(elemento, texto, tipo, duracao) {
    elemento.textContent = texto;
    elemento.classList.remove("oculto", "sucesso", "erro", "aviso");
    elemento.classList.add(tipo);

    if (estadoJogo.temporizadorAviso !== null) {
        clearTimeout(estadoJogo.temporizadorAviso);
    }

    estadoJogo.temporizadorAviso = setTimeout(function () {
        elemento.classList.add("oculto");
        elemento.textContent = "";
        elemento.classList.remove("sucesso", "erro", "aviso");
    }, duracao);
}

// Função para exibir a tela de resultado 
function finalizarJogo(motivo) {
    pararContador();

    estadoJogo.rodadaFinalizada = true;

    elementos.areaJogo.classList.add("oculto");
    elementos.areaResultado.classList.remove("oculto");

    elementos.resumoResultado.textContent =
        `${motivo} ${estadoJogo.nomeJogador}, sua pontuação final foi ${estadoJogo.pontuacao} pontos.`;

    salvarRanking();
    mostrarRanking();
}

// Função para salvar o ranking localmente
function salvarRanking() {
    const ranking = obterRanking();

    ranking.push({
        nome: estadoJogo.nomeJogador,
        pontuacao: estadoJogo.pontuacao,
        data: new Date().toLocaleDateString("pt-BR")
    });

    ranking.sort(function (jogadorA, jogadorB) {
        return jogadorB.pontuacao - jogadorA.pontuacao;
    });

    const melhoresResultados = ranking.slice(0, 5);

    localStorage.setItem(
        CONFIGURACAO_JOGO.CHAVE_RANKING,
        JSON.stringify(melhoresResultados)
    );
}

// Função de recuperação do ranking
function obterRanking() {
    const rankingSalvo = localStorage.getItem(CONFIGURACAO_JOGO.CHAVE_RANKING);

    if (!rankingSalvo) {
        return [];
    }

    return JSON.parse(rankingSalvo);
}

// Função para exibir ranking
function mostrarRanking() {
    const ranking = obterRanking();

    elementos.listaRanking.replaceChildren();

    if (ranking.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nenhuma pontuação registrada ainda.";
        elementos.listaRanking.appendChild(item);
        return;
    }

    ranking.forEach(function (resultado) {
        const item = document.createElement("li");

        item.textContent =
            `${resultado.nome} - ${resultado.pontuacao} pontos - ${resultado.data}`;

        elementos.listaRanking.appendChild(item);
    });
}

// Eventos principais do jogo.
elementos.botaoJogar.addEventListener("click", iniciarJogo);
elementos.botaoJogarNovamente.addEventListener("click", iniciarJogo);
elementos.botaoLupa.addEventListener("click", usarLupa);
elementos.botaoMaisTempo.addEventListener("click", comprarMaisTempo);