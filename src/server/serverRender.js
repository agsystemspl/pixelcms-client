import React from 'react'
import reactCookie from 'react-cookie'
import match from 'react-router/lib/match'
import RouterContext from 'react-router/lib/RouterContext'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import concat from 'lodash/concat'
import { renderToString } from 'react-dom/server'
import DocumentMeta from 'react-document-meta'
import isEqual from 'lodash/isEqual'

const serverRender = (req, res, { configPath, localePath, reducersPath, routesPath, AppPath }, cb) => {
  const config = require(configPath).config
  const dynamicPageComponents = require(configPath).dynamicPageComponents
  const locale = require(localePath).default
  const reducers = require(reducersPath).default
  const customRoutes = require(routesPath).default
  const App = require(AppPath).default

  const configureStore = require('../store/configureStore').default

  const unplugCookie = reactCookie.plugToRequest(req, res)

  // action creators dispatching async actions have to push their
  // promises to this array
  global.__PROMISES__ = []
  /* global __PROMISES__ */

  const store = configureStore(config, locale, reducers)

  const history = createMemoryHistory(req.url)

  const routes = {
    component: props => (
      <App
        store={store}
        history={history}
        children={props.children} // eslint-disable-line react/prop-types
      />
    ),
    childRoutes: concat(
      customRoutes,
      require('../routes').default(dynamicPageComponents, store)
    )
  }

  match({ routes, location: req.url, history }, (error, redirectLocation, renderProps) => {
    if (error) { console.log(error) }
    else if (redirectLocation) {
      // redirect based on route onEnter
      res.status(302).set({ 'Location': redirectLocation.pathname + redirectLocation.search }).end()
      return
    }

    let currentState
    const render = () => {
      currentState = Object.assign({}, store.getState())
      let storeUrl = store.getState().route.path + store.getState().route.search
      if (storeUrl !== req.url) {
        // redirect based on store value
        res.status(302).set({ 'Location': storeUrl }).end()
        return
      }
      Promise.all(__PROMISES__).then(() => {
        if (isEqual(store.getState(), currentState)) {
          unplugCookie()
          cb({
            appRoot: renderToString(<RouterContext {...renderProps} />), // render with final store state
            initialState: store.getState(),
            meta: DocumentMeta.renderAsHTML()
          })
        }
        else {
          renderToString(<RouterContext {...renderProps} />) // don't need it's value yet
          render()
        }
      })
    }
    renderToString(<RouterContext {...renderProps} />)
    render()
  })
}

export default serverRender
