import { placePiece } from "./updates";

const validMoves = (board) => {
  var moves = [];
  board[0].forEach((element, index) => {
    if(element === ""){
      moves.push(index)
    }
  })
  return moves;
}

const evaluate = (board, redPaths, yellowPaths, color) => {
  let sumRedPaths = 0
  let sumYellowPaths = 0

  if(getWinner(board, color) && color === 'y'){
    return 100000
  } else if (getWinner(board, color) && color === 'r'){
    return -100000
  }

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
   //horizontal 
   for(var i = 0; i < board.length; i++){
     for(var j = 0; j <= 3; j++){
       if(board[i][j] === color && board[i][j+1] === color && board[i][j+2] === color && board[i][j+3] === color){
         return true
       }
     }
   }
   for(i = 0; i <= 3; i++){
    for(j = 0; j < board[i].length; j++){
      if(board[i][j] === color && board[i+1][j] === color && board[i+2][j] === color && board[i+3][j] === color){
        return true
      }
    }
  }
  for(i = 0; i <= 3; i++){
    for(j = 0; j <= 3; j++){
      if(board[i][j] === color && board[i+1][j+1] === color && board[i+2][j+2] === color && board[i+3][j+3] === color){
        return true
      }
    }
  }
  for(i = 0; i <= 3; i++){
    for(j = 3; j <= board[i].length; j++){
      if(board[i][j] === color && board[i+1][j-1] === color && board[i+2][j-2] === color && board[i+3][j-3] === color){
        return true
      }
    }
  }
   return false;
}

const getOptimalMove = (board, redPaths, yellowPaths, depth, alpha, beta, aiTurn) => {
  //Returns a column that is the optimal move
  let moves = validMoves(board)
  if(depth === 0 || moves.length === 0 ) {
    var evalu = evaluate(board, redPaths, yellowPaths)// need to evaluate board
    console.log(evalu)
    return evalu;
  }
  if(aiTurn){
    var value = -100000
    for(var i = 0; i < moves.length; i++) {
      //get new board state
      const state = placePiece(board, redPaths, yellowPaths, 'y', moves[i])
      value = Math.max(value, getOptimalMove(state.board, state.redPaths, state.yellowPaths, depth-1, alpha, beta, false))
      if(value >= beta){
        break;
      }
      alpha = Math.max(alpha, value)
    }
    return value;
  } else {
    var value = 100000
    for(var i = 0; i < moves.length; i++) {
      //new board state
      const state = placePiece(board, redPaths, yellowPaths, 'r', moves[i])
      value = Math.min(value, getOptimalMove(state.board, state.redPaths, state.yellowPaths, depth-1, alpha, beta, true))
      if(value <= alpha){
        break;
      }
      beta = Math.min(beta, value)
    }
    return value
  }
}

export {validMoves, evaluate, getWinner, getOptimalMove};