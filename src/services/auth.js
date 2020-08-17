const tokenTTL = 7_200_000 // 2 hours
const refreshTimer = 600_000 // 10 minutes

export const registerUser = () => {
  // TODO
}

export const loginUser = async (email, password) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/login`
  const data = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }

  const response = await fetch(url, data)
  const body = await response.json()

  if (body.success) {
    sessionStorage.setItem('token', body.token)
    sessionStorage.setItem('token-init', new Date().getTime())

    setTimeout(refreshToken, refreshTimer)

    return { jwt: body.jwt, user: body.user }
  } else {
    throw new Error(body.message)
  }
}

export const logoutUser = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('token-init')
}

export const refreshToken = async () => {
  const token = sessionStorage.getItem('token')

  if (token) {
    const tokenInit = parseInt(sessionStorage.getItem('token-init'))
    const now = new Date().getTime()

    if (now - tokenInit > tokenTTL / 2) {
      const url = `${process.env.REACT_APP_API_URL}/auth/refresh`
      const data = { headers: { 'x-token': token } }

      const response = await fetch(url, data)
      const body = await response.json()

      if (body.success) {
        sessionStorage.setItem('token', body.token)
        sessionStorage.setItem('token-init', new Date().getTime())

        setTimeout(refreshToken, refreshTimer)

        return { jwt: body.jwt, user: body.user }
      } else {
        throw new Error(body.message)
      }
    }
  }
}
