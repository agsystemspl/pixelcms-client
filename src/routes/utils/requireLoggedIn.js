import langPrefix from '~/utils/langPrefix'
import { route as routeActions } from '~/actions'

const requireLoggedIn = (store) => (nextState, replace) => {
  if (!store.getState().auth.authInfo.user) {
    const redirectPath = langPrefix('/login', store.getState().route.lang)
    if (process.env.NODE_ENV !== 'production') {
      console.log('Required logged in - redirecting to ' + redirectPath)
    }
    /* global __SERVER__ */
    if (__SERVER__) { store.dispatch(routeActions.serverRedirect(redirectPath)) }
    else { replace(redirectPath) }
  }
}

export default requireLoggedIn
