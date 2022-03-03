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

const getWinner = (board) => {
   
}

export {validMoves, evaluate};