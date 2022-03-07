import React from 'react'
import Cell from '../Cell/Cell'
import './Row.css'

function Row({cells}) {
  return (
    <div className='row'>
      {cells.map(cell => <Cell fill={cell}/> )}
    </div>
  )
}

export default Row