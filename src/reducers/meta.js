const meta = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_META':
      return action.meta || {}
    default:
      return state
  }
}

export default meta
