import React from 'react'
import concat from 'lodash/concat'

import langPrefix from '~/utils/langPrefix'
import Login from '~/components/staticPages/accounts/Login'
import Register from '~/components/staticPages/accounts/Register'
import Activate from '~/components/staticPages/accounts/Activate'
import ResendActivationMessage from '~/components/staticPages/accounts/ResendActivationMessage'
import ForgottenPassword from '~/components/staticPages/accounts/ForgottenPassword'
import ResetPassword from '~/components/staticPages/accounts/ResetPassword'
import ChangeEmailConfirmation from '~/components/staticPages/accounts/ChangeEmailConfirmation'

const accounts = (lang, loginOnly) => {
  let routes = [
    {
      path: langPrefix('/accounts/login', lang),
      component: props => <Login loginOnly={loginOnly} />
    }
  ]
  if (!loginOnly) {
    routes = concat(routes, [
      {
        path: langPrefix('/accounts/register', lang),
        component: Register
      },
      {
        path: langPrefix('/accounts/activate/:key', lang),
        component: Activate
      },
      {
        path: langPrefix('/accounts/resend-activation-message', lang),
        component: ResendActivationMessage
      },
      {
        path: langPrefix('/accounts/forgotten-password', lang),
        component: ForgottenPassword
      },
      {
        path: langPrefix('/accounts/reset-password/:key', lang),
        component: ResetPassword
      },
      {
        path: langPrefix('/accounts/change-email-confirmation/:key', lang),
        component: ChangeEmailConfirmation
      }
    ])
  }
  return routes
}

export default accounts
