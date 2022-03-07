const validMoves = (board) => {
  var moves = [];
  board[0].forEach((element, index) => {
    if(element === ""){
      moves.push(index)
    }
  })
  return moves;
}

const evaluate = (redPaths, yellowPaths) => {
  let sumRedPaths = 0
  let sumYellowPaths = 0

  for(var r =0; r<redPaths.length; r++){
    for(var c = 0; c < redPaths[r].length; c++){
      sumRedPaths += redPaths[r][c]
      sumYellowPaths += yellowPaths[r][c]
    }

  }
  //computer is yellow:
  return sumYellowPaths - sumRedPaths;
}

const getWinner = (board, color) => {
   //true if there is a winner, false if not. Only check if the color is a winner
   return false;
}

const getOptimalMove = (board, redPaths, yellowPaths) => {
  //Returns a column that is the optimal move
  return 4;
}

export {validMoves, evaluate, getWinner, getOptimalMove};