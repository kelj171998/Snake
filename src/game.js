// Constants
const box = 32;

// Get canvas content
let gameCanvas = document.getElementById("gameCanvas");
let ctx = gameCanvas.getContext('2d');

let imgGround = new Image();
imgGround.src = 'images/ground.png';

let imgFood = new Image();
imgFood.src = 'images/food.png';

// Snake entity
let snake = [];
snake[0] = {x: 9 * box, y: 10 * box}; // head

// Food entity
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// Create the score
let score = 0;

let move;
document.addEventListener("keydown",direction);
function direction(event){
    let key = event.keyCode;
    if( key == 37 && move != "RIGHT"){
        move = "LEFT";
    }else if(key == 38 && move != "DOWN"){
        move = "UP";
    }else if(key == 39 && move != "LEFT"){
        move = "RIGHT";
    }else if(key == 40 && move != "UP"){
        move = "DOWN";
    }
}

function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.drawImage(imgGround, 0, 0);

    // Update snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Update food
    ctx.drawImage(imgFood, food.x, food.y);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (move == 'LEFT') snakeX -= box;
    if (move == 'UP') snakeY -= box;
    if (move == 'RIGHT') snakeX += box;
    if (move == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;

        // Generate new food
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
        // Do not remove the tail
    } else {
        // Remove the tail
        snake.pop();
    }

    // Add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over rules
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    // Update score
    ctx.fillStyle = 'white';
    ctx.font = '45px Changa One';
    ctx.fillText(score, 2 * box, 1.6 * box);

}

// Draw the entire game
let game = setInterval(draw, 100);