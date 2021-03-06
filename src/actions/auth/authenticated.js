import cookie from 'react-cookie'

const authenticated = (token, user) => {
  if (token) {
    cookie.save('authToken', token, {
      path: '/',
      expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      secure: process.env.NODE_ENV === 'production'
    })
  }
  return {
    type: 'AUTHENTICATED',
    token,
    user
  }
}

export default authenticated
