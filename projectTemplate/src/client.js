import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import BrowserRouter from 'react-router/BrowserRouter'
import { Subscriber } from 'react-broadcast'
import { configureStore, LocationHandler, MetaHandler } from 'pixelcms-client'

import App from './components/App'

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <div>
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
