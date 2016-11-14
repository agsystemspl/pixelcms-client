import React from 'react'
import { connect } from 'react-redux'

import StaticPage from '~/components/staticPages/StaticPage'
import RequireNotLoggedIn from '~/components/utils/RequireNotLoggedIn'
import LoginForm from './Login/LoginForm'
import Link from '~/components/utils/Link'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

let Login = () => (
  <div id="pageLogin">
    <div className="container">
      <div className="wrapper">
        <h1 className="title"><span><T t="Login" /></span></h1>
        <LoginForm />
        <div className="links">
          <div>
            <Link to="/accounts/forgotten-password">
              <T t="I forgot my password" />
            </Link>
          </div>
          <div>
            <Link to="/accounts/register">
              <T t="I don't have an account yet" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

Login = StaticPage(Login)

const mapStateToProps = state => ({
  meta: {
    title: t(state, 'Login')
  }
})
Login = connect(
  mapStateToProps
)(Login)

Login = RequireNotLoggedIn(Login)

export default Login
