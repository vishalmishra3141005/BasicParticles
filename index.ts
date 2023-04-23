let canvas = document.getElementById("canvas1") as (HTMLCanvasElement | null);
let ctx = canvas!!.getContext("2d");

if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const mouse = { x: 0, y: 0 };
const color = ["red", "blue", "white", "pink", "yellow", "violet", "green", "lightgreen"];


const particleArray: Particle[] = [];


class Particle {
    public x: number;
    public y: number;
    public size: number;
    public speedX: number;
    public speedY: number;
    public color: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.floor(Math.random() * 10 + 1);
        this.speedX = Math.floor(Math.random() * 10 - 5);
        this.speedY = Math.floor(Math.random() * 10 - 5);
        this.color = Math.floor(Math.random() * color.length);
    }

    update() {
        this.size -= 0.1;
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        if (ctx) {
            ctx.beginPath();
            console.log(this.color);
            ctx.fillStyle = color[this.color];
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}


canvas?.addEventListener("mousemove", function(e) {
    for (let i = 0; i < 10; i++) {
        particleArray.push(new Particle(e.x, e.y));
    }
});

function updateParticle() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        if (particleArray[i].size <= 0) {
            particleArray.splice(i, 1);
            i--;
        } else {
            particleArray[i].draw();
        }
    }
}

function animate() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateParticle();
        requestAnimationFrame(animate);
    }
};

animate();