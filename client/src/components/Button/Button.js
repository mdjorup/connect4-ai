import "./Button.css"

import React from 'react'

function Button({text, onClick}) {
  return (
    <div className="button__wrapper">
      <button className="button" onClick={onClick}>
        {text}
      </button>
    </div>
  )
}

export default Button