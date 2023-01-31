import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Confetti from 'react-confetti'

function App() {
    const [xIsNext, setXisNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState<null | string>(null);
    
    const setStyleClass = (currentClass: string) => {
      return {
        color: currentClass === 'X' ? 'red' : 'blue',  
        fontSize: '2em',
        fontWeight: 'bold',
        fontFamily: 'Courier New, monospace, sans-serif'
      };
    };
    
    
    const currentClass = () => {
      return xIsNext ? 'X' : 'O';
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

    const draw = (ctx: { beginPath: () => void; lineTo: (arg0: number, arg1: number) => void; stroke: () => void; closePath: () => void; }) => {
      ctx.beginPath()
      for(let i = 0; i < 22; i++) {
        const angle = 0.35 * i
        const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
        const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
        ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.closePath()
    }

    const confetti = () => {
      return <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        drawShape={draw}
      />

      
    }
    
  return (
    <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tic Tac Toe</h1>
          <div className="mb-4">
              {!isDraw() && !winner ?  (
                  <p className="mb-4">Au tour de {" "}
                    <span style={setStyleClass(currentClass())}>{}
                    {currentClass()}
                    </span>
                  </p>
                ) : null }
            {winner ? (
              <>
                <p>Le gagnant est {" "}
                  <span style={setStyleClass(winner)}>{winner}</span>
                </p>
                {confetti()}
              </>
            ) : null}
            {isDraw() && !winner ? (
              <>
              <p>Match nul</p>
              {confetti()}
              </>
            ) : null}
          </div>
          <div className="reset mb-4 mt-4">
            <button className='btn-primary btn' onClick={() => {
              setSquares(Array(9).fill(null)); 
              setWinner(null); }}>Nouvelle Partie</button>
          </div>
          <div className="game">
            <div className="container game-board">
              <div className="row">
              {Array.from(Array(9).keys()).map((i) => (
                <div className="col-4" key={i}>
                  <button 
                    className="square"
                    key={i} onClick={() => handleClick(i)} >
                      <span style={setStyleClass(squares[i])}>
                        {squares[i]}
                      </span>
                  </button>
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
