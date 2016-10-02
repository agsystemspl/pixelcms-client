import browserHistory from 'react-router/lib/browserHistory'

import ApiRequest from '~/utils/ApiRequest'
import langPrefix from '~/utils/langPrefix'
import addToast from '~/actions/toaster/addToast'

const logout = () => (dispatch, getState) => {
  return new ApiRequest().delete('accounts/auth-info/', dispatch, getState)
    .then(
      (res) => {
        browserHistory.push(langPrefix('/', getState().route.lang))
        dispatch(addToast('success', res.body.msg, null))
      }
    )
}

export default logout
