import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { AuthHandler, LocationHandler, MetaHandler, Toaster, LiveAdminSidebar } from 'pixelcms-client'

import styles from '~/assets/scss/styles.scss'  // eslint-disable-line no-unused-vars

const App = props => (
  <Provider store={props.store}>
    <div>
      <AuthHandler />
      <LocationHandler history={props.history} />
      <MetaHandler />
      <div id="app">
        <main>
          {props.children}
        </main>
        <Toaster />
        <LiveAdminSidebar />
      </div>
    </div>
  </Provider>
)
App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default App
