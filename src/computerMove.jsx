import oMoves from "./oMoves.jsx";

const winningPatterns = oMoves();

const computerMove = (newGrid, difficulty, grid, xPatterns) => {
  if (difficulty == "Hard") {
    //take center if it's free
    if (!(grid[0][1].length % 2 == 0)) {
      let center = [
        Math.floor(grid.length / 2),
        Math.floor(grid[0][1].length / 2),
        Math.floor(grid[0][2].length / 2),
      ];
      let [z, x, y] = center;
      if (newGrid[z][x][y] === "" && grid[z][x][y] === "") {
        return center;
      }
    }

    //make db of patterns
    let possibleMoves = [];
    for (let pattern of winningPatterns) {
      //count 0s it has
      let num = 0;
      for (let array of pattern) {
        let [zz, xx, yy] = array;
        if (newGrid[zz][xx][yy] == "O") {
          num++;
        }
      }
      //store it if it has 2 "O"s

      if (num == 2) {
        possibleMoves.push([pattern]);
      }
    }

    //Return a free space in the pattern
    for (let i = possibleMoves.length - 1; i >= 0; i--) {
      for (let pattern of possibleMoves[i]) {
        for (let array of pattern) {
          let [zz, xx, yy] = array;
          if (newGrid[zz][xx][yy] == "") {
            return [parseInt(zz), parseInt(xx), parseInt(yy)];
          }
        }
      }
    }
  }

  //EASY mode
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
    //store it if it's biggest, num is weight
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
    if (rnd < 50) continue;
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

export default computerMove;
