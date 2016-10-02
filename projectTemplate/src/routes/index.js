import React from 'react'
import { Provider } from 'react-redux'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import browserHistory from 'react-router/lib/browserHistory'
import ReactGA from 'react-ga'
import { Toaster, MetaHandler, getRoutes as getPixelcmsRoutes } from 'pixelcms-client'

import { config, pageComponentsRegistry } from '~/config'
import App from '~/components/App'

if (config.gaTrackingId) {
  ReactGA.initialize(config.gaTrackingId, {
    debug: process.env.NODE_ENV !== 'production'
  })
}
const GALogPageView = () => {
  if (!config.gaTrackingId) { return }
  ReactGA.set({
    page: window.location.pathname,
    title: window.location.pathname
  })
  ReactGA.pageview(window.location.pathname)
}

const getRoutes = (store, history = browserHistory) => (
  <Provider store={store}>
    <div>
      <Toaster />
      <Router
        history={history}
        onUpdate={GALogPageView}
      >
        <Route component={MetaHandler}>
          <Route component={App}>
            {getPixelcmsRoutes(
              config.langs,
              store,
              pageComponentsRegistry,
              ['accounts']
            )}
          </Route>
        </Route>
      </Router>
    </div>
  </Provider>
)

export default getRoutes
