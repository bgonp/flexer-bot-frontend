import { useState, useCallback, useMemo } from 'react'
import {
  isAvailable,
  registerBot,
  loginBot,
  logoutBot,
  updateBot,
  initToken,
  clearStorage,
} from 'services/auth'

const initialBot = { id: null, username: '', token: '', channel: '', avatar: '' }

export const useAuth = () => {
  const [jwt, setJwt] = useState(null)
  const [bot, setBot] = useState(initialBot)

  const create = useCallback(async ({ username, token, channel }) => {
    try {
      const available = await isAvailable(username)
      if (!available.success) {
        return { success: false, error: available.message }
      }
    } catch (error) {
      console.error(error)
    }
    setBot({ id: null, username, token, channel, avatar: '' })
    return { success: true }
  }, [])

  const update = useCallback(({ username, token, channel }) => {
    setBot((state) => ({ ...state, username, token, channel }))
    return { success: true }
  }, [])

  const fetchBot = useCallback(
    (callback) => async (username, password, token, channel) => {
      try {
        const response = await callback({ username, password, token, channel }, setJwt)
        setJwt(response.jwt)
        setBot(response.bot)

        return { success: true }
      } catch (error) {
        return { success: false, error: error.toString() }
      }
    },
    []
  )

  const register = useCallback(fetchBot(registerBot), [fetchBot])

  const login = useCallback(fetchBot(loginBot), [fetchBot])

  const logout = useCallback(() => {
    setJwt(null)
    setBot(initialBot)
    logoutBot(bot.id)
  }, [bot])

  const save = useCallback(async () => {
    try {
      return await updateBot(jwt, bot)
    } catch (error) {
      console.error(error)
    }
    return false
  }, [jwt, bot])

  const init = useCallback(async () => {
    try {
      const response = await initToken(setJwt)

      if (response.success) {
        setJwt(response.jwt)
        setBot(response.bot)
        return
      }
    } catch (error) {
      console.error(error)
    }
    clearStorage()
  }, [])

  const isAuthed = useMemo(() => Boolean(jwt), [jwt])
  const isCreated = useMemo(() => Boolean(bot.username), [bot])

  return {
    isAuthed,
    isCreated,
    bot,
    create,
    update,
    register,
    login,
    logout,
    save,
    init,
  }
}
