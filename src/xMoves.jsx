//if an argument is given add to the array
//if no argument is given return the array

const xPatterns = [];

const xMoves = (array, n, dimensions, reset) => {
  if (reset) xPatterns.splice(0, xPatterns.length);
  if (array == undefined) return xPatterns;

  const [z, x, y] = array;
  let pattern = [];

  //add 2D col
  for (let i = 0; i < n; i++) {
    pattern.push([z, i, y]);
  }
  xPatterns.push(pattern);

  //2D row
  pattern = [];
  for (let i = 0; i < n; i++) {
    pattern.push([z, x, i]);
  }
  xPatterns.push(pattern);

  //diag
  pattern = [];
  if (x == y) {
    for (let i = 0; i < n; i++) {
      pattern.push([z, i, i]);
    }
    xPatterns.push(pattern);
  }

  //add anti diag
  pattern = [];
  if (x + y == n - 1) {
    for (let i = 0; i < n; i++) {
      pattern.push([z, i, n - 1 - i]);
    }
    xPatterns.push(pattern);
  }

  //continue if 3D
  if (dimensions == "3D") {
    //vertical
    pattern = [];
    for (let i = 0; i < n; i++) {
      pattern.push([i, x, y]);
    }
    xPatterns.push(pattern);

    //vertical diag row
    pattern = [];
    if (z == y) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, x, i]);
      }
      xPatterns.push(pattern);
    }

    //vertical antidiag row
    pattern = [];
    if (z + y == n - 1) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, x, n - 1 - i]);
      }
      xPatterns.push(pattern);
    }

    //vertical diag col
    pattern = [];
    if (z == x) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, i, y]);
      }
      xPatterns.push(pattern);
    }

    //vertical antidiag row
    pattern = [];
    if (z + x == n - 1) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, n - 1 - i, y]);
      }
      xPatterns.push(pattern);
    }

    //vertial corners diag
    pattern = [];
    if (z == x && x == y) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, i, i]);
      }
      xPatterns.push(pattern);
    }

    pattern = [];
    if (z == y && y == n - 1 - x) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, n - 1 - i, i]);
      }
      xPatterns.push(pattern);
    }

    pattern = [];
    if (x == y && y == n - 1 - z) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, n - 1 - i, n - 1 - i]);
      }
      xPatterns.push(pattern);
    }

    pattern = [];
    if (z == x && x == n - 1 - y) {
      for (let i = 0; i < n; i++) {
        pattern.push([i, i, n - 1 - i]);
      }
      xPatterns.push(pattern);
    }
  }
};

export default xMoves;
