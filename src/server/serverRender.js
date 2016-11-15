import React from 'react'
import reactCookie from 'react-cookie'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import ServerRouter from 'react-router/ServerRouter'
import createServerRenderContext from 'react-router/createServerRenderContext'
import { Subscriber } from 'react-broadcast'
import DocumentMeta from 'react-document-meta'
import isEqual from 'lodash/isEqual'

const serverRender = (req, res, { configPath, localePath, reducersPath, AppPath }, cb) => {
  const config = require(configPath).config
  const locale = require(localePath).default
  const reducers = require(reducersPath)
  const App = require(AppPath).default

  const configureStore = require('../store/configureStore').default
  const AuthHandler = require('../components/core/AuthHandler').default
  const LocationHandler = require('../components/core/LocationHandler').default
  const MetaHandler = require('../components/core/MetaHandler').default

  const unplugCookie = reactCookie.plugToRequest(req, res)

  // action creators dispatching async actions have to push their
  // promises to this array
  global.__PROMISES__ = []
  /* global __PROMISES__ */

  const store = configureStore(config, locale, reducers)

  const context = createServerRenderContext()

  const markup = (
    <Provider store={store}>
      <ServerRouter
        location={req.url}
        context={context}
      >
        <div>
          <AuthHandler />
          <Subscriber channel="location">
            {location => <LocationHandler location={location} />}
          </Subscriber>
          <MetaHandler />
          <App />
        </div>
      </ServerRouter>
    </Provider>
  )
  let html = renderToString(markup) // don't need it's value yet
  const result = context.getResult()
  if (result.redirect) {
    res.status(302).set({ 'Location': result.redirect.pathname }).end()
  }

  let currentState
  const render = () => {
    currentState = Object.assign({}, store.getState())
    Promise.all(__PROMISES__).then(() => {
      if (isEqual(store.getState(), currentState)) {
        unplugCookie()
        cb({
          appRoot: html,
          initialState: store.getState(),
          meta: DocumentMeta.renderAsHTML()
        })
      }
      else {
        html = renderToString(
          <Provider store={store}>
            <ServerRouter
              location={req.url}
              context={context}
            >
              <div>
                <AuthHandler />
                <Subscriber channel="location">
                  {location => <LocationHandler location={location} />}
                </Subscriber>
                <MetaHandler />
                <App />
              </div>
            </ServerRouter>
          </Provider>
        )
        render()
      }
    })
  }
  render()
}

export default serverRender
