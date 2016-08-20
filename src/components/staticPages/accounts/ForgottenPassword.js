import React, { Component } from 'react'
import { connect } from 'react-redux'

import StaticPage from '~/components/staticPages/StaticPage'
import ForgottenPasswordForm from './ForgottenPassword/ForgottenPasswordForm'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class ForgottenPassword extends Component {
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
      <div id="pageForgottenPassword">
        <div className="container">
          <div className="wrapper">
            <h1 className="title"><span><T t="Forgotten password" /></span></h1>
            {this.state.msg && (
              <div className="msg">{this.state.msg}</div>
            )}
            {!this.state.msg && (
              <ForgottenPasswordForm
                onSubmitSuccess={(res) => this.handleSubmitSuccess(res)}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

ForgottenPassword = StaticPage(ForgottenPassword)

const mapStateToProps = (state) => ({
  meta: {
    title: t(state, 'Forgotten password')
  }
})
ForgottenPassword = connect(
  mapStateToProps
)(ForgottenPassword)

export default ForgottenPassword
