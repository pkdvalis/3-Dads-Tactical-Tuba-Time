//if an argument is given add to the array
//if no argument is given return the array

const oPatterns = [];

const oMoves = (array, n, dimensions, reset) => {
  if (reset) oPatterns.splice(0, oPatterns.length);
  if (array == undefined) return oPatterns;

  const [z, x, y] = array;
  let pattern = [];

  //add 2D col
  for (let i = 0; i < n; i++) {
    pattern.push([z, i, y]);
  }
  oPatterns.push(pattern);

  //2D row
  pattern = [];
  for (let i = 0; i < n; i++) {
    pattern.push([z, x, i]);
  }
  oPatterns.push(pattern);

  //diag
  pattern = [];
  if (x == y) {
    for (let i = 0; i < n; i++) {
      pattern.push([z, i, i]);
    }
    oPatterns.push(pattern);
  }

  //add anti diag
  pattern = [];
  if (x + y == n - 1) {
    for (let i = 0; i < n; i++) {
      pattern.push([z, i, n - 1 - i]);
    }
    oPatterns.push(pattern);
  }

  //continue if 3D
  if (dimensions == "3D") {
    //vertical
    pattern = [];
    for (let i = 0; i < n; i++) {
      pattern.push([i, x, y]);
    }
    oPatterns.push(pattern);

    //vertical diag row
    pattern = [];
    if (z == y) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, x, i]);
      }
      oPatterns.push(pattern);
    }

    //vertical antidiag row
    pattern = [];
    if (z + y == n - 1) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, x, n - 1 - i]);
      }
      oPatterns.push(pattern);
    }

    //vertical diag col
    pattern = [];
    if (z == x) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, i, y]);
      }
      oPatterns.push(pattern);
    }

    //vertical antidiag row
    pattern = [];
    if (z + x == n - 1) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, n - 1 - i, y]);
      }
      oPatterns.push(pattern);
    }

    //vertial corners diag
    pattern = [];
    if (z == x && x == y) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, i, i]);
      }
      oPatterns.push(pattern);
    }

    pattern = [];
    if (z == y && y == n - 1 - x) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, n - 1 - i, i]);
      }
      oPatterns.push(pattern);
    }

    pattern = [];
    if (x == y && y == n - 1 - z) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, n - 1 - i, n - 1 - i]);
      }
      oPatterns.push(pattern);
    }

    pattern = [];
    if (z == x && x == n - 1 - y) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, i, n - 1 - i]);
      }
      oPatterns.push(pattern);
    }
  }
};

export default oMoves;
