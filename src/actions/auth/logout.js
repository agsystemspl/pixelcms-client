import browserHistory from 'react-router/lib/browserHistory'

import notAuthenticated from '~/actions/auth/notAuthenticated'
import addToast from '~/actions/toaster/addToast'
import t from '~/utils/i18n/t'
import langPrefix from '~/utils/langPrefix'

const logout = () => (dispatch, getState) => {
  dispatch(notAuthenticated())
  dispatch(addToast('success', t(getState(), 'You have been logged out.'), null))
  browserHistory.push(langPrefix('/', getState().route.lang))
}

export default logout
