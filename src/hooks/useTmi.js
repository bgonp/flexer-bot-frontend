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

  const [status, setStatus] = useState({ loading: false, connected: false })

  const disconnect = useCallback(async () => {
    setStatus((status) => ({ ...status, loading: true }))

    if (client.readyState() !== 'CLOSED') {
      try {
        await client.disconnect()
        client.channels.length = 0
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  const connect = useCallback(async () => {
    setStatus((status) => ({ ...status, loading: true }))

    await disconnect()

    client.opts.identity.username = username
    client.opts.identity.password = token
    client.opts.channels = [channel]

    client.connect()
  }, [username, token, channel, disconnect])

  const sendReply = useCallback(
    (message) => {
      if (message) {
        const reply = getReply(message)
        client.say(channel, 'hey!')
        reply && client.say(channel, reply)
      }
    },
    [channel, getReply]
  )

  useEffect(() => {
    client.on('disconnected', () => setStatus({ loading: false, connected: false }))
    client.on('connecting', () => setStatus({ loading: true, connected: false }))
    client.on('connected', () => setStatus({ loading: false, connected: true }))
    client.on('chat', (channel, userstate, message, self) => self || sendReply(message))

    return async () => {
      await disconnect()

      client.removeAllListeners('disconnected')
      client.removeAllListeners('connecting')
      client.removeAllListeners('connected')
      client.removeAllListeners('chat')
    }
  }, [disconnect, sendReply])

  return {
    username,
    token,
    channel,
    setUsername,
    setToken,
    setChannel,
    status,
    connect,
    disconnect,
  }
}
