import React from 'react'
import { AuthContextProvider } from 'context/AuthContext'
import { MainRouter } from 'routers/MainRouter'

const App = () => {
  return (
    <AuthContextProvider>
      <MainRouter />
    </AuthContextProvider>
  )
}

export default App
