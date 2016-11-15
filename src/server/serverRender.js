import React from 'react'
import reactCookie from 'react-cookie'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import ServerRouter from 'react-router/ServerRouter'
import createServerRenderContext from 'react-router/createServerRenderContext'
import { Subscriber } from 'react-broadcast'
import DocumentMeta from 'react-document-meta'

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
  const store = configureStore(config, locale, reducers, __PROMISES__)

  const context = createServerRenderContext()

  const returnData = output => {
    var state = store.getState()
    var meta = DocumentMeta.renderAsHTML()
    unplugCookie()
    cb({
      appRoot: output,
      initialState: state,
      meta: meta
    })
  }

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
  renderToString(markup) // don't need it's value yet
  const result = context.getResult()
  if (result.redirect) {
    res.status(302).set({ 'Location': result.redirect.pathname }).end()
  }
  Promise.all(__PROMISES__).then(() => {
    // all promises resolved, now render final html
    const html = renderToString(
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
    returnData(html)
  })
}

export default serverRender
