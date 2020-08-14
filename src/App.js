import React from 'react'
import './App.css'
import { TmiForm } from './components/TmiForm'
import { RepliesContext } from './context/RepliesContext'
import { useReplier } from './hooks/useReplier'
import { useTmi } from './hooks/useTmi'

function App() {
  const replier = useReplier()
  const tmi = useTmi(replier.getReply)

  return (
    <div className="App">
      <RepliesContext.Provider value={{ ...tmi, ...replier }}>
        <TmiForm />
      </RepliesContext.Provider>
    </div>
  )
}

export default App
