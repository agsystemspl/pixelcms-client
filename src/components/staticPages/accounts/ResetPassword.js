import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import browserHistory from 'react-router/lib/browserHistory'
import { toastr } from 'react-redux-toastr'

import StaticPage from '~/components/staticPages/StaticPage'
import ResetPasswordForm from './ResetPassword/ResetPasswordForm'
import langPrefix from '~/utils/langPrefix'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class ResetPassword extends Component {
  constructor() {
    super()
    this.state = {
      msg: null,
      expired: null
    }
  }
  handleSubmitSuccess(res) {
    browserHistory.push(langPrefix('/login', this.props.lang))
    toastr.success('', res.msg, {
      icon: 'icon-information-circle'
    })
  }
  handleSubmitFail(err) {
    if (err.keyError) {
      this.setState({
        msg: err._error
      })
    }
  }
  render() {
    return (
      <div id="pageResetPassword">
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
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
ResetPassword.propTypes = {
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    default: PropTypes.bool.isRequired
  }).isRequired
}

ResetPassword = StaticPage(ResetPassword)

const mapStateToProps = (state) => ({
  lang: state.route.lang,
  meta: {
    title: t(state, 'Reset password')
  }
})
ResetPassword = connect(
  mapStateToProps
)(ResetPassword)

export default ResetPassword
