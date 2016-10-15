import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'
import includes from 'lodash/includes'

import Login from '~/components/staticPages/accounts/Login'
import Register from '~/components/staticPages/accounts/Register'
import Activate from '~/components/staticPages/accounts/Activate'
import ResendActivationMessage from '~/components/staticPages/accounts/ResendActivationMessage'
import ForgottenPassword from '~/components/staticPages/accounts/ForgottenPassword'
import ResetPassword from '~/components/staticPages/accounts/ResetPassword'
import PageHandler from '~/components/core/PageHandler'

let Routes = props => {
  const staticRoutes = {
    accounts: [
      { pattern: '/login', exactly: true, component: Login },
      { pattern: '/register', exactly: true, component: Register },
      { pattern: '/activate/:key', exactly: true, component: Activate },
      { pattern: '/resend-activation-message', exactly: true, component: ResendActivationMessage },
      { pattern: '/forgotten-password', exactly: true, component: ForgottenPassword },
      { pattern: '/reset-password/:key', exactly: true, component: ResetPassword }
    ]
  }

  let routes = []

  for (const key in staticRoutes) {
    if (!staticRoutes.hasOwnProperty(key) || includes(props.exclude, key)) { continue }
    staticRoutes[key].map((route) => {
      routes.push(
        <Match
          key={route.pattern}
          pattern={route.pattern}
          exactly={route.exactly}
          component={route.component}
        />
      )
      props.langs.forEach((lang) => {
        if (lang.code === props.langs[0].code) { return }
        routes.push(
          <Match
            key={lang.code + '/' + route.pattern}
            pattern={lang.code + '/' + route.pattern}
            exactly={route.exactly}
            component={route.component}
          />
        )
      })
    })
  }

  routes.push(
    <Miss key="page" component={PageHandler} />
  )
  return <div>{routes}</div>
}
Routes.propTypes = {
  exclude: PropTypes.arrayOf(PropTypes.string),
  langs: PropTypes.arrayOf(React.PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  })).isRequired
}

const mapStateToProps = state => ({
  langs: state.config.langs
})
Routes = connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(Routes)

export default Routes
