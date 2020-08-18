import React, { useContext } from 'react'
import AuthContext from 'context/AuthContext'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const { email, isAuthed, logout } = useContext(AuthContext)

  return (
    <div>
      <span>Navbar {email}</span>
      {isAuthed ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  )
}
