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
