    const personagem = document.getElementById('personagem');
    const vidaDisplay = document.getElementById('vidaDisplay');
    const inimigo = document.getElementById('inimigo');
    let posicaoX = 0;  //posição inicial

    class Cavaleiro {
        constructor(vida, ataque, atacando) {
            this.vida = vida; 
            this.ataque = ataque;
            atacando = false;
        }
    
        atualizarVidaDisplay() {
            vidaDisplay.textContent = this.vida;
        }
    
        sofrerDano() {
            this.vida -= 2; 
            this.atualizarVidaDisplay(); 
        }
    }

    const cavaleiro = new Cavaleiro(10, 1, false);

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
        if (posicaoX <= 720 && (evento.key === 'd' || evento.key === 'D')) {
            moverDireita();
        } else if (posicaoX != 0 && (evento.key === 'a' || evento.key === 'A')) {
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

    document.addEventListener('keydown', function(evento){
        if(personagem.querySelector('img').classList.contains('Direita')){

            if(evento.key === 'j' || evento.key === 'J'){
            personagem.querySelector('img').classList.add('DireitaAtaque');
            cavaleiro.atacando = true;
            personagem.querySelector('img').classList.add('CavaleiroAtacando');
            personagem.querySelector('img').classList.remove('CavaleiroAndando');
            personagem.querySelector('img').classList.remove('Direita');
            personagem.querySelector('img').classList.remove('Esquerda');
        }   
        }

        if(personagem.querySelector('img').classList.contains('Esquerda')){

            if(evento.key === 'j' || evento.key === 'J'){
            personagem.querySelector('img').classList.add('EsquerdaAtaque');
            cavaleiro.atacando = true;
            personagem.querySelector('img').classList.add('CavaleiroAtacando');
            personagem.querySelector('img').classList.remove('CavaleiroAndando');
            personagem.querySelector('img').classList.remove('Direita');
            personagem.querySelector('img').classList.remove('Esquerda');
        }   
        }
            


            cavaleiro.sofrerDano();
    });

    document.addEventListener('keyup', function(evento) {
       
         
            if (evento.key === 'j' || evento.key === 'J') {
                setTimeout(function() {
                    personagem.querySelector('img').classList.remove('CavaleiroAtacando');
                    personagem.querySelector('img').classList.remove('EsquerdaAtaque');
                    personagem.querySelector('img').classList.remove('DireitaAtaque');
                    personagem.querySelector('img').classList.add('CavaleiroParado');
                }, 800);
            }
            personagem.querySelector('img').classList.add('Direita');


       
    });
    

