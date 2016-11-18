import React, { Component, PropTypes } from 'react'
import Redirect from 'react-router/Redirect'
import { connect } from 'react-redux'

import StaticPage from '~/components/staticPages/StaticPage'
import RequireNotLoggedIn from '~/components/utils/RequireNotLoggedIn'
import RegisterForm from './Register/RegisterForm'
import addToast from '~/actions/toaster/addToast'
import langPrefix from '~/utils/langPrefix'
import Link from '~/components/utils/Link'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      msg: null,
      redirect: null
    }
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this)
  }
  handleSubmitSuccess(data) {
    if (data.activation) {
      this.setState(Object.assign({}, this.state, { msg: data.msg }))
    }
    else {
      this.setState(Object.assign({}, this.state, { redirect: true }))
      this.props.addToast('success', data.msg, null)
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={langPrefix('/accounts/login', this.props.lang)} />
    }
    return (
      <div className="page" id="pageRegister">
        <div className="wrapper">
          <h1 className="title"><span><T t="Register" /></span></h1>
          {this.state.msg && (
            <div className="msg">{this.state.msg}</div>
          ) || (
            <div>
              <RegisterForm
                onSubmitSuccess={this.handleSubmitSuccess}
              />
              <div className="links">
                <div>
                  <Link to={langPrefix('/accounts/login', this.props.lang)}>
                    <T t="I already have an account" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    default: PropTypes.bool.isRequired
  }).isRequired,
  addToast: PropTypes.func.isRequired
}

Register = StaticPage(Register)

const mapStateToProps = (state) => ({
  lang: state.route.lang,
  meta: {
    title: t(state, 'Register')
  }
})
Register = connect(
  mapStateToProps,
  { addToast }
)(Register)

Register = RequireNotLoggedIn(Register)

export default Register
