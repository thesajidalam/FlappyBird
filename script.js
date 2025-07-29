// Background aurora particle effect with motion blur and GPU-style flicker
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let w, h;
let particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createParticles() {
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      hue: Math.floor(Math.random() * 360)
    });
  }
}
createParticles();

function drawParticles() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${p.hue}, 100%, 60%)`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    p.hue += 0.5;
    if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
    }
  });
}

function animate() {
  drawParticles();
  requestAnimationFrame(animate);
}
animate();
