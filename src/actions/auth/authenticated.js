import cookie from 'react-cookie'

const authenticated = (token, user) => {
  if (token) {
    cookie.save('authToken', token, {
      path: '/',
      expires: new Date(new Date().setMinutes(new Date().getMinutes() + 5))
    })
  }
  return {
    type: 'AUTHENTICATED',
    token,
    user
  }
}

export default authenticated
