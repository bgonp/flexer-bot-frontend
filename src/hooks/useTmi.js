import { useState, useEffect, useCallback, useContext } from 'react'
import tmi, { TMI_STATUS } from 'services/tmi'
import AuthContext from 'context/AuthContext'

export const useTmi = (getReply = () => {}) => {
  const {
    update,
    bot: { username, token, channel },
  } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [tmiStatus, setTmiStatus] = useState(TMI_STATUS.UNCHECKED)

  const setStatus = useCallback(({ loading, connected, tmiStatus }) => {
    loading !== undefined && setLoading(loading)
    connected !== undefined && setConnected(connected)
    tmiStatus !== undefined && setTmiStatus(tmiStatus)
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
    setTmiStatus(TMI_STATUS.UNCHECKED)
  }, [username, token, channel])

  useEffect(() => {
    tmi.listenChat(getReply)
    return () => tmi.unListenChat()
  }, [getReply])

  return {
    tmiStatus,
    loading,
    connected,
    connect,
    disconnect,
  }
}
