import { useState, useRef, useEffect } from 'react';
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
  const [lastMove, setLastMove] = useState([])
  const [winner, setWinner] = useState(false)
  const [moves, setMoves] = useState(0)
  const [xplayer, setXplayer] = useState(false)
  const [oplayer, setOplayer] = useState(true)
  const fin = useRef(null);

  useEffect(() => {
    
    for (let pattern of winningPatterns) {
      let currentTurn = turn == "X"? "O" : "X"
      if (pattern.includes(lastMove.toString())) {
        let win = true;
        for (let array of pattern) {
          let [zz,xx,yy] = array.split(",")
          console.log("grid",grid[zz][xx][yy],"turn", currentTurn)
          if (grid[zz][xx][yy] != currentTurn) win = false;
        }

        if (win) {
          setWinner(`${currentTurn} has won!`)
          highlight(pattern);
          return;
        }

      }
    }

    
   

  }, [turn])


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

  const computerMove = (currentTurn,point) => {
    
    
    //delay for state update
    const move = setTimeout(() => {
      
      //check the winning patters that contain recent move
      for (let pattern of winningPatterns) {
        if (pattern.includes(point)) {
          //remove previous move
          pattern.splice(pattern.indexOf(point), 1); 
          //choose a free space from the pattern
          for (let array of pattern) {
            let [zz,xx,yy] = array.split(",")
            if (grid[zz][xx][yy] == "") {
              
              if (winner) return;
              handleClick(zz,xx,yy,currentTurn);
              
              return;
            }

          }

          

        }
      
    }
    }, 500)
  }

  const finish = (result) => {
    if (result == "tie") {
      fin.current.innerText = "It's a tie!"
    } else {
      fin.current.innerText = `${result} has won!`
    }

    fin.current.style.visibility = "visible"
  
  }

  const handleClick = (z,x,y,currentTurn) => {
    setMoves(moves + 1)
    
    setGrid(prev => {
      let na = [...prev]
      na[z][x][y] = currentTurn
      return na
      })

    setLastMove([z,x,y])
    setTurn(prev => prev == "X"? "O" : "X")                            
    let next = currentTurn == "X"? "O" : "X";
    if (next == "O" && oplayer) computerMove("O",[z,x,y].toString());
    
    //draw
    if (moves == 26) setWinner("It's a tie!")

  }

  
  return (
    
  
  <div id="game">
    
    <p id="computer">
      Computer controls:
      <label htmlFor="xplayer">X</label>
      <input type="checkbox" id="xplayer" name="xplayer" checked={xplayer} onChange={() => setXplayer(!xplayer)} />
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