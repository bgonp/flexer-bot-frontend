import React, { useContext, useState, useCallback } from 'react'
import { Alert, Spin, Input, Button } from 'antd'

import AuthContext from 'context/AuthContext'

export const RegisterForm = () => {
  const { register } = useContext(AuthContext)

  const [email, setEmail] = useState('vayaustecondioh@gmail.com')
  const [password, setPassword] = useState('123456')
  const [repeat, setRepeat] = useState('123456')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (password !== repeat) {
        setError("Passwords don't match")
      } else {
        setLoading(true)
        setError(false)

        const { success, error } = await register(email, password)

        if (!success) {
          setLoading(false)
          setError(error)
        }
      }
    },
    [register, email, password, repeat]
  )

  return (
    <Spin size="large" spinning={loading}>
      <form>
        {error && <Alert severity="error" message={error} type="error" showIcon />}
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          disabled={loading}
        />
        <Input.Password
          type="password"
          placeholder="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          disabled={loading}
        />
        <Input.Password
          type="password"
          placeholder="Repeat password"
          value={repeat}
          onChange={({ target }) => setRepeat(target.value)}
          disabled={loading}
        />
        <Button onClick={handleSubmit} type="primary" disabled={loading}>
          {/* TODO: Esto del onClick es una guarrada temporal */}
          Register
        </Button>
      </form>
    </Spin>
  )
}
