document.addEventListener('DOMContentLoaded', function() {
    const personagem = document.getElementById('personagem');
    let posX = 0;  // Posição inicial do personagem

    // Tamanho do movimento (em pixels)
    const moveDistance = 3;

    // Função para mover para a direita
    function moveRight() {
        posX += moveDistance;
        personagem.style.transform = `translateX(${posX}px)`;  // Move o personagem para a direita
        personagem.querySelector('img').classList.remove('Esquerda');
        personagem.querySelector('img').classList.add('Direita');
        personagem.querySelector('img').classList.add('CavaleiroAndando');
    }

    // Função para mover para a esquerda
    function moveLeft() {
        posX -= moveDistance;
        personagem.style.transform = `translateX(${posX}px)`;  // Move o personagem para a esquerda
        personagem.querySelector('img').classList.remove('Direita');
        personagem.querySelector('img').classList.add('Esquerda');
        personagem.querySelector('img').classList.add('CavaleiroAndando');
    }

    // Detecta a tecla pressionada
    document.addEventListener('keydown', function(event) {
        if (event.key === 'd' || event.key === 'D') {
            moveRight();
        } else if (event.key === 'a' || event.key === 'A') {
            moveLeft();
        }
    });

    // Evento quando a tecla é liberada (keyup) - opcional, caso queira parar o movimento
    document.addEventListener('keyup', function(event) {
        // Aqui você pode parar a animação, caso seja necessário
        
        // Exemplo: remover as classes de movimento, mas manter a posição
        if (event.key === 'd' || event.key === 'D') {
            personagem.querySelector('img').classList.remove('CavaleiroAndando');
            // Poderia adicionar lógica para parar ou ajustar a animação
        } else if (event.key === 'a' || event.key === 'A') {
            personagem.querySelector('img').classList.remove('CavaleiroAndando');
            
            // Poderia adicionar lógica para parar ou ajustar a animação
        }
    });


});
