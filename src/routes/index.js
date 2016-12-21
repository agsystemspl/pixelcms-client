import React from 'react'
import concat from 'lodash/concat'
import includes from 'lodash/includes'

import accounts from './accounts'
import DynamicPageHandler from '~/components/core/DynamicPageHandler'

const routes = (dynamicPageComponents, store, exclude = []) => {
  const langs = store.getState().config.langs

  // accounts
  let accountsRoutes = []
  // if 'accounts' exists in exclude list it shouldn't be excluded completely
  // login page is included even then
  const loginOnly = includes(exclude, 'accounts')
  langs.map(lang => {
    accountsRoutes = concat(
      accountsRoutes,
      accounts(lang.code === langs[0].code ? null : lang, loginOnly)
    )
  })

  const dynamicPageRoute = {
    path: '*',
    component: props => (
      <DynamicPageHandler
        {...props}
        dynamicPageComponents={dynamicPageComponents}
      />
    )
  }

  return concat(accountsRoutes, dynamicPageRoute)
}

export default routes
