import { client as tmi } from 'tmi.js'

export const TMI_STATUS = {
  UNCHECKED: 'unchecked',
  VALID: 'valid',
  WRONG_USERNAME: 'wrong_username',
  WRONG_TOKEN: 'wrong_token',
  WRONG_CHANNEL: 'wrong_channel',
  ERROR: 'error',
}

const config = {
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: '',
    password: '',
  },
  channels: [],
  logger: {
    info: () => {},
    warn: () => {},
    error: (message) => {
      if (checking) {
        checking = false
        if (message.includes('Login authentication failed')) {
          updateStatus({ tmiStatus: TMI_STATUS.WRONG_TOKEN })
        } else if (message.includes('No response from Twitch')) {
          updateStatus({ tmiStatus: TMI_STATUS.WRONG_CHANNEL })
        } else {
          updateStatus({ tmiStatus: TMI_STATUS.ERROR })
        }
      }
      !isDisconnected() && disconnect()
    },
  },
}

const client = new tmi(config)

let updateStatus = () => {}
let checking = false

const checkCredentials = (message) => {
  if (checking) {
    if (message.command === 'GLOBALUSERSTATE') {
      const typedUsername = client.opts.identity.username.toLowerCase()
      const connectedUsername = message.tags['display-name'].toLowerCase()
      if (typedUsername !== connectedUsername) {
        checking = false
        updateStatus({ tmiStatus: TMI_STATUS.WRONG_USERNAME })
        disconnect()
      }
    } else if (message.command === 'ROOMSTATE') {
      checking = false
      updateStatus({ loading: false, connected: true, tmiStatus: TMI_STATUS.VALID })
    }
  }
}

const listenEvents = (setStatus) => {
  updateStatus = setStatus
  client.on('disconnected', () => updateStatus({ loading: false, connected: false }))
  client.on('connecting', () => updateStatus({ loading: true, connected: false }))
  client.on('raw_message', (message) => checkCredentials(message))
}

const unListenEvents = () => {
  client.removeAllListeners('disconnected')
  client.removeAllListeners('connecting')
  client.removeAllListeners('raw_message')
}

const listenChat = (getReply) => {
  client.on('chat', (channel, userstate, message, self) => {
    if (self) return

    const reply = getReply(message, userstate['display-name'])
    if (reply) {
      client.say(channel, reply)
    }
  })
}

const unListenChat = () => client.removeAllListeners('chat')

const connect = async (username, token, channel) => {
  checking = true

  client.opts.identity.username = username
  client.opts.identity.password = token
  client.opts.channels = [channel]

  try {
    await client.connect()
  } catch (error) {
    console.error(error) // TODO
  }
}

const disconnect = async () => {
  try {
    await client.disconnect()
    checking = false
    client.channels.length = 0
  } catch (error) {
    console.error(error) // TODO
  }
}

const isDisconnected = () => client.readyState() === 'CLOSED'

export default {
  listenEvents,
  unListenEvents,
  listenChat,
  unListenChat,
  connect,
  disconnect,
  isDisconnected,
}
