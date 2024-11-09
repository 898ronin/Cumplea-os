const canvasConfeti = document.createElement('canvas');
canvasConfeti.style.position = 'fixed';
canvasConfeti.style.top = '0';
canvasConfeti.style.left = '0';
canvasConfeti.style.width = '100%';
canvasConfeti.style.height = '100%';
canvasConfeti.style.zIndex = '1';
canvasConfeti.style.pointerEvents = 'none';

const canvasLuces = document.createElement('canvas');
canvasLuces.style.position = 'fixed';
canvasLuces.style.top = '0';
canvasLuces.style.left = '0';
canvasLuces.style.width = '100%';
canvasLuces.style.height = '100%';
canvasLuces.style.zIndex = '1';
canvasLuces.style.pointerEvents = 'none';

function lanzarConfeti() {
    const duration = 77000;
    const animationEnd = Date.now() + duration;
    const defaults = { spread: 60, startVelocity: 30, particleCount: 100, origin: { y: 1 } };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return;
        }

        const particleCount = 10 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, angle: randomInRange(55, 125), spread: randomInRange(50, 70) }));
        requestAnimationFrame(frame);
    })();
}

function reproducirMusica() {
    const audio = new Audio('assets/happy_birthday.mp3');
    audio.play();
}

function crearLucesFestivas() {
    const ctx = canvasLuces.getContext('2d');
    canvasLuces.width = window.innerWidth;
    canvasLuces.height = window.innerHeight;
    
    const luces = [];
    const numLuces = 50;

    for (let i = 0; i < numLuces; i++) {
        luces.push({
            x: Math.random() * canvasLuces.width,
            y: Math.random() * canvasLuces.height,
            radius: Math.random() * 3 + 2,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            hue: Math.random() * 360
        });
    }
    
    function animar() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvasLuces.width, canvasLuces.height);
        
        luces.forEach(luz => {
            luz.x += luz.dx;
            luz.y += luz.dy;
            
            if (luz.x < 0 || luz.x > canvasLuces.width) luz.dx *= -1;
            if (luz.y < 0 || luz.y > canvasLuces.height) luz.dy *= -1;
            
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(
                luz.x, luz.y, 0,
                luz.x, luz.y, luz.radius * 2
            );
            gradient.addColorStop(0, `hsla(${luz.hue}, 100%, 70%, 1)`);
            gradient.addColorStop(1, `hsla(${luz.hue}, 100%, 70%, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.arc(luz.x, luz.y, luz.radius * 2, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animar);
    }
    animar();
}

document.querySelector('.botonPresioname').addEventListener('click', () => {
    const container = document.querySelector('.botonPresioname').parentElement;
    container.style.display = 'none';

    document.body.style.backgroundColor = '#040104';

    document.body.appendChild(canvasConfeti);
    document.body.appendChild(canvasLuces);
    crearLucesFestivas();
    lanzarConfeti();
    reproducirMusica();

    const gif = document.createElement('img');
    gif.src = 'assets/alalo4.gif';
    gif.style.position = 'fixed';
    gif.style.top = '10%';
    gif.style.left = '50%';
    gif.style.transform = 'translateX(-50%)';
    gif.style.width = '15%';
    gif.style.zIndex = '1';

    document.body.appendChild(gif);

    const mensaje = document.createElement('div');
    mensaje.style.position = 'fixed';
    mensaje.style.top = '60%';
    mensaje.style.left = '50%';
    mensaje.style.transform = 'translate(-50%, -50%)';
    mensaje.style.zIndex = '1001';
    mensaje.style.display = 'flex';
    mensaje.style.justifyContent = 'center';

    const texto = '¡Feliz Cumple Panchis :3!';
    for (let i = 0; i < texto.length; i++) {
        const letra = document.createElement('span');
        letra.textContent = texto[i];
        letra.style.animation = `colorCycle 2s linear infinite ${i * 0.1}s, bounce 1s ease-in-out infinite ${i * 0.1}s`;
        mensaje.appendChild(letra);
    }

    document.body.appendChild(mensaje);

    setTimeout(() => {
        document.body.removeChild(mensaje);
        document.body.removeChild(gif);
    }, 77000);
});

const estilo = document.createElement('style');
estilo.textContent = `
    @keyframes colorCycle {
        0% { color: red; }
        16% { color: orange; }
        33% { color: yellow; }
        50% { color: green; }
        66% { color: blue; }
        83% { color: indigo; }
        100% { color: violet; }
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    span {
        font-size: 30px;
        font-weight: bold;
        margin: 0 2px;
    }
`;
document.head.appendChild(estilo);
