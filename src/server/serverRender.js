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

  const unplug = reactCookie.plugToRequest(req, res)

  const store = configureStore(config, locale, reducers)

  const context = createServerRenderContext()

  const returnData = output => {
    var state = store.getState()
    var meta = DocumentMeta.renderAsHTML()
    unplug()
    cb({
      appRoot: output,
      initialState: state,
      meta: meta
    })
  }

  store.renderUniversal(renderToString, (
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
  ))
    .then(
      ({ output }) => {
        const result = context.getResult()
        if (result.redirect) {
          res.status(302).set({ 'Location': result.redirect.pathname }).end()
        }
        else {
          returnData(output)
        }
      }
    )
    .catch(({ output, error }) => {
      console.log(error)
      returnData(output)
    })
}

export default serverRender
