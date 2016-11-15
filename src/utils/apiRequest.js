import merge from 'lodash/merge'
import notAuthenticated from '~/actions/auth/notAuthenticated'
import addToast from '~/actions/toaster/addToast'
import t from '~/utils/i18n/t'

const apiRequest = (dispatch, getState, path, options = {}) => {
  const defaultOptions = {
    mode: 'cors',
    cache: 'default',
    headers: {
      'content-type': 'application/json'
    }
  }
  if (getState().route.lang) {
    defaultOptions.headers['accept-language'] = getState().route.lang.code
  }
  const mergedOptions = merge(defaultOptions, options)
  if (mergedOptions.headers['content-type'] === null) {
    delete mergedOptions.headers['content-type']
  }
  const token = getState().authInfo.token
  if (token) {
    mergedOptions.headers['Authorization'] = `JWT ${token}`
  }
  /* global __API_ROOT__ */
  return fetch(
    `${__API_ROOT__}${path}`,
    mergedOptions
  )
    .then(
      res => {
        if (!res.ok) {
          if (token && res.status === 401) {
            dispatch(notAuthenticated())
            dispatch(addToast('warning', t(getState(), 'Session has expired. You have been logged out.'), null))
            // TODO: redirect to homepage
          }
        }
        return res
      }
    )
    .then(
      res => {
        return res.json()
          .then(data => ({
            data,
            ok: res.ok,
            status: res.status
          }))
          .catch(() => ({ // empty or not json response
            data: null,
            ok: res.ok,
            status: res.status
          }))
      }
    )
    .catch(() => { // network errors
      return {
        data: null,
        ok: false,
        status: null
      }
    })
}

export default apiRequest
