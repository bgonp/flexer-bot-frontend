import { useCallback, useReducer, useContext } from 'react'
import AuthContext from 'context/AuthContext'
import { getRepliers } from 'services/repliers'

const ACTIONS = {
  ADD_REPLIER: 'add_replier',
  REMOVE_REPLIER: 'add_replier',
  UPDATE_REPLIER: 'update_replier',
}

const repliersReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.ADD_REPLIER:
      return [...state, action.payload]

    case ACTIONS.REMOVE_REPLIER:
      return state.filter((replier) => replier.id !== action.payload)

    case ACTIONS.UPDATE_REPLIER:
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
        type: ACTIONS.ADD_REPLIER,
        payload: replier,
      })
    },
    [dispatch]
  )

  const removeReplier = useCallback(
    async (replier) => {
      // TODO: db remove
      dispatch({
        type: ACTIONS.REMOVE_REPLIER,
        payload: replier.id,
      })
    },
    [dispatch]
  )

  const updateReplier = useCallback(
    async (replier) => {
      // TODO: db update
      dispatch({
        type: ACTIONS.UPDATE_REPLIER,
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
