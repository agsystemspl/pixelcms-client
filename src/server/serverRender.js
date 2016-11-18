import React from 'react'
import reactCookie from 'react-cookie'
import { renderToString } from 'react-dom/server'
import ServerRouter from 'react-router/ServerRouter'
import createServerRenderContext from 'react-router/createServerRenderContext'
import DocumentMeta from 'react-document-meta'
import isEqual from 'lodash/isEqual'

const serverRender = (req, res, { configPath, localePath, reducersPath, AppPath }, cb) => {
  const config = require(configPath).config
  const locale = require(localePath).default
  const reducers = require(reducersPath)
  const App = require(AppPath).default

  const configureStore = require('../store/configureStore').default

  const unplugCookie = reactCookie.plugToRequest(req, res)

  // action creators dispatching async actions have to push their
  // promises to this array
  global.__PROMISES__ = []
  /* global __PROMISES__ */

  const store = configureStore(config, locale, reducers)

  const context = createServerRenderContext()

  const markup = (
    <App
      store={store}
      router={ServerRouter}
      routerProps={{
        location: req.url,
        context: context
      }}
    />
  )
  renderToString(markup) // don't need it's value yet
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
          appRoot: renderToString(markup), // render with final store state
          initialState: store.getState(),
          meta: DocumentMeta.renderAsHTML()
        })
      }
      else {
        renderToString(markup) // don't need it's value yet
        render()
      }
    })
  }
  render()
}

export default serverRender
