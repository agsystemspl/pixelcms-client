import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import StaticPage from '~/components/staticPages/StaticPage'
import RequireNotLoggedIn from '~/components/utils/RequireNotLoggedIn'
import LoginForm from './Login/LoginForm'
import Link from '~/components/utils/Link'
import langPrefix from '~/utils/langPrefix'
import T from '~/components/utils/T'
import t from '~/utils/i18n/t'

let Login = props => (
  <div className="page" id="pageLogin">
    <div className="wrapper">
      <h1 className="title"><span><T t="Login" /></span></h1>
      <LoginForm />
      {!props.loginOnly && (
        <div className="links">
          <div>
            <Link to={langPrefix('/accounts/forgotten-password', props.lang)}>
              <T t="I forgot my password" />
            </Link>
          </div>
          <div>
            <Link to={langPrefix('/accounts/register', props.lang)}>
              <T t="I don't have an account yet" />
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
)
Login.propTypes = {
  loginOnly: PropTypes.bool,
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
    default: PropTypes.bool.isRequired
  }).isRequired
}

Login = StaticPage(Login)

const mapStateToProps = state => ({
  lang: state.route.lang,
  meta: {
    title: t(state, 'Login')
  }
})
Login = connect(
  mapStateToProps
)(Login)

Login = RequireNotLoggedIn(Login)

export default Login
