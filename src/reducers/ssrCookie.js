const ssrCookie = (state = null, action) => {
  switch (action.type) {
    case 'SET_SSR_COOKIE':
      return action.cookie || null
    default:
      return state
  }
}

export default ssrCookie
