import { useState, useEffect } from "react";
import "./App.css";
import Level from "./Level.jsx";
import Options from "./Options.jsx";
import hasWon from "./hasWon.jsx";
import playSound from "./playSound.jsx";
import computerMove from "./computerMove.jsx";
import xMoves from "./xMoves.jsx";
import oMoves from "./oMoves.jsx";

export default function App() {
  const [blockCenter, setBlockCenter] = useState(false);
  const sizes = [3, 4, 5];
  const [size, setSize] = useState(3);
  const initialGrid = Array.from({ length: size }, (e) =>
    Array.from({ length: size }, (e) => Array(size).fill(""))
  );
  const flatGrid = Array.from({ length: 1 }, (e) =>
    Array.from({ length: size }, (e) => Array(size).fill(""))
  );
  const [dimensions, setDimensions] = useState("3D");
  const [sound, setSound] = useState(false);
  const [turn, setTurn] = useState("X");
  const [grid, setGrid] = useState(initialGrid);
  const [winner, setWinner] = useState(false);
  const [oplayer, setOplayer] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [difficulty, setDifficulty] = useState("Easy");
  const [showOptions, setShowOptions] = useState(false);

  const createGrid = (size) =>
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Array(size).fill(""))
    );

  //make sure grid updates
  useEffect(() => {
    clearTimeout(resetColor);
    if (dimensions === "3D") {
      setGrid(createGrid(size));
    } else {
      setGrid(
        Array.from({ length: 1 }, (e) =>
          Array.from({ length: size }, (e) => Array(size).fill(""))
        )
      );
    }
  }, [size, dimensions]);

  //highlight winning patterns when dimensions or size changes
  //removed size for now bc it caused a crash
  useEffect(() => {
    for (let i = 0; i < size; i++) {
      highlight([[0, 0, i]], "lightgreen", 1000);
    }
    for (let i = 0; i < size; i++) {
      setTimeout(() => highlight([[0, i, 0]], "lightgreen", 1000), 1500);
    }
    for (let i = 0; i < size; i++) {
      setTimeout(() => highlight([[0, i, i]], "lightgreen", 1000), 3000);
    }

    if (dimensions == "3D") {
      for (let i = 0; i < size; i++) {
        setTimeout(() => highlight([[i, 0, 2]], "lightgreen", 1000), 4500);
      }
      for (let i = 0; i < size; i++) {
        setTimeout(() => highlight([[i, i, i]], "lightgreen", 1000), 6000);
      }
    }
  }, [dimensions]);

  const blockCenterSquare = () => {
    //block center
    if (!(grid[0][1].length % 2 == 0)) {
      let center = [
        Math.floor(grid.length / 2),
        Math.floor(grid[0][1].length / 2),
        Math.floor(grid[0][2].length / 2),
      ];
      let [z, x, y] = center;

      setGrid((prev) => {
        prev[z][x][y] = "B";
        return prev;
      });
    }

    /*
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
    }*/
  };

  const resetGame = () => {
    setWinner(false);
    if (dimensions === "3D") setGrid(initialGrid);
    if (dimensions === "2D") setGrid(flatGrid);
    setTurn("X");
    if (blockCenter) {
      blockCenterSquare();
    }
    xMoves([0, 0, 0], size, dimensions, true);
    oMoves([0, 0, 0], size, dimensions, true);
  };

  //highlight function
  let resetColor;
  const highlight = (array, color, timeDelay) => {
    for (let point of array) {
      let [z, x, y] = point;
      document.getElementById(`${z}${x}${y}`).style.backgroundColor = color;
    }

    resetColor = setTimeout(() => {
      for (let point of array) {
        let [z, x, y] = point;
        document.getElementById(`${z}${x}${y}`).style.backgroundColor = "white";
      }
    }, timeDelay);
  };

  const handleClick = (z, x, y, currentTurn) => {
    if (sound) playSound(currentTurn);

    //update the board
    const newGrid = [...grid];
    newGrid[z][x][y] = turn;
    setGrid(newGrid);

    //check for a win
    let pattern = hasWon(newGrid, [z, x, y], currentTurn, size, dimensions);
    if (pattern) {
      clearTimeout(resetColor);
      setWinner(`${currentTurn} has won!`);
      setScore((prev) => ({ ...prev, [currentTurn]: prev[currentTurn] + 1 }));
      highlight(pattern, "lightgreen", 4000);
      setTurn((prev) => (prev == "X" ? "O" : "X"));
      return;
    }

    //highlight the new move
    highlight([[z, x, y]], "gold", 500);

    //update db of X moves and associated lines
    xMoves([z, x, y], size, dimensions, false);

    //computer move
    if (turn == "X" && oplayer) {
      if (sound) playSound("O");
      let [zz, xx, yy] = computerMove(newGrid, difficulty, grid, xMoves());
      //update omoves db
      oMoves([zz, xx, yy], size, dimensions, false);
      newGrid[zz][xx][yy] = "O";
      highlight([[zz, xx, yy]], "gold", 500);
      setGrid(newGrid);

      //check for a win
      pattern = hasWon(newGrid, [zz, xx, yy], "O", size, dimensions);
      if (pattern) {
        clearTimeout(resetColor);
        setWinner(`${"O"} has won!`);
        setScore((prev) => ({ ...prev, [currentTurn]: prev[currentTurn] + 1 }));

        //highlight the winning line
        highlight(pattern, "lightgreen", 4000);
        setTurn((prev) => (prev == "X" ? "O" : "X"));
        //setGrid(newGrid)
        return;
      }
    } else {
      setTurn((prev) => (prev == "X" ? "O" : "X"));
      return;
    }
  };

  return (
    <div id="game">
      <p id="title">The Matrix: Multi-dimensional Tic Tac Toe</p>

      <div
        id="optionsModal"
        style={{ display: showOptions ? "block" : "none" }}>
        <Options
          id={"modal"}
          size={size}
          score={score}
          oplayer={oplayer}
          blockCenter={blockCenter}
          sound={sound}
          dimensions={dimensions}
          sizes={sizes}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setOplayer={setOplayer}
          setBlockCenter={setBlockCenter}
          setSound={setSound}
          setDimensions={setDimensions}
          resetGame={resetGame}
          setSize={setSize}
          highlight={highlight}
        />

        <p>
          <button
            onClick={() => {
              setShowOptions((prev) => !prev);
            }}>
            Exit Options
          </button>
        </p>
      </div>

      <div className="sidebar">
        <p>
          X: {score["X"]} O: {score["O"]}
        </p>

        <Options
          id={"options"}
          size={size}
          score={score}
          oplayer={oplayer}
          blockCenter={blockCenter}
          sound={sound}
          dimensions={dimensions}
          sizes={sizes}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setOplayer={setOplayer}
          setBlockCenter={setBlockCenter}
          setSound={setSound}
          setDimensions={setDimensions}
          resetGame={resetGame}
          setSize={setSize}
          highlight={highlight}
        />
        <p>
          <button
            onClick={() => {
              setShowOptions((prev) => !prev);
            }}
            id="optionsBtn">
            Options
          </button>
        </p>
        <p>
          <button onClick={resetGame} id="reset">
            Reset
          </button>
        </p>
      </div>

      <div className="center">
        <div className="turn">{winner ? `${winner}` : `${turn}'s Turn`}</div>

        {grid.map((level, index) => (
          <Level
            gridLevel={level}
            level={index}
            winner={winner}
            handleClick={handleClick}
            turn={turn}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}
