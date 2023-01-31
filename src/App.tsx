import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [xIsNext, setXisNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState<null | string>(null);
    
    const currentClass = () => {
      if(xIsNext) {
        return 'O';
      } else {
        return 'X';
      }
    };

    const handleClick = (index: number) => {
      if(squares[index] !== null || winner !== null) {
        return;
      }

      const newSquares = squares.slice();
      newSquares[index] = currentClass();
      setSquares(newSquares);
      setXisNext(!xIsNext);

      if(checkWin(newSquares, currentClass())) {
        setWinner(currentClass);
      }
    };

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const checkWin = (squares: Array<string | null>, currentClass: string) => {   
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return squares[index] === currentClass;
        });
      });
    };
    
    const isDraw = () => {
      return squares.every(square => square !== null);
    };
    
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Tic Tac Toe</h1>
        {winner ? <div>Le gagnant est {winner}</div> : null}
        {isDraw() && !winner ? <div>Match nul</div> : null}
        <div className="reset mb-4 mt-4">
          <button className='btn-primary btn' onClick={() => {setSquares(Array(9).fill(null)); setWinner(null); }}>Reset</button>
        </div>
        <div className="game">
          <div className="container game-board">
            <div className="row">
            {Array.from(Array(9).keys()).map((i) => (
              <div className="col-4" key={i}>
                <button className="square" key={i} onClick={() => handleClick(i)}>{squares[i]}</button>
              </div>
            ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

