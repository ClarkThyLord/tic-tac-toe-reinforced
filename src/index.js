import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  let className = "square square-" + props.index;
  return (
    <button className={className} onClick={props.onClick}>
      {playerName(props.value)}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        index={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="game-board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    let type = 0;
    if(window.location.hash) {
      switch (window.location.hash) {
        case "#1v1":
          type = 0;
          break;
        case "#1vMM":
          type = 1;
          break;
        case "#TrainQ":
          type = 2;
          break;
        case "#1vQ":
          type = 3;
          break;
        case "#MMvQ":
          type = 4;
          break;
      }
    }

    this.q = new Q();
    this.state = {
      type: type,
      player: 0,
      squares: Array(9).fill(-1)
    };
  }

  start(eve) {
    this.setState({
      player: 0,
      squares: Array(9).fill(-1)
    });

    if (this.isAINext()) this.AIMove();
  }

  set_type(type) {
    this.state.type = type;
    this.start();
  }

  isAINext() {
    return (this.state.type === 1 && this.state.player === 1) || this.state.type >= 2;
  }

  AIMove() {
    let move;
    if (this.state.type == 2) {
      if (this.state.player == 0)
        move = findRandomMove(this.state.squares.slice());
      else
        move = this.q.findNextMove(this.state.player, this.state.squares.slice());
    } else if (this.state.type > 0) {
      move = findBestMove(this.state.player, this.state.squares.slice());
    }
    this.handleMove(move);
  }

  handleClick(i) {
    if (calculateWinner(this.state.squares) > -1 || this.state.squares[i] > -1 || this.isAINext())
      return;
    this.handleMove(i);
  }

  handleMove(position) {
    this.state.squares[position] = this.state.player;
    this.state.player = (this.state.player + 1) % 2;
    this.forceUpdate();

    if (this.isAINext() && calculateWinner(this.state.squares) === -1)
      setTimeout(() => {
        if (this.isAINext())
          this.AIMove();
      }, this.state.type == 2 ? 10 : 250);
  }

  render() {
    let message;
    let options;
    const winner = calculateWinner(this.state.squares);
    if (this.state.type == 2) {
      switch (winner) {
        case 0:
          this.q.lost();
          break;
        case 1:
          this.q.won();
          break;
        case 2:
          this.q.drew();
          break;
      }
      if (winner > -1) 
        setTimeout(() => this.start(), 10);

      options = (
        <span>
          <a className="opt" onClick={() => this.q.save()}>
            Save
          </a>
          <a className="opt" onClick={() => this.q.load()}>
            Load
          </a>
          <a className="opt" onClick={() => this.q.clear()}>
            Clear
          </a>
        </span> 
      );
      message = `Wins: ${this.q.wins} Losses: ${this.q.losses} Draws: ${this.q.draws}`;
    } else {
      if (winner == 0 || winner == 1) {  
        message = "Winner: " + playerName(winner) + ((this.state.type === 1 && winner == 1) ? " (AI)": "");
      }
      else if (winner == 2) {
        message = "Draw";
      }
      else {
        message = "Next player: " + playerName(this.state.player);
        if (this.isAINext())
          message += " (AI)";
      }
    }

    return (
      <div className="game">
      <div className="game-info">
        <h1>{message}</h1>
      </div>
      <div className="game-opt">
        <a className="opt" onClick={() => this.start()}>
          Start
        </a>
        { options }
      </div>
      <div className="game-type">
        <a href="#1v1" className="type" onClick={() => this.set_type(0)}>
          1 v 1
        </a>
        <a href="#1vMM" className="type" onClick={() => this.set_type(1)}>
          1 v MiniMax
        </a>
        <a href="#TrainQ" className="type" onClick={() => this.set_type(2)}>
          Train Q
        </a>
        <a href="#1vQ" className="type" onClick={() => this.set_type(3)}>
          1 v Q
        </a>
        <a href="#MMvQ" className="type" onClick={() => this.set_type(4)}>
          MiniMax v Q
        </a>
      </div>

        <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
          />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function playerName(player) {
  switch (player) {
    case 0:
      return "X";
    case 1:
      return "O";
    default:
      return "";
  }
}

function getAvailableMoves(squares) {
  let available = [];
  for (let i = 0; i < squares.length; i++)
    if (squares[i] == -1)
      available.push(i);
  return available;
}

function squaresToHash(squares) {
  return squares.join();
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] > -1 && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.every(v => v != -1))
    return 2;
  else
    return -1;
}

function minimax(player, squares, depth, maximizer) {
  let winner = calculateWinner(squares);
  if (winner === player)
    return 10 - depth;
  else if (winner === (player + 1) % 2)
    return -10 + depth;
  else if (winner == 2)
    return 0;

  if (maximizer) {
    let best = -1000;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === -1) {
        squares[i] = player;
        best = Math.max(best, minimax(player, squares, depth + 1, !maximizer))
        squares[i] = -1;
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === -1) {
        squares[i] = (player + 1) % 2;
        best = Math.min(best, minimax(player, squares, depth + 1, !maximizer))
        squares[i] = -1;
      }
    }
    return best;
  }
}

function findBestMove(player, squares) {
  let best = -1000;
  let move = -1;
  
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === -1) {
      squares[i] = player;
      let value = minimax(player, squares, 0, false);
      squares[i] = -1;
      if (value > best) {
        best = value;
        move = i;
      }
    }
  }

  return move;
}

function findRandomMove(squares) {
  const available = getAvailableMoves(squares);
  return available[Math.floor(Math.random() * available.length)];
}

function Q() {
  this.decay = 0.8;
  this.learningRate = 0.2;
  this.exploringRate = 0.1;
  this.states = {};
  this.statesHistory = [];

  this.wins = 0;
  this.losses = 0;
  this.draws = 0;

  this.findNextMove = function (player, squares) {
    let move;
    let probability = Math.random();
    if (probability <= this.exploringRate)
      move = findRandomMove(squares);
    else {
      const moves = getAvailableMoves(squares);
      move = moves[0];
      let max = -Infinity;

      for (let i = 0; i < moves.length; i++) {
        const mov = moves[i];
        squares[mov] = player;
        const hash = squaresToHash(squares);
        const state_val = this.states[hash] === undefined ? 0 : this.states[hash];
        if (state_val > max) {
          move = mov;
          max = state_val;
        }
        squares[mov] = -1;
      }
    }

    squares[move] = player;
    this.statesHistory.push(squaresToHash(squares));

    return move;
  };

  this.save = function () {
    localStorage.setItem("wins", this.wins);
    localStorage.setItem("losses", this.losses);
    localStorage.setItem("draws", this.draws);
    localStorage.setItem("states", JSON.stringify(this.states));
  }

  this.load = function () {
    let temp = localStorage.getItem("wins");
    if (temp !== null)
      this.wins = parseInt(temp);
    temp = localStorage.getItem("losses");
    if (temp !== null)
      this.losses = parseInt(temp);
    temp = localStorage.getItem("draws");
    if (temp !== null)
      this.draws = parseInt(temp);
    temp = localStorage.getItem("states");
    if (temp !== null)
      this.states = JSON.parse(temp);
  }

  this.clear = function () {
    localStorage.removeItem("wins");
    localStorage.removeItem("losses");
    localStorage.removeItem("draws");
    localStorage.removeItem("states");
  }

  this.learn = function (reward) {
    for (let i = 0; i < this.statesHistory.length; i++) {
      const hash = this.statesHistory[i];
      if (this.states[hash] === undefined)
        this.states[hash] = 0;
      this.states[hash] += this.learningRate * (this.decay * reward - this.states[hash]);
      reward = this.states[hash];
    }
    this.statesHistory = [];
  }

  this.won = function () {
    this.wins += 1;
    this.learn(1);
  }

  this.lost = function () {
    this.losses += 1;
    this.learn(-1);
  }

  this.drew = function () {
    this.draws += 1;
    this.learn(0.1);
  }
}
