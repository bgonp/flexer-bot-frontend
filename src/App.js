import React from 'react'

import { AuthContextProvider } from 'context/AuthContext'
import { MainRouter } from 'routers/MainRouter'

import 'antd/dist/antd.css'

const App = () => (
  <AuthContextProvider>
    <MainRouter />
  </AuthContextProvider>
)

export default App
