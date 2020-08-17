import { useState, useCallback } from 'react'
import { loginUser, logoutUser, refreshToken } from 'services/auth'

const initialState = {
  id: 0,
  email: '',
  username: '',
  token: '',
  channel: '',
}

export const useAuth = () => {
  const [jwt, setJwt] = useState('')
  const [user, setUser] = useState(initialState)

  const check = useCallback(() => {
    refreshToken()
      .then((response) => {
        if (response) {
          setJwt(response.jwt)
          setUser(response.user)
        }
      })
      .catch((error) => {
        setJwt('')
        setUser(initialState)
        logoutUser()
        console.error(error)
      })
  }, [])

  const register = useCallback(async (email, password) => {
    // TODO
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const response = await loginUser(email, password)
      setJwt(response.jwt)
      setUser(response.user)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.toString() }
    }
  }, [])

  const logout = useCallback(() => {
    setJwt('')
    setUser(initialState)
    logoutUser()
  }, [])

  return { jwt, user, check, register, login, logout }
}
