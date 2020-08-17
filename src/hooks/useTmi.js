import { useState, useEffect, useCallback } from 'react'
import { client as tmi } from 'tmi.js'
import { useLocalStorage } from './useLocalStorage'

const config = {
  options: {
    debug: true, // TODO: CAMBIAR
  },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: '',
    password: '',
  },
  channels: [],
}

const client = new tmi(config)

export const useTmi = (getReply) => {
  const [username, setUsername] = useLocalStorage('username', '')
  const [token, setToken] = useLocalStorage('token', '')
  const [channel, setChannel] = useLocalStorage('channel', '')

  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)

  const setStatus = useCallback(({ loading, connected }) => {
    loading !== undefined && setLoading(loading)
    connected !== undefined && setConnected(connected)
  }, [])

  const disconnect = useCallback(async () => {
    if (client.readyState() !== 'CLOSED') {
      setStatus({ loading: true })

      try {
        await client.disconnect()
        client.channels.length = 0
      } catch (error) {
        console.error(error)
      }
    }
  }, [setStatus])

  const connect = useCallback(async () => {
    if (client.readyState() === 'CLOSED') {
      setStatus({ loading: true })

      client.opts.identity.username = username
      client.opts.identity.password = token
      client.opts.channels = [channel]

      try {
        await client.connect()
      } catch (error) {
        console.error(error) // TODO
      }
    }
  }, [username, token, channel, setStatus])

  const sendReply = useCallback(
    (message) => {
      if (message) {
        const reply = getReply(message)
        reply && client.say(channel, reply)
      }
    },
    [channel, getReply]
  )

  useEffect(() => {
    client.on('disconnected', () => setStatus({ loading: false, connected: false }))
    client.on('connecting', () => setStatus({ loading: true, connected: false }))
    client.on('connected', (addr, port) => setStatus({ loading: false, connected: true }))

    return () => {
      client.removeAllListeners('disconnected')
      client.removeAllListeners('connecting')
      client.removeAllListeners('connected')
    }
  }, [setStatus])

  useEffect(() => {
    client.on('chat', (channel, userstate, message, self) => self || sendReply(message))

    return () => client.removeAllListeners('chat')
  }, [sendReply])

  return {
    username,
    token,
    channel,
    setUsername,
    setToken,
    setChannel,
    loading,
    connected,
    connect,
    disconnect,
  }
}
