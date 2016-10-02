const toaster = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      const toast = {}
      toast[action.timestamp] = action.toast
      return Object.assign({}, state, toast)
    case 'REMOVE_TOAST':
      const newToasts = Object.assign({}, state)
      delete newToasts[action.timestamp]
      return newToasts
    default:
      return state
  }
}

export default toaster
