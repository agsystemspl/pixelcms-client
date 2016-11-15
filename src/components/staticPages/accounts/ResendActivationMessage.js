import React, { Component } from 'react'
import { connect } from 'react-redux'

import StaticPage from '~/components/staticPages/StaticPage'
import RequireNotLoggedIn from '~/components/utils/RequireNotLoggedIn'
import ResendActivationMessageForm from './ResendActivationMessage/ResendActivationMessageForm'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class ResendActivationMessage extends Component {
  constructor() {
    super()
    this.state = {
      msg: null
    }
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this)
  }
  handleSubmitSuccess(data) {
    this.setState({
      msg: data.msg
    })
  }
  render() {
    return (
      <div className="page" id="pageResendActivationMessage">
        <div className="wrapper">
          <h1 className="title"><span><T t="Resend activation message" /></span></h1>
          {this.state.msg && (
            <div className="msg">{this.state.msg}</div>
          ) || (
            <ResendActivationMessageForm
              onSubmitSuccess={this.handleSubmitSuccess}
            />
          )}
        </div>
      </div>
    )
  }
}

ResendActivationMessage = StaticPage(ResendActivationMessage)

const mapStateToProps = (state) => ({
  meta: {
    title: t(state, 'Resend activation message')
  }
})
ResendActivationMessage = connect(
  mapStateToProps
)(ResendActivationMessage)

ResendActivationMessage = RequireNotLoggedIn(ResendActivationMessage)

export default ResendActivationMessage
