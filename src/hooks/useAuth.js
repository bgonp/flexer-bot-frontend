import { useState, useCallback } from 'react'
import { registerUser, loginUser, logoutUser, initJwt } from 'services/auth'

const initialState = {
  isAuthed: false,
  jwt: '',
  id: null,
  email: '',
  username: '',
  token: '',
  channel: '',
}

export const useAuth = () => {
  const [auth, setAuth] = useState(initialState)

  const check = useCallback(() => {
    initJwt()
      .then((response) => {
        if (response) {
          setAuth({ isAuthed: true, jwt: response.jwt, ...response.user })
        }
      })
      .catch((error) => {
        setAuth(initialState)
        logoutUser()
        console.error(error)
      })
  }, [])

  const fetchUser = useCallback(
    (callback) => async (email, password) => {
      try {
        const response = await callback(email, password)
        setAuth({ isAuthed: true, jwt: response.jwt, ...response.user })

        return { success: true }
      } catch (error) {
        return { success: false, error: error.toString() }
      }
    },
    []
  )

  const register = useCallback(fetchUser(registerUser))

  const login = useCallback(fetchUser(loginUser))

  const logout = useCallback(() => {
    setAuth(initialState)
    logoutUser()
  }, [])

  return { ...auth, check, register, login, logout }
}
