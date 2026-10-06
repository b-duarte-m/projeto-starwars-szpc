const botoesCarrossel = document.querySelectorAll(".botao");
const imagens = document.querySelectorAll(".imagem");
const informacoes = document.querySelectorAll(".informacoes");
const musica = document.getElementById("musicaFundo");
const som = document.getElementById("som");
const statusSom = document.getElementById("status-som");
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

function atualizarSom() {
    const tocando = !musica.paused;
    som.setAttribute("aria-pressed", String(tocando));
    som.textContent = tocando ? "Pausar música" : "Ativar música";
}
som.addEventListener("click", async () => {
    statusSom.textContent = "";
    som.disabled = true;
    try {
        if (musica.paused) {
            musica.volume = 0.35;
            await musica.play();
        } else {
            musica.pause();
        }
    } catch {
        statusSom.textContent = "Não foi possível tocar a música. Confira o arquivo de áudio.";
    } finally {
        atualizarSom();
        som.disabled = false;
    }
});
musica.addEventListener("play", atualizarSom);
musica.addEventListener("pause", atualizarSom);
selecionar(0);
