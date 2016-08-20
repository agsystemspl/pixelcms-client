const updateAuthInfo = (authInfo) => {
  authInfo = authInfo.split(';')
  const parsedAuthInfo = {
    user: JSON.parse(authInfo[0]),
    isAdmin: JSON.parse(authInfo[1])
  }
  return {
    type: 'UPDATE_AUTH_INFO',
    authInfo: parsedAuthInfo
  }
}

export default updateAuthInfo
