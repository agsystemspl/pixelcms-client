import ApiRequest from '~/utils/ApiRequest'
import addToast from '~/actions/toaster/addToast'

const logout = () => (dispatch, getState) => {
  return new ApiRequest().delete('accounts/auth-info/', dispatch, getState)
    .then(
      (res) => {
        dispatch(addToast('success', res.body.msg, null))
      }
    )
}

export default logout
