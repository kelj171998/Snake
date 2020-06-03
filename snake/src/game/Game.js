import React from 'react';

// Try this tutorial to understand movement: https://www.youtube.com/04fa6e18-95b4-409f-9c75-4616024579ad

// Images
import ImgGround from './images/ground.png';
import ImgFood from './images/food.png';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.contextRef = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.move = 'RIGHT';
    }

    handleInput = (event) => {
        console.log('Key down');

        let key = event.keyCode;
        if( key == 37 && this.move != "RIGHT"){
            this.move = "LEFT";
        }else if(key == 38 && this.move != "DOWN"){
            this.move = "UP";
        }else if(key == 39 && this.move != "LEFT"){
            this.move = "RIGHT";
        }else if(key == 40 && this.move != "UP"){
            this.move = "DOWN";
        }
    }
    componentDidMount() {
        // Draw the entire game
        let game = setInterval(draw, 100);

        // Constants
        const box = 32;

        // Get canvas content
        const ctx = this.refs.canvas.getContext('2d');

        // Images
        const imgGroundRef = this.refs.imgGroundRef;
        const imgFoodRef = this.refs.imgFoodRef;

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

        document.addEventListener('keydown', this.handleInput);

        function collision(head,array){
            for(let i = 0; i < array.length; i++){
                if(head.x == array[i].x && head.y == array[i].y){
                    return true;
                }
            }
            return false;
        }

        function draw() {
            imgGroundRef.onload = () => {
                ctx.drawImage(imgGroundRef, 0, 0);
            }

            // Update snake
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i == 0) ? 'green' : 'white';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);

                ctx.strokeStyle = 'red';
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }
        }
        
        // Update food
        imgFoodRef.onload = () => {
            ctx.drawImage(imgFoodRef, food.x, food.y);
        }

        // Old head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        console.log('MOVE: ', this.move);
        if (this.move == 'LEFT') snakeX -= box;
        if (this.move == 'UP') snakeY -= box;
        if (this.move == 'RIGHT') snakeX += box;
        if (this.move == 'DOWN') snakeY += box;

        if (snakeX == food.x && snakeY == food.y) {
            score++;

            // Generate new food
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            };
            // Do not rethis.move the tail
        } else {
            // Rethis.move the tail
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

    render() {

        return (
            <div className="container">
                <p>Welcome to Snake!</p>

                {/* <div className='input' ref={(i) => this.inputRef = i} ></div> */}
                <img src={ImgGround} alt='ground' ref='imgGroundRef' style={{position: 'absolute', zIndex: 1}} />
                <img src={ImgFood} alt='food' ref='imgFoodRef' style={{position: 'absolute', zIndex: 1}}/>
                <canvas onChange={this.handleInput} id="gameCanvas" width="608" height="608" ref={'canvas'} style={{position: 'relative', zIndex: 20}}>&lt;</canvas>
            </div>
        );
    }
}

export default Game;