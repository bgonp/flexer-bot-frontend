import React, { useContext } from 'react'
import AuthContext from 'context/AuthContext'
import { Redirect, Route } from 'react-router-dom'

export const NotAuthedRouter = ({ component: Component, ...rest }) => {
  const { isAuthed } = useContext(AuthContext)

  if (isAuthed) {
    return <Redirect to="/" />
  }

  return <Route {...rest} component={(props) => <Component {...props} />} />
}
