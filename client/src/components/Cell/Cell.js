import React from 'react'
import './Cell.css'


function Cell({fill}) {
  return (
    <div className='cell'>
      <div className={`inner__circle ${fill}`}>

      </div>
    </div>
  )
}

export default Cell