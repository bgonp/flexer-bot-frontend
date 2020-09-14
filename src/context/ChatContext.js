import React from 'react'
import { createContext } from 'react'

import { useRepliers } from 'hooks/useRepliers'
import { useTmi } from 'hooks/useTmi'

const ChatContext = createContext({})

export const ChatContextProvider = ({ children }) => {
  const repliers = useRepliers()
  const tmi = useTmi(repliers.getReply)

  return (
    <ChatContext.Provider value={{ ...tmi, ...repliers }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContext
