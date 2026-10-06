const botoesCarrossel = document.querySelectorAll(
    ".botoes-carrossel .botao"
);
const imagens = document.querySelectorAll(".carrossel .imagem");
const informacoes = document.querySelectorAll(".painel .informacoes");

const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");
const contador = document.getElementById("contador");
const seletor = document.querySelector(".botoes-carrossel");

const total = Math.min(
    botoesCarrossel.length,
    imagens.length,
    informacoes.length
);

let indiceAtual = 0;

function selecionar(indice) {
    if (total === 0) {
        return;
    }

    indiceAtual = ((indice % total) + total) % total;

    botoesCarrossel.forEach((botao, i) => {
        const ativo = i === indiceAtual;

        botao.classList.toggle("selecionado", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
    });

    imagens.forEach((imagem, i) => {
        const ativo = i === indiceAtual;

        imagem.classList.toggle("ativa", ativo);
        imagem.hidden = !ativo;
    });

    informacoes.forEach((informacao, i) => {
        const ativo = i === indiceAtual;

        informacao.classList.toggle("ativa", ativo);
        informacao.hidden = !ativo;
        informacao.setAttribute("aria-hidden", String(!ativo));
    });

    if (contador) {
        const atual = String(indiceAtual + 1).padStart(2, "0");
        const quantidade = String(total).padStart(2, "0");

        contador.replaceChildren(
            document.createTextNode(`${atual} `)
        );

        const complemento = document.createElement("span");
        complemento.textContent = `/ ${quantidade}`;

        contador.appendChild(complemento);
    }
}

botoesCarrossel.forEach((botao, indice) => {
    botao.addEventListener("click", () => {
        selecionar(indice);
    });
});

anterior?.addEventListener("click", () => {
    selecionar(indiceAtual - 1);
});

proximo?.addEventListener("click", () => {
    selecionar(indiceAtual + 1);
});

seletor?.addEventListener("keydown", evento => {
    const botao = evento.target.closest(".botao");

    if (!botao || total === 0) {
        return;
    }

    const indiceFocado = Array.from(botoesCarrossel).indexOf(botao);
    let destino;

    switch (evento.key) {
        case "ArrowRight":
            destino = indiceFocado + 1;
            break;

        case "ArrowLeft":
            destino = indiceFocado - 1;
            break;

        case "Home":
            destino = 0;
            break;

        case "End":
            destino = total - 1;
            break;

        default:
            return;
    }

    evento.preventDefault();

    selecionar(destino);
    botoesCarrossel[indiceAtual].focus({
        preventScroll: true
    });
});

const indiceInicial = Array.from(botoesCarrossel).findIndex(
    botao => botao.classList.contains("selecionado")
);

selecionar(indiceInicial >= 0 ? indiceInicial : 0);
