import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal">
      <button onClick={onClose}>X</button>
      <div className="overlay" onClick={onClose}></div>
      <div className="content">{children}</div>
    </div>
  )
}

export default ({ children, onClose }) =>
  ReactDOM.createPortal(
    <Modal onClose={onClose}>{children}</Modal>,
    document.getElementById('modal')
  )
