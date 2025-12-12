// Stars Animation
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.5 + 0.1
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0) star.opacity = 0;
        if (star.opacity > 1) star.opacity = 1;
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// UFO Movement
const ufo = document.getElementById('ufo');
const beam = document.getElementById('beam');
let ufoX = window.innerWidth / 2;
let ufoY = window.innerHeight / 2;
const speed = 5;

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            ufoY = Math.max(0, ufoY - speed);
            break;
        case 'ArrowDown':
            ufoY = Math.min(window.innerHeight - 60, ufoY + speed);
            break;
        case 'ArrowLeft':
            ufoX = Math.max(0, ufoX - speed);
            break;
        case 'ArrowRight':
            ufoX = Math.min(window.innerWidth - 100, ufoX + speed);
            break;
        case ' ':
            beam.style.height = '100px';
            beam.style.opacity = '1';
            setTimeout(() => {
                beam.style.height = '0';
                beam.style.opacity = '0';
            }, 300);
            break;
    }
    ufo.style.left = `${ufoX}px`;
    ufo.style.top = `${ufoY}px`;
    beam.style.left = `${ufoX + 40}px`;
    beam.style.top = `${ufoY + 60}px`;
});

// Resize Canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});