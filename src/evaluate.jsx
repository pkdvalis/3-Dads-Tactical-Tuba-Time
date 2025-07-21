function evaluate(b) {
  const n = b[0][1].length;
  const levels = b.length;
  console.log(n, levels);

  //check row

  for (let z = 0; z < levels; z++) {
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        if (b[z][x][y] != b[z][x][0]) break;
        if (y === n - 1) {
          if (b[z][x][0] === "O") return +10;
          if (b[z][x][0] === "X") return -10;
        }
      }
    }
  }

  //check col

  for (let z = 0; z < levels; z++) {
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        console.log(b[z][x][y], b[z][0][y]);
        if (b[z][x][y] != b[z][0][y]) break;
        if (x === n - 1) {
          if (b[z][0][y] === "O") return +10;
          if (b[z][0][y] === "X") return -10;
        }
      }
    }
  }

  //check diag

  for (let z = 0; z < levels; z++) {
    for (let i = 0; i < n; i++) {
      if (b[z][i][i] != b[z][0][0]) break;
      if (i === n - 1) {
        if (b[z][0][0] === "O") return +10;
        if (b[z][0][0] === "X") return -10;
      }
    }
  }

  //check anti diag

  for (let z = 0; z < levels; z++) {
    for (let i = 0; i < n; i++) {
      if (b[z][i][n - 1 - i] != b[z][0][n - 1]) break;
      if (i === n - 1) {
        if (b[z][0][n - 1] === "O") return +10;
        if (b[z][0][n - 1] === "X") return -10;
      }
    }
  }

  //continue if 3D
  if (levels == 3) {
    for (let x = 0; x < levels; x++) {
      for (let y = 0; y < n; y++) {
        for (let z = 0; z < n; z++) {
          if (b[z][x][y] != b[0][x][y]) break;
          if (z === n - 1) {
            if (b[0][x][y] === "O") return +10;
            if (b[0][x][y] === "X") return -10;
          }
        }
      }
    }

    //vertical diag row

    for (let x = 0; x < n; x++) {
      for (let i = 0; i < n; i++) {
        if (b[i][x][i] != b[0][x][0]) break;
        if (i === n - 1) {
          if (b[0][x][0] === "O") return +10;
          if (b[0][x][0] === "X") return -10;
        }
      }
    }

    //vertical antidiag row

    for (let x = 0; x < n; x++) {
      for (let i = 0; i < n; i++) {
        if (b[i][x][n - 1 - i] != b[0][x][n - 1]) break;
        if (i === n - 1) {
          if (b[0][x][n - 1] === "O") return +10;
          if (b[0][x][n - 1] === "X") return -10;
        }
      }
    }

    //vertical diag col

    for (let y = 0; y < n; y++) {
      for (let i = 0; i < n; i++) {
        if (b[i][i][y] != b[0][0][y]) break;
        if (i === n - 1) {
          if (b[0][0][y] === "O") return +10;
          if (b[0][0][y] === "X") return -10;
        }
      }
    }

    //vertical antidiag row

    for (let y = 0; y < n; y++) {
      for (let i = 0; i < n; i++) {
        if (b[i][n - 1 - i][y] != b[0][n - 1][y]) break;
        if (i === n - 1) {
          if (b[0][n - 1][y] === "O") return +10;
          if (b[0][n - 1][y] === "X") return -10;
        }
      }
    }

    //vertial corners diag

    for (let i = 0; i < n; i++) {
      if (b[i][i][i] != b[0][0][0]) break;
      if (i === n - 1) {
        if (b[0][0][0] === "O") return +10;
        if (b[0][0][0] === "X") return -10;
      }
    }

    for (let i = 0; i < n; i++) {
      if (b[i][n - 1 - i][i] != b[0][n - 1][0]) break;
      if (i === n - 1) {
        if (b[0][n - 1][0] === "O") return +10;
        if (b[0][n - 1][0] === "X") return -10;
      }
    }

    for (let i = 0; i < n; i++) {
      if (b[i][n - 1 - i][n - 1 - i] != b[0][n - 1][n - 1]) break;
      if (i === n - 1) {
        if (b[0][n - 1][n - 1] === "O") return +10;
        if (b[0][n - 1][n - 1] === "X") return -10;
      }
    }

    for (let i = 0; i < n; i++) {
      if (b[i][i][n - 1 - i] != b[0][0][n - 1]) break;
      if (i === n - 1) {
        if (b[0][0][n - 1] === "O") return +10;
        if (b[0][0][n - 1] === "X") return -10;
      }
    }
  }

  // Else if none of them have won then return 0
  return 0;
}

export default evaluate;
