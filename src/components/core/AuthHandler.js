import { Component, PropTypes } from 'react'
import cookie from 'react-cookie'
import { connect } from 'react-redux'

import apiRequest from '~/utils/apiRequest'
import setAuthenticating from '~/actions/auth/setAuthenticating'
import authenticated from '~/actions/auth/authenticated'
import clearAuth from '~/actions/auth/clearAuth'
import addToast from '~/actions/toaster/addToast'
import t from '~/utils/i18n/t'

class AuthHandler extends Component {
  componentWillMount() {
    // this will happen both on client and server
    // (SSR needs authInfo to avoid wrong redirects)
    if (this.props.authInfo.isAuthenticated === null && !this.props.authInfo.isAuthenticating) {
      // refresh token only if it did not already happen (isAuthenticated === null)
      // and if it's not already happening (!this.props.isAuthenticating) - avoid racing
      const tokenFromCookie = cookie.load('authToken')
      if (tokenFromCookie) {
        this.props.setAuthenticating(true)
        apiRequest(
          this.context.store.dispatch, this.context.store.getState,
          'accounts/refresh-token/',
          {
            method: 'POST',
            body: JSON.stringify({ token: tokenFromCookie })
          }
        )
          .then(({ data, ok }) => {
            this.props.setAuthenticating(false)
            if (ok) {
              this.props.authenticated(data.token, data.user)
              this.setRefreshInterval() // for the case of disabled SSR
            }
          })
      }
    }
    else if (this.props.authInfo.isAuthenticated) {
      // token have been already refreshed on the server
      // and now we start refresh inteval on client
      this.setRefreshInterval()
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.authInfo.isAuthenticated !== this.props.authInfo.isAuthenticated) {
      if (!this.props.authInfo.isAuthenticated) {
        // user logged OUT
        clearInterval(this._refreshTokenInterval)
        this._refreshTokenInterval = null
      }
      else {
        // user logged IN
        this.setRefreshInterval()
      }
    }
  }
  setRefreshInterval() {
    /* global __CLIENT__ */
    if (__CLIENT__ && !this._refreshTokenInterval) {
      this._refreshTokenInterval = setInterval(() => {
        apiRequest(
          this.context.store.dispatch, this.context.store.getState,
          'accounts/refresh-token/',
          {
            method: 'POST',
            body: JSON.stringify({ token: this.props.authInfo.token })
          }
        )
          .then(({ data, ok }) => {
            if (ok) {
              this.props.authenticated(data.token, data.user)
            }
            else {
              this.props.clearAuth()
              this.props.addToast('warning', t(this.props.state, 'Session has expired. You have been logged out.'), null)
            }
          })
      }, 10 * 60000)
    }
  }
  render() {
    return null
  }
}
AuthHandler.contextTypes = {
  store: PropTypes.object.isRequired
}
AuthHandler.propTypes = {
  state: PropTypes.object.isRequired,
  authInfo: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool.isRequired,
    token: PropTypes.string
  }).isRequired,
  setAuthenticating: PropTypes.func.isRequired,
  authenticated: PropTypes.func.isRequired,
  clearAuth: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  state,
  authInfo: state.authInfo
})
AuthHandler = connect(
  mapStateToProps,
  {
    setAuthenticating,
    authenticated,
    clearAuth,
    addToast
  }
)(AuthHandler)

export default AuthHandler
