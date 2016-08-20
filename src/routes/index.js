import React, { PropTypes } from 'react'
import Route from 'react-router/lib/Route'
import includes from 'lodash/includes'

import Login from '~/components/staticPages/accounts/Login'
import Register from '~/components/staticPages/accounts/Register'
import Activate from '~/components/staticPages/accounts/Activate'
import ResendActivationMessage from '~/components/staticPages/accounts/ResendActivationMessage'
import ForgottenPassword from '~/components/staticPages/accounts/ForgottenPassword'
import ResetPassword from '~/components/staticPages/accounts/ResetPassword'
import * as routesUtils from './utils'
import PageComponentRegistryProvider from '~/components/PageComponentRegistryProvider'
import PageHandler from '~/components/PageHandler'

const getRoutes = (langs, store, pageComponentsRegistry, exclude = []) => {
  const staticRoutes = {
    accounts: [
      { path: 'login', component: Login, onEnter: routesUtils.requireNotLoggedIn(store) },
      { path: 'register', component: Register, onEnter: routesUtils.requireNotLoggedIn(store) },
      { path: 'activate/:key', component: Activate, onEnter: routesUtils.requireNotLoggedIn(store) },
      { path: 'resend-activation-message', component: ResendActivationMessage, onEnter: routesUtils.requireNotLoggedIn(store) },
      { path: 'forgotten-password', component: ForgottenPassword, onEnter: routesUtils.requireNotLoggedIn(store) },
      { path: 'reset-password/:key', component: ResetPassword, onEnter: routesUtils.requireNotLoggedIn(store) }
    ]
  }

  let routes = []

  for (const key in staticRoutes) {
    if (!staticRoutes.hasOwnProperty(key) || includes(exclude, key)) { continue }
    staticRoutes[key].map((route) => {
      routes.push(
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          onEnter={route.onEnter}
        />
      )
      langs.forEach((lang) => {
        if (lang.code === langs[0].code) { return }
        routes.push(
          <Route
            key={lang.code + '/' + route.path}
            path={lang.code + '/' + route.path}
            component={route.component}
            onEnter={route.onEnter}
          />
        )
      })
    })
  }

  const PageComponentRegistryProviderWrapper = (props) => {
    return (
      <PageComponentRegistryProvider registry={pageComponentsRegistry}>
        {props.children}
      </PageComponentRegistryProvider>
    )
  }
  PageComponentRegistryProviderWrapper.propTypes = {
    children: PropTypes.element
  }
  routes.push(
    <Route key="pages" component={PageComponentRegistryProviderWrapper}>
      <Route path="*" component={PageHandler} />
    </Route>
  )

  return routes
}

export default getRoutes
