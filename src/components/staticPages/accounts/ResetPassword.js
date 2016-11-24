import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import StaticPage from '~/components/staticPages/StaticPage'
import RequireNotLoggedIn from '~/components/utils/RequireNotLoggedIn'
import ResetPasswordForm from './ResetPassword/ResetPasswordForm'
import addToast from '~/actions/toaster/addToast'
import Redirect from '~/components/utils/Redirect'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class ResetPassword extends Component {
  constructor() {
    super()
    this.state = {
      msg: null,
      expired: null,
      redirect: null
    }
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this)
    this.handleSubmitFail = this.handleSubmitFail.bind(this)
  }
  handleSubmitSuccess(data) {
    this.setState(Object.assign({}, this.state, { redirect: true }))
    this.props.addToast('success', data.msg, null)
  }
  handleSubmitFail(data) {
    if (data.keyError) {
      this.setState({
        msg: data._error
      })
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/accounts/login" />
    }
    return (
      <div className="page" id="pageResetPassword">
        <div className="wrapper">
          <h1 className="title"><span><T t="Reset password" /></span></h1>
          {this.state.msg && (
            <div className="msg">{this.state.msg}</div>
          ) || (
            <ResetPasswordForm
              onSubmitSuccess={this.handleSubmitSuccess}
              onSubmitFail={this.handleSubmitFail}
              resetPasswordKey={this.props.params.key}
            />
          )}
        </div>
      </div>
    )
  }
}
ResetPassword.propTypes = {
  params: PropTypes.shape({
    key: PropTypes.string.isRequired
  }).isRequired,
  addToast: PropTypes.func.isRequired
}

ResetPassword = StaticPage(ResetPassword)

const mapStateToProps = state => ({
  meta: {
    title: t(state, 'Reset password')
  }
})
ResetPassword = connect(
  mapStateToProps,
  { addToast }
)(ResetPassword)

ResetPassword = RequireNotLoggedIn(ResetPassword)

export default ResetPassword
