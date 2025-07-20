import oMoves from "./oMoves.jsx";

const winningPatterns = oMoves();

const computerMove = (newGrid, difficulty, grid, xPatterns) => {
  const takeCenterSquare = () => {
    if (!(grid[0][1].length % 2 == 0)) {
      let center = [
        Math.floor(grid.length / 2),
        Math.floor(grid[0][1].length / 2),
        Math.floor(grid[0][2].length / 2),
      ];
      let [z, x, y] = center;
      if (newGrid[z][x][y] === "" && grid[z][x][y] === "") {
        console.log("return:", center);
        return center;
      }
    }
  };

  const blockxn1 = () => {
    //block X n-1
    //make db of patterns
    let possibleMoves = [[[], 0]];

    for (let pattern of xPatterns) {
      //count Xs it has
      let num = 0;
      for (let array of pattern) {
        let [zz, xx, yy] = array;
        if (newGrid[zz][xx][yy] == "X") {
          num++;
        }
      }
      //store it if it's >= n-1
      if (num >= grid[0][1].length - 1) {
        possibleMoves.push([pattern]);
      }
    }

    //sort by weight
    possibleMoves.sort((a, b) => a[1] - b[1]);

    //loop through possible moves, bigger weight first
    //Return the first free space
    for (let i = possibleMoves.length - 1; i >= 0; i--) {
      //element of randomness so the game isn't identical each run
      //let rnd = Math.floor(Math.random() * 100);
      //if (rnd < 75) continue;
      for (let pattern of possibleMoves[i]) {
        if (!Array.isArray(pattern)) continue;
        for (let array of pattern) {
          let [zz, xx, yy] = array;
          if (newGrid[zz][xx][yy] == "") {
            return [parseInt(zz), parseInt(xx), parseInt(yy)];
          }
        }
      }
    }
  };

  const moreo = () => {
    //Go with with where there is more O
    //make db of patterns
    let possibleMoves = [[[], 0]];
    for (let pattern of winningPatterns) {
      //count 0s it has
      let num = 0;
      for (let array of pattern) {
        let [zz, xx, yy] = array;
        if (newGrid[zz][xx][yy] == "O") {
          num++;
        }
      }
      //store it, num is weight
      if (num > 0) {
        possibleMoves.push([pattern, num]);
      }
    }
    //sort by weight
    possibleMoves.sort((a, b) => a[1] - b[1]);

    //loop through possible moves, bigger weight first
    //Return the first free space
    for (let i = possibleMoves.length - 1; i >= 0; i--) {
      //element of randomness so the game isn't identical each run
      let rnd = Math.floor(Math.random() * 100);
      if (rnd < 50 && possibleMoves.length > 2) continue;
      for (let pattern of possibleMoves[i]) {
        if (!Array.isArray(pattern)) continue;
        for (let array of pattern) {
          let [zz, xx, yy] = array;
          if (newGrid[zz][xx][yy] == "") {
            return [parseInt(zz), parseInt(xx), parseInt(yy)];
          }
        }
      }
    }
  };

  const morex = () => {
    //EASY mode most "X"
    //make db of patterns
    let possibleMoves = [[[], 0]];

    for (let pattern of xPatterns) {
      //count Xs it has
      let num = 0;
      for (let array of pattern) {
        let [zz, xx, yy] = array;
        if (newGrid[zz][xx][yy] == "X") {
          num++;
        }
      }
      //store it if it's > 0, num is weight
      if (num > 0) {
        possibleMoves.push([pattern, num]);
      }
    }

    //sort by weight
    possibleMoves.sort((a, b) => a[1] - b[1]);

    //loop through possible moves, bigger weight first
    //Return the first free space
    for (let i = possibleMoves.length - 1; i >= 0; i--) {
      //element of randomness so the game isn't identical each run
      let rnd = Math.floor(Math.random() * 100);
      if (rnd < 50 && possibleMoves.length > 2) continue;
      for (let pattern of possibleMoves[i]) {
        if (!Array.isArray(pattern)) continue;
        for (let array of pattern) {
          let [zz, xx, yy] = array;
          if (newGrid[zz][xx][yy] == "") {
            return [parseInt(zz), parseInt(xx), parseInt(yy)];
          }
        }
      }
    }
  };

  if (difficulty == "Medium" || difficulty == "Hard") {
    if (difficulty == "Hard") {
      if (takeCenterSquare()) return takeCenterSquare();
      if (blockxn1()) return blockxn1(); //lines where x needs 1 more to win
    }
    if (moreo()) return moreo(); //lines with most o
  }
  if (morex()) return morex(); //lines with most x

  //look for points that are common in different xPatterns
  //console.log(xPatterns);
};

export default computerMove;
