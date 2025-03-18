    const personagem = document.getElementById('personagem');
    const vidaDisplay = document.getElementById('vidaDisplay');
    const inimigo = document.getElementById('inimigo');
    const sfxAtaqueGuarda = document.getElementById('sfxAtaqueGuarda');
    const sfxAtaque = document.getElementById('sfxAtaque');
    const soundtrack = document.getElementById('soundTrack')

    let posicaoX = 0;  //posição inicial
    let posicaoXInimigo = 0;  //posição inicial
    

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
            
            if (this.vida <= 0) {
                this.mostrarTelaMorte();
            }
        }

        mostrarTelaMorte() {
            const telaMorte = document.getElementById('telaMorte');
            telaMorte.style.display = 'flex';
        }
    }
    

    class Inimigo {
        constructor(vida, ataque, atacando, defendendo){
            this.vida = vida; 
            this.ataque = ataque;
            this.atacando = false;
            this.defendendo = true;
        }

        atualizarVidaInimigoDisplay() {
            vidaInimigoDisplay.textContent = this.vida;
        }

        sofrerDanoInimigo(dano) {
            this.vida -= dano; 
            this.atualizarVidaInimigoDisplay();   

            if(this.vida <= 0){
                this.mostrarTelaVenceu();
            }
        }

        mostrarTelaVenceu(){
            const telaVenceu = document.getElementById('telaVenceu');
            telaVenceu.style.display = 'flex';
        }
}

//funcao pra reiniciar o jogo
function reiniciarJogo() {
    location.reload(); 
}

//instanciando
    const cavaleiro = new Cavaleiro(10, 1, false);
    cavaleiro.atualizarVidaDisplay();
    
    const inimigo2 = new Inimigo(15, 2, false, true);
    inimigo2.atualizarVidaInimigoDisplay();
    
    const distanciaMovimento = 10; //distancia do movimento do cavaleiro
    const distanciaMovimentoInimigo = 20; //distancia do monivmento do inimigo

    //tocar musica de fundo
    function tocarSundtrack(){
        soundtrack.loop = true;
        soundtrack.volume = 0.5;
        soundtrack.play();
    }
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
        //primeira parte do ataque
            if(!cavaleiro.atacando && (evento.key === 'j' || evento.key === 'J')){
                cavaleiro.atacando = true;
                personagem.querySelector('img').classList.add('DireitaAtaque');
                personagem.querySelector('img').classList.add('CavaleiroAtacando');
                personagem.querySelector('img').classList.remove('CavaleiroAndando');
                personagem.querySelector('img').classList.remove('Direita');
                personagem.querySelector('img').classList.remove('Esquerda');

            //segunda parte do ataque (efetivaçao)
                setTimeout(function() {
                    personagem.querySelector('img').classList.add('CavaleiroParado');
                    personagem.querySelector('img').classList.remove('CavaleiroAtacando');
                    personagem.querySelector('img').classList.remove('DireitaAtaque');
                    
                        if (!inimigo2.defendendo && (calcularDistancia(inimigo, personagem) <= 60 && calcularDistancia(inimigo, personagem) >= 55)) {
                            inimigo2.sofrerDanoInimigo(cavaleiro.ataque);
                            inimigo.querySelector('img').style.filter = "brightness(0)";
                            setTimeout(() => {
                                inimigo.querySelector('img').style.filter = "";
                            }, 150);
                            sfxAtaque.play();

                        }     
                        else if (!inimigo2.defendendo && (calcularDistancia(inimigo, personagem) < 55)) {
                            inimigo2.sofrerDanoInimigo(cavaleiro.ataque + 1);
                            inimigo.querySelector('img').style.filter = "brightness(0)";
                            setTimeout(() => {
                                inimigo.querySelector('img').style.filter = "";
                            }, 150);
                            sfxAtaque.play();

                        }
                        else if(inimigo2.defendendo && (calcularDistancia(inimigo, personagem) <= 60 && calcularDistancia(inimigo, personagem) < 55)){
                            sfxAtaqueGuarda.play();
                        } 

                        cavaleiro.atacando = false;
                }, 200);
            }   
        });
        
        
    //funcao pra calcular distancia entre as divs (vc e o inimigo neste caso) 
    function calcularDistancia(div1, div2) {
        const rect1 = div1.getBoundingClientRect();
        const rect2 = div2.getBoundingClientRect();
    
        //calcula a distancia entre as duas divs
        return Math.abs(rect1.left - rect2.left);
    }

    //caso o cavaleiro se aproxime demais do inimigo
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
    
    //movimentacao e ataque do inimigo
    setInterval(() => {

        if( (calcularDistancia(inimigo, personagem) > 70)){//movimentacao
            moverEsquerdaInimigo();
        }
        else if(!inimigo2.atacando){//ataque
            inimigo.querySelector('img').classList.remove('InimigoAndando');

            //primeira parte do ataque
            setTimeout(function() {
            inimigo2.atacando = true;
            inimigo.querySelector('img').classList.add('InimigoAtacando');
            inimigo2.defendendo = false;
            
            //segunda parte do ataque (efetivacao)
            setTimeout(function() {
                inimigo.querySelector('img').classList.remove('InimigoAtacando');
                inimigo.querySelector('img').classList.add('InimigoAtacou');
                if(calcularDistancia(inimigo, personagem) <= 50){
                    cavaleiro.sofrerDano(inimigo2.ataque);
                    sfxAtaque.play();
                }
                inimigo2.defendendo = true;
                
                setTimeout(function() {
                    inimigo.querySelector('img').classList.remove('InimigoAtacou');
                    inimigo.querySelector('img').classList.add('InimigoAndando');
                    inimigo2.atacando = false;
                }, 800);
            },1000);
        }, 1800);
        }
    }, 1900);
    
    
    
    

