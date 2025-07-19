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

  const computerMove = (newGrid, difficulty, grid, xPatterns) => {
    
    const dimensions = [ grid.length, grid[0].length ];

    //take center if it's free (hard mode only)
    if (difficulty == "Hard") {
      if (!(grid[0][1].length % 2 == 0)) {
        let center = [Math.floor(grid.length/2),
                      Math.floor(grid[0][1].length/2),
                      Math.floor(grid[0][2].length/2)]
        let [z,y,x] = center;
        if (newGrid[z][y][x] === "" && grid[z][y][x] === "") {
          return center;
        }
      }



      //make db of patterns
      let possibleMoves = [];
      for (let pattern of winningPatterns) {
        
          //count 0s it has
          let num = 0;
          for (let array of pattern) {
            let [zz,xx,yy] = array.split(",")
            if (newGrid[zz][xx][yy] == "O") {
              num++;
            }
          }
          //store it if it has 2 "O"s
        
          if (num == 2) {
            possibleMoves.push([pattern])
          }
          
        }
        
          //Return a free space in the pattern
          for (let i = possibleMoves.length - 1; i >= 0; i--) {
            for (let pattern of possibleMoves[i]) {
              for (let array of pattern) {
                
                let [zz,xx,yy] = array.split(",")
                  if (newGrid[zz][xx][yy] == "") {
                    
                    return [parseInt(zz),parseInt(xx),parseInt(yy)];
                  }
            }
          }
        }
    }



    //make db of patterns
    let possibleMoves = [[[],0]];
    
    for (let pattern of xPatterns) {
        
        //count Xs it has
        let num = 0;
        for (let array of pattern) {
          
          let [zz,xx,yy] = array
          if (newGrid[zz][xx][yy] == "X") {
            num++;
          }
        }
        //store it if it's biggest
        if (num > 0) {
          possibleMoves.push([pattern,num])
        }
        
      }
      
      possibleMoves.sort((a, b) => a[1] - b[1]);
              
        //Return a free space in the pattern
        for (let i = possibleMoves.length - 1; i >= 0; i--) {
          for (let pattern of possibleMoves[i]) {
            if (!Array.isArray(pattern)) continue;
            for (let array of pattern) {
              
              let [zz,xx,yy] = array
                if (newGrid[zz][xx][yy] == "") {
                  
                  return [parseInt(zz),parseInt(xx),parseInt(yy)];
                }
          }
        }
      }
        
     
  }

  export default computerMove;