import browserHistory from 'react-router/lib/browserHistory'
import { toastr } from 'react-redux-toastr'

import ApiRequest from '~/utils/ApiRequest'
import langPrefix from '~/utils/langPrefix'

const logout = () => (dispatch, getState) => {
  return new ApiRequest().delete('accounts/auth-info/', dispatch, getState)
    .then(
      (res) => {
        browserHistory.push(langPrefix('/', getState().route.lang))
        toastr.success('', res.body.msg, {
          icon: 'icon-information-circle'
        })
      }
    )
}

export default logout
