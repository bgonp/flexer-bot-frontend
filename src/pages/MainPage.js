import React from 'react'
import { RepliesContext } from 'context/RepliesContext'
import { TmiForm } from 'components/TmiForm'
import { useReplier } from 'hooks/useReplier'
import { useTmi } from 'hooks/useTmi'
import { Repliers } from 'components/Repliers'
import { Navbar } from 'components/Navbar'

export const MainPage = () => {
  const replier = useReplier()
  const tmi = useTmi(replier.getReply)

  return (
    <RepliesContext.Provider value={{ tmi, replier }}>
      <Navbar />
      <TmiForm />
      <Repliers />
    </RepliesContext.Provider>
  )
}
