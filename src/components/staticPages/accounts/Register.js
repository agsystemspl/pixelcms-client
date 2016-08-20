import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import browserHistory from 'react-router/lib/browserHistory'
import { toastr } from 'react-redux-toastr'

import StaticPage from '~/components/staticPages/StaticPage'
import RegisterForm from './Register/RegisterForm'
import langPrefix from '~/utils/langPrefix'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      msg: null
    }
  }
  handleSubmitSuccess(res) {
    if (res.activation) {
      this.setState({
        msg: res.msg
      })
    }
    else {
      browserHistory.push(langPrefix('/', this.props.lang))
      toastr.success('', res.msg, {
        icon: 'icon-information-circle'
      })
    }
  }
  render() {
    return (
      <div id="pageRegister">
        <div className="container">
          <div className="wrapper">
            <h1 className="title"><span><T t="Register" /></span></h1>
            {this.state.msg && (
              <div className="msg">{this.state.msg}</div>
            )}
            {!this.state.msg && (
              <RegisterForm
                onSubmitSuccess={(res) => this.handleSubmitSuccess(res)}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  state: PropTypes.object.isRequired,
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    default: PropTypes.bool.isRequired
  }).isRequired
}

Register = StaticPage(Register)

const mapStateToProps = (state) => ({
  state,
  lang: state.route.lang,
  meta: {
    title: t(state, 'Register')
  }
})
Register = connect(
  mapStateToProps
)(Register)

export default Register
