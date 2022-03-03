
import React, {useState} from 'react';
import './App.css';
import Button from './components/Button/Button';
import Row from './components/Row/Row';

import { validMoves, evaluate } from './functions/inspection';
import {updateLines, placePiece} from './functions/updates';

function App() {

  const [board, setBoard] = useState([...Array(7)].map(e => Array(7).fill("")))
  const [redPaths, setRedPaths] = useState([[1, 1, 1, 1, 0, 0, 0],
                                            [1, 1, 1, 1, 0, 0, 0],
                                            [1, 1, 1, 1, 0, 0, 0],
                                            [3, 3, 3, 4, 2, 2, 2],
                                            [3, 3, 3, 4, 2, 2, 2],
                                            [3, 3, 3, 4, 2, 2, 2],
                                            [3, 3, 3, 4, 2, 2, 2]]);
  const [yellowPaths, setYellowPaths] = useState([[1, 1, 1, 1, 0, 0, 0],
                                                  [1, 1, 1, 1, 0, 0, 0],
                                                  [1, 1, 1, 1, 0, 0, 0],
                                                  [3, 3, 3, 4, 2, 2, 2],
                                                  [3, 3, 3, 4, 2, 2, 2],
                                                  [3, 3, 3, 4, 2, 2, 2],
                                                  [3, 3, 3, 4, 2, 2, 2]]);

  const [turn, setTurn] = useState("r");


  
  return (
    <div className="app">
      <div className='game'>
        <div className='buttons'>
          {[0, 1, 2, 3, 4, 5, 6].map(element => <Button text={"Place"} onClick={()=> {
            const state = placePiece(board, redPaths, yellowPaths, "r", element)
            setBoard(state.board)
            setRedPaths(state.redPaths)
            setYellowPaths(state.yellowPaths)
          }}/>)}
        </div>
        <div className='board'>
          {board && board.map(row => <Row cells={row}/>)}
        </div>
      </div>
      {JSON.stringify(board)}
      <br></br>
      {JSON.stringify(redPaths)}
      <br></br>
      {JSON.stringify(yellowPaths)}

      
      <br></br>
      {JSON.stringify(validMoves(board))}
      <p>Evaluation: {evaluate(redPaths, yellowPaths)}</p>


    </div>
  );
}

export default App;
