import clearAuth from '~/actions/auth/clearAuth'
import addToast from '~/actions/toaster/addToast'
import t from '~/utils/i18n/t'

const logout = () => (dispatch, getState) => {
  dispatch(clearAuth())
  dispatch(addToast('success', t(getState(), 'You have been logged out.'), null))
}

export default logout
