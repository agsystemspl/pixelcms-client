import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withRouter from 'react-router/lib/withRouter'
import { locationShape } from 'react-router/lib/PropTypes'

import RequireNotLoggedIn from '~/components/utils/RequireNotLoggedIn'
import apiRequest from '~/utils/apiRequest'
import authenticated from '~/actions/auth/authenticated'
import addToast from '~/actions/toaster/addToast'
import Redirect from '~/components/utils/Redirect'
import Loading from '~/components/utils/Loading'
import t from '~/utils/i18n/t'

class SocialAuth extends Component {
  constructor() {
    super()
    this.state = { redirect: null }
  }
  componentDidMount() {
    let redirectUri = `${window.location.origin}${window.location.pathname}`
    if (this.props.params.backend === 'facebook') {
      redirectUri += `?redirect_state=${this.props.location.query.redirect_state}`
    }
    apiRequest(
      this.context.store.dispatch, this.context.store.getState,
      `accounts/social-login-complete/`,
      {
        method: 'POST',
        body: JSON.stringify({
          provider: this.props.params.backend,
          redirect_uri: redirectUri,
          code: this.props.location.query.code
        })
      }
    )
      .then(({ data, ok, status }) => {
        if (ok) {
          this.props.authenticated(data.authInfo.token, data.authInfo.user)
          this.props.addToast('success', data.msg, null)
        }
        else {
          this.setState({ errorRedirect: true })
          this.props.addToast('error', data._error || t(this.context.store.getState(), 'Error occured.'), null)
        }
      })
  }
  render() {
    if (this.state.errorRedirect) {
      return <Redirect to="/accounts/login" />
    }
    return (
      <div className="page loading" id="pageSocialAuth">
        <Loading />
      </div>
    )
  }
}
SocialAuth.contextTypes = {
  store: PropTypes.object.isRequired
}
SocialAuth.propTypes = {
  params: PropTypes.shape({
    backend: PropTypes.string.isRequired
  }).isRequired,
  location: locationShape,
  authenticated: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired
}

SocialAuth = withRouter(SocialAuth)

SocialAuth = connect(
  null,
  {
    authenticated,
    addToast
  }
)(SocialAuth)

SocialAuth = RequireNotLoggedIn(SocialAuth)

export default SocialAuth
