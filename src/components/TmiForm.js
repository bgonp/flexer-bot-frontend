import React, { useContext } from 'react'
import { RepliesContext } from 'context/RepliesContext'

export const TmiForm = () => {
  const {
    username,
    setUsername,
    token,
    setToken,
    channel,
    setChannel,
    connect,
    disconnect,
    status,
  } = useContext(RepliesContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    status.connected || connect()
  }

  if (status.loading) {
    return <h3>Loading...</h3>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        placeholder="Username..."
      />
      <input
        type="text"
        value={token}
        onChange={({ target }) => setToken(target.value)}
        placeholder="Token..."
      />
      <input
        type="text"
        value={channel}
        onChange={({ target }) => setChannel(target.value)}
        placeholder="Channel..."
      />
      {status.connected ? (
        <button type="button" onClick={disconnect}>
          Disconnect
        </button>
      ) : (
        <button type="submit">Connect</button>
      )}
    </form>
  )
}
