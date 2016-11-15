import notAuthenticated from '~/actions/auth/notAuthenticated'
import addToast from '~/actions/toaster/addToast'
import t from '~/utils/i18n/t'

const logout = () => (dispatch, getState) => {
  dispatch(notAuthenticated())
  dispatch(addToast('success', t(getState(), 'You have been logged out.'), null))
}

export default logout
