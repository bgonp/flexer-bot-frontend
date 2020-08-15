import { useState } from 'react'

export const useAuth = () => {
  const [auth, setAuth] = useState({
    uid: '1',
    username: 'test',
    token: 'asdfasdfasdfasdfdsa',
  })

  return { auth, setAuth }
}
