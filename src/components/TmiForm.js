import React, { useContext } from 'react'
import RepliersContext from 'context/RepliersContext'
import { Loading } from './Loading'

export const TmiForm = () => {
  const {
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
  } = useContext(RepliersContext).tmi

  const handleSubmit = (e) => {
    e.preventDefault()
    connected || connect()
  }

  if (loading) {
    return <Loading />
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={({ target }) => connected || setUsername(target.value)}
        placeholder="Username..."
        disabled={connected}
      />
      <input
        type="text"
        value={token}
        onChange={({ target }) => connected || setToken(target.value)}
        placeholder="Token..."
        disabled={connected}
      />
      <input
        type="text"
        value={channel}
        onChange={({ target }) => connected || setChannel(target.value)}
        placeholder="Channel..."
        disabled={connected}
      />
      {connected ? (
        <button type="button" onClick={disconnect}>
          Disconnect
        </button>
      ) : (
        <button type="submit">Connect</button>
      )}
    </form>
  )
}
