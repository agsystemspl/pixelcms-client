const initialState = {
  authInfo: {}
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_AUTH_INFO':
      return Object.assign({}, state, { authInfo: action.authInfo })
    default:
      return state
  }
}

export default auth
