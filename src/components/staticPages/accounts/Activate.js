import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import browserHistory from 'react-router/lib/browserHistory'

import StaticPage from '~/components/staticPages/StaticPage'
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
      expired: null
    }
  }
  handleSubmitSuccess(res) {
    browserHistory.push(langPrefix('/login', this.props.lang))
    this.props.addToast('success', res.msg, null)
  }
  handleSubmitFail(err) {
    this.setState({
      msg: err._error,
      expired: err.expired
    })
  }
  render() {
    return (
      <div id="pageActivate">
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
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
Activate.propTypes = {
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
