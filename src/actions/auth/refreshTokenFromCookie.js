import apiRequest from '~/utils/apiRequest'

const refreshTokenFromCookie = (token, then) => (dispatch, getState) => {
  const promise = apiRequest(
    dispatch, getState,
    'accounts/refresh-token/',
    {
      method: 'POST',
      body: JSON.stringify({ token })
    },
    false
  )
    .then(then)
  dispatch({
    type: 'AUTHENTICATING',
    promise
  })
  /* global __SERVER__ */
  /* global __PROMISES__ */
  if (__SERVER__) {
    __PROMISES__.push(promise)
  }
}

export default refreshTokenFromCookie
