import { useState, useEffect, useCallback, useContext } from 'react'
import tmi, { AUTH_STATUS } from 'services/tmi'
import AuthContext from 'context/AuthContext'

export const useTmi = (getReply = () => {}) => {
  const {
    update,
    bot: { username, token, channel },
  } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.UNCHECKED)

  const setStatus = useCallback(({ loading, connected, authStatus }) => {
    loading !== undefined && setLoading(loading)
    connected !== undefined && setConnected(connected)
    authStatus !== undefined && setAuthStatus(authStatus)
  }, [])

  const connect = useCallback(
    async ({ username, token, channel }) => {
      if (tmi.isDisconnected()) {
        setStatus({ loading: true })
        update({ username, token, channel })
        await tmi.connect(username, token, channel)
      }
    },
    [setStatus, update]
  )

  const disconnect = useCallback(async () => {
    if (!tmi.isDisconnected()) {
      setStatus({ loading: true })
      await tmi.disconnect()
    }
  }, [setStatus])

  useEffect(() => {
    tmi.listenEvents(setStatus)
    return () => {
      tmi.unListenEvents()
      !tmi.isDisconnected() && tmi.disconnect()
    }
  }, [setStatus])

  useEffect(() => {
    setAuthStatus(AUTH_STATUS.UNCHECKED)
  }, [username, token, channel])

  useEffect(() => {
    tmi.listenChat(getReply)
    return () => tmi.unListenChat()
  }, [getReply])

  return {
    authStatus,
    loading,
    connected,
    connect,
    disconnect,
  }
}
