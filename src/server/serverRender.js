import React from 'react'
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
  const locationChanged = require('../actions/route/locationChanged').default
  const setSsrCookie = require('../actions/auth/setSsrCookie').default
  const ApiRequest = require('../utils/ApiRequest').default
  const LocationHandler = require('../components/core/LocationHandler').default
  const MetaHandler = require('../components/core/MetaHandler').default

  const store = configureStore(config, locale, reducers)
  store.dispatch(locationChanged(req.path, req.query))
  store.dispatch(setSsrCookie(req.get('cookie')))

  new ApiRequest().get('accounts/auth-info/', store.dispatch, store.getState)
    .catch(err => console.log(err))
    .then()
    .then(() => {
      const context = createServerRenderContext()

      const markup = (store, context) => (
        <Provider store={store}>
          <ServerRouter
            location={req.url}
            context={context}
          >
            <div>
              <Subscriber channel="location">
                {location => <LocationHandler location={location} />}
              </Subscriber>
              <MetaHandler />
              <App />
            </div>
          </ServerRouter>
        </Provider>
      )

      const returnData = data => {
        var state = store.getState()
        var meta = DocumentMeta.renderAsHTML()
        cb({
          appRoot: data.output,
          initialState: state,
          meta: meta
        })
      }

      store.renderUniversal(renderToString, markup(store, context))
        .catch(err => console.log(err))
        .then(
          data => {
            const result = context.getResult()
            if (result.missed) {
              store.renderUniversal(renderToString, markup(store, context))
                .then(
                  data => {
                    if (result.redirect) {
                      res.status(302).set({ 'Location': result.redirect.pathname }).end()
                    }
                    else {
                      returnData(data)
                    }
                  }
                )
            }
            else {
              if (result.redirect) {
                res.status(302).set({ 'Location': result.redirect.pathname }).end()
              }
              else {
                returnData(data)
              }
            }
          }
        )
    })
}

export default serverRender
