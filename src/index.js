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
    this.state = {
      type: 0,
      xIsNext: true,
      squares: Array(9).fill(null),
    };
  }

  start(eve) {
    console.log("Start");
    this.setState({
      xIsNext: true,
      squares: Array(9).fill(null)
    });
  }

  set_type(type) {
    console.log("Type: ", type);
    console.log(this);
  }

  handleClick(i) {
    if (calculateWinner(this.state.squares) || this.state.squares[i]) {
      return;
    }
    this.state.squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

