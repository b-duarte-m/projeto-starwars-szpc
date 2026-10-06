const botoesCarrossel = document.querySelectorAll(".botao");
const imagens = document.querySelectorAll(".imagem");
const informacoes = document.querySelectorAll(".informacoes");
let indiceAtual = 0;

function selecionar(indice) {
    indiceAtual = (indice + botoesCarrossel.length) % botoesCarrossel.length;
    botoesCarrossel.forEach((botao, i) => {
        const ativo = i === indiceAtual;
        botao.classList.toggle("selecionado", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
        imagens[i].classList.toggle("ativa", ativo);
        imagens[i].hidden = !ativo;
        informacoes[i].classList.toggle("ativa", ativo);
        informacoes[i].hidden = !ativo;
    });
    document.getElementById("contador").innerHTML =
        String(indiceAtual + 1).padStart(2, "0") + ' <span>/ 09</span>';
}

botoesCarrossel.forEach((botao, indice) => {
    botao.addEventListener("click", () => selecionar(indice));
});
document.getElementById("anterior").addEventListener("click", () => selecionar(indiceAtual - 1));
document.getElementById("proximo").addEventListener("click", () => selecionar(indiceAtual + 1));
document.querySelector(".botoes-carrossel").addEventListener("keydown", evento => {
    const movimentos = { ArrowRight: 1, ArrowLeft: -1 };
    if (evento.key in movimentos) {
        evento.preventDefault();
        selecionar(indiceAtual + movimentos[evento.key]);
        botoesCarrossel[indiceAtual].focus();
    }
});

// Reserva a altura do maior texto para estabilizar os controles.
const painel = document.querySelector(".painel");

function ajustarAlturaPainel() {
    let maiorAltura = 0;

    informacoes.forEach(item => {
        const copia = item.cloneNode(true);
        copia.hidden = false;
        copia.classList.add("ativa");
        copia.setAttribute("aria-hidden", "true");
        copia.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;display:block;animation:none;width:" + painel.clientWidth + "px;";
        painel.appendChild(copia);
        maiorAltura = Math.max(maiorAltura, copia.getBoundingClientRect().height);
        copia.remove();
    });

    painel.style.minHeight = Math.ceil(maiorAltura) + "px";
}

let quadro;
window.addEventListener("resize", () => {
    cancelAnimationFrame(quadro);
    quadro = requestAnimationFrame(ajustarAlturaPainel);
});

selecionar(0);
ajustarAlturaPainel();
if (document.fonts) {
    document.fonts.ready.then(ajustarAlturaPainel);
}
