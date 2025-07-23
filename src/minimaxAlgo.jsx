// original code is contributed by rag2127
// https://www.geeksforgeeks.org/dsa/finding-optimal-move-in-tic-tac-toe-using-minimax-algorithm-in-game-theory/
// Followed this to add AB Pruning:
// https://www.geeksforgeeks.org/dsa/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/

import evaluate from "./evaluate.jsx";

const computer = "O";
const opponent = "X";

// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
function isMovesLeft(board, size, levels) {
  for (let z = 0; z < levels; z++) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        if (board[z][x][y] == "") return true;
      }
    }
  }
  return false;
}

// This is the minimax function. It
// considers all the possible ways
// the game can go and returns the
// value of the board

// Initial values of
// Alpha and Beta
let MAX = Infinity;
let MIN = -Infinity;

function minimax(board, depth, isMax, alpha, beta, MAX_DEPTH, size, levels) {
  let score = evaluate(board);

  if (depth > MAX_DEPTH) return score;
  // If Maximizer has won the game
  // return his/her evaluated score
  if (score == 10) return score;

  // If Minimizer has won the game
  // return his/her evaluated score
  if (score == -10) return score;

  // If there are no more moves and
  // no winner then it is a tie
  if (isMovesLeft(board, size, levels) == false) return 0;

  // If this maximizer's move
  if (isMax) {
    let best = MIN;

    // Traverse all cells
    MAXI: for (let z = 0; z < levels; z++) {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          // Check if cell is empty
          if (board[z][x][y] == "") {
            // Make the move
            board[z][x][y] = computer;

            // Call minimax recursively
            // and choose the maximum value
            best = Math.max(
              best,
              minimax(
                board,
                depth + 1,
                !isMax,
                alpha,
                beta,
                MAX_DEPTH,
                size,
                levels
              )
            );
            // Undo the move
            board[z][x][y] = "";

            //console.log("best:", best);
            //console.log("beta:", beta, "alpha", alpha);
            alpha = Math.max(alpha, best);

            // Alpha Beta Pruning
            if (beta <= alpha) break MAXI;
          }
        }
      }
    }
    return best;
  }

  // If this minimizer's move
  else {
    let best = MAX; //MAX for AB

    // Traverse all cells
    MINI: for (let z = 0; z < levels; z++) {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          // Check if cell is empty
          //console.log("z", z, "s");
          if (board[z][x][y] == "") {
            // Make the move
            board[z][x][y] = opponent;

            // Call minimax recursively and
            // choose the minimum value
            best = Math.min(
              best,
              minimax(
                board,
                depth + 1,
                !isMax,
                alpha,
                beta,
                MAX_DEPTH,
                size,
                levels
              )
            );

            // Undo the move
            board[z][x][y] = "";

            //console.log("best:", best);
            //console.log("beta:", beta, "alpha", alpha);
            beta = Math.min(beta, best);

            // Alpha Beta Pruning
            if (beta <= alpha) break MINI;
          }
        }
      }
    }
    return best;
  }
}

// This will return the best possible
// move for the computer
const minimaxAlgo = (inputBoard, difficulty) => {
  let board = inputBoard.map((level) => level.map((row) => [...row]));
  let size = board[0][1].length;
  let levels = board.length;
  let MAX_DEPTH = 5;
  //3x3:
  //3 is bad, 4 is unbeatable
  //4x4
  //4 good speed, draw
  //5x5:
  //30s for 1st move, too slow, draw
  //3x3x3:
  //3 is bad, 5 seconds, terrible moves
  //4 3m for 1st move, 1m20 for 2nd move, too slow but moves are ok
  //after pruning:
  //3x3x3
  ///4 only 3s for first few moves, pretty good moves not perfect
  //4x4x4
  //too slow (1m), bad moves (first free square)

  console.log("Running minimax MAX_DEPTH: ", MAX_DEPTH);

  let bestVal = -1000;
  let bestMove = [-1, -1, -1];

  // Traverse all cells, evaluate
  // minimax function for all empty
  // cells. And return the cell
  // with optimal value.
  for (let z = 0; z < levels; z++) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        // Check if cell is empty
        if (board[z][x][y] == "") {
          // Make the move
          board[z][x][y] = computer;

          // compute evaluation function
          // for this move.
          let moveVal = minimax(
            board,
            0,
            false,
            MIN,
            MAX,
            MAX_DEPTH,
            size,
            levels
          );

          // Undo the move
          board[z][x][y] = "";

          // If the value of the current move
          // is more than the best value, then
          // update best
          if (moveVal > bestVal) {
            bestMove = [z, x, y];
            bestVal = moveVal;
          }
        }
      }
    }
  }

  return bestMove;
};

export default minimaxAlgo;
