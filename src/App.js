
import React, {useState} from 'react';
import './App.css';
import Cell from './components/Cell/Cell.js';
import Row from './components/Row/Row';

function App() {


  const [state, setState] = useState({
    board: [...Array(7)].map(e => Array(7).fill("")),
    redPaths:[[1, 1, 1, 1, 0, 0, 0],
              [1, 1, 1, 1, 0, 0, 0],
              [1, 1, 1, 1, 0, 0, 0],
              [3, 3, 3, 4, 2, 2, 2],
              [3, 3, 3, 4, 2, 2, 2],
              [3, 3, 3, 4, 2, 2, 2],
              [3, 3, 3, 4, 2, 2, 2]],
    yellowPaths: [[1, 1, 1, 1, 0, 0, 0],
                  [1, 1, 1, 1, 0, 0, 0],
                  [1, 1, 1, 1, 0, 0, 0],
                  [3, 3, 3, 4, 2, 2, 2],
                  [3, 3, 3, 4, 2, 2, 2],
                  [3, 3, 3, 4, 2, 2, 2],
                  [3, 3, 3, 4, 2, 2, 2]],

  });

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

  const placePiece = (currentState, color, column) => {
    const nextState = {...currentState}
    //this can be removed once we only get the valid moves
    if(nextState.board[0][column]){
      return nextState;
    } else {
      let r = 6;
      while(r >=0 && nextState.board[r][column] !== ""){
        r--;
      }
      color === 'y' ? updateLines(nextState.board, nextState.redPaths, "y", r, column) : updateLines(nextState.board, nextState.yellowPaths, "r", r, column);
      setState(nextState)
      
      nextState.board[r][column] = color
    }
    return setState(nextState)
  }

  
  return (
    <div className="app">
      <div className='board'>
        {state.board && state.board.map(row => <Row cells={row}/>)}
      </div>
      {JSON.stringify(state)}
      <button onClick={() => placePiece(state, "y", 3)}>Click to place on 3</button>
      <button onClick={() => placePiece(state, "r", 2)}>Click to place on 2</button>
      <br></br>
      {JSON.stringify(validMoves(state.board))}
      <p>Evaluation: {evaluate(state.redPaths, state.yellowPaths)}</p>


    </div>
  );
}

export default App;
