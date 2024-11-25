let listaNumerosSorteados = [];
let limiteMax = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas =1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto 2.0');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10',{rate: 1.2});
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute==numeroSecreto) {
        let tentativaMensagem = tentativas > 1 ? 'vezes' : 'vez';
        let tentativaPalavra = `você descobriu meu mano, e tentou ${tentativas} ${tentativaMensagem}`;
        exibirTextoNaTela('h1','acerto miseravi');
        exibirTextoNaTela('p', tentativaPalavra);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute>numeroSecreto) {
            exibirTextoNaTela('p','O numero é menor');
        } else {
            exibirTextoNaTela('p','O numero é maior');
        }
        tentativas++
        limparCampo()
        
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteMax + 1);
    let quantidadeElementos = listaNumerosSorteados.length;
    if (quantidadeElementos == limiteMax) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido)
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }

}

function limparCampo() {
    chute=document.querySelector('input');
    chute.value = '' ;        
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}