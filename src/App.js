import React from 'react'
import './App.css'
import { AuthContext } from 'context/AuthContext'
import { useAuth } from 'hooks/useAuth'
import { MainRouter } from 'routers/MainRouter'

const App = () => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      <MainRouter />
    </AuthContext.Provider>
  )
}

export default App
