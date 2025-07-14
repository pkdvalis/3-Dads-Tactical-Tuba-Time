import { useState } from 'react';
import './App.css'
import Level from './Level.jsx';
import sword from './assets/sword.png';
import dragon from './assets/dragon.png';
import blank from './assets/blank.png';



const winningPatterns = [
  // Horizontal rows in each layer (XY plane)
  ["0,0,0","0,1,0","0,2,0"],
  ["0,0,1","0,1,1","0,2,1"],
  ["0,0,2","0,1,2","0,2,2"],
  ["1,0,0","1,1,0","1,2,0"],
  ["1,0,1","1,1,1","1,2,1"],
  ["1,0,2","1,1,2","1,2,2"],
  ["2,0,0","2,1,0","2,2,0"],
  ["2,0,1","2,1,1","2,2,1"],
  ["2,0,2","2,1,2","2,2,2"],

  // Vertical columns in each layer (XY plane)
  ["0,0,0","0,0,1","0,0,2"],
  ["0,1,0","0,1,1","0,1,2"],
  ["0,2,0","0,2,1","0,2,2"],
  ["1,0,0","1,0,1","1,0,2"],
  ["1,1,0","1,1,1","1,1,2"],
  ["1,2,0","1,2,1","1,2,2"],
  ["2,0,0","2,0,1","2,0,2"],
  ["2,1,0","2,1,1","2,1,2"],
  ["2,2,0","2,2,1","2,2,2"],

  // Lines through layers (Z axis)
  ["0,0,0","1,0,0","2,0,0"],
  ["0,1,0","1,1,0","2,1,0"],
  ["0,2,0","1,2,0","2,2,0"],
  ["0,0,1","1,0,1","2,0,1"],
  ["0,1,1","1,1,1","2,1,1"],
  ["0,2,1","1,2,1","2,2,1"],
  ["0,0,2","1,0,2","2,0,2"],
  ["0,1,2","1,1,2","2,1,2"],
  ["0,2,2","1,2,2","2,2,2"],

  // Diagonals in XY planes (each layer)
  ["0,0,0","0,1,1","0,2,2"],
  ["0,2,0","0,1,1","0,0,2"],
  ["1,0,0","1,1,1","1,2,2"],
  ["1,2,0","1,1,1","1,0,2"],
  ["2,0,0","2,1,1","2,2,2"],
  ["2,2,0","2,1,1","2,0,2"],

  // Diagonals through layers (XZ planes)
  ["0,0,0","1,1,0","2,2,0"],
  ["0,2,0","1,1,0","2,0,0"],
  ["0,0,1","1,1,1","2,2,1"],
  ["0,2,1","1,1,1","2,0,1"],
  ["0,0,2","1,1,2","2,2,2"],
  ["0,2,2","1,1,2","2,0,2"],

  // Diagonals through layers (YZ planes)
  ["0,0,0","1,0,1","2,0,2"],
  ["0,0,2","1,0,1","2,0,0"],
  ["0,1,0","1,1,1","2,1,2"],
  ["0,1,2","1,1,1","2,1,0"],
  ["0,2,0","1,2,1","2,2,2"],
  ["0,2,2","1,2,1","2,2,0"],

  // 4 space diagonals through the cube
  ["0,0,0","1,1,1","2,2,2"],
  ["0,2,0","1,1,1","2,0,2"],
  ["0,0,2","1,1,1","2,2,0"],
  ["0,2,2","1,1,1","2,0,0"]
];



export default function App() {
  const [size, setSize] = useState(3);
  const initialGrid = [
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  ]; //Array(size).fill(Array(size).fill(Array(size).fill("")));
  const [turn, setTurn] = useState("X")
  const [grid, setGrid] = useState(initialGrid)
  const [winner, setWinner] = useState(false)
  const [moves, setMoves] = useState(0)
  const [oplayer, setOplayer] = useState(true)
  const [score, setScore] = useState({X: 0, O: 0});
  const [highScore, setHighScore] = useState(JSON.parse(localStorage.getItem("highScore")) || ['X',0]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [showOptions, setShowOptions] = useState(false);

  
  const checkWin = (newGrid, previousMove, currentTurn) => {
    
    for (let pattern of winningPatterns) {
      
      if (pattern.includes(previousMove.toString())) {
        let win = true;
        for (let array of pattern) {
          let [zz,xx,yy] = array.split(",")
          if (newGrid[zz][xx][yy] != currentTurn) win = false;
        }

        if (win) {
          
          clearTimeout(resetColor);
          setWinner(`${currentTurn} has won!`)
          setScore(prev => ({ ...prev, [currentTurn]: prev[currentTurn] + 1 }));
          if (score[currentTurn] + 1 > highScore[1]) {
            setHighScore([currentTurn, score[currentTurn] + 1])
            localStorage.setItem("highScore", JSON.stringify([currentTurn, score[currentTurn] + 1]));
          }
          highlight(pattern,"lightgreen",4000);
          return true;
        }
      }
    }
   return false;
  }

  //highlight winning pattern
  let resetColor;
  const highlight = (array, color, timeDelay) => {
    
    for (let point of array) {
      document.getElementById(point.replaceAll(",","")).style.backgroundColor = color;
    }

    resetColor = setTimeout(() => {
      for (let point of array) {
        document.getElementById(point.replaceAll(",","")).style.backgroundColor = "white";
      }

    }, timeDelay)
  }

  const computerMove = (point, newGrid) => {
    if (difficulty == "Hard") {
      if (newGrid[1][1][1] == "") {
        return [1,1,1];
      } 
        //make db of patterns
      let possibleMoves = [];
      for (let pattern of winningPatterns) {
        
          //count 0s it has
          let num = 0;
          for (let array of pattern) {
            let [zz,xx,yy] = array.split(",")
            if (newGrid[zz][xx][yy] == "O") {
              num++;
            }
          }
          //store it if it has 2 "O"s
        
          if (num == 2) {
            possibleMoves.push([pattern])
          }
          
        }
        
          //Return a free space in the pattern
          for (let i = possibleMoves.length - 1; i >= 0; i--) {
            for (let pattern of possibleMoves[i]) {
              for (let array of pattern) {
                let [zz,xx,yy] = array.split(",")
                  if (newGrid[zz][xx][yy] == "") {
                    console.log("hard return",[zz,xx,yy])
                    return [zz,xx,yy];
                  }
            }
          }
        }
    }



    //make db of patterns
    let possibleMoves = [[[],0]];
    
    for (let pattern of winningPatterns) {
      
        //count Xs it has
        let num = 0;
        for (let array of pattern) {
          let [zz,xx,yy] = array.split(",")
          if (newGrid[zz][xx][yy] == "X") {
            num++;
          }
        }
        //store it if it's biggest
        console.log(num,possibleMoves[possibleMoves.length-1][1])
        if (num > 0) {
          possibleMoves.push([pattern,num])
        }
        
      }
      
      possibleMoves.sort((a, b) => a[1] - b[1]);
              
        //Return a free space in the pattern
        for (let i = possibleMoves.length - 1; i >= 0; i--) {
          for (let pattern of possibleMoves[i]) {
            if (!Array.isArray(pattern)) continue;
            for (let array of pattern) {
                
              let [zz,xx,yy] = array.split(",")
                if (newGrid[zz][xx][yy] == "") {
                  console.log("easy return",[zz,xx,yy])
                  return [zz,xx,yy];
                }
          }
        }
      }
        
     
  }



  const handleClick = (z,x,y,currentTurn) => {
    console.log(z,x,y,currentTurn)
    console.log(grid[z][x][y])
    let win;
    
    //update the board
    const newGrid = [...grid];
    console.log(newGrid[z][x][y])
    newGrid[z][x][y] = turn;
    console.log(newGrid[z][x][y])
    setGrid(newGrid)
    //check for a win
    if (checkWin(newGrid, [z,x,y], currentTurn)) {
      return;
    }
    
    //highlight the new move
    highlight([`${z},${x},${y}`],"gold",500);

    //never tested this...
    if (moves == 26) {
      setWinner("It's a tie!")
      return;
    }

    setMoves(prev => prev + 1)

    //computer move
    
    if (turn == "X" && oplayer) {
      
      
        let [zz,xx,yy] = computerMove([z,x,y], newGrid);
        newGrid[zz][xx][yy] = "O"
        highlight([`${zz},${xx},${yy}`],"gold",500);
        setGrid(newGrid)
        
        if (checkWin(newGrid, [zz,xx,yy], "O")) {
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
      <input type="checkbox" id="oplayer" name="oplayer" checked={oplayer} onChange={() => setOplayer(!oplayer)} />
      <p>
        <button onClick={() => {
          localStorage.removeItem('highScore')
          setHighScore(['X',0])
        }}
        >Reset High Score</button>
        </p>

        <p>
    <button onClick={() => {
      setDifficulty(prev => prev == "Easy"? "Hard" : "Easy")
    }}
    >Difficulty: {difficulty}</button>
    <p>
    <button onClick={() => {
      setShowOptions(prev => !prev)
    }}
    >Exit Options</button>
</p>
  </p>
  
    </div>

    <div className="sidebar">
    <div id="computer">
      
      <p id="highscore">High Score: {highScore[1] ? `${highScore[0]}: ${highScore[1]}` : ''}</p>
      <p>Score X: {score['X']} O: {score['O']}</p>
      <div id="computerControls">
        <label htmlFor="oplayer">Computer controls O:</label>
        <input type="checkbox" id="oplayer" name="oplayer" checked={oplayer} onChange={() => setOplayer(!oplayer)} />
      </div>
      
      
    </div>
    <div id="buttons">

<p id="resetHsBtnContainer">
    <button onClick={() => {
      localStorage.removeItem('highScore')
      setHighScore(['X',0])
    }}
    id="resetHs">Reset High Score</button>
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

<p><button onClick={() => {
      setMoves(0)
      setWinner(false)
      setGrid(initialGrid);
      setTurn("X");
      return;
    }} id="reset">{winner ? `${winner}Reset` : `Reset`}</button>
</p>
</div>

    </div>

    <div className='center'>
      <div className="turn">
        { winner ? `${winner}` : `${turn}'s Turn`}
        </div>

    {
    grid.map((level,index) => <Level gridLevel={level} level={index} winner={winner} handleClick={handleClick} turn={turn} />)
    }
        

    
    
      </div>
    </div>
    
    
    
    
  )

}