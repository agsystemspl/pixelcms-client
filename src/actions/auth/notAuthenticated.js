import cookie from 'react-cookie'

const notAuthenticated = () => {
  cookie.remove('authToken', { path: '/' })
  return {
    type: 'NOT_AUTHENTICATED'
  }
}

export default notAuthenticated
