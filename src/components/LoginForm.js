import React, { useState, useContext, useCallback } from 'react'
import { Alert, Spin, Input, Button } from 'antd'

import AuthContext from 'context/AuthContext'

export const LoginForm = () => {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('vayaustecondioh@gmail.com')
  const [password, setPassword] = useState('123456')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)
      setError(false)

      const { success, error } = await login(email, password)

      if (!success) {
        setLoading(false)
        setError(error)
      }
    },
    [login, email, password]
  )

  return (
    <Spin size="large" spinning={loading}>
      <form>
        {error && <Alert severity="error" message={error} type="error" showIcon />}
        <Input
          type="email"
          label="E-mail"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          disabled={loading}
        />
        <Input.Password
          type="password"
          label="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          disabled={loading}
        />
        <Button onClick={handleSubmit} type="primary" disabled={loading}>
          {/* TODO: Esto del onClick es una guarrada temporal */}
          Log in
        </Button>
      </form>
    </Spin>
  )
}
