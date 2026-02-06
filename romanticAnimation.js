const canvas = document.getElementById("romanticCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const elements = [];

class FloatingElement {
  constructor(type) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 30 + 20;
    this.speed = Math.random() * 1.5 + 0.5;
    this.type = type;
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    if (this.type === "heart") {
      ctx.fillStyle = "rgba(255, 105, 180, 0.8)";
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size, this.y + this.size / 3, this.x, this.y + this.size);
      ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 3, this.x - this.size / 2, this.y - this.size / 2, this.x, this.y);
      ctx.fill();
    } else {
      ctx.fillStyle = "rgba(255, 182, 193, 0.7)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

function init() {
  for (let i = 0; i < 60; i++) {
    const type = Math.random() > 0.5 ? "heart" : "petal";
    elements.push(new FloatingElement(type));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  elements.forEach(el => el.update());
  requestAnimationFrame(animate);
}

init();
animate();