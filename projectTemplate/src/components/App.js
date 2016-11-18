import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Subscriber } from 'react-broadcast'
import { AuthHandler, LocationHandler, MetaHandler, Routes as PixelcmsRoutes, Toaster, LiveAdminSidebar } from 'pixelcms-client'

import { pageComponentsRegistry } from '~/config'
import styles from '~/assets/scss/styles.scss'  // eslint-disable-line no-unused-vars

const App = props => (
  <Provider store={props.store}>
    <props.router {...props.routerProps}>
      <div>
        <AuthHandler />
        <Subscriber channel="location">
          {location => <LocationHandler location={location} />}
        </Subscriber>
        <MetaHandler />
        <div id="app">
          <main>
            <PixelcmsRoutes pageComponentsRegistry={pageComponentsRegistry} exclude={['accounts']} />
          </main>
          <Toaster />
          <LiveAdminSidebar />
        </div>
      </div>
    </props.router>
  </Provider>
)
App.propTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.func.isRequired,
  routerProps: PropTypes.object
}

export default App
