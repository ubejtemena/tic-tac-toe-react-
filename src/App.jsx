import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Square({value, handleClick}) {
  const classsName = value === "X" ?  "squareX": value === "O" ? "squareO" : "square";
  return <button className={classsName} onClick={handleClick}>{value}</button>;
  
}

function Board({xisNext, squares, game}) {

  function handleClick(q) {
    if(squares[q] || whoiswinner(squares)){
      return;
    };

    const nextSquares = squares.slice();
    if (xisNext){
      nextSquares[q] = "X";
    } 
    else {
      nextSquares[q] = "O"
    }

    game(nextSquares);
    setXisNext(!xisNext); 
  };

   const winner = whoiswinner(squares);
  let status;
  
  if (winner){
    status = "Winner: " + winner; 
  }
  else {
    status = "Its turn: " + (xisNext ? "X" : "O"); 
  }

  return (
    <>
      <div className= "status">{status}</div>
      <div className="board-row">
        <Square value = {squares[0]} handleClick = {() => handleClick(0)} /> 
        <Square value = {squares[1]} handleClick = {() => handleClick(1)} />
        <Square value = {squares[2]} handleClick = {() => handleClick(2)} /> 
      </div>
      <div className="board-row">
        <Square value = {squares[3]} handleClick = {() => handleClick(3)} /> 
        <Square value = {squares[4]} handleClick = {() => handleClick(4)} /> 
        <Square value = {squares[5]} handleClick = {() => handleClick(5)} /> 
      </div>
      <div className="board-row">
        <Square value = {squares[6]} handleClick = {() => handleClick(6)} /> 
        <Square value = {squares[7]} handleClick = {() => handleClick(7)} /> 
        <Square value = {squares[8]} handleClick = {() => handleClick(8)} /> 
      </div>
    </>
)
}

function whoiswinner(squares) {

  const poss = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
for (let q = 0; q < poss.length; q++){

    const [a, b, c] = poss[q];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }

  return null;
}


export default function App() {
  const [xisNext, setXisNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  
  function game(nextSquares) {
    const nextHistory = [...history.slice(0,currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXisNext(!xisNext);
    
  }
    function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXisNext(nextMove % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Move #' + move;
    } else {
      description = 'To the start';
    }
    return (
      <li key={move}>
        <button className="moveto" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

    return (
    <div className="game">
      <div className="game-board">
        <Board xisNext = {xisNext} squares={currentSquares} game={game}/>
      </div>
      <div calssName="game-info">
      <ul className="history">{moves}</ul>
      </div>
    </div>
);
}










