const jwtTTL = 7_200_000 // 2 hours
const refreshTimer = 600_000 // 10 minutes

const fetchUser = (endpoint) => async (email, password) => {
  const url = `${process.env.REACT_APP_API_URL}/${endpoint}`
  const data = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }

  const response = await fetch(url, data)
  const body = await response.json()

  if (body.success) {
    sessionStorage.setItem('jwt', body.jwt)
    sessionStorage.setItem('jwt-init', new Date().getTime())

    setTimeout(checkJwt, refreshTimer)

    return { jwt: body.jwt, user: body.user }
  } else {
    throw new Error(body.message)
  }
}

export const registerUser = fetchUser('auth/register')

export const loginUser = fetchUser('auth/login')

export const logoutUser = () => {
  sessionStorage.removeItem('jwt')
  sessionStorage.removeItem('jwt-init')
}

export const initJwt = async () => {
  const jwt = sessionStorage.getItem('jwt')

  if (jwt) {
    return refreshJwt(jwt)
  }
  return false
}

const checkJwt = async () => {
  const jwt = sessionStorage.getItem('jwt')

  if (jwt) {
    const jwtInit = parseInt(sessionStorage.getItem('jwt-init'))
    const now = new Date().getTime()

    setTimeout(checkJwt, refreshTimer)

    if (now - jwtInit > jwtTTL / 2) {
      return refreshJwt(jwt)
    }
  }
}

const refreshJwt = async (jwt) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/refresh`
  const data = { headers: { Authorization: jwt } }

  const response = await fetch(url, data)
  const body = await response.json()

  if (body.success) {
    sessionStorage.setItem('jwt', body.jwt)
    sessionStorage.setItem('jwt-init', new Date().getTime())

    return { jwt: body.jwt, user: body.user }
  } else {
    throw new Error(body.message)
  }
}
