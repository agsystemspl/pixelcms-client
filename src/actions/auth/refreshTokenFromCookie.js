import apiRequest from '~/utils/apiRequest'

const refreshTokenFromCookie = (token, then) => (dispatch, getState, promises) => {
  promises.push(apiRequest(
    dispatch, getState,
    'accounts/refresh-token/',
    {
      method: 'POST',
      body: JSON.stringify({ token })
    }
  )
    .then(then)
  )
}

export default refreshTokenFromCookie
