import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'

import StaticPage from '~/components/staticPages/StaticPage'
import RequireNotLoggedIn from '~/components/utils/RequireNotLoggedIn'
import ActivateForm from './Activate/ActivateForm'
import addToast from '~/actions/toaster/addToast'
import langPrefix from '~/utils/langPrefix'
import Link from '~/components/utils/Link'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class Activate extends Component {
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
    this.setState(Object.assign({}, this.state, {
      msg: data._error,
      expired: data.expired
    }))
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={langPrefix('/accounts/login', this.props.lang)} />
    }
    return (
      <div className="page" id="pageActivate">
        <div className="wrapper">
          <h1 className="title"><span><T t="Activate your account" /></span></h1>
          {this.state.msg && (
            <div className="msg">{this.state.msg}</div>
          )}
          {this.state.expired && (
            <Link to="/accounts/resend-activation-message">
              <T t="Resend activation message" />
            </Link>
          )}
          {!this.state.msg && (
            <ActivateForm
              onSubmitSuccess={this.handleSubmitSuccess}
              onSubmitFail={this.handleSubmitFail}
              activationKey={this.props.params.key}
            />
          )}
        </div>
      </div>
    )
  }
}
Activate.propTypes = {
  params: PropTypes.shape({
    key: PropTypes.string.isRequired
  }).isRequired,
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    default: PropTypes.bool.isRequired
  }).isRequired,
  addToast: PropTypes.func.isRequired
}

Activate = StaticPage(Activate)

const mapStateToProps = (state) => ({
  lang: state.route.lang,
  meta: {
    title: t(state, 'Activate your account')
  }
})
Activate = connect(
  mapStateToProps,
  { addToast }
)(Activate)

Activate = RequireNotLoggedIn(Activate)

export default Activate
