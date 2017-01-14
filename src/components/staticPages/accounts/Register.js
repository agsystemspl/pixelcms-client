import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import StaticPage from '~/components/staticPages/StaticPage'
import RequireNotLoggedIn from '~/components/utils/RequireNotLoggedIn'
import RegisterForm from './Register/RegisterForm'
import SocialAuth from '~/components/utils/SocialAuth'
import addToast from '~/actions/toaster/addToast'
import Link from '~/components/utils/Link'
import Redirect from '~/components/utils/Redirect'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

class Inner extends Component {
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
      return <Redirect to="/accounts/login" />
    }
    return (
      <div>
        {this.state.msg && (
          <div className="msg">{this.state.msg}</div>
        ) || (
          <div>
            <RegisterForm
              onSubmitSuccess={this.handleSubmitSuccess}
            />
            <div className="links">
              <div>
                <Link to="/accounts/login">
                  <T t="I already have an account" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
Inner.propTypes = {
  addToast: PropTypes.func.isRequired
}

Inner = connect(
  null,
  { addToast }
)(Inner)

let Register = props => (
  <div className="page" id="pageRegister">
    <div className="wrapper">
      <h1 className="title"><span><T t="Register" /></span></h1>
      {!isEmpty(props.socialAuth) && (
        <div className="cols">
          <div className="col">
            <Inner />
          </div>
          <div className="col">
            <SocialAuth backends={props.socialAuth} />
          </div>
        </div>
      ) || (
        <Inner />
      )}
    </div>
  </div>
)
Register.propTypes = {
  socialAuth: PropTypes.array.isRequired
}

Register = StaticPage(Register)

const mapStateToProps = state => ({
  socialAuth: state.config.socialAuth,
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
