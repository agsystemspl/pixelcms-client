import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import StaticPage from '~/components/staticPages/StaticPage'
import ChangeEmailConfirmationForm from './ChangeEmailConfirmation/ChangeEmailConfirmationForm'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class ChangeEmailConfirmation extends Component {
  constructor() {
    super()
    this.state = {
      msg: null
    }
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this)
    this.handleSubmitFail = this.handleSubmitFail.bind(this)
  }
  handleSubmitSuccess(data) {
    this.setState(Object.assign({}, this.state, {
      msg: data.msg
    }))
  }
  handleSubmitFail(data) {
    this.setState(Object.assign({}, this.state, {
      msg: data._error
    }))
  }
  render() {
    return (
      <div className="page" id="pageChangeEmailConfirmation">
        <div className="wrapper">
          <h1 className="title"><span><T t="Change your email" /></span></h1>
          {this.state.msg && (
            <div className="msg">{this.state.msg}</div>
          )}
          {!this.state.msg && (
            <ChangeEmailConfirmationForm
              onSubmitSuccess={this.handleSubmitSuccess}
              onSubmitFail={this.handleSubmitFail}
              confirmationKey={this.props.params.key}
            />
          )}
        </div>
      </div>
    )
  }
}
ChangeEmailConfirmation.propTypes = {
  params: PropTypes.shape({
    key: PropTypes.string.isRequired
  }).isRequired
}

ChangeEmailConfirmation = StaticPage(ChangeEmailConfirmation)

const mapStateToProps = state => ({
  meta: {
    title: t(state, 'Change your email')
  }
})
ChangeEmailConfirmation = connect(
  mapStateToProps
)(ChangeEmailConfirmation)

export default ChangeEmailConfirmation
