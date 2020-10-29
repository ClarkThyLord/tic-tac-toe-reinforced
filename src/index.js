import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  let className = "square square-" + props.index;
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        index={i}
        value={playerName(this.props.squares[i])}
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
        case "#1vAI":
          type = 1;
          break;
        case "#AIvAI":
          type = 2;
          break;
      }
    } 

    this.state = {
      type: type,
      player: 0,
      squares: Array(9).fill(-1),
    };
  }

  start(eve) {
    this.setState({
      player: 0,
      squares: Array(9).fill(-1)
    });

    switch (this.state.type) {
      case 2:
        this.AIMove();
        break;
    }
  }

  set_type(type) {
    this.state.type = type;
    this.start();
  }

  isAINext() {
    return (this.state.type === 1 && this.state.player === 1) || this.state.type === 2;
  }

  AIMove() {
    let bestMove = findBestMove(this.state.player, this.state.squares);
    this.handleMove(bestMove);
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

    if (this.isAINext() && calculateWinner(this.state.squares) == -1)
      setTimeout(() => {
        if (this.isAINext())
          this.AIMove();
      }, 250);
  }

  render() {
    const winner = calculateWinner(this.state.squares);

    let status;
    if (winner == 0 || winner == 1)
      status = "Winner: " + playerName(winner);
    else if (winner == 2)
      status = "Draw";
    else {
      status = "Next player: " + playerName(this.state.player);
      if (this.isAINext())
        status += " (AI)";
    }

    return (
      <div className="game">
      <div className="game-info">
        <h1>{status}</h1>
      </div>
      <div className="game-opt">
        <a className="opt" onClick={() => this.start()}>
          Start
        </a>
      </div>
      <div className="game-type">
        <a href="#1v1" className="type" onClick={() => this.set_type(0)}>
          1 v 1
        </a>
        <a href="#1vAI" className="type" onClick={() => this.set_type(1)}>
          1 v AI
        </a>
        <a href="#AIvAI" className="type" onClick={() => this.set_type(2)}>
          AI v AI
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
