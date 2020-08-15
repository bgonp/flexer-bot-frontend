import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Replier } from 'models/Replier'

export const useReplier = () => {
  const [cases, setCases] = useLocalStorage('cases', [])

  const repliers = useMemo(() => cases.map((reply) => Replier.get(reply)), [cases])

  const getReply = useCallback(
    (message) => {
      const replier = repliers.find((replier) => replier.match(message))
      return replier && replier.getReply()
    },
    [repliers]
  )

  return {
    cases,
    setCases,
    getReply,
  }
}
