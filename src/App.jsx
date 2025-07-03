import { useState } from 'react';
import './App.css'

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
  const initialGrid = [
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
      ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
      ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
      ],
    ];
  const [turn, setTurn] = useState("X")
  const [grid, setGrid] = useState(initialGrid)
  const [winner, setWinner] = useState(false)
  const [moves, setMoves] = useState(0)
  const [oplayer, setOplayer] = useState(true)
  
  const checkWin = (newGrid, previousMove, currentTurn) => {
    for (let pattern of winningPatterns) {
      
      if (pattern.includes(previousMove.toString())) {
        let win = true;
        for (let array of pattern) {
          let [zz,xx,yy] = array.split(",")
          if (newGrid[zz][xx][yy] != currentTurn) win = false;
        }

        if (win) {
          setWinner(`${currentTurn} has won!`)
          highlight(pattern);
          return true;
        }

      }
    }

    
   return false;

  }


  const highlight = (array) => {
    for (let point of array) {
      document.getElementById(point.replaceAll(",","")).style.backgroundColor = "lightgreen";
    }

    let resetColor = setTimeout(() => {
      for (let point of array) {
        document.getElementById(point.replaceAll(",","")).style.backgroundColor = "white";
      }

    }, 5000)
  }

  const computerMove = (point, newGrid) => {
    //check the winning patterns that contain recent move
    for (let pattern of winningPatterns) {
      if (pattern.includes(point.toString())) {
        //remove previous move
        pattern.splice(pattern.indexOf(point.toString()), 1); 
        //choose a free space from the pattern
        for (let array of pattern) {
          let [zz,xx,yy] = array.split(",")
          if (newGrid[zz][xx][yy] == "") {
            return [zz,xx,yy];
          }
        }
      }
    }
      
   
  }



  const handleClick = (z,x,y,currentTurn) => {
    console.log(currentTurn, turn)
    
    let win;
    const newGrid = grid;
    newGrid[z][x][y] = turn;
    win = checkWin(newGrid, [z,x,y], currentTurn)
    if (win) {
      setGrid(newGrid)
      return;
    }

    if (moves == 26) {
      setWinner("It's a tie!")
      return;
    }

    setMoves(prev => prev + 1)

    //computer move
    if (turn == "X" && oplayer) {
      let [zz,xx,yy] = computerMove([z,x,y], newGrid);
      newGrid[zz][xx][yy] = "O"
      if (checkWin(newGrid, [zz,xx,yy], "O")) {
        setGrid(newGrid)
        return;
      }
    } else {
      setTurn(prev => prev == "X"? "O" : "X")
    }
    setGrid(newGrid)
      
    
 }

  
  return (
    
  
  <div id="game">
    
    <p id="computer">
      Computer controls:
     
      <label htmlFor="oplayer">O</label>
      <input type="checkbox" id="oplayer" name="oplayer" checked={oplayer} onChange={() => setOplayer(!oplayer)} />
    </p>

    <div className='board-wrapper'>
    <div className="board">

      {
        grid[0].map((row,x) => {
          return row.map((square, y) => {
            
          
          return <button 
            onClick={(e) => {
              if (e.target.innerText != "") return;
              if (winner) return;
              handleClick(0,x,y,turn);
              
              }}
            key={"0"+x+y} 
            id={"0"+x+y}
            className="square">{square}</button>

          })
        })

      }
      
  
    </div>
    </div>

    <div className='board-wrapper'>
    <div className="board">

      {
        grid[1].map((row,x) => {
          return row.map((square, y) => {
            
          
          return <button 
            onClick={(e) => {
              if (e.target.innerText != "") return;
              if (winner) return;
              handleClick(1,x,y,turn);
             
                
             
              
              }}
              key={"1"+x+y} 
              id={"1"+x+y}
            className="square">{square}</button>

          })
        })

      }
      
  
    </div>
    </div>

    <div className='board-wrapper'>
    <div className="board">

      {
        grid[2].map((row,x) => {
          return row.map((square, y) => {
            
          
          return <button 
            onClick={(e) => {
              if (e.target.innerText != "") return;
              
              if (winner) return;
              handleClick(2,x,y,turn);
              }}

              key={"2"+x+y} 
              id={"2"+x+y}
            className="square">{square}</button>

          })
        })

      }
      
  
    </div>
    </div>
    <button onClick={() => {
      setMoves(0)
      //fin.current.style.display = "none"
      setWinner(false)
      setGrid(initialGrid);
      setTurn("X");
    }


    } id="reset">{winner ? `${winner}Reset` : `Reset`}</button>
    
    
    </div>
    
    
    
    
  )

}