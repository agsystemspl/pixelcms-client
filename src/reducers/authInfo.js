const initialState = {
  isAuthenticated: null,  // notice null not false
  isAuthenticating: false,
  token: null,
  user: {}
}

const authInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTHENTICATING':
      return Object.assign({}, state, { isAuthenticating: action.isAuthenticating })
    case 'AUTHENTICATED':
      return {
        isAuthenticated: true,
        isAuthenticating: false,
        token: action.token,
        user: action.user
      }
    case 'CLEAR_AUTH':
      return {
        isAuthenticated: false,
        isAuthenticating: false,
        token: null,
        user: {}
      }
    default:
      return state
  }
}

export default authInfo
