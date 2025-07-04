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
    console.log("newGrid",newGrid)
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

  //highlight winning pattern
  const highlight = (array) => {
    for (let point of array) {
      document.getElementById(point.replaceAll(",","")).style.backgroundColor = "lightgreen";
    }

    let resetColor = setTimeout(() => {
      for (let point of array) {
        document.getElementById(point.replaceAll(",","")).style.backgroundColor = "white";
      }

    }, 3000)
  }

  const computerMove = (point, newGrid) => {

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
        if (num >= possibleMoves[possibleMoves.length-1][1] && num > 0) {
          possibleMoves.push([pattern,num])
        }
        
      }
        possibleMoves.shift()
        
        //Return a free space in the pattern
        for (let i = possibleMoves.length - 1; i >= 0; i--) {
          for (let pattern of possibleMoves[i]) {
            if (!Array.isArray(pattern)) continue;
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
    setGrid(newGrid)
    if (checkWin(newGrid, [z,x,y], currentTurn)) {
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
        setGrid(newGrid)
        if (checkWin(newGrid, [zz,xx,yy], "O")) {
          return;
        }
      } else {
        setTurn(prev => prev == "X"? "O" : "X")
        return;
      }
    
    
      
    
 }

  
  return (
    
  
  <div id="game">
    
    <p id="computer">
      Computer controls:
     
      <label htmlFor="oplayer"> O</label>
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
      setWinner(false)
      setGrid(initialGrid);
      setTurn("X");
      return;
    }


    } id="reset">{winner ? `${winner}Reset` : `Reset`}</button>
    
    
    </div>
    
    
    
    
  )

}