import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import AuthContext from 'context/AuthContext'

import { Layout } from 'components/Layout'
import { LoginForm } from 'components/LoginForm'

export const LoginPage = () => {
  const { isCreated } = useContext(AuthContext)

  if (isCreated) {
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <LoginForm />
    </Layout>
  )
}
