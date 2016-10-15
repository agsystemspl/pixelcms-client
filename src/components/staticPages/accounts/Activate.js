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
    this.setState(Object.assign({}, this.state, {
      msg: err._error,
      expired: err.expired
    }))
  }
  render() {
    if (this.state.success) {
      return <Redirect to={langPrefix('/login', this.props.lang)} />
    }
    return (
      <div id="pageActivate">
        <RequireNotLoggedIn />
        <div className="container">
          <div className="wrapper">
            <h1 className="title"><span><T t="Activate your account" /></span></h1>
            {this.state.msg && (
              <div className="msg">{this.state.msg}</div>
            )}
            {this.state.expired && (
              <Link to="/resend-activation-message">
                <T t="Resend activation message" />
              </Link>
            )}
            {!this.state.msg && (
              <ActivateForm
                onSubmitSuccess={(res) => this.handleSubmitSuccess(res)}
                onSubmitFail={(err) => this.handleSubmitFail(err)}
                activationKey={this.props.params.key}
              />
            )}
          </div>
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

export default Activate
