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
  }
  handleSubmitSuccess(res) {
    this.setState({
      msg: res.msg
    })
  }
  render() {
    return (
      <div id="pageResendActivationMessage">
        <RequireNotLoggedIn />
        <div className="container">
          <div className="wrapper">
            <h1 className="title"><span><T t="Resend activation message" /></span></h1>
            {this.state.msg && (
              <div className="msg">{this.state.msg}</div>
            )}
            {!this.state.msg && (
              <ResendActivationMessageForm
                onSubmitSuccess={(res) => this.handleSubmitSuccess(res)}
              />
            )}
          </div>
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

export default ResendActivationMessage
