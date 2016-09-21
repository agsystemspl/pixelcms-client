import { renderToString } from 'react-dom/server'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import match from 'react-router/lib/match'
import DocumentMeta from 'react-document-meta'

const serverRender = (req, cb) => {
  const configureStore = require('../store/configureStore').default
  const locationChanged = require('../actions/route/locationChanged').default
  const setSsrCookie = require('../actions/auth/setSsrCookie').default
  const ApiRequest = require('../utils/ApiRequest').default

  const config = require('../../../../src/config').config
  const locale = require('../../../../src/locale').default
  const reducers = require('../../../../src/reducers').reducers
  const getRoutes = require('../../../../src/routes').default

  const store = configureStore(config, locale, reducers)
  store.dispatch(locationChanged(req.path, req.query))
  store.dispatch(setSsrCookie(req.get('cookie')))
  new ApiRequest().get('accounts/auth-info/', store.dispatch, store.getState)
    .then()
    .then(() => {
      const history = createMemoryHistory(req.originalUrl)
      const routes = getRoutes(store, history)
      match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
        if (err) { console.log(err) }
        else {
          var returnData = (data) => {
            var state = store.getState()
            if (state.route.serverRedirect) {
              cb(null, state.route.serverRedirect, null)
            }
            else {
              var meta = DocumentMeta.renderAsHTML()
              cb(null, null, {
                appRoot: data.output,
                initialState: state,
                meta: meta
              })
            }
          }
          store.renderUniversal(renderToString, routes)
            .then(
              (data) => {
                returnData(data)
              },
              (data) => {
                console.warn(data.error.message)
                returnData(data)
              }
            )
        }
      })
    })
}

export default serverRender
