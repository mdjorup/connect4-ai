
import React, {useState, useEffect} from 'react';
import './App.css';
import Button from './components/Button/Button';
import Row from './components/Row/Row';

import axios from 'axios';

import {makeBoard, makeNewPaths} from './functions/initialization';

import _ from 'lodash';

function App() {

  const [board, setBoard] = useState(makeBoard())
  const [redPaths, setRedPaths] = useState(makeNewPaths());
  const [yellowPaths, setYellowPaths] = useState(makeNewPaths());

  const [gameOver, setGameOver] = useState(false);
  const [evaluation, setEvaluation] = useState(0);

  const [turn, setTurn] = useState('r');

  
  const reset = () => {
    setBoard(makeBoard());
    setRedPaths(makeNewPaths());
    setYellowPaths(makeNewPaths());
    setGameOver(false);
    setEvaluation(0);
    setTurn('r')
  }

  

  const move = (color, boardp, redp, yellowp, column) => {

    axios.post('http://localhost:5000/move/', {
      'color': color,
      'board': boardp,
      'redPaths': redp,
      'yellowPaths': yellowp,
      'column': column,
    }).then(response => {
      const data = response.data
      setBoard(data.board)
      setRedPaths(data.redPaths)
      setYellowPaths(data.yellowPaths)
      setEvaluation(data.evaluation)
      setGameOver(data.winner)
      console.log(data)
      if (color === 'r' && !data.winner){
        move('y', data.board, data.redPaths, data.yellowPaths, null)
      }
    })

    

    // const state = placePiece(board, redPaths, yellowPaths, "r", column)
    // const winner = getWinner(board, "r")
    // if(winner){
    //   setGameOver(true);
    // }
    // const optimal = getOptimalMove(_.cloneDeep(state.board), _.cloneDeep(state.redPaths), _.cloneDeep(state.yellowPaths), 1, -100000, 100000, true)
    // console.log("Got here")
    // const newState = placePiece(_.cloneDeep(state.board), _.cloneDeep(state.redPaths), _.cloneDeep(state.yellowPaths), "y", optimal)
    // console.log("Got Here 2")
    // setBoard(newState.board)
    // setRedPaths(newState.redPaths)
    // setYellowPaths(newState.yellowPaths)
    // const winner2 = getWinner(board, "y")
    // if(winner2){
    //   setGameOver(true);
    // }
  }


  
  return (
    <div className="app">
      <div className='game'>
        {!gameOver && <div className='buttons'>
          {[0, 1, 2, 3, 4, 5, 6].map(element => <Button key={element} text={"Place"} onClick={() => move('r', board, redPaths, yellowPaths, element)}/>)}
        </div>}
        <div className='board'>
          {board && board.map((row, i) => <Row key={i} cells={row}/>)}
        </div>
      </div>
      <div className="game__settings">
        <p className='text'>Evaluation: {evaluation}</p>
        <p className='text'>Try to Beat my Connect 4!</p>
        <p className='text'>Start by placing your piece in any column</p>
        <Button text="Reset" onClick={reset}/>
      </div>

    </div>
  );
}

export default App;
