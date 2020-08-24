import { useCallback, useReducer, useContext } from 'react'
import AuthContext from 'context/AuthContext'
import { getRepliers } from 'services/repliers'

const TYPES = {
  ADD_REPLIER: 'add_replier',
  REMOVE_REPLIER: 'add_replier',
  UPDATE_REPLIER: 'update_replier',
}

const repliersReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_REPLIER:
      return [...state, action.payload]

    case TYPES.REMOVE_REPLIER:
      return state.filter((replier) => replier.id !== action.payload)

    case TYPES.UPDATE_REPLIER:
      return state.map((replier) =>
        replier.id === action.payload.id ? action.payload : replier
      )

    default:
      return state
  }
}

export const useRepliers = () => {
  const { jwt } = useContext(AuthContext)
  const [repliers, dispatch] = useReducer(repliersReducer, [], () => getRepliers(jwt))

  const addReplier = useCallback(
    async (replier) => {
      // TODO: db save
      dispatch({
        type: TYPES.ADD_REPLIER,
        payload: replier,
      })
    },
    [dispatch]
  )

  const removeReplier = useCallback(
    async (replier) => {
      // TODO: db remove
      dispatch({
        type: TYPES.REMOVE_REPLIER,
        payload: replier.id,
      })
    },
    [dispatch]
  )

  const updateReplier = useCallback(
    async (replier) => {
      // TODO: db update
      dispatch({
        type: TYPES.UPDATE_REPLIER,
        payload: replier,
      })
    },
    [dispatch]
  )

  const saveRepliers = () => {
    // TODO
  }

  const getReply = useCallback(
    (message) => {
      const replier = repliers.find((replier) => replier.match(message))
      return replier && replier.getReply()
    },
    [repliers]
  )

  return {
    repliers,
    addReplier,
    removeReplier,
    updateReplier,
    saveRepliers,
    getReply,
  }
}
