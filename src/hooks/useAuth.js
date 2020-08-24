import { useState, useCallback, useMemo } from 'react'
import { registerBot, loginBot, logoutBot, initJwt } from 'services/auth'

const initialBot = { id: null, username: '', token: '', channel: '', avatar: '' }

export const useAuth = () => {
  const [jwt, setJwt] = useState(null)
  const [bot, setBot] = useState(initialBot)

  const check = useCallback(() => {
    const result = initJwt()
    if (result === false) return
    result
      .then((response) => {
        if (response) {
          setJwt(response.jwt)
          setBot(response.bot)
        }
      })
      .catch((error) => {
        setJwt(null)
        setBot(initialBot)
        logoutBot()
        console.error(error)
      })
  }, [])

  const create = useCallback(({ username, token, channel }) => {
    // TODO: Check if username exists on Twitch, is already registered here and/or token works
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
        const response = await callback({ username, password, token, channel })
        setJwt(response.jwt)
        setBot(response.bot)

        return { success: true }
      } catch (error) {
        return { success: false, error: error.toString() }
      }
    },
    []
  )

  const register = useCallback(fetchBot(registerBot))

  const login = useCallback(fetchBot(loginBot))

  const clear = useCallback(() => {
    setJwt(null)
    setBot(initialBot)
    logoutBot()
  }, [])

  const isAuthed = useMemo(() => Boolean(jwt), [jwt])
  const isCreated = useMemo(() => Boolean(bot.username), [bot])

  return {
    isAuthed,
    isCreated,
    bot,
    check,
    create,
    update,
    register,
    login,
    clear,
  }
}
