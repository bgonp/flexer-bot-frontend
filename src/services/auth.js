const tokenTTL = 7_200_000 // 2 hours
const refreshTimer = 10_000 // TODO: 600_000 // 10 minutes

let refreshInterval

const clearStorage = () => {
  sessionStorage.removeItem('refresh')
  sessionStorage.removeItem('token-init')
}

const isAvailable = async (username) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/available?username=${username}`

  const response = await fetch(url)
  const body = await response.json()

  return body
}

const fetchBot = (endpoint, keys) => async (params, callback) => {
  const url = `${process.env.REACT_APP_API_URL}/${endpoint}`
  const json = {}
  keys.forEach((key) => (json[key] = params[key]))
  const data = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(json),
  }

  const response = await fetch(url, data)
  const body = await response.json()
  console.log(body)

  if (body.success) {
    sessionStorage.setItem('refresh', body.refresh)
    sessionStorage.setItem('token-init', new Date().getTime())

    clearInterval(refreshInterval)
    refreshInterval = setInterval(() => checkToken(callback), refreshTimer)

    return { jwt: body.jwt, bot: body.bot }
  } else {
    throw new Error(body.message)
  }
}

const registerBot = fetchBot('auth/register', [
  'username',
  'password',
  'token',
  'channel',
])

const loginBot = fetchBot('auth/login', ['username', 'password'])

const logoutBot = async (id) => {
  clearStorage()
  const url = `${process.env.REACT_APP_API_URL}/auth/logout`
  const data = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ id }),
  }
  await fetch(url, data)
}

const updateBot = async (jwt, { id, token, channel }) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/update`
  const data = {
    method: 'PUT',
    headers: {
      Authorization: jwt,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ id, token, channel }),
  }

  const response = await fetch(url, data)
  const body = await response.json()

  return Boolean(body.success)
}

const initToken = async (callback) => {
  const refresh = sessionStorage.getItem('refresh')

  if (refresh) {
    const response = refreshJwt(refresh)
    refreshInterval = setInterval(() => checkToken(callback), refreshTimer)
    return response
  }
  return false
}

const checkToken = async (callback) => {
  const refresh = sessionStorage.getItem('refresh')

  if (refresh) {
    const tokenInit = parseInt(sessionStorage.getItem('token-init'))
    const now = new Date().getTime()

    if (now - tokenInit > tokenTTL / 2) {
      const { jwt } = await refreshJwt(refresh)
      callback(jwt)
    }
  } else {
    clearInterval(refreshInterval)
  }
}

const refreshJwt = async (jwt) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/refresh`
  const data = { headers: { Authorization: jwt } }

  const response = await fetch(url, data)
  const body = await response.json()

  if (body.success) {
    sessionStorage.setItem('refresh', body.refresh)
    sessionStorage.setItem('token-init', new Date().getTime())

    return { success: true, jwt: body.jwt, bot: body.bot }
  }
  throw new Error(body.message)
}

export {
  isAvailable,
  registerBot,
  loginBot,
  logoutBot,
  updateBot,
  initToken,
  clearStorage,
}
