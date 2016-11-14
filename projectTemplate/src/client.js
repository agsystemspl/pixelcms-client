import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import BrowserRouter from 'react-router/BrowserRouter'
import { Subscriber } from 'react-broadcast'
import { configureStore, AuthHandler, LocationHandler, MetaHandler } from 'pixelcms-client'

import { config } from '~/config'
import locale from '~/locale'
import reducers from '~/reducers'
import App from './components/App'

ReactDOM.render(
  <Provider store={configureStore(config, locale, reducers)}>
    <BrowserRouter>
      <div>
        <AuthHandler />
        <Subscriber channel="location">
          {location => <LocationHandler location={location} />}
        </Subscriber>
        <MetaHandler />
        <App />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
