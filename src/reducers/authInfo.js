const initialState = {
  isAuthenticated: null,  // notice null not false
  isAuthenticating: false,
  waitFor: null,
  token: null,
  user: {}
}

const authInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATING':
      return Object.assign({}, state, { isAuthenticating: action.promise })
    case 'AUTHENTICATED':
      return {
        isAuthenticated: true,
        isAuthenticating: false,
        token: action.token,
        user: action.user
      }
    case 'NOT_AUTHENTICATED':
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
