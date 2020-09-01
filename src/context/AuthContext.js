import React, { useEffect } from 'react'
import { createContext } from 'react'
import { useAuth } from 'hooks/useAuth'

const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {
  const { init, ...auth } = useAuth()

  useEffect(() => {
    init()
  }, [init])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthContext
