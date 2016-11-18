import React from 'react'
import ReactDOM from 'react-dom'
import BrowserRouter from 'react-router/BrowserRouter'
import { configureStore } from 'pixelcms-client'

import { config } from '~/config'
import locale from '~/locale'
import reducers from '~/reducers'
import App from './components/App'

require('es6-promise').polyfill()
require('isomorphic-fetch')

const store = configureStore(config, locale, reducers)

ReactDOM.render(
  <App store={store} router={BrowserRouter} />,
  document.getElementById('root')
)
