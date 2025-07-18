import { useState } from 'react';
import './App.css'
import Level from './Level.jsx';
import hasWon from './hasWon.jsx';
import playSound from './playSound.jsx';
import computerMove from './computerMove.jsx';

export default function App() {
  const [blockCenter, setBlockCenter] = useState(false);
  const sizes = [3,4,5]
  const [size, setSize] = useState(3);
  const initialGrid = Array.from({length: size}, e => Array.from({length: size}, e => Array(size).fill("")));
  const flatGrid = Array.from({length: 1}, e => Array.from({length: size}, e => Array(size).fill("")));
  const names = {X: 'The Knight', O: 'Graldrait the Destroyer'};
  const [dimensions, setDimensions] = useState('3D');
  const [sound, setSound] = useState(false);
  const [turn, setTurn] = useState("X")
  const [grid, setGrid] = useState(initialGrid)
  const [winner, setWinner] = useState(false)
  const [moves, setMoves] = useState(0)
  const [oplayer, setOplayer] = useState(true)
  const [score, setScore] = useState({X: 0, O: 0});
  const [highScore, setHighScore] = useState(JSON.parse(localStorage.getItem("highScore")) || ['X',0]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [showOptions, setShowOptions] = useState(false);

  const resetGame = () => {
    setMoves(0)
    setWinner(false)
    if (dimensions === '3D') setGrid(initialGrid);
    if (dimensions === '2D') setGrid(flatGrid);
    setTurn("X");
    if (blockCenter) {
      blockCenterSquare();
    }
    return;
  }
  
  const blockCenterSquare = () => {
    console.log("block center")
    if (size === 3) {
      setGrid(prev => {
        prev[1][1][1] = "B";
        return prev;
      
      })
    } else if (size === 5) {
      setGrid(prev => {
        prev[2][2][2] = "B";
        return prev;
      
      })
    }
  }
  

  //highlight winning pattern
  let resetColor;
  const highlight = (array, color, timeDelay) => {
    
    for (let point of array) {
    
      let [z,x,y] = point;
      document.getElementById(`${z}${x}${y}`).style.backgroundColor = color;
    }

    resetColor = setTimeout(() => {
      for (let point of array) {
        let [z,x,y] = point;
        document.getElementById(`${z}${x}${y}`).style.backgroundColor = "white";
      }

    }, timeDelay)
  }

  const handleClick = (z,x,y,currentTurn) => {
    let win;

    if (sound) playSound(currentTurn);
    
    //update the board
    const newGrid = [...grid];
    newGrid[z][x][y] = turn;
    setGrid(newGrid)

    //check for a win
    let pattern = hasWon(newGrid, [z,x,y], currentTurn);
    if (pattern) {
      console.log(pattern)
      clearTimeout(resetColor);
      setWinner(`${names[currentTurn]} has won!`)
      setScore(prev => ({ ...prev, [currentTurn]: prev[currentTurn] + 1 }));
      if (score[currentTurn] + 1 > highScore[1]) {
        setHighScore([currentTurn, score[currentTurn] + 1])
        localStorage.setItem("highScore", JSON.stringify([currentTurn, score[currentTurn] + 1]));
      }
      highlight(pattern,"lightgreen",4000);
      return;
    }
    
    //highlight the new move
    highlight([[z,x,y]],"gold",500);

    //never tested this...
    // if array all not empty...
    if (moves == 26) {
      setWinner("It's a tie!")
      return;
    }

    setMoves(prev => prev + 1)

    //computer move
    if (turn == "X" && oplayer) {
      if (sound) playSound("O");
      let [zz,xx,yy] = computerMove(newGrid, difficulty, grid);
      newGrid[zz][xx][yy] = "O"
      highlight([[zz,xx,yy]],"gold",500);
      setGrid(newGrid)

      //check for a win
      pattern = hasWon(newGrid, [zz,xx,yy], "O");
      if (pattern) {
        clearTimeout(resetColor);
        setWinner(`${names['O']} has won!`)
        setScore(prev => ({ ...prev, [currentTurn]: prev[currentTurn] + 1 }));
        //set high score
        if (score[currentTurn] + 1 > highScore[1]) {
          setHighScore([currentTurn, score[currentTurn] + 1])
          localStorage.setItem("highScore", JSON.stringify([currentTurn, score[currentTurn] + 1]));
        }
        //highlight the winning line
        highlight(pattern,"lightgreen",4000);
        setGrid(newGrid)
        return;
      }
    } else {
      setTurn(prev => prev == "X"? "O" : "X")
      return;
      }
    
 }

  return (
    
  
  <div id="game">
    

    <div id="optionsModal" style={{display: showOptions? 'block' : 'none'}}>
      <p>High Score: {highScore[1] ? `${highScore[0]}: ${highScore[1]}` : ''}</p>
      <label htmlFor="oplayer">Computer controls O:</label>
      <input type="checkbox" id="oplayer" name="oplayer" checked={oplayer} onChange={() => setOplayer(!oplayer)} /><br />
      <label htmlFor="blockcenter">Block Center Square:</label>
      <input type="checkbox" id="blockcenter" name="blockcenter" checked={blockCenter} onChange={() => {
            setBlockCenter(!blockCenter);
            }} />
      <p>
        <button onClick={() => setSound(!sound)}>Sound: {sound? `On` : `Off` }</button>
      </p>
      <p>
        <button onClick={() => {
          localStorage.removeItem('highScore')
          setHighScore(['X',0])
        }}
        >Reset High Score</button>
      </p>

      <p>
            <button onClick={() => {
              setDimensions(prev => prev === '2D'? '3D' : '2D')
              resetGame();
            }}
            >Dimensions: {dimensions}</button>
        </p>

      <p>
        <button onClick={() => {
        setDifficulty(prev => prev == "Easy"? "Hard" : "Easy")
        }}
        >Difficulty: {difficulty}</button>
        </p>

      <p>
        <button onClick={() => {
        setShowOptions(prev => !prev)
        }}
        >Exit Options</button>
      </p>
    </div>

    <div className="sidebar">
      <div id="computer">
      
        <p id="highscore">High Score: {highScore[1] ? `${highScore[0]}: ${highScore[1]}` : ''}</p>
        <p>Score X: {score['X']} O: {score['O']}</p>
        <div id="computerControls">
          <label htmlFor="oplayer">Computer controls O:</label>
          <input type="checkbox" id="oplayer" name="oplayer" checked={oplayer} onChange={() => setOplayer(!oplayer)} /><br />
          <label htmlFor="blockcenter">Block Center Square:</label>
          <input type="checkbox" id="blockcenter" name="blockcenter" checked={blockCenter} onChange={() => {
            setBlockCenter(!blockCenter);
            }} />
          
        </div>
      </div>
    
      <div id="buttons">
      <p id="soundcheck">
        <button onClick={() => setSound(!sound)}>Sound: {sound? `On` : `Off` }</button>
      </p>
        <p id="resetHsBtnContainer">
            <button onClick={() => {
              localStorage.removeItem('highScore')
              setHighScore(['X',0])
            }}
            id="resetHs">Reset High Score</button>
        </p>

        <p id="setDimCtnr">
            <button onClick={() => {
              setDimensions(prev => prev === '2D'? '3D' : '2D')
              resetGame();
            }}
            id="setDimBtn">Dimensions: {dimensions}</button>
        </p>

        <p id="sizeBtnContainer">
            <button onClick={() => {
              setSize(prev => {
                let i = sizes.indexOf(prev);
                let newSize = sizes[(i + 1) % sizes.length]
                document.getElementsByClassName('board')[0].style.gridTemplateColumns = `repeat(${newSize}, 1fr)`;
                document.getElementsByClassName('board')[0].style.gridTemplateRows = `repeat(${newSize}, 1fr)`;
                resetGame();
                return newSize;
                });
                

            }}
            id="sizeBtn">{dimensions === '3D' ? `${size} x ${size} x ${size}` : `${size} x ${size}`}</button>
        </p>

        <p>
            <button onClick={() => {
              setDifficulty(prev => prev == "Easy"? "Hard" : "Easy")
            }}
            id="difficultyBtn">Difficulty: {difficulty}</button>
        </p>

        <p>
            <button onClick={() => {
              setShowOptions(prev => !prev)
            }}
            id="optionsBtn">Options</button>
        </p>

        <p>
          <button onClick={resetGame} id="reset">Reset</button>
        </p>
      </div>

    </div>

  <div className='center'>
    <div className="turn">
        { winner ? `${winner}` : `${names[turn]}'s Turn`}
        </div>

    {
    grid.map((level,index) => <Level gridLevel={level} level={index} winner={winner} handleClick={handleClick} turn={turn} size={size} />)
    }

    
      
  </div>
</div>
)}