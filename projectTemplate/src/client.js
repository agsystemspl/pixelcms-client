import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import concat from 'lodash/concat'
import { configureStore, routes as pixelcmsRoutes } from 'pixelcms-client'

import { config, dynamicPageComponents } from '~/config'
import locale from '~/locale'
import reducers from '~/reducers'
import customRoutes from '~/routes'
import App from './components/App'

require('es6-promise').polyfill()
require('isomorphic-fetch')

const store = configureStore(config, locale, reducers)

const routes = {
  component: props => (
    <App
      store={store}
      history={browserHistory}
      children={props.children} // eslint-disable-line react/prop-types
    />
  ),
  childRoutes: concat(
    customRoutes,
    pixelcmsRoutes(dynamicPageComponents, store)
  )
}

ReactDOM.render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('root')
)
