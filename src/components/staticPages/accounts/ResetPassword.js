import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'

import StaticPage from '~/components/staticPages/StaticPage'
import RequireNotLoggedIn from '~/components/utils/RequireNotLoggedIn'
import ResetPasswordForm from './ResetPassword/ResetPasswordForm'
import addToast from '~/actions/toaster/addToast'
import langPrefix from '~/utils/langPrefix'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class ResetPassword extends Component {
  constructor() {
    super()
    this.state = {
      msg: null,
      expired: null,
      success: null
    }
  }
  handleSubmitSuccess(res) {
    this.setState(Object.assign({}, this.state, {
      success: true
    }))
    this.props.addToast('success', res.msg, null)
  }
  handleSubmitFail(err) {
    if (err.keyError) {
      this.setState({
        msg: err._error
      })
    }
  }
  render() {
    if (this.state.success) {
      return <Redirect to={langPrefix('/login', this.props.lang)} />
    }
    return (
      <div id="pageResetPassword">
        <RequireNotLoggedIn />
        <div className="container">
          <div className="wrapper">
            <h1 className="title"><span><T t="Reset password" /></span></h1>
            {this.state.msg && (
              <div className="msg">{this.state.msg}</div>
            )}
            {!this.state.msg && (
              <ResetPasswordForm
                onSubmitSuccess={(res) => this.handleSubmitSuccess(res)}
                onSubmitFail={(err) => this.handleSubmitFail(err)}
                resetPasswordKey={this.props.params.key}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
ResetPassword.propTypes = {
  params: PropTypes.shape({
    key: PropTypes.string.isRequired
  }).isRequired,
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    default: PropTypes.bool.isRequired
  }).isRequired,
  addToast: PropTypes.func.isRequired
}

ResetPassword = StaticPage(ResetPassword)

const mapStateToProps = (state) => ({
  lang: state.route.lang,
  meta: {
    title: t(state, 'Reset password')
  }
})
ResetPassword = connect(
  mapStateToProps,
  { addToast }
)(ResetPassword)

export default ResetPassword
