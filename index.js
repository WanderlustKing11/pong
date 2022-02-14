const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 450;
let cenx = canvas.width / 2;
let ceny = canvas.height / 2

const p1El = document.getElementById("p1score");
const p2El = document.getElementById("p2score");
let p1score = 0;
let p2score = 0;

function main() {
    animate();
}

let balls = []
class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.volx = 3;
        this.voly = 3;
        balls.push(this)
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    move() {
        this.x += this.volx;
        this.y += this.voly;
        this.draw();
    }
}

// Start ball
const b1 = new Ball(cenx, ceny, 8, "blue");

let paddles = []
class Paddle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 12;
        this.height = 90;
        paddles.push(this)
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.fill();
    }

    moveUp() {
        this.y -= 28;
        this.draw();
    }

    moveDown() {
        this.y += 28;
        this.draw();
    }
}

// Players
const player1 = new Paddle(30, ceny - 20, "#6DFF2E")
const player2 = new Paddle(860, ceny - 20, "#6DFF2E")

// Ball Borders
function borders(ball) {
    if ((ball.x - (ball.radius * 2)) > canvas.width) {
        ball.x = cenx;
        ball.y = ceny;
        ball.volx *= -1;
        p1score += 1;
        p1El.innerHTML = p1score;
        console.log(p1score)
        ball.volx = 3;
        ball.voly = 3;
    }
    if ((ball.x + (ball.radius * 2)) < 0) {
        ball.x = cenx;
        ball.y = ceny;
        ball.volx *= -1;
        p2score += 1;
        p2El.innerHTML = p2score;
        console.log(p2score)
        ball.volx = 3;
        ball.voly = 3;
    }
    if ((ball.y + ball.radius) > canvas.height) {
        ball.voly *= -1;
    }
    if ((ball.y - ball.radius) < 0) {
        ball.voly *= -1;
    }
}

// Paddle collision with ball
function collision(ball) {
    if ((ball.x - ball.radius) < (player1.x + player1.width) &&
        (ball.x - ball.radius) > player1.x &&
        (ball.y - ball.radius) > player1.y &&
        (ball.y + ball.radius) < (player1.y + player1.height)) {
        ball.volx *= 1.1;
        ball.voly *= 1.1;
        ball.volx *= -1;
    }

    if ((ball.x + ball.radius) > player2.x &&
        (ball.x + ball.radius) < (player2.x + player2.width) &&
        (ball.y - ball.radius) > player2.y &&
        (ball.y + ball.radius) < (player2.y + player2.height)) {
        ball.volx *= 1.1;
        ball.voly *= 1.1;
        ball.volx *= -1;
    }
}

function track(player, ball) {
    if (ball.y < player.y + 5) {
        player.moveUp();
    }
    if (ball.y > player.y + 75) {
        player.moveDown();
    }
}

function drawMiddle() {
    ctx.fillStyle = "white";
    ctx.fillRect((cenx - 2), 25, 4, 400);
    ctx.fill();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMiddle();
    player1.draw();
    player2.draw();
    b1.draw();
    b1.move();
    borders(b1);
    collision(b1);
    track(player2, b1);
    // track(player1, b1);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'w') {
        player1.moveUp();
    }
    if (event.key === 's') {
        player1.moveDown();
    }
    if (event.key === "p") {
        player2.moveUp();
    }
    if (event.key === "l") {
        player2.moveDown();
    }
});

main();
// animate();
