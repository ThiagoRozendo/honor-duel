    const personagem = document.getElementById('personagem');
    let posicaoX = 0;  //posição inicial

    //tamanho do movimento
    const distanciaMovimento = 3;

    //mover pra direita
    function moverDireita() {
        posicaoX += distanciaMovimento;
        personagem.style.transform = `translateX(${posicaoX}px)`;
        personagem.querySelector('img').classList.remove('Esquerda');
        personagem.querySelector('img').classList.add('Direita');
        personagem.querySelector('img').classList.add('CavaleiroAndando');
    }

    //mover pra esquerda
    function moverEsquerda() {
        posicaoX -= distanciaMovimento;
        personagem.style.transform = `translateX(${posicaoX}px)`;  
        personagem.querySelector('img').classList.remove('Direita');
        personagem.querySelector('img').classList.add('Esquerda');
        personagem.querySelector('img').classList.add('CavaleiroAndando');
    }

    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'd' || evento.key === 'D' ) {
            moverDireita();
        } else if (  posicaoX != 0 && evento.key === 'a' || evento.key === 'A') {
            moverEsquerda();
        }
    });

    document.addEventListener('keyup', function(evento) {
        if (evento.key === 'd' || evento.key === 'D') {
            personagem.querySelector('img').classList.remove('CavaleiroAndando');
        } else if (evento.key === 'a' || evento.key === 'A') {
            personagem.querySelector('img').classList.remove('CavaleiroAndando');
        }
    });

