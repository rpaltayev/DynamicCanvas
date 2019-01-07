let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

// c.fillStyle = "rgba(0,0,255,0.5)";
// c.fillRect(100, 100, 100, 50);

// c.fillStyle = "rgba(0,255,0,0.5)";
// c.fillRect(100, 150, 200, 50);

// c.fillStyle = "rgba(255,0,0,0.5)";
// c.fillRect(100, 200, 300, 50);

// c.fillStyle = "rgba(0,255,150,0.5)";
// c.fillRect(100, 250, 400, 50);

// c.fillStyle = "rgba(255,150,0,0.5)";
// c.fillRect(100, 300, 500, 50);

// console.log(canvas);

// c.beginPath();

// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.lineTo(150, 10);
// c.strokeStyle = "#fa3252";
// c.stroke();

// Arc/circle
// c.beginPath();
// c.arc(500, 200, 50, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// for (let i = 0; i < 100; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 50, 0, Math.PI * 2, false);
//     let r = Math.random() * 255,
//         g = Math.random() * 255,
//         b = Math.random() * 255;
//     c.strokeStyle = `rgba(${r},${g},${b},0.5)`;
//     c.stroke();
// }

let mouse = {
    x: undefined,
    y: undefined
};

const maxRadius = 45;
const minRadius = 5;

let colorArray = ["#092140", "#024959", "#F2C777", "#F24738", "#BF2A2A"];

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[~~(Math.random() * colorArray.length)];
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactavity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) this.radius += 1;
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

function init() {
    circleArray = [];
    for (let i = 0; i < 350; i++) {
        let radius = Math.random() * 8 + 2;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 3,
            dy = (Math.random() - 0.5) * 3;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

//circle.draw();
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();
