import React from 'react'
import './button.css'

function Button(props) {
    const {buttonText, handleClick} = props
  return (
    <div>
        <button className='btn' onClick={handleClick}>{buttonText}</button>
    </div>
  )
}

export default Button