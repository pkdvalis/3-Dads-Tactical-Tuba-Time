const hasWon = (array, square, turn, n, dimensions) => {
  const [z, x, y] = square;
  let pattern = [];

  //check col
  for (let i = 0; i < n; i++) {
    pattern.push([z, i, y]);
    if (array[z][i][y] != turn) break;
    if (i == n - 1) {
      return pattern;
    }
  }

  //check row
  pattern = [];
  for (let i = 0; i < n; i++) {
    pattern.push([z, x, i]);
    if (array[z][x][i] != turn) break;
    if (i == n - 1) {
      return pattern;
    }
  }

  //check diag
  pattern = [];
  if (x == y) {
    for (let i = 0; i < n; i++) {
      pattern.push([z, i, i]);
      if (array[z][i][i] != turn) break;
      if (i == n - 1) {
        return pattern;
      }
    }
  }

  //check anti diag (thanks rampion)
  pattern = [];
  if (x + y == n - 1) {
    for (let i = 0; i < n; i++) {
      pattern.push([z, i, n - 1 - i]);
      if (array[z][i][n - 1 - i] != turn) break;
      if (i == n - 1) {
        return pattern;
      }
    }
  }

  //continue if 3D
  if (dimensions == "3D") {
    //vertical
    pattern = [];
    for (let i = 0; i < n; i++) {
      pattern.push([i, x, y]);
      if (array[i][x][y] != turn) break;
      if (i == n - 1) {
        return pattern;
      }
    }

    //vertical diag row
    pattern = [];
    if (z == y) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, x, i]);
        if (array[i][x][i] != turn) break;
        if (i == n - 1) {
          return pattern;
        }
      }
    }

    //vertical antidiag row
    pattern = [];
    if (z + y == n - 1) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, x, n - 1 - i]);
        if (array[i][x][n - 1 - i] != turn) break;
        if (i == n - 1) {
          return pattern;
        }
      }
    }

    //vertical diag col
    pattern = [];
    if (z == x) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, i, y]);
        if (array[i][i][y] != turn) break;
        if (i == n - 1) {
          return pattern;
        }
      }
    }

    //vertical antidiag row
    pattern = [];
    if (z + x == n - 1) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, n - 1 - i, y]);
        if (array[i][n - 1 - i][y] != turn) break;
        if (i == n - 1) {
          return pattern;
        }
      }
    }

    //vertial corners diag
    pattern = [];
    if (z == x && x == y) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, i, i]);
        if (array[i][i][i] != turn) break;
        if (i == n - 1) {
          return pattern;
        }
      }
    }

    pattern = [];
    if (z == y && y == n - 1 - x) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, n - 1 - i, i]);
        if (array[i][n - 1 - i][i] != turn) break;
        if (i == n - 1) {
          return pattern;
        }
      }
    }

    pattern = [];
    if (x == y && y == n - 1 - z) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, n - 1 - i, n - 1 - i]);
        if (array[i][n - 1 - i][n - 1 - i] != turn) break;
        if (i == n - 1) {
          return pattern;
        }
      }
    }

    pattern = [];
    if (z == x && x == n - 1 - y) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, i, n - 1 - i]);
        if (array[i][i][n - 1 - i] != turn) break;
        if (i == n - 1) {
          return pattern;
        }
      }
    }
  }
  return false;
};

export default hasWon;
