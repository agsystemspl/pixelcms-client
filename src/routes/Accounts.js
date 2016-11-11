import React, { PropTypes } from 'react'
import Match from 'react-router/Match'

import langPrefix from '~/utils/langPrefix'
import Login from '~/components/staticPages/accounts/Login'
import Register from '~/components/staticPages/accounts/Register'
import Activate from '~/components/staticPages/accounts/Activate'
import ResendActivationMessage from '~/components/staticPages/accounts/ResendActivationMessage'
import ForgottenPassword from '~/components/staticPages/accounts/ForgottenPassword'
import ResetPassword from '~/components/staticPages/accounts/ResetPassword'

const Accounts = props => (
  <div>
    <Match
      pattern={langPrefix('/accounts/login', props.lang)}
      exactly={true}
      component={Login}
    />
    <Match
      pattern={langPrefix('/accounts/register', props.lang)}
      exactly={true}
      component={Register}
    />
    <Match
      pattern={langPrefix('/activate/:key', props.lang)}
      exactly={true}
      component={Activate}
    />
    <Match
      pattern={langPrefix('/resend-activation-message', props.lang)}
      exactly={true}
      component={ResendActivationMessage}
    />
    <Match
      pattern={langPrefix('/forgotten-password', props.lang)}
      exactly={true}
      component={ForgottenPassword}
    />
    <Match
      pattern={langPrefix('/reset-password/:key', props.lang)}
      exactly={true}
      component={ResetPassword}
    />
  </div>
)
Accounts.propTypes = {
  lang: PropTypes.object.isRequired
}

export default Accounts
