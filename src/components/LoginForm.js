import React, { useState, useContext } from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import AuthContext from 'context/AuthContext'

export const LoginForm = () => {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('a@a.com')
  const [password, setPassword] = useState('asdf')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { success, error } = await login(email, password)
    if (!success) {
      setLoading(false)
      setError(error)
    }
  }

  return (
    <Box>
      {loading && <p severity="info">Checking your user data</p>}
      {error && <p severity="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="E-mail"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          disabled={loading}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          disabled={loading}
        />
        <Button type="submit" color="primary">
          Log in
        </Button>
      </form>
    </Box>
  )
}
