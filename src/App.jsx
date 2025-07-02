import { useState, useRef } from 'react';
import './App.css'

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
  
  const fin = useRef(null);

  const finish = (result) => {
    if (result == "tie") {
      fin.current.innerText = "It's a tie!"
    } else {
      fin.current.innerText = `${result} has won!`
    }

    fin.current.style.visibility = "visible"
  
  }

  const handleClick = (z,x,y) => {
    console.log(grid)

    setMoves(moves + 1)
    
    setGrid(prev => {
      let na = [...prev]
      na[z][x][y] = turn
      checkWin(na)
      return na
      })

    const checkWin = (array) => {
      //check for win
      
      //check row
      let win = true;
      for (let yy=0; yy<=2; yy++) {
        
        if (array[z][x][yy] != turn) win = false;
      }
      
      if (win) {
        setWinner(`${turn} has won!`)
        //finish(turn)
        return}

      //check col
      win = true;
      for (let xx=0; xx<=2; xx++) {
        if (array[z][xx][y] != turn) win = false;
      }
      
      if (win) {
        setWinner(`${turn} has won!`)
        return
      }

      //check vertical
      win = true;
      for (let zz=0; zz<=2; zz++) {
        if (array[zz][x][y] != turn) win = false;
      }
      
      if (win) {
        setWinner(`${turn} has won!`)
        return
      }

      //check diags
      if (x == 0 && y == 1) return;
      if (x == 2 && y == 1) return;
      if (x == 1 && y == 0) return;
      if (x == 1 && y == 2) return;
      win = true;
      let yy = 0;
      for (let xx=0; xx<=2; xx++) {
        //console.log("checking",xx,yy,array[xx][yy])
        if (array[z][xx][yy] != turn) win = false;
        yy++;
      }
          if (win) {
        setWinner(`${turn} has won!`)
        //finish(turn)
        return}

      win = true;
      yy = 2;
      for (let xx=0; xx<=2; xx++) {
        //console.log("checking",xx,yy,array[xx][yy])
        if (array[z][xx][yy] != turn) win = false;
        yy--;
      }
            if (win) {
        setWinner(`${turn} has won!`)
        //finish(turn)
        return}
    }

    console.log(moves)
    if (moves == 8) setWinner("It's a tie!")

  }

  
  return (
  <div id="game">
    <p id="finish" ref={fin}>{winner}</p>
    <div className='board-wrapper'>
    <div className="board">

      {
        grid[0].map((row,x) => {
          return row.map((square, y) => {
            
          
          return <button 
            onClick={(e) => {
              if (e.target.innerText != "") return;
              console.log(winner)
              if (winner) return;
              handleClick(0,x,y);
              
              setTurn(prev => prev == "X"? "O" : "X")
              
              }}
            key={0+x+y} 
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
              console.log(winner)
              if (winner) return;
              handleClick(1,x,y);
              
              setTurn(prev => prev == "X"? "O" : "X")
              
              }}
            key={1+x+y} 
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
              console.log(winner)
              if (winner) return;
              handleClick(2,x,y);
              
              setTurn(prev => prev == "X"? "O" : "X")
              
              }}
            key={2+x+y} 
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


    } id="reset">Reset</button>
    
    </div>
    
    
  )

}