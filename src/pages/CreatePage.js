import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import AuthContext from 'context/AuthContext'

import { CreateForm } from 'components/CreateForm'
import { Layout } from 'components/Layout'

export const CreatePage = () => {
  const { isCreated } = useContext(AuthContext)

  if (isCreated) {
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <CreateForm />
    </Layout>
  )
}
