import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import browserHistory from 'react-router/lib/browserHistory'
import { toastr } from 'react-redux-toastr'

import StaticPage from '~/components/staticPages/StaticPage'
import LoginForm from './Login/LoginForm'
import langPrefix from '~/utils/langPrefix'
import Link from '~/components/utils/Link'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      inactive: null,
      msg: null
    }
  }
  handleSubmitSuccess(res) {
    browserHistory.push(langPrefix('/', this.props.lang))
    toastr.success('', res.msg, {
      icon: 'icon-information-circle'
    })
  }
  handleSubmitFail(err) {
    if (err.inactive) {
      this.setState({
        inactive: true,
        msg: err._error
      })
    }
  }
  render() {
    return (
      <div id="pageLogin">
        <div className="container">
          <div className="wrapper">
            <h1 className="title"><span><T t="Login" /></span></h1>
            {this.state.inactive && (
              <div>
                <div className="msg">{this.state.msg}</div>
                <Link to="/resend-activation-message">
                  <T t="Resend activation message" />
                </Link>
              </div>
            )}
            {!this.state.inactive && (
              <LoginForm
                onSubmitSuccess={(res) => this.handleSubmitSuccess(res)}
                onSubmitFail={(err) => this.handleSubmitFail(err)}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
Login.propTypes = {
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    default: PropTypes.bool.isRequired
  }).isRequired
}

Login = StaticPage(Login)

const mapStateToProps = (state) => ({
  lang: state.route.lang,
  meta: {
    title: t(state, 'Login')
  }
})
Login = connect(
  mapStateToProps
)(Login)

export default Login
