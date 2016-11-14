import cookie from 'react-cookie'

const clearAuth = () => {
  cookie.remove('authToken', { path: '/' })
  return {
    type: 'CLEAR_AUTH'
  }
}

export default clearAuth
