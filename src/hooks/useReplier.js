import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Reply } from 'models/Reply'

export const useReplier = () => {
  const [replies, setReplies] = useLocalStorage('replies', [])

  const repliers = useMemo(() => replies.map((reply) => Reply.get(reply)), [replies])

  const getReply = useCallback(
    (message) => {
      const replier = repliers.find((replier) => replier.match(message))
      return replier && replier.getReply()
    },
    [repliers]
  )

  return {
    replies,
    setReplies,
    getReply,
  }
}
