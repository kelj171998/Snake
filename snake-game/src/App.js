import React from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;

  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

  return [x, y];
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeDots: [
    [0, 0],
    [2, 0]
  ]
}

class App extends React.Component {

  state = initialState;
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (event) => {
    event = event || window.event;
    let moveDictionary = {};
    moveDictionary['UP'] = {keyCode: 38, direction: 'UP'};
    moveDictionary['DOWN'] = {keyCode: 40, direction: 'DOWN'};
    moveDictionary['LEFT'] = {keyCode: 37, direction: 'LEFT'};
    moveDictionary['RIGHT'] = {keyCode: 39, direction: 'RIGHT'};

    for (let key in moveDictionary) {
      // Check what way the snake is moving
      if (event.keyCode == moveDictionary[key].keyCode) {
        this.setState(moveDictionary[key]);
      }
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    // let moveDictionary = {};
    // moveDictionary['RIGHT'] = [head[0] + 2, head[1]];
    // moveDictionary['LEFT'] = [head[0] - 2, head[1]];
    // moveDictionary['UP'] = [head[0], head[1] + 2];
    // moveDictionary['DOWN'] = [head[0], head[1] - 2];


    // for (let move in moveDictionary) {
    //   if (this.state.direction == move) {
    //     console.log(move, moveDictionary[move]);
    //     head = moveDictionary[move];
    //   }
    // }

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }

    dots.push(head); // Add the head
    dots.shift(); // Remove the tail
    this.setState({
      snakeDots: dots
    });
  }

  handleInput(head) {
    let headX = head[0];
    let headY = head[1];

    const blockDist = 2; // The space between blocks on the snake
    if (this.state.direction == 'RIGHT' && this.state.direction != 'LEFT') {
      head = [headX + blockDist, headY];
    }
    else if (this.state.direction == 'LEFT' && this.state.direction != 'RIGHT') {
      head = [headX - blockDist, headY];
    }
    else if (this.state.direction == 'DOWN' && this.state.direction != 'UP') {
      head = [headX, headY + blockDist];
    }
    else if (this.state.direction == 'UP' && this.state.direction != 'DOWN') {
      head = [headX, headY - blockDist];
    }
    // switch (this.state.direction) {
    //   case 'RIGHT':
    //     head = [headX + blockDist, headY];
    //     break;
    //   case 'LEFT':
    //     head = [headX - blockDist, headY];
    //     break;
    //   case 'DOWN':
    //     head = [headX, headY + blockDist];
    //     break;
    //   case 'UP':
    //     head = [headX, headY - blockDist];
    //     break;
    //}
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let x = head[0];
    let y = head[1];
    if (x >= 100 || y >= 100 || x < 0 || y < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop(); // Remove head

    snake.forEach((dot) => {
      let headX = head[0];
      let headY = head[1];

      let dotX = dot[0];
      let dotY = dot[1];

      if (headX == dotX && headY == dotY) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    let headX = head[0];
    let headY = head[1];

    let foodX = food[0];
    let foodY = food[1];

    if (headX == foodX && headY == foodY) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }
  
  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default App;
