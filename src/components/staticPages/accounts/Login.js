import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import StaticPage from '~/components/staticPages/StaticPage'
import RequireNotLoggedIn from '~/components/utils/RequireNotLoggedIn'
import LoginForm from './Login/LoginForm'
import addToast from '~/actions/toaster/addToast'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      msg: null
    }
  }
  handleSubmitSuccess(res) {
    this.props.addToast('success', res.msg, null)
  }
  handleSubmitFail(err) {
    if (err.inactive) {
      this.setState({
        msg: err._error
      })
    }
  }
  render() {
    return (
      <div id="pageLogin">
        <RequireNotLoggedIn />
        <div className="container">
          <div className="wrapper">
            <h1 className="title"><span><T t="Login" /></span></h1>
            <LoginForm
              onSubmitSuccess={(res) => this.handleSubmitSuccess(res)}
              onSubmitFail={(err) => this.handleSubmitFail(err)}
            />
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
  }).isRequired,
  addToast: PropTypes.func.isRequired
}

Login = StaticPage(Login)

const mapStateToProps = (state) => ({
  lang: state.route.lang,
  meta: {
    title: t(state, 'Login')
  }
})
Login = connect(
  mapStateToProps,
  { addToast }
)(Login)

export default Login
