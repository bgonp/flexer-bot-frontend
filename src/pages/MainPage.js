import React, { useContext } from 'react'

import AuthContext from 'context/AuthContext'
import { ChatContextProvider } from 'context/RepliersContext'

import { Layout } from 'components/Layout'
import { TmiForm } from 'components/TmiForm'
import { Repliers } from 'components/Repliers'
import { Welcome } from 'components/Welcome'

export const MainPage = () => {
  const { isCreated } = useContext(AuthContext)

  return (
    <Layout>
      {isCreated ? (
        <ChatContextProvider>
          <TmiForm />
          <Repliers />
        </ChatContextProvider>
      ) : (
        <Welcome />
      )}
    </Layout>
  )
}
