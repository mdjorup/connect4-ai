const _ = require('lodash');


const updateLines = (board, lines, color, r, c) =>{
  //lines is the 2d array of available moves
  lines[r][c] = 0
  // (1, -1)
  const dirs = [[1, 1], [1, 0], [1, -1], [0, -1]];
  dirs.forEach(element => {
   for(let i = 1; i <= 3; i++) {

     var cur_r = r+i*element[0];
     var cur_c = c+i*element[1];

     if(cur_r < 0 || cur_r > 6 || cur_c < 0 || cur_c > 6){
       break;
     }
     //need to keep 0 if already 0
     if(lines[cur_r][cur_c] === 0){
       continue;
     }
     
     //need to see if the spaces in front are not taken up yet
     var check1 = cur_r-1*element[0];
     var check2 = cur_c-1*element[1];
     var check3 = cur_r-2*element[0];
     var check4 = cur_c-2*element[1];
     var check5 = cur_r-3*element[0];
     var check6 = cur_c-3*element[1];

     let bigCheck1 = check5 >= 0 && check5 <= 6 && check6 >=0 && check6 <=6 && board[check5][check6]===color;
     let bigCheck2 = check3 >= 0 && check3 <= 6 && check4 >=0 && check4 <=6 && board[check3][check4]===color;
     let bigCheck3 = check1 >= 0 && check1 <= 6 && check2 >=0 && check2 <=6 && board[check1][check2]===color;

     if(bigCheck1 || bigCheck2 || bigCheck3){
       continue;
     }
     if(check5 < 0 || check5 > 6 || check6 < 0 || check6 > 6){
       continue;
     }
     
     lines[cur_r][cur_c] -= 1;
     
   }
  })
}

const placePiece = (board, redPaths, yellowPaths, color, column) => {

 const nextBoard = _.cloneDeep(board)
 const nextRedPaths = _.cloneDeep(redPaths)
 const nextYellowPaths = _.cloneDeep(yellowPaths)
 
 //this can be removed once we only get the valid moves
 if(nextBoard[0][column]){
   
   return {
     board: nextBoard,
     redPaths: nextRedPaths,
     yellowPaths: nextYellowPaths
   }
 } else {
   let r = 6;
   while(r >=0 && nextBoard[r][column] !== ""){
     r--;
   }
   color === 'y' ? updateLines(nextBoard, nextRedPaths, "y", r, column) : updateLines(nextBoard, nextYellowPaths, "r", r, column);
   
   nextBoard[r][column] = color
 }
 return {
   board: nextBoard,
   redPaths: nextRedPaths,
   yellowPaths: nextYellowPaths
 }
}


export {updateLines, placePiece}