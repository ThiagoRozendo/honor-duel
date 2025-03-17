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

    class Inimigo {
        constructor(vida, ataque, atacando, defendendo){
            this.vida = vida; 
            this.ataque = ataque;
            atacando = false;
            defendendo = true;
        }

        atualizarVidaInimigoDisplay() {
            vidaInimigoDisplay.textContent = this.vida;
        }

        sofrerDanoInimigo(dano) {
            this.vida -= dano; 
            this.atualizarVidaInimigoDisplay(); 
        }
    }

    const cavaleiro = new Cavaleiro(10, 1, false);
    cavaleiro.atualizarVidaDisplay();
    
    const inimigo2 = new Inimigo(20, 2, false, true);
    inimigo2.atualizarVidaInimigoDisplay();

    

    const distanciaMovimento = 5; //Distancia do movimento do cavaleiro
    const distanciaMovimentoInimigo = 3; //Distancia do monivmento do inimigo

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

    //atacar
    document.addEventListener('keydown', function(evento){
            if(!cavaleiro.atacando && (evento.key === 'j' || evento.key === 'J')){
                cavaleiro.atacando = true;
                personagem.querySelector('img').classList.add('DireitaAtaque');
                personagem.querySelector('img').classList.add('CavaleiroAtacando');
                personagem.querySelector('img').classList.remove('CavaleiroAndando');
                personagem.querySelector('img').classList.remove('Direita');
                personagem.querySelector('img').classList.remove('Esquerda');

                setTimeout(function() {
                    personagem.querySelector('img').classList.add('CavaleiroParado');
                    personagem.querySelector('img').classList.remove('CavaleiroAtacando');
                    personagem.querySelector('img').classList.remove('DireitaAtaque');
                    
                        if (calcularDistancia(inimigo, personagem) <= 55 && calcularDistancia(inimigo, personagem) >= 50) {
                            inimigo2.sofrerDanoInimigo(cavaleiro.ataque);
                        }     
                        else if (calcularDistancia(inimigo, personagem) < 50) {
                            inimigo2.sofrerDanoInimigo(cavaleiro.ataque + 1);
                        } 

                        cavaleiro.atacando = false;
                }, 600);
            }   
        });
        
        
       
    function calcularDistancia(div1, div2) {
        const rect1 = div1.getBoundingClientRect();
        const rect2 = div2.getBoundingClientRect();
    
        //calcula a distancia entre as duas divs
        return Math.abs(rect1.left - rect2.left);
    }

    setInterval(() => {
        if (calcularDistancia(inimigo, personagem) < 40) {
            cavaleiro.sofrerDano();
            posicaoX -= 20; 
            personagem.style.transform = `translateX(${posicaoX}px)`;
    
            //aplica um filtro pro dano
            personagem.querySelector('img').style.filter = "brightness(0)";
    
            setTimeout(() => {
                personagem.querySelector('img').style.filter = "";
            }, 150);
        }
    }, 100);
    
    
    
    

