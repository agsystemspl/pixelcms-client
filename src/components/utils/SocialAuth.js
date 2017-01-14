import React, { Component, PropTypes } from 'react'
import apiRequest from '~/utils/apiRequest'
import T from '~/components/utils/T'
import Loading from '~/components/utils/Loading'
import googleLogo from './SocialAuth/img/google.png'
import fbLogo from './SocialAuth/img/fb.png'

class SocialAuth extends Component {
  constructor() {
    super()
    this.state = { processing: false }
  }
  handleAuthClick(backend) {
    if (!this.state.processing) {
      this.setState({ processing: true })
      apiRequest(
        this.context.store.dispatch, this.context.store.getState,
        'accounts/social-login-begin/' + backend + '/',
        { method: 'POST' }
      )
        .then(({ data, ok, status }) => {
          if (ok) {
            window.location.assign(data.url)
          }
          else {
            this.setState({ error: true, processing: false })
          }
        })
    }
  }
  render() {
    const btnStyle = {
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      color: '#000'
    }
    return (
      <div className="socialAuth">
        {!this.state.processing && (
          <div>
            {this.props.backends.indexOf('google-oauth2') > -1 && (
              <button
                style={btnStyle}
                onClick={() => this.handleAuthClick('google-oauth2')}
              >
                <img src={googleLogo} alt="" />
                <T t="Login with Google" />
              </button>
            )}
            {this.props.backends.indexOf('facebook') > -1 && (
              <button
                style={btnStyle}
                onClick={() => this.handleAuthClick('facebook')}
              >
                <img src={fbLogo} alt="" />
                <T t="Login with Facebook" />
              </button>
            )}
            {this.state.error && (
              <div className="error">
                <T t="Error occured." />
              </div>
            )}
          </div>
        ) || <Loading />}
      </div>
    )
  }
}
SocialAuth.contextTypes = {
  store: PropTypes.object.isRequired
}
SocialAuth.propTypes = {
  backends: PropTypes.array.isRequired
}

export default SocialAuth
