import React from 'react'
import { createContext } from 'react'
import { useRepliers } from 'hooks/useRepliers'
import { useTmi } from 'hooks/useTmi'

const RepliersContext = createContext({})

export const RepliersContextProvider = ({ children }) => {
  const repliers = useRepliers()
  const tmi = useTmi(repliers.getReply)

  return (
    <RepliersContext.Provider value={{ tmi, repliers }}>
      {children}
    </RepliersContext.Provider>
  )
}

export default RepliersContext
