let inputDir = { x: 0, y: 0 };
let speed = 5;
let score = 0;
let lastPaintTime = 0;

let snakeArr = [{ x: 10, y: 10 }];
let food = { x: 6, y: 7 };

const board = document.getElementById("board");
const scoreBox = document.getElementById("scoreBox");

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    if (
        snake[0].x <= 0 || snake[0].x > 18 ||
        snake[0].y <= 0 || snake[0].y > 18
    ) {
        return true;
    }

    return false;
}

function gameEngine() {

    // Move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Collision
    if (isCollide(snakeArr)) {
        alert("Game Over");
        inputDir = { x: 0, y: 0 };
        snakeArr = [{ x: 10, y: 10 }];
        score = 0;
        scoreBox.innerHTML = "Score: 0";
        return;
    }

    // Food eaten
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score++;
        scoreBox.innerHTML = "Score: " + score;

        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });

        food = {
            x: Math.floor(Math.random() * 17) + 1,
            y: Math.floor(Math.random() * 17) + 1
        };
    }

    // Draw
    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        const element = document.createElement("div");
        element.style.gridRowStart = e.y;
        element.style.gridColumnStart = e.x;
        element.classList.add(index === 0 ? "head" : "snake");
        board.appendChild(element);
    });

    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    e.preventDefault();
    switch (e.key) {
        case "ArrowUp":
            inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            inputDir = { x: 1, y: 0 };
            break;
    }
});
